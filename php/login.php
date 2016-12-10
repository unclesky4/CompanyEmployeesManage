<?php header('Content-type:text/html;charset=UTF-8');
	require "session.php";
	$name = test_input($_POST['name']);
	$password = test_input($_POST['password']);
	$ROLE = "";    //存储用户的角色
	$bool = false;   //判断是否匹配到用户
	$Uid = "";   //存储用户ID
	
	include 'AES.php';
	$encText = $aes->encrypt($password);
	
	$con = mysql_connect("localhost","uncle","uncle");
	if(!$con) {
		die('Could not connect: ' . mysql_error());	
	}
	mysql_select_db("CompanyEmployee",$con);
	mysql_query("set names utf8");
	$result = mysql_query("select id,username,password from user");
	while($row = mysql_fetch_array($result)) {
		if($row['username'] === $name && $row['password'] === $encText){
			$bool = true;
			$Uid = $row['id'];
			break;		
		}	
	}
	
	if($bool) {
		//setcookie("UserName", $name, time()+3600);
		$_SESSION["UserName"] = $name;     //设置session键值对
		$sql = "select depart_id,rolename from user_role,role,user where user.id=user_id and role_id=role.id and user.id='$Uid'";
		$rs = mysql_query($sql);
		while($row = mysql_fetch_array($rs)) {
			$ROLE = $row['rolename'];
			$_SESSION['R'] = $row['rolename'];
			$_SESSION['DepartId'] = intval($row['depart_id']);
		//	setcookie('R',$row['rolename'],time()+3600);
		//	setcookie('DepartId_',intval($row['depart_id']),time()+3600);	
		}
	}else {
		echo "-1";	//用户名或密码不正确！
		return;
	}
	if($ROLE === "administrator") {
		echo "1";   //CRUD_admin.html
	}else {
		echo "2";	//CRUD.html
	}
	
	
	function test_input($data) {
  		$data = trim($data);    //去除用户输入数据中不必要的字符（多余的空格、制表符、换行）
  		$data = stripslashes($data);  //删除用户输入数据中的反斜杠（\）
  		$data = htmlspecialchars($data);   // PHP 的 htmlspecialchars() 函数传递所有变量
  		return $data;
	}
?>