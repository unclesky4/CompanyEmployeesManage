$(document).ready(function () {
 		//获取部门和职位的信息
		var positionId = new Array();  //存储职位ID
		var PId = -1;    //存储用户选择的职位id
		var positionIndex = -1;    //定位option的index
		
		var departId = new Array();
		var DId = -1;
		var departIndex = -1; 		
 		
 		var bool_depart = "false";  //是否加载部门信息
 		
 		var positionOption = "";  //存放select的多个option
 		var departOption = "";
 		
 		$.ajax({
			 url: "php/checkAdmin.php",
			type: "POST",
			data: "",
			success: function (result) {
			//	alert($.type(result));
				if (result === "1") {
					bool_depart = "true";		//true表示该用户是最高权限管理员		
				}
			},
			error: function () {
				alert("error");		
			}		
 		});
 		
 		$.ajax({
			url: "php/get_position.php",
			dataType: "json",
			type: "POST",
			data: "",
			success: function (result) {
				$.each(result.data,function (idx,item) {
				     positionOption = positionOption+"<option>"+item.name+"</option>";
				     positionId.push(item.id);
				})
				
				$("#selectPosition").html(positionOption);
				$("#selectPosition").children('option').click(function () {
				//	alert(positionIndex);
					positionIndex = $(this).index();
				//	alert(positionIndex);
					PId = positionId[positionIndex];
				});
				
			},
			error: function () {
				alert("error");		
			}	
		});
		
		if (bool_depart) {
			$.ajax({
				url: "php/get_department.php",
				dataType: "json",
				type: "POST",
				data: "",
				success: function (result) {
					$.each(result.data,function (idx,item) {
					     departOption = departOption+"<option>"+item.name+"</option>";
					     departId.push(item.id);
					})
					$("#selectDepartment").html(departOption);
					$("#selectDepartment").children('option').click(function () {
						departIndex = $(this).index();
						DId = departId[departIndex];
					});
					
				},
				error: function () {
					alert("error");		
				}	
			});		
		}	
	
		$("#employee_add_button").click(function(){  //添加员工
			var Name = $("#uname1").val();
			var Sex = $("#usex1").val();
			var Birth = $("#ubirth1").val();
			var Addr = $("#uaddr1").val();
			
		//	var PositionId = $("#upositionId1").val();
			
			if (Name === "") {
				alert("请输入姓名！");
				return ;			
			}
			if (Sex !== '男' && Sex !== '女') {
				alert("请输入性别!");
				return;
			}
			var t_birth = /^\+?[1-9][0-9]*$/;
			if(!t_birth.test(Birth)) {
				alert("请输入四位数的出生年份！");
				return ;			
			} 
			if (Addr === "") {
				alert("请输入地址！");
				return ;			
			}
			/*
			var z = /^[0-9]*$/;		
			if (!z.test(DepartId)) {
				alert("请正确填入部门ID！");
				return ;			
			}
			if(!z.test(PositionId)) {
				alert("请正确填入职位ID！");
				return ;			
			}
			*/
			if (PId === -1) {
				alert("请选择职位！");
				return;
			}
			if (bool_depart === "true") {  //如果为真，表示是最高权限管理员，需要选择部门
				if (DId === -1) {
					alert("请选择部门！");
					return;				
				}			
			}else {
				var DepartId = $("#udepartId1").val();
				var z = /^[0-9]*$/;		
				if (!z.test(DepartId)) {
					alert("请正确填入部门ID！");
					return ;			
				}			
			}
			$.ajax({
				url:"php/member_add.php",
				type:"POST",
				dataType:"text",
				async:false,
				data:"name="+Name+"&sex="+Sex+"&birth="+Birth+"&addr="+Addr+"&depart_id="+DId+"&position_id="+PId,
				success:function(result){
					if (result === "-1") {
						alert("连接数据库失败！");					
					}else if (result === "1") {
						alert("添加成功！");
						$("#uname1").val("");
						$("#usex1").val("");
						$("#ubirth1").val("");
						$("#uaddr1").val("");
						
				//		$("#udepartId1").val("");
				//		$("#upositionId1").val("");
						PId = -1;
						DId = -1;
					}else if (result === "2") {
						alert("添加失败！请检查部门ID和职位ID是否已存在！");
					}else if(result === "2"){
						alert("未登陆!");					
					}
				},
				error:function(){
					alert("error");				
				}		
			});
		});  
		
		$("#employee_update_button").click(function () {     //修改员工
			
			var Id = $("#uid2").val();
			var Name = $("#uname2").val();
			var Sex = $("#usex2").val();
			var Birth = $("#ubirth2").val();
			var Addr = $("#uaddr2").val();
			var depart_id = $("#udepartId2").val();
			var position_id = $("#upositionId2").val();
			
			var z = /^\d{1,}$/;
			if(!z.test(Id)){
				alert("请正确输入员工ID！");
				return;			
			}
			if(Name === ""){
				alert("请输入姓名！");
				return;			
			}
			if (Sex != '男' && Sex != '女') {
				alert("请输入性别!");
				return;			
			}
			var t_birth = /^\d{4}$/;
			if(!t_birth.test(Birth)){
				alert("请输入四位数的出生年份！");
				return;			
			} 
			if(Addr === ""){
				alert("请输入地址！");
				return;			
			}	
					
			if(!z.test(depart_id)){
				alert("请正确填入部门ID！");
				return;			
			}
			if(!z.test(position_id)){
				alert("请正确填入职位ID！");
				return;			
			}
			
			$.ajax({
				url:"php/member_update.php",
				async:false,
				type:"POST",
				dataType:"text",
				data:"id="+Id+"&name="+Name+"&sex="+Sex+"&birth="+Birth+"&addr="+Addr+"&depart_id="+depart_id+"&position_id="+position_id,
				success:function (result){
					alert(result);				
				},
				error:function () {
					alert("error");				
				}
						
			});	 			
		});
		
		$("#employee_updateName_button").click(function () {
			var Id = $("#uid2").val();
			var Name = $("#uname2").val();
			var z = /^\d{1,}$/;
			if(!z.test(Id)){
				alert("请正确输入员工ID！");
				return;			
			}
			if(Name === ""){
				alert("请输入新的姓名！");
				return;			
			}
			$.ajax({
				url: "php/member_update_name.php",
				type: "POST",
				async: false,
				data: "id="+Id+"&name="+Name,
				success: function (result) {
					alert(result);				
				},
				error: function () {
					alert("error");				
				}				
			});		
		});
		
		$("#employee_updateSex_button").click(function () {
			var Id = $("#uid2").val();
			var Sex = $("#usex2").val();
			var z = /^\d{1,}$/;
			if(!z.test(Id)){
				alert("请正确输入员工ID！");
				return;			
			}
			if (Sex !== '男' && Sex !== '女') {
				alert("请输入性别!");
				return;			
			}
			$.ajax({
				url: "php/member_update_sex.php",
				type: "POST",
				async: false,
				dataType: "Text",
				data: "sex="+Sex+"&id="+Id,
				success: function (result) {
					alert(result);				
				},
				error: function () {
					alert("error");				
				}				
			});		
		});
		
		$("#employee_updateBirth_button").click(function () {
			var Id = $("#uid2").val();
			var Birth = $("#ubirth2").val();
			
			var z = /^\d{1,}$/;
			if(!z.test(Id)){
				alert("请正确输入员工ID！");
				return;			
			}
			var t_birth = /^\d{4}$/;
			if(!t_birth.test(Birth)){
				alert("请输入四位数的出生年份！");
				return;			
			}
			$.ajax({
				url: "php/member_update_birth.php",
				type: "POST",
				async: false,
				dataType: "Text",
				data: "id="+Id+"&birth="+Birth,
				success: function (result) {
					alert(result);				
				},
				error: function () {
					alert("error");				
				}				
			});		
		});
		$("#employee_updateAddr_button").click(function () {
			var Id = $("#uid2").val();
			var Addr = $("#uaddr2").val();
			
			var z = /^\d{1,}$/;
			if(!z.test(Id)){
				alert("请正确输入员工ID！");
				return;			
			}
			if(Addr === ""){
				alert("请输入新的地址！");
				return;			
			}
			$.ajax({
				url: "php/member_update_addr.php",
				type: "POST",
				async: false,
				dataType: "Text",
				data: "id="+Id+"&addr="+Addr,
				success: function (result) {
					alert(result);				
				},
				error: function () {
					alert("error");				
				}				
			});		
		});
		
		$("#employee_updateDepartId_button").click(function () {
			var Id = $("#uid2").val();
			var departId = $("#udepartId2").val();
			
			var z = /^\d{1,}$/;
			if(!z.test(Id)){
				alert("请正确输入员工ID！");
				return;			
			}
			if(!z.test(departId)){
				alert("请输入部门ID！");
				return;			
			}
			$.ajax({
				url: "php/member_update_departId.php",
				type: "POST",
				async: false,
				data: "id="+Id+"&depart_id="+departId,
				success: function (result) {
					alert(result);				
				},
				error: function () {
					alert("error");				
				}				
			});		
		});
		
		$("#employee_updatePositionId_button").click(function () {
			var Id = $("#uid2").val();
			var positionId = $("#upositionId2").val();
			var z = /^\d{1,}$/;
			if(!z.test(Id)){
				alert("请正确输入员工ID！");
				return;			
			}
			if(!z.test(positionId)){
				alert("请输入职位ID！");
				return;			
			}
			$.ajax({
				url: "php/member_update_positionId.php",
				type: "POST",
				async: false,
				data: "id="+Id+"&position_id="+positionId,
				success: function (result) {
					alert(result);				
				},
				error: function () {
					alert("error");				
				}				
			});		
		});		
		
		$("#employee_delete_button").click(function () {     //删除员工
						
			var Id = $("#uid3").val();
			var z = /^\d{1,}$/;
			if(!z.test(Id))	{
				alert("请正确输入员工ID！");
				return ;			
			}
			$.ajax({
				url: "php/member_delete.php",
				type: "POST",
				async: false,
				dataType: "Text",
				data: "id="+Id,
				success: function (result) {
					alert(result);
					$("#uid3").val("");				
				},
				error: function () {
					alert("error");				
				}			
			}); 
		});
		
		
		$("#EmployeeList").DataTable({
			"processing": true,
	      "serverSide": true,
	      "searching": false,
			"ajax": {
				"url": "php/member_query.php",
				"type": "POST"
			} 		
		});
		
});