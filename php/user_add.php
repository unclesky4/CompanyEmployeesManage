<?php header('Content-type:text/html;charset=UTF-8');
	session_start();
	if(!isset($_SESSION['R'])) {
		echo '-2';    //未登陆
		return ;	
	}
	
	$name = test_input($_POST['name']);
	$password = test_input($_POST['password']);
	$role_id = $_POST['role_id'];
	$bool_name = false;
	$bool1 = false;
	$bool2 = false;
	$user_id = "";	
	
	include 'AES.php';
	$encText = $aes->encrypt($password);
	
	$con = mysql_connect("localhost","uncle","uncle");
	if(!$con) {
		echo "-1";  //连接数据库失败！		
		die('Could not connect: ' . mysql_error());	
	}
	mysql_select_db("CompanyEmployee",$con);
	mysql_query("set names utf8");
	$result = mysql_query("select `username` from user");
	while($row = mysql_fetch_array($result)) {
		if($row['username'] === $name) {
			$bool_name = true;
			break;	
		}	
	}
	if($bool_name) {
		echo "0";  //用户名已存在！
		return;	
	}
	mysql_query("BEGIN");
	$rs1 = mysql_query("insert into `user`(`username`,`password`) values ('$name','$encText')");
	$rs = mysql_query("select `id` from user where `username`='$name'");
	while($row = mysql_fetch_array($rs)) {
		$user_id = $row['id'];	
	}
	$rs2 = mysql_query("insert into `user_role`(`user_id`,`role_id`) values ('$user_id','$role_id')");
	if($rs1  && $rs2 ) {
		mysql_query("COMMIT");
		echo "1";  //添加成功！ 	
	}else {
		mysql_query("ROLLBACK");
		echo "2";  //添加失败！	
	}
	mysql_query("END"); 

	function test_input($data) {
  		$data = trim($data);    //去除用户输入数据中不必要的字符（多余的空格、制表符、换行）
  		$data = stripslashes($data);  //删除用户输入数据中的反斜杠（\）
  		$data = htmlspecialchars($data);   // PHP 的 htmlspecialchars() 函数传递所有变量
  		return $data;
	}
?>