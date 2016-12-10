<?php header('Content-type: text/html;charset=UTF-8');
	session_start();
	if(!isset($_SESSION['R'])) {
		echo '-2';    //未登陆
		return ;	
	}
	$name = test_input($_POST['name']);
	$sex = test_input($_POST['sex']);
	$birth = test_input($_POST['birth']);
	$addr = test_input($_POST['addr']);
	$departId = test_input($_POST['depart_id']);
	$positionId = test_input($_POST['position_id']);
	if($_SESSION['R'] !== "administrator") {
		$departId = $_SESSION['DepartId'];
	}
	$con=mysql_connect("localhost","uncle","uncle");
	if(!$con) {
		echo "-1"; //连接数据库失败！
		die('Could not connect: ' . mysql_error());	
	}
	mysql_select_db("CompanyEmployee",$con);
	mysql_query("set names utf8");
	$sql="insert into member (name,sex,birth,addr,Department_id,Position_id) values ('$name','$sex','$birth','$addr','$departId','$positionId')";
	if(mysql_query($sql)){
		echo "1"; //添加成功！	
	}else {
		echo "2"; //添加失败！请检查部门ID和职位ID是否已存在！	
	}

	function test_input($data) {
  		$data = trim($data);    //去除用户输入数据中不必要的字符（多余的空格、制表符、换行）
  		$data = stripslashes($data);  //删除用户输入数据中的反斜杠（\）
  		$data = htmlspecialchars($data);   // PHP 的 htmlspecialchars() 函数传递所有变量
  		return $data;
  	}
?>