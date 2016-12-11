$(document).ready(function () {
		$("#employee_add_button").click(function(){  //添加员工
		//	alert("ok");  //test
			var Name = $("#uname1").val();
			var Sex = $("#usex1").val();
			var Birth = $("#ubirth1").val();
			var Addr = $("#uaddr1").val();
			var DepartId = $("#udepartId1").val();
			var PositionId = $("#upositionId1").val();
			
			
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
			var z = /^[0-9]*$/;		
			if (!z.test(DepartId)) {
				alert("请正确填入部门ID！");
				return ;			
			}
			if(!z.test(PositionId)) {
				alert("请正确填入职位ID！");
				return ;			
			}
			$.ajax({
				url:"php/member_add.php",
				type:"POST",
				dataType:"text",
				async:false,
				data:"name="+Name+"&sex="+Sex+"&birth="+Birth+"&addr="+Addr+"&depart_id="+DepartId+"&position_id="+PositionId,
				success:function(result){
					if (result === "-1") {
						alert("连接数据库失败！");					
					}else if (result === "1") {
						alert("添加成功！");
						$("#uname1").val("");
						$("#usex1").val("");
						$("#ubirth1").val("");
						$("#uaddr1").val("");
						$("#udepartId1").val("");
						$("#upositionId1").val("");
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