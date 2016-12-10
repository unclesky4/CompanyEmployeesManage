<?php header('Content-type:text/html;charset=UTF-8');
	session_start();
	if(!isset($_SESSION['R'])) {
		echo '未登陆';
		return ;	
	}
	$id = test_input($_POST['id']);
	$bool_id=false;
	$bool_role = false;	
	
	$con = mysql_connect("localhost","uncle","uncle");
	if(!$con) {
		echo "连接数据库失败！";
		die('Could not connect: ' . mysql_error());	
	}
	mysql_select_db("CompanyEmployee",$con);	
	$result = mysql_query("select id,Department_id from member");
	while($row = mysql_fetch_array($result)) {
		if($row['id'] === $id) {
			$bool_id = true;
			if($row['Department_id'] === $_SESSION['DepartId'] || $_SESSION['DepartId'] === -1) {
				$bool_role = true;			
			}
			break;		
		}	
	}
	if(!$bool_id) {
		echo "员工ID不存在！";
		return;	
	}
	if(!$bool_role) {
		echo "该员工不属于你的部门！";
		return;	
	}
	
	if(mysql_query("delete from member where id = '$id'")) {
		echo "删除成功！";	
	}else {
		echo "删除失败！";	
	}

   function test_input($data) {
  		$data = trim($data);    //去除用户输入数据中不必要的字符（多余的空格、制表符、换行）
  		$data = stripslashes($data);  //删除用户输入数据中的反斜杠（\）
  		$data = htmlspecialchars($data);   // PHP 的 htmlspecialchars() 函数传递所有变量
  		return $data;
	}
?>