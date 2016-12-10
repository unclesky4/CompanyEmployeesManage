<?php header('Content-type:text/html;charset=UTF-8');
	session_start();
	if(!isset($_SESSION['R'])) {
		echo '-2';    //未登陆
		return;	
	}
	
	$id = test_input($_POST['id']);
	$bool = false;
	$con = mysql_connect("localhost","uncle","uncle");
	if(!$con) {
		echo "-1";  //连接数据库失败！		
		die('Could not connect: ' . mysql_error());	
	}
	mysql_select_db("CompanyEmployee",$con);
	mysql_query("set names utf8");
	$result = mysql_query("select `id` from user");
	while($row = mysql_fetch_array($result)) {
		if($row['id'] === $id) {
			$bool = true;
			break;		
		}	
	}
	if($bool) {
		mysql_query("BEGIN");
		$sql1 = "delete from user where id='$id'";
		$sql2 = "delete from user_role where user_id='$id'";
		if(mysql_query($sql2) && mysql_query($sql1)) {
			mysql_query("COMMIT");
			echo "1";	//删除成功！	
		}else {
			mysql_query("ROLLBACK");
			echo "0"; //删除失败！
		}
		mysql_query("END");	
	}else {
		echo "2"; //用户ID不存在！
	}

	function test_input($data) {
  		$data = trim($data);    //去除用户输入数据中不必要的字符（多余的空格、制表符、换行）
  		$data = stripslashes($data);  //删除用户输入数据中的反斜杠（\）
  		$data = htmlspecialchars($data);   // PHP 的 htmlspecialchars() 函数传递所有变量
  		return $data;
	}
?>