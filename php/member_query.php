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
	        case 0:$orderSql = " order by id ".$order_dir;break;
	        case 1:$orderSql = " order by name ".$order_dir;break;
	        case 2:$orderSql = " order by birth ".$order_dir;break;
	        case 3:$orderSql = " order by sex ".$order_dir;break;
	        case 4:$orderSql = " order by addr ".$order_dir;break;
	        case 5:$orderSql = " order by Dname ".$order_dir;break;
	        case 6:$orderSql = " order by Pname ".$order_dir;break;
	        default;$orderSql = '';
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
	
	$Depart_id = $_SESSION['DepartId'];
	//定义查询数据总记录数sql
	$sumSql = "select count(id) as sum from member";
	$sqlWhere = " where Department_id=department.id and department.id='$Depart_id' and position.id=Position_id ";
	
	//条件过滤后记录数 必要
	$recordsFiltered = 0;
	//表的总记录数 必要
	$recordsTotal = 0;
	if($Depart_id === -1) {
		$recordsTotalResult = mysql_query($sumSql);
	}else {
		$recordsTotalResult = mysql_query($sumSql." where department_id='$Depart_id'");
	}
	while ($row = mysql_fetch_array($recordsTotalResult)) {
	    $recordsTotal =  $row['sum'];
	}
	
	//定义过滤条件查询过滤后的记录数sql
	if($Depart_id === -1) {
		$sumSqlWhere =" where (member.id like '%".$search."%' or member.name like '%".$search."%' or birth like '%".$search."%' or addr like '%".$search."%'";
		$sumSqlWhere = $sumSqlWhere." or sex like '%".$search."%') and position.id=Position_id and department.id=Department_id";	
	}else {
		$sumSqlWhere =" where (member.id like '%".$search."%' or member.name like '%".$search."%' or birth like '%".$search."%' or addr like '%".$search."%'";
		$sumSqlWhere = $sumSqlWhere." or sex like '%".$search."%') and department.id='$Depart_id' and position.id=Position_id and department.id=Department_id";
	}	
	if(strlen($search)>0){
		
	    $recordsFilteredResult = mysql_query($sumSql.$sumSqlWhere);
	    while ($row = mysql_fetch_array($recordsFilteredResult)) {
	        $recordsFiltered =  $row['sum'];
	    }
	}else{
	    $recordsFiltered = $recordsTotal;
	}
	
	//query data
	$totalResultSql = "select member.id,member.name,birth,sex,addr,department.name as Dname,position.name as Pname from member,position,department";
	$data = array();
	if(strlen($search)>0) {
	    //如果有搜索条件，按条件过滤找出记录
	    $dataResult = mysql_query($totalResultSql.$sumSqlWhere.$orderSql.$limitSql);
	    while ($row = mysql_fetch_array($dataResult)) {
	        $obj = array($row['id'], $row['name'], $row['birth'], $row['sex'], $row['addr'], $row['Dname'],$row['Pname']);
	        array_push($data, $obj);
	    }
	}else{
	    //直接查询所有记录
	    if($Depart_id === -1) {
	    	$dataResult = mysql_query($totalResultSql." where Department_id=department.id and position.id=Position_id ".$orderSql.$limitSql);
	    }else {
	    	$dataResult = mysql_query($totalResultSql.$sqlWhere.$orderSql.$limitSql);
	    }
	    
	    while ($row = mysql_fetch_array($dataResult)) {
	        $obj = array($row['id'], $row['name'], $row['birth'], $row['sex'], $row['addr'], $row['Dname'],$row['Pname']);
	        array_push($data,$obj);
	    }
	}

/*	$test = array();
	$a = array(1,'s',1234,'s','s',1,1,);	
	$b = array(1,'s',2341,'s','s',1,1,);	
	array_push($test,$a);
	array_push($test,$b);*/
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