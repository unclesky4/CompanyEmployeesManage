<?php header('Content-type:text/html;charset=UTF-8');
	session_start();
	if(!isset($_SESSION['R'])) {
		echo json_encode(array(
			"draw" => 0,
	    	"recordsTotal" => 0,
	    	"recordsFiltered" => 0,
	    	"data" => array()		
		));
		return;	
	}

	$con = mysql_connect("localhost","uncle","uncle");
	if(!$con) {
		echo "连接数据库失败！";
		die('Could not connect: ' . mysql_error());	
	}
	mysql_select_db("CompanyEmployee",$con);
	mysql_query("set names utf8");

	
	$draw = $_POST['draw'];
	//排序
	$order_column = $_POST['order']['0']['column'];//那一列排序，从0开始
	$order_dir = $_POST['order']['0']['dir'];//ase desc 升序或者降序
	//拼接排序sql
	$orderSql = "";
	if(isset($order_column)){
	    $i = intval($order_column);
	    switch($i){
	        case 0: $orderSql = " order by Did ".$order_dir; break;
	        case 1: $orderSql = " order by Dname ".$order_dir; break;
	        case 2: $orderSql = " order by Mid ".$order_dir; break;
	        case 3: $orderSql = " order by Mname ".$order_dir; break;
	        case 4: $orderSql = " order by birth ".$order_dir; break;
	        case 5: $orderSql = " order by sex ".$order_dir; break;
	        case 6: $orderSql = " order by addr ".$order_dir; break;
	        case 7: $orderSql = " order by Pname ".$order_dir; break;
	        default: $orderSql = '';
	    }
	}
	
	//搜索
	$search = $_POST['search']['value'];//获取前台传过来的过滤条件
	
	//分页
	$start = $_POST['start'];//从多少开始
	$length = $_POST['length'];//数据长度
	
	$limitSql = '';
	$limitFlag = isset($_POST['start']) && $length != -1 ;
	if ($limitFlag ) {
   	$limitSql = " limit ".intval($start).",".intval($length);
	}
	
	//定义查询数据总记录数sql
	$sumSql = "select count(*) as sum from member";
	//条件过滤后记录数 必要
	$recordsFiltered = 0;
	//表的总记录数 必要
	$result = mysql_query($sumSql);
	while($row = mysql_fetch_array($result)) {
		$recordsTotal = $row['sum'];
	}
	//定义过滤条件查询过滤后的记录数sql
	$sumSqlWhere =" where member.Position_id=position.id and member.Department_id=department.id and member.Department_id like '%".$search."%'";
	if(strlen($search)>0){
		$rs = mysql_query("select count(*) as sum from `position`,`member`,`department`".$sumSqlWhere);
    	while ($row = mysql_fetch_array($rs)) {
        	$recordsFiltered = $row['sum'];
    	}
    }else{
    	$recordsFiltered = $recordsTotal;
   }
   
   //query data
	$totalResultSql = "select department.id as Did,department.name as Dname, member.id as Mid,member.name as Mname,birth,sex,addr,position.name as Pname";
	$totalResultSql = $totalResultSql." from `department`,`member`,`position`";	
	$data = array();
	
	if(strlen($search)>0) {
		//如果有搜索条件，按条件过滤找出记录
		$dataResult = mysql_query($totalResultSql.$sumSqlWhere.$orderSql.$limitSql);
		while($row = mysql_fetch_array($dataResult)){
			$obj = array($row['Did'],$row['Dname'],$row['Mid'],$row['Mname'],$row['birth'],$row['sex']);
			array_push($obj,$row['addr']);
			array_push($obj,$row['Pname']);
			array_push($data,$obj);		
		}	
	}else {
		//直接查询所有记录
		$sql = " where department.id=member.Department_id and position.id=member.Position_id ";
		$dataResult = mysql_query($totalResultSql.$sql.$orderSql.$limitSql);
		while($row = mysql_fetch_array($dataResult)){
			$obj = array($row['Did'],$row['Dname'],$row['Mid'],$row['Mname'],$row['birth'],$row['sex']);
			array_push($obj,$row['addr']);
			array_push($obj,$row['Pname']);
			array_push($data,$obj);		
		}	
	}
	/*
 	* Output 包含的是必要的
 	*/
	echo json_encode(array(
    	"draw" => intval($draw),
    	"recordsTotal" => intval($recordsTotal),
    	"recordsFiltered" => intval($recordsFiltered),
    	"data" => $data
	),JSON_UNESCAPED_UNICODE);
	 
	function fatal($msg)
	{
    	echo json_encode(array(
       	 "error" => $msg
    	));
    	exit(0);
	}
?>