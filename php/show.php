<?php header('Content-type:text/html;charset=UTF-8');
	session_start();
	if(!isset($_SESSION['R'])) {
		echo "false";
		return;	
	}
	if($_SESSION['R'] === 'administrator' && $_SESSION['DepartId'] === "-1") {
		echo "true";
	}else {
		echo "false";	
	}
?>