/*
* Created by 小陌 on 2019/05/08.
* */

!(function (window) {
	console.log('common')
    navigate = url => window.location.href = url;
    goBack = index => window.history.go(index);

    /*
    * @author：By 小陌
    * @date: 2019-05-17
    * @describe：获取指定哈希值
    * */
    getHashParameter = key => {
        let params = getHashParameters();
        return params[key];
    };

    /*
    * @author：By 小陌
    * @date: 2019-05-17
    * @describe：获取所有哈希值
    * */
    getHashParameters = () => {
        let arr = (location.hash || "").replace(/^\#/, '').replace(/\s+/g, "").split("&");
        let params = {};
        for (var i = 0; i < arr.length; i++) {
            //hash 键为等于号 这里为了匹配base64传参改成自定义;
            let data = arr[i].split("=");
            params[data[0]] = data[1];
        }
        return params;
    };

    /*
    * @author：By 小陌
    * @date: 2019-06-12
    * @describe：获取指定查询字符串
    * */
    getQueryStringParameter = key => {
        let params = getQueryStringParameters();
        return params[key];
    };

    /*
    * @author：By 小陌
    * @date: 2019-05-17
    * @describe：获取
    * */
    getQueryStringParameters = () => {
        let arr = (location.search || "").replace(/^\?/, '').split("&");
        let params = {};
        for (var i = 0; i < arr.length; i++) {
            let data = arr[i].split("=");
            if (data.length == 2) {
                params[data[0]] = data[1];
            }
        }
        return params;
    };

    /*
    * @author：By 佚名
    * @date: 2019-05-25
    * @describe：设置cookie
    * */
    setCookie = (key, value, day) => {
        let d = new Date();
        d.setTime(d.getTime() + (day * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toGMTString();
        document.cookie = key + "=" + value + "; " + expires + "; " + "path=/";
    };

    /*
   * @author：By 小陌
   * @date: 2019-06-09
   * @describe：动态加载css代码
   * */
    let loadCssCode = code =>  {
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
    };

    /*
    * @author：By 小陌
    * @date: 2019-06-09
    * @describe：删除动态创建的css代码
    * */
    let removeCssCode = cssNode => {
        let head = document.getElementsByTagName('head').item(0);
        head.removeChild(cssNode)
    };

    /*
    * @author：By 小陌
    * @date: 2019-06-09
    * @describe：向元素插入htmlStringDom
    * */
    let appendHTML = (self,html) =>  {
        var divTemp = document.createElement("div"), nodes = null
            // 文档片段，一次性append，提高性能
            , fragment = document.createDocumentFragment();
        divTemp.innerHTML = html;
        nodes = divTemp.childNodes;
        for (var i=0, length=nodes.length; i<length; i+=1) {
            fragment.appendChild(nodes[i].cloneNode(true));
        }
        self.appendChild(fragment);
        // 据说下面这样子世界会更清净
        nodes = null;
        fragment = null;
    };

    /*
    * @author：By 小陌
    * @date: 2019-06-09
    * @describe：创建密码输入框
    * */
    createPayPassword = (obj) => {
        let cssText = `.passworldBox{
                            display: block;
                            width:310px;
                            height: 220px;
                            border: none;
                            background: white;
                            z-index: 101;
                            position: relative;
                            border-radius: 5px;
                        }
                        .passworldBox input[type="tel"]{
                            width: 100%;
                            height: 42px;
                            color: transparent;
                            position: absolute;
                            bottom: 25px;
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
                            bottom: 25px;
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
                            height: 30px;
                            width: 200px;
                            text-align: center;
                            line-height: 27px;
                            display: block;
                            margin-left: 55px;
                            margin-top: 10px;
                        }
                        .moneyBox{
                            width: 100%;
                        }
                        .contentText{
                            height: 30px;
                            width: 200px;
                            text-align: center;
                            line-height: 27px;
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
                            z-index: 99;
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
                        }`;
        let cssNode = loadCssCode(cssText);
        let passwordStr = `<div class="maskBox" style="display: none">
                                <div class="passworldBox">
                                    <div class="boxTitle">
                                        <span class="titleText">请输入支付密码：</span>
                                    </div>
                                    <div class="moneyBox">
                                        <div id="moneyTitle">
                                            <span class="titleText">${obj.title}</span>
                                        </div>
                                        <div id="moneyContent">
                                            <span class="contentText">￥${obj.prices}${obj.priceUnit}</span>
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
        appendHTML(document.getElementsByTagName('Body').item(0),passwordStr);

        let passworldBox = document.getElementsByClassName('passworldBox').item(0);
        let maskBox = document.getElementsByClassName('maskBox').item(0);
        let pwdInput = document.getElementsByClassName('pwdInput').item(0);
        let inputs = document.querySelectorAll('.fakeBox input');

        let activeDom = document.querySelectorAll(obj.activeDom).item(0);

        /*
        * @author：By 小陌
        * @date: 2019-06-09
        * @describe：点击显示密码输入框
        * */
        activeDom && activeDom.addEventListener('click', function () {
            maskBox.style.display = '';
            passworldBox.classList.add('passworldBoxActive');
        });

        /*
        * @author：By 小陌
        * @date: 2019-05-16
        * @describe：隐藏支付密码输入框
        * */
        maskBox.addEventListener('click', function () {
            maskBox.style.display = 'none';
        });

        /*
        * @author：By 小陌
        * @date: 2019-05-16
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
                obj.onInputCompletion && obj.onInputCompletion(pwd);
            }
        });

        /*
        * @author：By 小陌
        * @date: 2019-05-28
        * @describe：清除密码
        * */
        let clearAll = () => {
            pwdInput.value = "";
            inputs.forEach(item => item.value = "");
        };

        /*
        * @author：By 小陌
        * @date: 2019-06-09
        * @describe：设置价格
        * */
        let stePrices = prices => {
            let contentText = document.getElementsByClassName('contentText').item(0);
            contentText.innerText = `￥${prices}${obj.priceUnit}`
        };
        return {
            clearAll,
            stePrices,
        }
    };

    /*
    * @author：By 小陌
    * @date: 2019-05-25
    * @describe：仿android Toast
    * */
    createToast = (msg, duration,position,cb) => {
        let m = document.createElement('div'),s = document.createElement('div');
        let positionNum = position == 'center' ? '50%': position == 'top' ? '15%' : '85%';
        duration = duration || 1500;
        s.innerText = msg;
        m.appendChild(s);
        m.style.cssText = `position: fixed;
                           top: ${positionNum};
                           left: 50%;
                           display: -webkit-box;
                           display: -webkit-flex;
                           display: flex;
                           -webkit-box-orient: vertical;
                           -webkit-box-direction: normal;
                           -webkit-flex-direction: column;
                           flex-direction: column;
                           -webkit-box-align: center;
                           -webkit-align-items: center;
                           align-items: center;
                           -webkit-box-pack: center;
                           -webkit-justify-content: center;
                           justify-content: center;
                           box-sizing: content-box;
                           width: -webkit-fit-content;
                           width: fit-content;
                           max-width: 70%;
                           min-width: 96px;
                           padding: 8px 12px;
                           color: #fff;
                           font-size: 14px;
                           line-height: 20px;
                           white-space: pre-wrap;
                           text-align: center;
                           word-break: break-all;
                           background-color: rgba(50, 50, 51, 0.88);
                           border-radius: 4px;
                           -webkit-transform: translate(-50%, -${positionNum});
                           transform: translate(-50%, -${positionNum});`;
        document.body.appendChild(m);
        setTimeout(function () {
            let d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function () {
                document.body.removeChild(m);
                cb && cb()
            }, d * 1000);
        }, duration);
    };


})(window);



$('.notopened').click(function(){
	layer.msg('暂未开放！')
});