function isUndefined(input) {
	var is = typeof input === 'undefined';
    return is;
}

function isBlank(str) {
	if(isUndefined(str)){return true;}
	
    return !str || !/\S/.test(str)
}

function isEmpty(str) {
	if(isBlank(str)){return false;}
	return str.length === 0;
}

function username(str) {
	if(isBlank(str)){return false;}
	var pattern =/^[a-zA-Z0-9_]{0,}$/;
    return pattern.test(str);
}

function isEth(str) {
	if(isBlank(str)){return false;}
	var pattern =/^0x[a-fA-F0-9]{40}$/;
    return pattern.test(str);
}

function isMobile(str) {
	if(isBlank(str)){return false;}
	var pattern =/^1(3|4|5|6|7|8|9)\d{9}$/;
	return pattern.test(str);
}

function isEmail(str) {
	if(isBlank(str)){return false;}
	var pattern =/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g;
	return pattern.test(str);
}

function  isLength(str,len){
	if(isBlank(str)){return false;}
	return str.length >= len;
}

function isChinese(str) {
	if(isBlank(str)){return false;}
	var pattern =/^[\u0391-\uFFE5]+$/g;
    return pattern.test(str);
}

 //是否为英文字母
function isAbc(str) {
	if(isBlank(str)){return false;}
	var pattern =/^[a-zA-Z]+$/g;
    return pattern.test(str);
}

function isDecimal(str) {
	if(isBlank(str)){return false;}
	var pattern =/^[-+]?([0-9]+|\.[0-9]+|[0-9]+\.[0-9]+)$/;
	return pattern.test(str);
}

function isBankCard(str) {
	if(isBlank(str)){return false;}
    var bankno = str.replace(/\s/g,'');
    if(bankno.length < 16 || bankno.length > 19) {
        return false;
    }
    var num = /^\d*$/;//全数字
    if(!num.exec(bankno)) {
        return false;
    }
    //开头6位
    var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
    if(strBin.indexOf(bankno.substring(0, 2)) == -1) {
        // tips("银行卡号开头6位不符合规范");
        return false;
    }
    //Luhn校验
    if(!luhnCheck(bankno)){
        return false;
    }
    // console.log('1');
    return true;
}

function isIdcard(str) {
	
	if(isBlank(str)){return false;}
	var idCard=str;
	
    //15位和18位身份证号码的正则表达式  
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;  
    //如果通过该验证，说明身份证格式正确，但准确性还需计算  
    if (regIdCard.test(idCard)) {  
        if (idCard.length == 18) {  
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里  
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组  
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和  
            for (var i = 0; i < 17; i++) {  
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];  
            }  
            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置  
            var idCardLast = idCard.substring(17);//得到最后一位身份证号码  
            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X  
            if (idCardMod == 2) {  
                if (idCardLast == "X" || idCardLast == "x") {  
                    return true;  
                    //alert("恭喜通过验证啦！");  
                } else {  
                    return false;  
                    //alert("身份证号码错误！");  
                }  
            } else {  
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码  
                if (idCardLast == idCardY[idCardMod]) {  
                    //alert("恭喜通过验证啦！");  
                    return true;  
                } else {  
                    return false;  
                    //alert("身份证号码错误！");  
                }  
            }  
        }  
    } else {  
        //alert("身份证格式不正确!");  
        return false;  
    }  
}







function luhnCheck(bankno){
    var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhn进行比较）

    var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
    var newArr=new Array();
    for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
        newArr.push(first15Num.substr(i,1));
    }
    var arrJiShu=new Array();  //奇数位*2的积 <9
    var arrJiShu2=new Array(); //奇数位*2的积 >9
    
    var arrOuShu=new Array();  //偶数位数组
    for(var j=0;j<newArr.length;j++){
        if((j+1)%2==1){//奇数位
            if(parseInt(newArr[j])*2<9)
            arrJiShu.push(parseInt(newArr[j])*2);
            else
            arrJiShu2.push(parseInt(newArr[j])*2);
        }
        else //偶数位
        arrOuShu.push(newArr[j]);
    }
    
    var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
    var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
    for(var h=0;h<arrJiShu2.length;h++){
        jishu_child1.push(parseInt(arrJiShu2[h])%10);
        jishu_child2.push(parseInt(arrJiShu2[h])/10);
    }        
    
    var sumJiShu=0; //奇数位*2 < 9 的数组之和
    var sumOuShu=0; //偶数位数组之和
    var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
    var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
    var sumTotal=0;
    for(var m=0;m<arrJiShu.length;m++){
        sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
    }
    
    for(var n=0;n<arrOuShu.length;n++){
        sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
    }
    
    for(var p=0;p<jishu_child1.length;p++){
        sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
        sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
    }      
    //计算总和
    sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
    
    //计算luhn值
    var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
    var luhn= 10-k;
    
    if(lastNum==luhn){
       // console.log("验证通过");
        return true;
    }else{
       // tips("银行卡号必须符合luhn校验");
        return false;
    }        
}

