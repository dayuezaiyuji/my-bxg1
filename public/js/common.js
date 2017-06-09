define(["jquery","template","nprogress","cookie"],function($,template,nprogress){
    //控制左侧菜单的展开和折叠
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });
    //实现退出功能
    $("#logout").click(function () {
        $.ajax({
            type:"post",
            url:"/api/logout",
            dataType:"json",
            success:function(data){
                if(data.code==200){
                    location.href="/login";
                }
            }
        });
    });

    //获取请求路径(域名后面的信息)
    var pathname=location.pathname;
    // 侧边栏点击时变色
    $(".aside .navs a").removeClass("active");
    $(".aside .navs a[href='"+pathname+"']").addClass("active");
    //判断用户是否已经登录要通过PHPSESSID来判断
    if(pathname!="/login" && !$.cookie("PHPSESSID")){
        //没有登录的情况下要重新跳转到登录页面
        location.href="/login";       
    }
    //获取用户登录的cookie信息
    var loginInfo=$.cookie("loginInfo")&& JSON.parse($.cookie("loginInfo"));
    if(loginInfo){
        var loginTpl='<div class="avatar img-circle"> <img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
        var html=template.render(loginTpl,loginInfo);
        $("#loginInfoTpl").html(html);
        //渲染页面
        // $(".aside .profile").find("img").attr("src",loginInfo.tc_avatar);
        // $(".aside .profile").find("h4").text(loginInfo.tc_name);
    }

    // 页面加载时的遮罩效果控制
    $(document).ajaxStart(function(){
        //显示遮罩
        $(".overlay").fadeIn();
    });
     $(document).ajaxStop(function(){
        //隐藏遮罩
        $(".overlay").fadeOut(2000);
    });

     //页面加载时的进度条控制
     nprogress.start();
     nprogress.done();


})