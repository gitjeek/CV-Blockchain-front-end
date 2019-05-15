var main = {};

main.doAjax = function(params) {
	$.ajax({
    	url:params.url,
			type:params.type,
			data:params.data,
			dataType:'json',
			headers: { 
				"Content-Type": "application/json",
				},
		success:function(response) {

			//返回成功
			if (response) {
				//如果有回调则执行回调
				if (params.success) {

                    params.success(response);
				}
			}
			//返回失败
			else {
				console.log(response);
				//如果有回调则执行回调
				if (params.error) {
					params.error(response);
				}
				//没有则直接弹出错误信息
				else {
					alert(response.msg);
				}
			}
		},
		error:function(response) {
			console.log(response);
			if (params.error) {
				params.error(response);
			}
		}
    });
}

main.avatar_error = function() {
	var img = event.srcElement; 
	img.src = "../img/wrong.jpeg"
}