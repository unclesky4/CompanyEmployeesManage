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
			include "AES.php";
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
			        case 0: $orderSql = " order by id ".$order_dir; break;
			        case 1: $orderSql = " order by username ".$order_dir; break;
			        case 2: $orderSql = " order by password ".$order_dir; break;
			        case 3: $orderSql = " order by role ".$order_dir; break;
			        case 4: $orderSql = " order by description ".$order_dir; break;
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
			$sumSql = "select count(*) as sum from user";
			//条件过滤后记录数 必要
			$recordsFiltered = 0;
			//表的总记录数 必要
			$result = mysql_query($sumSql);
			while($row = mysql_fetch_array($result)) {
				$recordsTotal = $row['sum'];
			}
			
			$sumSqlWhere = " where user.id=user_id and role.id=role_id and username like '%".$search."%'";
			if(strlen($search)>0){
				$rs = mysql_query("select count(*) as sum from user,role,user_role".$sumSqlWhere);
		    	while ($row = mysql_fetch_array($rs)) {
		        	$recordsFiltered = $row['sum'];
		    	}
		   }else{
		    	$recordsFiltered = $recordsTotal;
		   }
			
			
			$totalResultSql = "select user.id,username,password,rolename,description from role,user,user_role  where user.id=user_id and role.id=role_id";
			$data = array();
			if(strlen($search)>0) {
			    //如果有搜索条件，按条件过滤找出记录
			    $sql = $totalResultSql." and username like '%".$search."%'";
			    $sql = $sql.$orderSql.$limitSql;
			    $dataResult = mysql_query($sql);
			    while ($row = mysql_fetch_array($dataResult)) {
			        $obj = array($row['id'], $row['username'], $aes->decrypt($row['password']), $row['rolename'], $row['description']);
			        array_push($data, $obj);
			    }
			}else{
			    //直接查询所有记录
			    $dataResult = mysql_query($totalResultSql.$orderSql.$limitSql);
			    while ($row = mysql_fetch_array($dataResult)) {
			        $obj = array($row['id'], $row['username'], $aes->decrypt($row['password']), $row['rolename'], $row['description']);
			        array_push($data,$obj);
			    }
			}
			echo json_encode(array(
			   "draw" => intval($draw),
			   "recordsTotal" => intval($recordsTotal),
			   "recordsFiltered" => intval($recordsFiltered),
			   "data" => $data
			),JSON_UNESCAPED_UNICODE);
	
?>