define(["jquery","cookie"],function ($) {
	 //实现登录功能
	 $("#loginId").click(function () {
            $.ajax({
                type:"post",
                url:"/api/login",
                data:$("#formid").serialize(),
                dataType:"json",
                success:function(data){
                    if(data.code==200){
                    	//把用户登录的信息存储到cookie里面，方便页面之间进行数据的共享
                    	//由于cookie只能存储字符串，需要将后台返回来的json格式的对象转化成字符串（JSON.stringify）
                    	//在根目录下设置的cookie，子页面可以访问，子页面设置的cookie，其他页面无法访问，因此需要设置路径
                    	$.cookie("loginInfo",JSON.stringify(data.result),{path:"/"});
                    	//实现也面的调转
                        location.href="/index/index";
                    }
                }
            });
            return false;
        });
})