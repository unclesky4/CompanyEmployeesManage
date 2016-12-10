<?php header('Content-type:text/html; charset=utf-8');
	session_start();
	echo $_SESSION['UserName'] . " [角色：" . $_SESSION['R']."]";
?>