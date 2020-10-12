var MD5Key = 'zykjvrm_@#';
var publicKey ='MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEmpRbdw1aPFhxtHS/o0aAqjbQhZ0WglF35Az9vVwjGe6RHirL++/iGc4nf05dsfWi+aGupfMqUzDC9m0wQI8fM+4+Rx4txTpTQp8rTyhAQEBi4uiMN1ZgAhGiml3FCHv9WGv6kjyGHIZxdgJuRulGVY9qJrMI66AvHBPd5HgLmwIDAQAB';

//RSA加密方法
function rsaMethod1(arys) {
	var requestData=JSON.stringify(arys);
	var encrypt = new JSEncrypt();
	encrypt.setPublicKey(publicKey);
	var encryptData = encrypt.encryptLong(requestData);
	return encryptData;
}

//MD5加密方法
function md5Method(arys) {
	//深度复制  避免与vue的对象混乱
	var data = jQuery.extend(true, {}, arys);
	//密码加密
	//password(data);
	
	var sign = getSign(data);
	data.sign=sign;
	return JSON.stringify(data);
}

/**
 * 签名
 * @param data
 * @returns
 */
function getSign(data) {
	//（1）排序  先用Object内置类的keys方法获取要排序对象的属性名数组，再利用Array的sort方法进行排序
	var keys = Object.keys(data).sort();
	var keyString = ''; //创建一个新的对象，用于存放排好序的键值对
	for (var i = 0; i < keys.length; i++) {
		//遍历keys数组
		keyString += [keys[i]] + '=' + data[keys[i]] + '&';
	}
	//（2）排序结果
	var signString = keyString.substring(0, keyString.length - 1) + "&key=" + MD5Key;
	console.log(signString);
	//（3）获取sign
	var sign = CryptoJS.MD5(signString).toString().toLowerCase();
	return sign;
}

/**
 * 密码加密
 * @param arys
 * @returns
 */
function password(arys){
	if(arys.hasOwnProperty("password")){
		arys.password=CryptoJS.MD5(arys.password).toString();
	}
	if(arys.hasOwnProperty("newPassword")){
		arys.newPassword=CryptoJS.MD5(arys.newPassword).toString();
	}
	if(arys.hasOwnProperty("confirmPassword")){
		arys.confirmPassword=CryptoJS.MD5(arys.confirmPassword).toString();
	}
	
	
	if(arys.hasOwnProperty("payPassword")){  
		arys.payPassword=CryptoJS.MD5(arys.payPassword).toString();
	}
	if(arys.hasOwnProperty("newPayPassword")){  
		arys.newPayPassword=CryptoJS.MD5(arys.newPayPassword).toString();
	}
	if(arys.hasOwnProperty("confirmPayPassword")){  
		arys.confirmPayPassword=CryptoJS.MD5(arys.confirmPayPassword).toString();
	}
}
