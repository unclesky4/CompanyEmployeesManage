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

	$id=test_input($_POST['depart_id']);
	$bool_id=false;
	$conn=mysql_connect("localhost","uncle","uncle");
	if (!$conn)
  	{
  		echo "-1";  //连接数据库失败！
  		die('Could not connect: ' . mysql_error());
  	}
  	
	mysql_select_db("CompanyEmployee",$conn);
	
	$result=mysql_query("select * from department");
	while($row=mysql_fetch_array($result)){
		if($row['id']==$id){
			$bool_id=true;
			break;
		}
	}	
	if($bool_id){
		mysql_query("set names utf8");
		$msg=mysql_query("delete from department where id='$id'");
		if($msg) {
			echo "2";	//删除成功！	
		}else {
			echo "3";  //删除失败！
			return;		
		}
	}else{
		echo "4";   //部门ID不存在！
	}	
	
	function test_input($data) {
  		$data = trim($data);    //去除用户输入数据中不必要的字符（多余的空格、制表符、换行）
  		$data = stripslashes($data);  //删除用户输入数据中的反斜杠（\）
  		$data = htmlspecialchars($data);   // PHP 的 htmlspecialchars() 函数传递所有变量
  		return $data;
  	}  
?>