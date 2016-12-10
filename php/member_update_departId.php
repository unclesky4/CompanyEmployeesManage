<?php header('Content-type: text/html;charset=UTF-8');
	session_start();
	if(!isset($_SESSION['R'])) {
		echo '未登陆!';
		return;	
	}
	
	$id = test_input($_POST['id']);
	$departId = test_input($_POST['depart_id']);
	$bool_id = false;
	$bool_depart = false;
	
	$con=mysql_connect("localhost","uncle","uncle");
	if(!$con) {
		echo "连接数据库失败！";
		die('Could not connect: ' . mysql_error());	
	}
	mysql_select_db("CompanyEmployee",$con);
	
	$result = mysql_query("select Department_id from member where id='$id'");
	
	if(mysql_num_rows($result)<=0) {  //判断是否有查询影响的行数
		echo "员工ID不存在！";
		return;	
	}
	$sql = "update `member` set `Department_id`='$departId' where `id`='$id'";
	if($_SESSION['DepartId'] === -1) {   //判断是否是administrator角色
			if(mysql_query($sql)) {
				echo "修改成功！";
			}else {
				echo "修改失败！";
			}	
	}	
	
	function test_input($data) {
  		$data = trim($data);    //去除用户输入数据中不必要的字符（多余的空格、制表符、换行）
  		$data = stripslashes($data);  //删除用户输入数据中的反斜杠（\）
  		$data = htmlspecialchars($data);   // PHP 的 htmlspecialchars() 函数传递所有变量
  		return $data;
  	}
?>