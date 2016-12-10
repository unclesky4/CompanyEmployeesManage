$(document).ready(function () {
		$("#submit").click(function () {
		
		var Name = $("#username").val();
		var Pwd = $("#password").val();
		if(Name === ""){
			alert("请输入用户名！");
			return ;	
		}
		if (Pwd === "") {
			alert("请输入密码！");
			return ;	
		}
		$.ajax({
			url: "php/login.php",
			async: false,
			type: "POST",
			data: "name="+Name+"&password="+Pwd,
			success:function (result) {
				if (result === "-1") {
					alert("用户名或密码不正确！");
				}else if(result === "1") {
					window.location.href = "CRUD_admin.html";
				}else if (result === "2") {
					window.location.href = "CRUD.html";				
				}else if (result === "-2"){
					alert("未登陆!");					
				}	
			},
			error: function () {
				alert("error");		
			}	
		});
	});
	
});