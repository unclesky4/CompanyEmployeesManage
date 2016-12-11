$(document).ready(function () {
	/*
	*	获得角色	
	*/	
	var description = new Array();
	var roleArray = new Array();
	var role_id = new Array();
	var index = 0;
	var role = "";
	var bool = true;
	$("#get_role").mousedown(function () {  
		var tmp = "";
		$.ajax({
				url: "php/get_role.php",
				dataType: "json",
				type: "POST",
				data: "",
				success: function (result) {
					bool = false;
					$.each(result.data,function (idx,item) {
					     tmp = tmp+"<li><a href=# id='role_menu'>"+item.role+"</a></li>";
					     roleArray.push(item.role);
					     role_id.push(item.id);
					     description.push(item.description);
					})
					$("#show_role").html(tmp);
					$("#show_role").children('li').click(function () {
						index = $(this).index();
						$("#role_desc").html(description[index]);
						$("#role").html(roleArray[index]);
						role = roleArray[index];
					});
					
				},
				error: function () {
					alert("error");		
				}	
			});	
	});
	
	/*
	*	添加用户	
	*/
	
	$("#user_add_button").click(function () {
		var username = $("#username1").val();
		var passwd1 = $("#userpasswd1_1").val();
		var passwd2 = $("#userpasswd1_2").val();
		
		if (username == "") {
			alert("请输入用户名!");
			return;		
		}
		if (passwd1 === "") {
			alert("请输入密码!");
			return;		
		}
		if (passwd1 !== passwd2) {
			alert("密码不一致 !");
			return;		
		}
		if (role === "") {
			alert("请选择角色！");
			return ;		
		}
		$.ajax({
			url: "php/user_add.php",
			async: false,
			type: "POST",
			data: "name="+username+"&password="+passwd1+"&role_id="+role_id[index],
			success: function (result) {
				if (result === "1") {
					alert("添加成功！");
					$("#userpasswd1_1").val("");
					$("#userpasswd1_2").val("");
				}else if (result === "2") {
					alert("添加失败！");
				}else if (result === "0") {
					alert("用户名已存在！");
				}else if (result === "-1") {
					alert("连接数据库失败！	");
				}else if(result === "-2"){
					alert("未登陆");				
				}		
			},
			error: function () {
							
			}
		});
	});
	
	/*
	*	删除用户	
	*/
	
	$("#user_delete_button").click(function () {
		var userId = $("#user_input3").val();
		if (userId === "") {
				alert("请输入用户ID!");
				return;			
		}
		var z = /^\d{1,}$/;
		if(!z.test(userId)){
   		alert("请正确输入数字");
   		return ;
		}
		$.ajax({
			url: "php/user_delete.php",
			type: "POST",
			async: false,
			data: "id="+userId,
			success: function (result) {
				if (result === '-1') {
					alert("连接数据库失败！	");	
				}else if(result === '1') {
					alert("删除成功！");				
				}else if(result === '0') {
					alert("删除失败！");				
				}else if(result === '2') {
					alert("用户ID不存在！");				
				}else if(result === "-2"){
					alert("未登陆");				
				}
			},
			error: function () {
				alert("error");			
			}		
		});		
			
	});
	
	/*
	*	更改用户名	
	*/
	
	$("#user_updateusername_button").click(function () {
		var userId = $("#user_input2_1").val();
		var userName = $("#user_input2_2").val();
		if (userId === "") {
				alert("请输入用户ID!");
				return;			
		}
		var z = /^\d{1,}$/;
		if(!z.test(userId)){
   		alert("请正确输入数字");
   		return ;
		}
		if (userName === "") {
			alert("请输入新的用户名！");
			return;		
		}
		$.ajax({
			url: "php/user_updateUsername.php",
			type: "POST",
			async: false,
			data: "id="+userId+"&name="+userName,
			success: function (result) {
				if (result === '-1') {
					alert("连接数据库失败！	");	
				}else if(result === '1') {
					alert("修改成功！");
					$("#user_input2_2").val("");				
				}else if(result === '2') {
					alert("修改失败！");				
				}else if(result === '0') {
					alert("用户ID不存在！");				
				}else if(result === "-2"){
					alert("未登陆");				
				}
			},
			error: function () {
				alert("error");			
			}		
		});
			
	});
	
	/*
	*	更改用户密码	
	*/
	$("#user_updatepassword_button").click(function () {
		var userId = $("#user_input2_1").val();
		var userPassword = $("#user_input2_3").val();
		if (userId === "") {
				alert("请输入用户ID!");
				return;			
		}
		var z = /^\d{1,}$/;
		if(!z.test(userId)){
   		alert("请正确输入数字");
   		return ;
		}
		if (userPassword === "") {
			alert("请输入新的密码！");
			return;		
		}
		$.ajax({
			url: "php//user_updatePassword.php",
			type: "POST",
			async: false,
			data: "id="+userId+"&password="+userPassword,
			success: function (result) {
				if (result === '-1') {
					alert("连接数据库失败！	");	
				}else if(result === '1') {
					alert("修改成功！");
					$("#user_input2_3").val("");			
				}else if(result === '2') {
					alert("修改失败！");				
				}else if(result === '0') {
					alert("用户ID不存在！");				
				}else if(result === "-2"){
					alert("未登陆");				
				}
			},
			error: function () {
				alert("error");			
			}		
		});	
	});	
	
	
	/*
	*	列出所有用户	
	*/
	$("#userList").DataTable( {
		"processing": true,
      "serverSide": true,
      "language": {"search": "用户名: _INPUT_"},
		"ajax": {
			"url": "php/user_list.php",
			"type": "POST"
		}
	});

	
	/*
	*	列出所有角色	
	*/
	$("#roleList").DataTable( {
		"processing": true,
      "serverSide": true,
		"ajax": {
			"url": "php/role_list.php",
			"type": "POST"
		}
	});
});