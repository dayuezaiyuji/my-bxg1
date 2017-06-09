<?php 
	//路径
	$path="index";
	//文件名称
	$filename="index";
	//$_SERVER可以跟踪路径
	//判断数组中师傅包含对应的key，当用户给域名后面输入“/”的时候，$_SERVER才会有PATH_INFO这个属性
	if(array_key_exists("PATH_INFO",$_SERVER)){
		//获取url中的路径
		$url=$_SERVER["PATH_INFO"];
		//substr截取字符串
		$str=substr($url,1);
		$pathinfo=explode("/",$str);//根据“/”分割字符串，结果就是数组
		if(count($pathinfo)==2){
			//两层路径
			$path=$pathinfo[0];
			$filename=$pathinfo[1];
		}else{
			$filename="/login";
		}
	}
	//在当前页面嵌入另一个页面
	include("/view/".$path."/".$filename.".html");


 ?>