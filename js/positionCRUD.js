$(document).ready(function () {
		$("#position_add_button").click(function () {     //添加职位
			var positionName=$("#positionName1").val();
			if (positionName === "") {
				alert("请输入职位名称!");
				return ;			
			}
	//		alert("ok");
			$.ajax({
				url: "php/position_add.php",
				type: "POST",
				async: false,
				dataType: "text",
				data:"name="+positionName,
				success: function (result) {
					if (result === '-1') {
						alert("连接数据库失败！");
						return ;					
					}else if (result === '0') {
						alert("未登陆");
						return;					
					}else if (result === '1') {
						alert("您没有该权限");
						return;					
					}else if (result === '2') {
						alert("职位已存在！");
						return;					
					}else if (result === '3') {
						alert("添加成功！");
						$("#positionName1").val("");
						return;					
					}else if (result === '4') {
						alert("添加失败！");
						return;					
					}else {return;}
					
				},
				error: function () {
					alert("error");				
				}		
			});	
		});
		
		
		$("#position_update_button").click(function () {   //修改职位
			
			var Id = $("#positionId2").val();
			var Name = $("#positionName2").val();
			
			var z = /^\d{1,}$/;
			if(!z.test(Id)){
   			alert("请正确输入职位ID！");
   			return;
			}
			
			if(Name === "") {
				alert("请输入新的职位名称!");
				return;			
			}
	//		alert(Name);
			
			$.ajax({
				url: "php/position_update.php",
				type: "POST",
				dataType: "text",
				async: false,
				data: "id="+Id+"&name="+Name,
				success: function (result) {
					if (result === '-1') {
						alert("连接数据库失败！");
						return ;					
					}else if (result === '0') {
						alert("未登陆");
						return;					
					}else if (result === '1') {
						alert("您没有该权限");
						return;					
					}else if (result === '2') {
						alert("要修改的职位名称已存在！");
						return;					
					}else if (result === '3') {
						alert("修改成功！");
						$("#positionId2").val("");
						$("#positionName2").val("");	
						return;					
					}else if (result === '4') {
						alert("修改失败！");
						return;					
					}else {return;}
								
				},
				error: function () {
					alert("error");				
				}			
			}); 			
		});
		
		$("#position_delete_button").click(function () {  //删除职位
			var Id = $("#positionId3").val();
			
			var z = /^\d{1,}$/;
			if(!z.test(Id)){
   			alert("请正确输入职位ID！");
   			return;
			}
		//	alert(Id);
			$.ajax({
				url: "php/position_delete.php",
				type: "POST",
				async: false,
				dataType: "text",
				data: "id="+Id,
				success: function (result) {
					if (result === '-1') {
						alert("连接数据库失败！");
						return ;					
					}else if (result === '0') {
						alert("未登陆");
						return;					
					}else if (result === '1') {
						alert("您没有该权限");
						return;					
					}else if (result === '2') {
						alert("职位ID不存在！");
						return;					
					}else if (result === '3') {
						alert("删除成功！");
						$("#positionId3").val("");	
						return;					
					}else if (result === '4') {
						alert("删除失败！");
						return;					
					}else {return;}
				},
				error: function () {
					alert("error");				
				}			
			});
					
		}); 
		/*----------------------列出所有职位-------------------*/
		$("#PositionList").DataTable({
			"processing": true,
	      "serverSide": true,
			"ajax": {
				"url": "php/position_list.php",
				"type": "POST"
			} 		
		});
		
		
		
		/*----------------------查找某职位所有员工-------------------*/
		$("#positionMember").DataTable({
			"processing": true,
			"serverSide": true,
			"language": {"search": "查找职位ID为 _INPUT_ 的所有员工"},
			"ajax": {
				"url": "php/positionMember.php",
				"type": "POST"		
			},
			//禁止过滤搜索记录
			"columnDefs": [
				{ "searchable": false, "targets": 1 },
    			{ "searchable": false, "targets": 2 },
    			{ "searchable": false, "targets": 3 },
    			{ "searchable": false, "targets": 4 },
    			{ "searchable": false, "targets": 5 },
    			{ "searchable": false, "targets": 6 },
    			{ "searchable": false, "targets": 7 }
  			]
				
		});
});