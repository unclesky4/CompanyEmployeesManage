<?php header('Content-type:text/html;charset=UTF-8');
	session_start();
	if(!isset($_SESSION['R'])) {
		echo '0';    //未登陆
		return;	
	}
	if($_SESSION['R'] !== "administrator") {
		echo '1';
		return;
	}
	
	$id=test_input($_POST['depart_id']);
	$name=test_input($_POST['depart_name']);
	$bool_id=false;
	$bool_name=true;
	
	$conn=mysql_connect("localhost","uncle","uncle");
	if (!$conn)
  	{
  		echo "-1"; //连接数据库失败！
  		die('Could not connect: ' . mysql_error());
  	}
	mysql_select_db("CompanyEmployee",$conn);
	mysql_query("set names utf8");
	$result=mysql_query("select * from department");
	while($row = mysql_fetch_array($result)){
		if($row['id'] === $id){
			$bool_id=true;
		}
		if($row['name'] === $name){
			$bool_name=false;	
		}	
	}
	if(!$bool_id) {
		echo	"2"; //此部门ID不存在！
		return;
	}
	if(!$bool_name){
		echo "3"; //修改的部门名称已存在！
		return;	
	}
	
	mysql_query("update department set name='$name' where id='$id'");
		echo "4"; //修改成功！
	
	function test_input($data) {
  		$data = trim($data);    //去除用户输入数据中不必要的字符（多余的空格、制表符、换行）
  		$data = stripslashes($data);  //删除用户输入数据中的反斜杠（\）
  		$data = htmlspecialchars($data);   // PHP 的 htmlspecialchars() 函数传递所有变量
  		return $data;
	} 
?>