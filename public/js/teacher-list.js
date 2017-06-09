define(["jquery","template","bootstrap"],function ($,template) {
	$.ajax({
		type:"get",
		url:"/api/teacher",
		dataType:"json",
		success:function(data){
			// console.log(data);
			var html=template("teacherListTpl",{list:data.result});
			$("#teacherListInfo").html(html);
			//查看按钮
			viewTeacher();
			enableTeacher();

		}
	})

	function viewTeacher(){
		$("#teacherListInfo").find('.preview').click(function(){
			//获取对应行的id值
			var tcId = $(this).closest('td').attr('data-id');
			$.ajax({
				type:"get",
				url:"/api/teacher/view",
				data:{tc_id:tcId},
				dataType:"json",
				success:function(data){
					// data.result.tc_hometown=data.result.tc_hometown.replace(/[|]/g," ");
					// data.result.tc_hometown=data.result.tc_hometown.replace(/\|/g," ");
					data.result.tc_hometown=data.result.tc_hometown.split("|").join(" ");
					var html=template("teacherModalInfoTpl",data.result);
					$("#teacherModalInfo").html(html);
					$("#teacherModal").modal();
				}
			})
			// return false;				
		});
	}

	function enableTeacher(){
		$("#teacherListInfo").find('.edteacher').click(function(){
			var that=this;
			//获取对应行的id值
			var td=$(this).closest('td');
			var tcId = td.attr('data-id');
			var tcStatus =td.attr('data-status');
			$.ajax({
				type:"post",
				url:"/api/teacher/handle",
				data:{tc_id:tcId,tc_status:tcStatus},
				dataType:"json",
				success:function(data){
					if(data.code==200){
						td.attr("data-status",data.result.tc_status);
						if(data.result.tc_status==0){
							$(that).text("启用");
						}else{
							$(that).text("注销");
						}
					}
				}
			})
			// return false;				
		});
	}
});
