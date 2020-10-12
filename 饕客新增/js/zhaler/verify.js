	/*******************在线用户发送验证码********************/
	function authCode(json,vm){
		//countdown(60);
		$.ajax({
			type: "POST",
			contentType:"application/json",
			url:baseURL +'code/auth/send',
			data:json,//JSON.stringify(json)
			async: false,
			success: function(r) {
				if(r.code!=0){
            		alert(r.msg)
	            }else{
	            	const wait=r.duration*60
	            	countdown(wait);
	            }
			}
		});
	}
	
	/*******************非在线用户发送验证码********************/
	function sendCode(json,vm){
		//countdown(60);
		$.ajax({
			type: "POST",
			contentType:"application/json",
			url:baseURL +'code/send',
			data:json,
			async: false,
			success: function(r) {
				if(r.code!=0){
            		alert(r.msg)
	            }else{
	            	const wait=r.duration*60
	            	countdown(wait);
	            }
			}
		});
	}
	

		
	function countdown(wait) {
		if (!vm.timer) {
	      vm.count = wait;
	      vm.timer = setInterval(() => {
	      if (vm.count > 0 && vm.count <= wait) {
	        vm.count--;
	       } else {
	        clearInterval(vm.timer);
	        vm.timer = null;
	       }
	      }, 1000)
		}
    }
