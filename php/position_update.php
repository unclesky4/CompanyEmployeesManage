<?php header('Content-type: text/html;charset=UTF-8');
	session_start();
	if(!isset($_SESSION['R'])) {
		echo '0';    //未登陆
		return;	
	}
	if($_SESSION['R'] !== "administrator") {
		echo '1';
		return;
	}

	$id = test_input($_POST['id']);
	$name = test_input($_POST['name']);
	$bool_name=false;
	$con = mysql_connect("localhost","uncle","uncle");
	if(!$con) {
		echo "-1";  //连接数据库失败！		
		die('Could not connect: ' . mysql_error());	
	}
	mysql_select_db("CompanyEmployee",$con);
	mysql_query("set names utf8");
	$result = mysql_query("select name from position");
	while($row = mysql_fetch_array($result)) {
		if($row['name'] === $name) {
			$bool_name = true;
			break;		
		}	
	}	
		
	if($bool_name) {
		echo "2";  //要修改的职位名称已存在！
		return ;	
	}
	if(mysql_query("update position set name='$name' where id='$id'")) {
		echo "3"; //修改成功！
	}else {
		echo "4";	 //修改失败！
	}
	function test_input($data) {
  		$data = trim($data);    //去除用户输入数据中不必要的字符（多余的空格、制表符、换行）
  		$data = stripslashes($data);  //删除用户输入数据中的反斜杠（\）
  		$data = htmlspecialchars($data);   // PHP 的 htmlspecialchars() 函数传递所有变量
  		return $data;
	}
?>