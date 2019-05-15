<?php 
	//入口文件
	//
	//判断是否登录
	if (!isset($_SESSION['email']) || $_SESSION['password'] == "") {
		// require $_SERVER['DOCUMENT_ROOT']."/pages/login.html";
		require $_SERVER['DOCUMENT_ROOT']."/pages/index.php";
	} else {
	    require $_SERVER['DOCUMENT_ROOT']."/pages/index.php";
	}
	// phpinfo();
?>