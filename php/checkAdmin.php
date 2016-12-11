<?php header('Content-type:text/html;charset=UTF-8');   //memberCRUD.js
	session_start();
	if(($_SESSION['R'] === "administrator") && ($_SESSION['DepartId'] === -1)) {
		echo "1";
	}else {
		echo "0";	
	}
?>