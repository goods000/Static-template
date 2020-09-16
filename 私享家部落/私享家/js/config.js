var devBaseUrl="http://localhost:8083/";
var testBaseUrl="http://bantong.wgzvip.com/api/";
var prodBaseUrl="http://shop.dfyihang.com/api/";
var baseURL=testBaseUrl;

var devLoginUrl="http://localhost:8083/login.html";
var testLoginUrl="http://bantong.wgzvip.com/login.html";
var prodLoginUrl="http://shop.dfyihang.com/login.html";
var loginURL=testLoginUrl;

function isLogin(r) { //
	if(r.code==401){
		window.location.href=loginURL;
		return;
	}
	if(r.code==-1){
		window.location.href=loginURL;
		return;
	}
}

//拿到url上的参数  
//http://localhost:8083/renren-chain/qiante.html?currType=BOSS
//传入currType 
function getParameter(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}


if(sessionStorage.curr==undefined){
	sessionStorage.curr="cny";  //如果没有币种  默认人民币
}

if(sessionStorage.lang==undefined){
	sessionStorage.lang="cn";  //如果没有语言  默认中文
}

//ajax全局配置
$.ajaxSetup({
	//async : false,//所有的请求均为同步请求，在没有返回值之前，同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行
	cache: false,
	crossDomain:true,
	xhrFields: {
    withCredentials: true
	},
	
	headers: {
    lang: sessionStorage.lang,
	curr: sessionStorage.curr,
	token: $.cookie("token")
	}
	
	/*layerIndex:-1,
	beforeSend: function () {
		//this.layerIndex = layer.load(1, { shade: [0.5, '#393D49'] });
		var msgindex=layer.msg('正在提交请稍候。。。', {icon: 16,time:false,shade : [0.5 , '#000' , true]});
		//this.layerIndex =layer.msg('正在提交...', {icon: 16,shade : [0.5 , '#000' , true]});
	},
	complete: function () {
		layer.close(this.layerIndex);
	},
	error: function () {
		layer.alert('部分数据加载失败，可能会导致页面显示异常，请刷新后重试', {
			skin: 'layui-layer-molv'
		   , closeBtn: 0
		   , shift: 4 //动画类型
		});
	}*/
	
});

function getCurrency()
{
	if(sessionStorage.curr==undefined){
		sessionStorage.curr="cny";  //默认人民币
	}
	
	if(sessionStorage.curr=="cny"){
		return "cny";
	}else if(sessionStorage.curr=="usd"){
		return "usd";
	}else{
		return "cny";
	}
	
}


function getLang()
{
	if(sessionStorage.lang==undefined){
		sessionStorage.lang="cn";  //默认人民币
	}
	
	if(sessionStorage.lang=="cn"){
		return "cn";
	}else if(sessionStorage.lang=="en"){
		return "en";
	}else{
		return "cn";
	}
	
}


//重写alert
window.alert = function(msg, callback){
	parent.layer.alert(msg, function(index){
		parent.layer.close(index);
		if(typeof(callback) === "function"){
			callback("ok");
		}
	});
}

//重写confirm式样框
window.confirm = function(msg, callback){
	parent.layer.confirm(msg, {btn: ['确定','取消']},
	function(){//确定事件
		if(typeof(callback) === "function"){
			callback("ok");
		}
	});
}

