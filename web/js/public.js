window.onload = function() {
$("#header").load("header.html");
$("#footer").load("footer.html");
$("#k").load("k.html");

}
 function showPage(pageName) {
            $("#"+pageName).addClass('active');
            $("#"+pageName+" .container").load(pageName+'.html');
        }

        function hidePage(pageName){
            $('#'+pageName).removeClass('active');
        }

var localhostUrl="http://www.tp5.com";
//	SetCookie("token", "token11100")
//	SetCookie("userID", "123456")
	
IsToken()
// 判断token是否存在
function IsToken() {
	var token = $.cookie("token")
	var a = location.href.split('/');
	a = a[a.length - 1]
	
	if (a == 'index.html' || a == 'login.html' || a == 'login_1.html' || a == 'registered.html' || a == 'forgot_password.html') {} else {
		// console.log(a)
		if (!token) {
			window.location.href = "login.html"
		}
	}

}	

//判断登录是否失效
function Invalid(data){
	// console.log(data.code)
		if(data.code=="code_999990"){
			layer.msg('登录失效,退出登录', {icon: 2,	title: false,end: function() {
					cleanUserCooike ();
					window.parent.location.href = "login.html"
				}
			});
		}else{
			layer.msg(data.msg, {icon: 2,title: false})
		}
}
	
//获取浏览器参数
function GetQueryString(name)
		{
			 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			 var r = window.location.search.substr(1).match(reg);
			 if(r!=null)return  unescape(r[2]); return null;
		}
	
	Date.prototype.Format = function (fmt) {
    var o = {
            "M+": this.getMonth() + 1, // 月份
            "d+": this.getDate(), // 日
            "h+": this.getHours(), // 小时
            "m+": this.getMinutes(), // 分
            "s+": this.getSeconds(), // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
            "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
	

jQuery.support.cors = true;

var publicKey ="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDkNW5nbXHwHUHQfQ3O2/fpAs0T"
+"gYzn86hHQPzc/51/zl58y4DGxCoacxsPwcAaklEAb2kKJRUbqbvcaqpy+KnJN0qu"
+"3AihLTdY+GS71+W/7sc3ZOCcaFRLqlFAshQRxy11GgcEe3qItuSGdhNYp76Lrd1ivtCv3xL0SAjfLMf/DQIDAQAB"
//RSA加密方法
function rsaMethod(arys) {
	//（1）拼接请求参数处理
	var newkey = Object.keys(arys).sort();
	var requestData = "{";
	for (var i = 0; i < newkey.length; i++) {
		requestData += "\"" + [newkey[i]] + "\":\"" + arys[newkey[i]] + "\"," //拼接请求参数
	}
	requestData = requestData.substring(0, requestData.length - 1) + "}"; //拼接请求参数
	//（2）加密
	var encrypt = new JSEncrypt();
	encrypt.setPublicKey(publicKey);
	var encryptData = encrypt.encryptLong(requestData);
	return encryptData;
}

//MD5加签方法
function md5Method(arys) {
	//（1）排序
	//先用Object内置类的keys方法获取要排序对象的属性名数组，再利用Array的sort方法进行排序
	var newkey = Object.keys(arys).sort();
	var newObj = ''; //创建一个新的对象，用于存放排好序的键值对
	var requestData = "{";
	for (var i = 0; i < newkey.length; i++) {
		//遍历newkey数组
		newObj += [newkey[i]] + '=' + arys[newkey[i]] + '&';
		requestData += "\"" + [newkey[i]] + "\":\"" + arys[newkey[i]] + "\"," //拼接请求参数
	}
	//（2）排序结果
	var sortResult = newObj.substring(0, newObj.length - 1) + "&key=" + MD5Key;
	//（3）获取sign
	var sign = CryptoJS.MD5(sortResult).toString().toUpperCase();
	//（4）拼接请求参数处理并返回
	requestData += "\"sign\":\"" + sign + "\"}" //拼接请求参数
	return requestData;
}	
		
function SetCookie(name, value) {
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date(); //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function getCookie(name){  //取cookies函数
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null
}


//清除所有cookie函数
	function clearAllCookie() {
		var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
		if(keys) {
			for(var i = keys.length; i--;)
				document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
		}
	}
// 清除单个Cookie
function cleanUserCooike (name,value) {
	$.cookie(name,value, {
		expires: -1
	});
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
			$(obj).val("获取验证码");
			$(obj).text("获取验证码");
			$(obj)[0].removeAttribute("disabled");
			clearInterval(timer);
		} else {
					//	console.log(num);
			$(obj).val(num + "重新获取");
			$(obj).text(num +  "重新获取");
			}
		}, 1000)
}


//验证是否为空
function isKong(value,str){
	if(value==""){
		// mui.alert("",str,"确定")
		layer.msg(str, { icon: 2,time: 2000});
		return false;
	}
	return value;
}
// 验证用户名（6到20位由字母和数字组成）
function userName(value) {
	var regg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
	if(!regg.test(value)) {
		// mui.alert("",pleaEnterUsername,btn)
		layer.msg(pleaEnterUsername, { icon: 2,time: 2000});
		return false;
	}
	return value;
}

//手机号验证
function telCheck(value){
	console.log(value)
	var regex =  /^((1[0-9])+\d{9})$/;
	if(value==""){
		layer.msg("请输入手机号", { icon: 2,time: 2000});
		// mui.alert("",$(".mobile").attr("placeholder"),btn)
		return false;
	}
	if(value.length!=11){
		layer.msg("请输入11位手机号", { icon: 2,time: 2000});
		// mui.alert("",pleaEnter11Tel,btn)
		return false;
	}
	if(!regex.test(value)){
		layer.msg("手机号格式不正确", { icon: 2,time: 2000});
		// mui.alert("",ErrorTel,btn)
			return false;
		}
	return value;
}
//email格式是否正确
 function isEmail(value) {
	if(value==""){
	 	layer.msg("请输入邮箱", { icon: 2,time: 2000});
	 	return false;
	}
    if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(value)){
    	layer.msg("邮箱格式不正确", { icon: 2,time: 2000});
    	return false;
    }
 	return value;
}

// 6位密码数字不能重复
function Check_payPwd(value){
	console.log(value.length)
		if(value.length != 6){
			// mui.alert("",payError1,btn)
			layer.msg("请输入6位数字", { icon: 2,time: 2000});
			return false;
		}	
		var reg1=/([0-9])\1{2}/
		var reg2=/([0-9])\1{3}/
		var reg3=/([0-9])\1{4}/
		var reg4=/([0-9])\1{5}/
		var reg5=/([0-9])\1{6}/
		//if(reg1.test(value) || reg2.test(value) || reg3.test(value) || reg4.test(value) || reg5.test(value)){			
		//	layer.msg("请输入不重复的6位数字", { icon: 2,time: 2000});
		//	return false;
		//}
		return value;
	}

//身份证号码格式是否正确
function  isIdCard(value) {
	if(value==""){
		layer.msg("请输入身份证号", { icon: 2,time: 2000});
		return false;
	}
    if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/g.test(value)){
    	layer.msg("身份证号格式有误", { icon: 2,time: 2000});
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

//手机号或者email格式是否正确
function isTelOrEmail(value,str){
	if(value==""){
		
	 	layer.msg(str, { icon: 2,time: 2000});
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






