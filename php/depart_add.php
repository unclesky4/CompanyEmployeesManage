<?php  header('Content-type: text/html;charset=UTF-8');
	session_start();
	if(!isset($_SESSION['R'])) {
		echo '0';    //未登陆
		return;	
	}
	if($_SESSION['R'] !== "administrator") {
		echo '1';
		return;
	}

	$a=test_input($_POST['depart_name']);
	$b=true;
	$con=mysql_connect("localhost","uncle","uncle");
	if (!$con){
		echo "-1"; //连接数据库失败！
		die('Could not connect: ' . mysql_error());
	}	
	mysql_select_db("CompanyEmployee", $con);	
	mysql_query("set names utf8");
	
/*	$rs = mysql_query("select count(id) as num from department");
	$tmp = mysql_fetch_array($rs);
	echo $tmp['num']; */
	
	$result=mysql_query("select name from department");
	while($row=mysql_fetch_array($result)) {
		if($row['name']==$a) {
			$b=false;
			echo "2";  //部门已存在!			
			break;		
		}else {}	
	}
	if($b){
		mysql_query("insert into  department(name) values ('$a')");
		$depart_id = "";
		$result = mysql_query("select id from department where name='$a'");
		while($row = mysql_fetch_array($result)) {
			$depart_id = $row['id'];		
		}
		$rolename = $a."_admin";
		$description = "拥有对[".$a."]部门的员工增删改查的权力";
		mysql_query("insert into role(rolename,description,depart_id) values('$rolename','$description','$depart_id')"); 
		echo "3"; //部门添加成功！
	}
	
	function test_input($data) {
  		$data = trim($data);    //去除用户输入数据中不必要的字符（多余的空格、制表符、换行）
  		$data = stripslashes($data);  //删除用户输入数据中的反斜杠（\）
  		$data = htmlspecialchars($data);   // PHP 的 htmlspecialchars() 函数传递所有变量
  		return $data;
	}  
	
?>
