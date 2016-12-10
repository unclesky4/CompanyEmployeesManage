<?php header('Content-type:text/html;charset=UTF-8');
	session_start();
/*	setcookie("UserName", "", time()-3600);
	setcookie("R","",time()-3600);
	setcookie("DepartId","",time()-3600);*/
	session_destroy();
	echo  "true";
?>