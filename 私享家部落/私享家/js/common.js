var devBaseUrl="http://localhost:8020/";
var testBaseUrl="";
var prodBaseUrl="";
var baseURL=testBaseUrl;

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
	
});


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

