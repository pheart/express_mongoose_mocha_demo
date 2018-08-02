$(function() {
	
	$('#submitBtn').click(function() {
		var valStr = $('#loginForm').serialize();
		$.ajax({
			url: '/user/login',
			type: 'post',
			dataType: 'json',
			data: valStr,
			success: function(res) {
				if (res.code == 0) {
					location.href = '/';
				} else {
					alert(res.message);
				}
			}
		});
		return false;
	})

	$('#registerBtn').click(function() {
		var valStr = $('#registerForm').serialize();
		$.ajax({
			url: '/user/register',
			type: 'post',
			dataType: 'json',
			data: valStr,
			success: function(res) {
				if (res.code == 0) {
					location.href = '/';
				} else {
					alert(res.message);
				}
			}
		});
		return false;
	})
})