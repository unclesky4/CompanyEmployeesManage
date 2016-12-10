<?php header('Content-type:text/html;charset=UTF-8');
	session_start();
	$con = mysql_connect("localhost","uncle","uncle");
	if(!$con) {
		echo "-1"; //连接数据库失败！
  		die('Could not connect: ' . mysql_error());	
	}
	mysql_select_db("CompanyEmployee",$con);
	mysql_query("set names utf8");
	$result = mysql_query("select `id`,`rolename`,`description` from `role`");
	$data = array();
	while($row = mysql_fetch_array($result)) {
		$obj = array("id" => $row['id'],"role" => $row['rolename'],"description" => $row['description']);
		array_push($data,$obj);	
	}
	echo json_encode(array(
		"data" => $data
		),JSON_UNESCAPED_UNICODE);
?>