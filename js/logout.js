$(document).ready(function () {
	$("#logout").click(function () {
		$.ajax({
			url: "php/logout.php",
			type: "POST",
			async: false,
			data: "",
			success: function (result) {
				if (result === "true") {
					window.location.href = "index.html";				
				}else {
					alert("请重试！");				
				}
			},
			error: function () {
				alert("error");			
			}
		});	
	});
});