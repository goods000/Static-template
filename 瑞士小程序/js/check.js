var lang=""
// 	//是否存在cookie
// 	if (!getCookie(talk)) {
// 		lang="cn";
// 	}else{
// 		// 获取语言
// 		lang=getCookie(talk);
// 	}
//	console.log(lang);
	var get_Code="获取验证码",lateReGetCode="s",pleaEnter11Tel="请输入11位手机号",ErrorTel="手机号格式不对",
	ErrorEmail="邮箱格式不正确",ErrorIDcard="身份证号格式不正确"
	pleaEnter620Pwd="由6到20位由字母和数字组成的密码",payError1="输入6位数字支付密码",payError2="6位数字支付密码不能重复",
	pleaEnterUsername="8位以内，字母和数字组成的用户名"
	btn="确定"
	
	if(lang=="en"){
		btn="submit"
		get_Code="Get Code";
		lateReGetCode="s";
		pleaEnter11Tel="Please enter 11 mobile phone numbers";
		ErrorEmail="The mailbox format is incorrect"
		ErrorIDcard="The format of ID card number is incorrect"
		ErrorTel="The format of mobile phone number is not correct";
		pleaEnter620Pwd="A password consisting of 6-20 bits of letters and numbers"
		payError1="Enter a 6-bit number password ";
		payError2="6-bit cipher digits cannot be duplicated"
	}else if(lang=="cf"){
		get_Code="獲取驗證碼";
		lateReGetCode="s";
		pleaEnter11Tel="請輸入11比特手機號";
		ErrorTel="手機號格式不對";
		pleaEnter620Pwd="由6到20位字母和数字組成的密碼"
	}
	
//获取验证码
function getyan(obj){
	$(obj).attr("disabled", "disabled")
	var timer = null,
	num = 60;
	timer = setInterval(function() {
		num--;
	//	console.log(num)
		if(num <=0) {
			$(obj).val(get_Code);
			// obj.value=get_Code
			$(obj).text(get_Code);
			$(obj)[0].removeAttribute("disabled");
			clearInterval(timer);
		} else {
						console.log(num);
			$(obj).val(num + lateReGetCode);
			$(obj).text(num + lateReGetCode);
			}
		}, 1000)
}


//验证js

//验证是否为空
function isKong(value,str){
	if(value==""){
//		mui.alert("",str,$("#Submit").val())
		 layer.msg(str, { icon: 2,time: 2000});
		return false;
	}
	return value;
}


//手机号验证
function telCheck(value){
	console.log(value)
	var regex =  /^((1[0-9])+\d{9})$/;
	if(value==""){
//		mui.alert("",$(".mobile").attr("placeholder"),btn)
		layer.msg($(".phone").attr("placeholder"), { icon: 2,time: 2000});
		return false;
	}
	if(value.length!=11){
//		mui.alert("",pleaEnter11Tel,btn)
		layer.msg(pleaEnter11Tel, { icon: 2,time: 2000});
		return false;
	}
	if(!regex.test(value)){
//		mui.alert("",ErrorTel,btn)
		layer.msg(ErrorTel, { icon: 2,time: 2000});
		return false;
		}
	return value;
}

//email格式是否正确
 function isEmail(value) {
	if(value==""){
//	 	mui.alert("",$(".email").attr("placeholder"),btn);
	 	layer.msg($(".email").attr("placeholder"), { icon: 2,time: 2000});
	 	return false;
	}
    if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(value)){
//  	mui.alert("",ErrorEmail,btn);
    	layer.msg(ErrorEmail, { icon: 2,time: 2000});
    	return false;
    }
 	return value;
}

//手机号或者email格式是否正确
function isTelOrEmail(value,obj){
	if(value==""){
//	 	mui.alert("",$(obj).attr("placeholder"),btn);
	 	layer.msg($(obj).attr("placeholder"), { icon: 2,time: 2000});
	 	return false;
	}
	if(value.indexOf("@") >-1){
	//	console.log(value)
		return isEmail(value)
	}else{
	//	console.log(value)
		return telCheck(value)
	}
}

 
 //请输入6到20位由字母和数字组成的密码
function CheckPw(value){
		if(value==""){
//			mui.alert("",$(".pwd").attr("placeholder"),btn)
			 layer.msg($(".pwd").attr("placeholder"), { icon: 2,time: 2000});
			 console.log($(".pwd").attr("placeholder"));
			return false;
		}
		var regg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
		if(!regg.test(value)) {
//			mui.alert("",pleaEnter620Pwd,btn)
			 layer.msg(pleaEnter620Pwd, { icon: 2,time: 2000});
			return false;
		}
		return value;
	}

// 6位密码数字不能重复
function Check_payPwd(value){
	console.log(value.length)
		if(value.length != 6){
//			mui.alert("",payError1,btn)
			 layer.msg("6位密码数字", { icon: 2,time: 2000});
			return false;
		}	
		var reg1=/([0-9])\1{2}/
		var reg2=/([0-9])\1{3}/
		var reg3=/([0-9])\1{4}/
		var reg4=/([0-9])\1{5}/
		var reg5=/([0-9])\1{6}/
		if(reg1.test(value) || reg2.test(value) || reg3.test(value) || reg4.test(value) || reg5.test(value)){
//			mui.alert("",payError2,btn)
			 layer.msg("6位密码数字不能重复", { icon: 2,time: 2000});
			return false;
		}
		return value;
	}

//身份证号码格式是否正确
function  isIdCard(value) {
	if(value==""){
		layer.msg($(".idcard").attr("placeholder"), { icon: 2,time: 2000});
		return false;
	}
    if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g.test(value)){
    	layer.msg(ErrorIDcard, { icon: 2,time: 2000});
    	return false;
    }
    return value;
}
//银行卡号是否正确
function  isCard(value) {
	if(value==""){
		layer.msg("请输入银行卡号", { icon: 2,time: 2000});
		return false;
	}
	var reg=/^([1-9]{1})(\d{14}|\d{18})$/;
    if(!reg.test(value)){
    	layer.msg("银行卡号格式不正确", { icon: 2,time: 2000});
    	return false;
    }
    return value;
}

// 验证用户名（8个字符以内）
function userName(value) {
	var regg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{1,8}$/;
	if(!regg.test(value)) {
		mui.alert("",pleaEnterUsername,btn)
		// layer.msg(pleaEnterUsername, { icon: 2,time: 2000});
		return false;
	}
	return value;
}

//验证任意长度数字
function  isLength(value,len){
    var pattern =/ "^\\d{"+len+ "}$", "g"/;
    if(!pattern.test(value)){
    	layer.msg('须为'+len+'位数字', { icon: 2,time: 2000});
    	return false;
    }
    return value;
}


 //是否为整数
function isInteger(obj) {
    if(!/^[-+]?\d*$/g.test(obj.value)){
    	obj.value='';
    	layer.msg("须为整数", { icon: 2,time: 2000});
    	return false;
    }
}
//是否为双精度
function isFloat(obj) {
    if(!/^[-\+]?\d+(\.\d+)?$/g.test(self.value)){
    	obj.value='';
    	layer.msg("须为小数", { icon: 2,time: 2000});
    	return false;
    }
}
//是否为中文
function isChinese(obj) {
    if(!/^[\u0391-\uFFE5]+$/g.test(self.value)){
    	obj.value='';
    	layer.msg("须为中文", { icon: 2,time: 2000});
    	return false;
    }
}

 //是否为英文字母
function isAbc(value) {
    if(!/^[a-zA-Z]+$/g.test(value)){
    	layer.msg("须为英文字母", { icon: 2,time: 2000});
    	return false;
    }
    return value;
}

 //是否含有特殊字符
function isSpecialChar(value){
    if(!/^[\u4e00-\u9fa5a-z0-9]+$/g.test(value)){
		mui.alert("","含有特殊字符",btn)
    //	layer.msg("含有特殊字符", { icon: 2,time: 2000});
    	return false;
    }
     return value;
}

// 创建密码输入框
function  createPayPassword(obj) {
	let cssText = `.passworldBox{
                            display: block;
                            width:310px;
                            min-height: 120px;
							max-height:200px;
                            border: none;
                            background: white;
                            z-index: 101;
                            position: relative;
                            border-radius: 5px;margin:auto;
							top: 50%;
						    margin-top: -110px;
						    color:#fff;
                        }
                        .passworldBox input[type="tel"]{
                            width: 100%;
                            height: 42px;
                            color: transparent;
                            position: absolute;
                            bottom: 15px;
                            left: 0;
                            border: none;
                            font-size: 18px;
                            opacity: 0;
                            z-index: 1;
                            letter-spacing: 35px;
                        }
                        .fakeBox{
                            height: 42px;
                            position: absolute;
                            bottom: 15px;
                            left: calc((100% - 45px * 6 + 2px) / 2);
                            border:1px solid #bfb6b6;
                            display: flex;
                            flex-direction: row;
                        }
                        .fakeBox input{
                            width: 45px;
                            height: 40px;
                            border: none;
                            border-right: 1px solid #e5e5e5;
                            text-align: center;
                            font-size: 35px;
                            margin:0 !important;
                        }
                        .fakeBox input:nth-last-child(1){
                            border:none;
                        }
                        .boxTitle{
                            height: 40px;
                            width:100%;
                            border-bottom: 0.2px solid #e5e5e5;
                        }
                        .titleText{
                            height: auto;
                            width: 200px;
                            text-align: center;
                            display: block;
                            margin-left: 55px;
                            margin-top: 10px;
                        }
                        .moneyBox{
                            width: 100%;
                        }
                        .contentText{
                            height: auto;
                            width: 200px;
                            text-align: center;
                            display: block;
                            margin-left: 55px;
                            margin-top: 10px;
                            font-size: 22px;
                        }
                        .maskBox {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background: rgba(0,0,0,.35);
                            z-index: 99999;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .maskBox * {
                            box-sizing: border-box;
                            font-family: "microsoft yahei";
                        }
                        .passworldBoxActive {
                            animation: activePassword .35s ease-out;
                        }
                        
                        @keyframes activePassword {
                            0% {
                                transform: scale(1.15);
                                opacity: 0;
                            }
                            100% {
                                transform: scale(1);
                                opacity: 1;
                            }
                        }`
	let cssNode = loadCssCode(cssText);
	// 动态加载css代码
	function loadCssCode (code) {
		let style = document.createElement('style');
		style.type = 'text/css';
		style.rel = 'stylesheet';
		try {
			//for Chrome Firefox Opera Safari
			style.appendChild(document.createTextNode(code));
		} catch (ex) {
			//for IE
			style.styleSheet.cssText = code;
		}
		let head = document.getElementsByTagName('head').item(0);
		head.appendChild(style);
		return style
	}

	let passwordStr = `<div class="maskBox" style="">
                                <div class="passworldBox">
                                    <div class="boxTitle">
                                        <span class="titleText">请输入支付密码</span>
                                    </div>
                                    <div class="moneyBox">
                                        <div id="moneyTitle">
                                            <span class="titleText">${obj.title}</span>
                                        </div>
                                        <div id="moneyContent">
                                            <span class="contentText">${obj.prices}${obj.priceUnit}</span>
                                        </div>
                                    </div>
                                    <input type="tel" maxlength="6" class="pwdInput" id="pwdInput" autofocus>
                                    <div class="fakeBox">
                                        <input type="password" readonly="">
                                        <input type="password" readonly="">
                                        <input type="password" readonly="">
                                        <input type="password" readonly="">
                                        <input type="password" readonly="">
                                        <input type="password" readonly="">
                                    </div>
                                </div>
                            </div>`;
	// appendHTML(document.getElementsByTagName('Body').item(0),passwordStr);
	// console.log(passwordStr)
	let activeDom = document.querySelectorAll(obj.activeDom).item(0);
	$(activeDom).html(' ');
	$(activeDom).append(passwordStr);
	// document.getElementsByTagName('Body').append(passwordStr)

	let passworldBox = document.getElementsByClassName('passworldBox').item(0);
	let maskBox = document.getElementsByClassName('maskBox').item(0);
	let pwdInput = document.getElementsByClassName('pwdInput').item(0);
	let inputs = document.querySelectorAll('.fakeBox input');

	// 点击显示密码输入框

	activeDom && activeDom.addEventListener('click', function () {
		maskBox.style.display = '';
		passworldBox.classList.add('passworldBoxActive');
	})
//
	/*
    * @describe：隐藏支付密码输入框
    * */
	maskBox.addEventListener('click', function () {
		// activeDom.style.display = 'none';
		// $(maskBox).css("display",'none');
		$(activeDom).css("display",'none');
		// $(activeDom).addClass("hide")
		console.log( $(activeDom).css("display"))
	});
// //
	/*
    * @describe：密码输入框被点击会触发，遮罩点击事件.阻止事件冒泡;
    * */
	passworldBox.onclick = e => e.stopPropagation();

	/*
    * @author：By 小陌
    * @date: 2019-05-16
    * @describe：添加监听input事件
    * */
	pwdInput.addEventListener('input', function () {
		let pwd = this.value.replace(/\s+/g, "");
		for (var i = 0, len = pwd.length; i < len; i++) {
			inputs[i].value = pwd[i];
		}
		inputs.forEach((itme, index) => {
			if (index >= len) itme.value = ""
		});
		//密码输入完成
		if (len == 6) {
			console.log('输入完成')
			activeDom.style.display = 'none';
			obj.onInputCompletion && obj.onInputCompletion();
		}
	});

	/*
    * @describe：清除密码
    * */
	let clearAll = () => {
		pwdInput.value = "";
		inputs.forEach(item => item.value = "");
	};

	/*
    * @describe：设置价格
    * */
	let stePrices = prices => {
		let contentText = document.getElementsByClassName('contentText').item(0);
		contentText.innerText = `￥${prices}${obj.priceUnit}`
	}
	return {
		clearAll,
		stePrices,
	}
}