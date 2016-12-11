$(document).ready(function () {
	$.ajax({   //加载选项
		url: "php/init.php",
		type: "POST",
		data:"",
		success: function (result) {
			$("#showUser").append(result);
			
		},
		error: function () {
			alert("error");		
		}	
	});
	$("#depart_add_button").click(function () {   //添加部门
	//	alert("ok");
		if($("#depart_input1").val() ===  ""){
			alert("请输入部门名称！");
			return ;		
		}
		$.ajax({
				url: "php/depart_add.php",
				data: "depart_name=" + $("#depart_input1").val(),
				type: "POST",
				async:false,
				success:function (result) {
					if (result === '-1') {
						alert("连接数据库失败！");					
					}else if(result === '0'){
						alert("未登陆");					
					} else if(result === '1'){
						alert("您没有该权限");
						return;					
					}else if(result === '2'){
						alert("部门已存在!");
						return;					
					}else if(result === '3'){
						$("#depart_input1").val("");
						alert("部门添加成功！");					
					}
				},
				error:function () {
					alert("error");
				}
		});	
	});
	
	$("#depart_update_button").click(function () {    //修改部门
	//	alert("ok");
		var departId = $("#depart_input2_1").val();	
		var departName = $("#depart_input2_2").val();
		
		var z = /^\d{1,}$/;
		if(!z.test(departId)){
   		alert("请正确输入数字");
   		return ;
		}		
			
		if(departName === ""){
			alert("请输入部门名称！");
			return ;		
		}	
		
		$.ajax({
			url:"php/depart_update.php",
			data:"depart_id="+departId+"&depart_name="+departName,
			async:false,
			type:"POST",
			dataType:"text",
			success:function (result) {
				if (result === '-1') {
					alert("连接数据库失败！");					
				}else if(result === '0'){
					alert("未登陆");					
				} else if(result === '1'){
					alert("您没有该权限");
					return;					
				}else if(result === '2'){
					alert("此部门ID不存在");
					return;					
				}else if(result === '3'){
					alert("修改的部门名称已存在！");					
				}else if(result === '4'){
					alert("修改成功！");
					$("#depart_input2_1").val("");
					$("#depart_input2_2").val("");				
				}	
			},
			error:function () {
				alert("error");			
			}
		});	
	});
	
	$("#depart_delete_button").click(function () {
		//	alert("ok");
		
			var departId=$("#depart_input3").val();
				
			var z = /^\d{1,}$/;
			if(!z.test(departId)){
	   		alert("请正确输入数字");
	   		return;
			}
			$.ajax({
				url:"php/depart_delete.php",
				async:false,
				data:"depart_id="+departId,
				type:"POST",
				dataType:"text",
				success:function (result) {
					if (result === '-1') {
						alert("连接数据库失败！");					
					}else if(result === '0'){
						alert("未登陆");					
					} else if(result === '1'){
						alert("您没有该权限");
						return;					
					}else if(result === '2'){
						$("#depart_input3").val("");
						alert("删除成功！");
						return;					
					}else if(result === '3'){
						alert("删除失败！");					
					}else if(result === '4'){
						alert("部门ID不存在！");					
					}				
				},
				error:function(){
					alert("error");				
				}			
			}); 	 
	});
	    
	/*----------------------显示所有部门-------------------*/
	$("#DepartList").DataTable({
		"processing": true,
      "serverSide": true,
  //  "paging": false,
  //   "language": {"search": "Apply filter _INPUT_ to table"},
		"ajax": {
			"url": "php/depart_query.php",
			"type": "POST"
		} 
	});
	
	/*----------------------查找某部门所有员工-------------------*/
	$("#departMember").DataTable({
		"processing": true,
		"serverSide": true,
		"language": {"search": "查找部门ID为 _INPUT_ 的所有员工"},
		"ajax": {
			"url": "php/departMember.php",
			"type": "POST"		
		},
		//禁止过滤搜索记录
/*		"columnDefs": [
				{ "searchable": false, "targets": 1 },
    			{ "searchable": false, "targets": 2 },
    			{ "searchable": false, "targets": 3 },
    			{ "searchable": false, "targets": 4 },
    			{ "searchable": false, "targets": 5 },
    			{ "searchable": false, "targets": 6 },
    			{ "searchable": false, "targets": 7 }
  			]	*/
	});
	
});
