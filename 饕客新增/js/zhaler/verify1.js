	
	
	
	/*******************系统业务短信接口********************/
	$("#sendSmsCode").click(function(){
		sendCode(1,$(this));
	});
	
	$("#sendEmailCode").click(function(){
		sendCode(2,$(this));
	});

	function sendCode(type,object){
		var busType=$("input[name='code']").attr("busType")
		$.ajax({
			type: "POST",
			url:baseURL +'code/sendCode',
			data:{"type":type,"busType":busType},
			async: false,
			success: function(data) {
				if(data.code!=0){
            		alert(data.msg)
	            }else{
	            	var wait=data.duration*60
	            	time(object,wait)
	            }
			}
		});
	}
	
	/***********************注册验证码接口***********************/
	$("#sendSms").click(function(){
    	var object=$(this);
		$.ajax({
			type: "POST",
			url:baseURL +'code/sendSms',
			data:{"mobile":$("#mobile").val()},
			async: false,
			success: function(data) {
				if(data.code!=0){
            		alert(data.msg)
	            }else{
	            	var wait=data.duration*60
	            	time(object,wait)
	            }
			}
		});
    });
	
	$("#sendEmail").click(function(){
    	var object=$(this);
		$.ajax({
			type: "POST",
			url:baseURL +'code/sendEmail',
			data:{"email":$("#email").val()},
			async: false,
			success: function(data) {
				if(data.code!=0){
            		alert(data.msg)
	            }else{
	            	var wait=data.duration*60
	            	time(object,wait)
	            }
			}
		});
    });
	
	/****************忘记密码短信接口********************************/
	$("#sendSmsRe").click(function(){
    	var object=$(this);
		$.ajax({
			type: "POST",
			url:baseURL +'code/sendSmsRe',
			data:{"mobile":$("#mobile").val()},
			async: false,
			success: function(data) {
				if(data.code!=0){
            		alert(data.msg)
	            }else{
	            	var wait=data.duration*60
	            	time(object,wait)
	            }
			}
		});
    });
	
	$("#sendEmailRe").click(function(){
    	var object=$(this);
		$.ajax({
			type: "POST",
			url:baseURL +'code/sendEmailRe',
			data:{"email":$("#email").val()},
			async: false,
			success: function(data) {
				if(data.code!=0){
            		alert(data.msg)
	            }else{
	            	var wait=data.duration*60
	            	time(object,wait)
	            }
			}
		});
    });
	
	

		
	function time(object,wait) {
        if (wait == 0) {
        	object.html("获取验证码");
        } else {  
        	object.html(wait + "s");
            wait--;  
            setTimeout(function() {  
                time(object,wait)  
            },1000)  
        }  
    }
