
$("#submit").click(function(){
    console.log('123');
    $.post("http://203.195.172.185:3000/api/",{
        email:$("#email").val(),
        password:$("#password").val()
    },function(data){
        if(data.status=="success"){
        	console.log('login success!');
            $.session.set('email',$("#email").val());
            $.session.set('password',$("#password").val());
            location.href = "/pages/index.html";
        }else if (data.status=="error"){
            alert("用户名密码错误");
        } else if($.session.get('email') != undefined){
            alert('同一时间不能登陆不同的账号！');
        	console.log(data);
        }
    });
});

$(function () {

    if ($.session.get('email') != undefined) {
        location.href = "/pages/index.html";
    }

    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' /* optional */
    });


  });