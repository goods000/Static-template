/*
* Created by 小陌 on 2019/04/29.
* Copyright (c) 2019 小陌<admin@z1006.top> All rights reserved.
*
* This source code is licensed under the Anti 996-License found in the
* LICENSE file in the root directory of this source tree.
* */

!(function (window) {

    function Zfast() {
        this.version = '0.0.1';
        this.app_config = {}
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method 选择器
    * @param  elem 节点
    * @return nodeList 节点类数组
    * */
    Zfast.prototype.queryAll = function (elem) {
        let init = [];
        if (isDom(elem)) {
            init.push(elem);
            init.__proto__ = Zfast.prototype;
            return init
        }

        let nodeList = document.querySelectorAll(elem);
        for (var i = 0; i < nodeList.length; ++i) {
            init.push(nodeList[i])
        }
        init.__proto__ = Zfast.prototype;
        return init;
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method 向元素最后面添加DOM
    * @param  elem DOMString {string}
    * @return nodeList 节点类数组
    * */
    Zfast.prototype.append = function (elem) {
        let self = this;
        for (var i = 0; i < this.length; i++) {
            parseDom(elem).forEach(item => self[i].appendChild(item))
        }
        return this;
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method 添加class
    * @param  val class名称 {string}
    * @return 元素的文本内容 {string}
    * */
    Zfast.prototype.addClass = function (val) {
        for (var i = 0; i < this.length; ++i) {
            this[i].classList.add(val);
        }
        return this
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method 删除class
    * @param  val class名称 {string}
    * @return 元素的文本内容 {string}
    * */
    Zfast.prototype.removeClass = function (val) {
        for (var i = 0; i < this.length; ++i) {
            this[i].classList.remove(val);
        }
        return this
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method 设置/获取元素的style样式
    * @param  attr 元素属性 {string} / attr 设置多个 CSS 属性/值 {object}
    * @param  val  元素至 {string}
    * @return 元素的文本内容 {string}
    * */
    Zfast.prototype.css = function (name, value) {
        if (arguments.length == 2) {
            for (var i = 0; i < this.length; ++i) {
                this[i].style[name] = value;
            }
        } else {
            if (isObject(arguments[0])) {
                for (var i = 0; i < this.length; ++i) {
                    for (var key in arguments[0]) {
                        this[i].style[key] = arguments[0][key];
                    }
                }
            } else {
                if (window.crrentStyle) {
                    return this[0].currentStyle[name];
                } else {
                    return getComputedStyle(this[0], false)[name];
                }
            }
        }
        return this;
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method 设置/获取元素的val
    * @param  val  要设置的字符串 {string}
    * @return 元素的文本内容 {string}
    * */
    Zfast.prototype.val = function (val) {
        if (val) {
            for (var i = 0; i < this.length; ++i) {
                this[i].value = val;
            }
            return this
        } else {
            return this[0].value;
        }
        ;
    };


    /*
    * @author By小陌 admin@z1006.top
    * @method 设置/获取元素的文本内容
    * @param  val  要设置的字符串 {string}
    * @return 元素的文本内容 {string}
    * */
    Zfast.prototype.text = function (val) {
        if (val) {
            for (var i = 0; i < this.length; ++i) {
                this[i].innerText = val;
            }
            return this
        } else {
            var value = '';
            for (var i = 0; i < this.length; ++i) {
                value += this[i].innerText;
            }
            return value;
        }
        ;
    };


    /*
    * @author By小陌 admin@z1006.top
    * @method 设置/获取元素属性
    * @param  key  属性名 {string}
    * @param  val  属性值 {string}
    * @return 元素的属性值 {string}
    * */
    Zfast.prototype.attr = function (key, val) {
        if (val) {
            for (var i = 0; i < this.length; ++i) {
                this[i].setAttribute(key, val);
            }
            return this
        } else {
            return this[0].getAttribute(key);
        }
        ;
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method 获取所有子节点
    * @param  elem 节点
    * @return 节点类数组
    * */
    Zfast.prototype.childrens = function (elem) {
        let self = this;
        let el = Zspry.queryAll(elem);
        let nodeList = [];
        let findChildren = elems => {
            for (var i = 0; i < elems.children.length; i++) {
                if (elems.children.length != 0) {
                    if (nodeList.includes(elems.children[i])) break;
                    if (!elem) {
                        nodeList.push(elems.children[i])
                    } else {
                        for (var s = 0; s < el.length; s++) {
                            if (elems.children[i] == el[s]) nodeList.push(elems.children[i])
                        }
                    }
                }
                findChildren(elems.children[i]);
            }
        };
        for (var i = 0; i < self.length; i++) {
            findChildren(self[i])
        }
        nodeList.__proto__ = Zfast.prototype;
        return nodeList;
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method 获取子节点
    * @param  elem 节点
    * @return 节点类数组
    * */
    Zfast.prototype.children = function (elem) {
        let self = this;
        let el = Zspry.queryAll(elem);
        let nodeList = [];
        for (var x = 0; x < self.length; x++) {
            for (var i = 0; i < self[x].children.length; i++) {
                if (!elem) {
                    nodeList.push(self[x].children[i])
                } else {
                    for (var s = 0; s < el.length; s++) {
                        if (self[x].children[i] == el[s]) nodeList.push(self[x].children[i])
                    }
                }
            }
        }
        nodeList.__proto__ = Zfast.prototype;
        return nodeList;
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method 获取祖先节点
    * @param  elem 节点
    * @return 节点类数组
    * */
    Zfast.prototype.parents = function (elem) {
        let self = this;
        let el = Zspry.queryAll(elem);
        let nodeList = [];
        for (var x = 0; x < self.length; x++) {
            let item = self[x].parentNode;
            while (item != document) {
                if (nodeList.includes(item)) break;
                if (!elem) {
                    nodeList.push(item);
                } else {
                    for (var i = 0; i < el.length; i++) {
                        if (item == el[i]) nodeList.push(item)
                    }
                }
                item = item.parentNode;
            }
            ;
        }
        nodeList.__proto__ = Zfast.prototype;
        return nodeList;
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method 获取父节点
    * @param  elem 节点
    * @return 节点类数组
    * */
    Zfast.prototype.parent = function (elem) {
        let self = this;
        let el = Zspry.queryAll(elem);
        let nodeList = [];
        for (var x = 0; x < self.length; x++) {
            if (!elem) {
                nodeList.push(self[x].parentNode)
            } else {
                for (var i = 0; i < el.length; i++) {
                    if (self[x].parentNode == el[i]) nodeList.push(self[x].parentNode)
                }
            }
        }
        nodeList.__proto__ = Zfast.prototype;
        return nodeList;
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method 获取兄弟节点
    * @param  elem 节点
    * @return 节点类数组
    * */
    Zfast.prototype.siblings = function (elem) {
        let self = this;
        let el = Zspry.queryAll(elem);
        let nodeList = [];
        for (var x = 0; x < self.length; x++) {
            let childrenItem = self[x].parentNode.children;
            for (var i = 0; i < childrenItem.length; i++) {
                if (self[x].parentNode.children[i] !== self[x] && self[x].parentNode.children[i] !== self[x]) {
                    if (!elem) {
                        nodeList.push(self[x].parentNode.children[i]);
                    } else {
                        for (var s = 0; s < el.length; s++) {
                            if (self[x].parentNode.children[i] == el[s]) nodeList.push(self[x].parentNode.children[i])
                        }
                    }
                }
            }
        }
        nodeList.__proto__ = Zfast.prototype;
        return nodeList;
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method ajax
    * @param  options.type  http连接的方式,包括POST和GET两种方式 {string}
    * @param  options.url   发送请求的url {string}
    * @param  options.async 是否为异步请求,true为异步,false为同步 {boolean}
    * @param  options.data  发送的参数 {object}
    * @param  options.contentType  发送信息至服务器时内容编码类型 {string}
    * @param  options.success   ajax成功回调 {function}
    * @param  options.error ajax失败回调 {function}
    * @param  options.complete ajax结束的回调函数,无论成功失败都会执行 {function}
    * */
    Zfast.prototype.request = function (options) {
        options.url = options.url || '';
        options.type = options.type ? options.type.toUpperCase() : 'POST';
        options.async = options.async || true;
        options.data = options.data || null;
        options.contentType = options.contentType || 'application/x-www-form-urlencoded;charset=utf-8';
        options.success = options.success || function () {
        };
        options.error = options.error || function () {
        };
        options.complete = options.complete || function () {
        };
        let xmlHttp;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        ;
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                options.success(xmlHttp.responseText);
            } else if (xmlHttp.readyState == 4 && xmlHttp.status > 200) {
                options.error(xmlHttp.responseText);
            }
            if (xmlHttp.readyState == 4) {
                options.complete(xmlHttp.responseText);
            }
        };
        if (isObject(options.data)) {
            var params = [];
            for (var key in options.data) {
                params.push(key + '=' + options.data[key]);
            }
            data = params.join('&');
        } else {
            data = options.data
        }
        xmlHttp.open(options.type, options.type === 'POST' ? options.url : options.url + '?' + data, options.async);
        (options.type === 'POST') && xmlHttp.setRequestHeader('Content-Type', options.contentType);
        xmlHttp.setRequestHeader('Accept', '*/*');
        xmlHttp.send(options.type === 'POST' ? data : null);
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method copy
    * @param  value  要拷贝的字符串 {string}
    * @param  success  函数调用成功的回调 {function}
    * @param  error  函数调用失败的回调 {function}
    * */
    Zfast.prototype.copy = function (value, success, error) {
        if (document.execCommand) {
            var element = document.createElement('SPAN');
            element.textContent = value;
            document.body.appendChild(element);
            if (document.selection) {
                var range = document.body.createTextRange();
                range.moveToElementText(element);
                range.select();
            } else if (window.getSelection) {
                var range = document.createRange();
                range.selectNode(element);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            }
            document.execCommand('copy');
            element.remove ? element.remove() : element.removeNode(true);
            if (arguments[1]) {
                if (isFunction(arguments[1])) {
                    success();
                }
                ;
            } else {
                alert('复制成功')
            }
            ;
        } else {
            if (arguments[2]) {
                if (isFunction(arguments[2])) {
                    error();
                }
            } else {
                alert('复制失败')
            }
        }
    };

    /*
    * @author 邹
    * @method 条件判断
    * @param  c 条件
    * @param  data 数据
    * @return 条件是否为真 {boolean}
    * */
    let evil = function (c, data) {
        var Fn = new Function('try {with(this){return ' + c + '}}catch (e) {return false}');
        return Fn.call(data);
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method 判断传入参数是否为Object
    * @param  o 条件
    * @param  data 数据
    * @return 条件是否为真 {boolean}
    * */
    let isObject = function (o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method 判断传入参数是否为Array
    * @param  a 条件
    * @return 条件是否为真 {boolean}
    * */
    let isArray = function (a) {
        return Object.prototype.toString.call(a) === '[object Array]';
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method 判断传入参数是否为Function
    * @param  f 条件
    * @return 条件是否为真 {boolean}
    * */
    let isFunction = function (f) {
        return Object.prototype.toString.call(f) === "[object Function]";
    };

    /*
    * @author By小陌 admin@z1006.top
    * @method 判断传入参数是否为Dom元素
    * @param  el 条件
    * @return 条件是否为真 {boolean}
    * */
    function isDom(el) {
        return (
            el instanceof HTMLElement ||
            Object.prototype.toString.call(el) === '[object HTMLDocument]' ||
            Object.prototype.toString.call(el) === '[object HTMLCollection]'
        );
    }

    /*
    * @author By小陌 admin@z1006.top
    * @method 解析DOMString
    * @param  DOMString
    * @return NodeList
    * */
    function parseDom(arg) {
        var objE = document.createElement("div");
        //这里为什么要把NodeList转成普通数组,天晓得为什么 return objE.childNodes
        //NodeList 两项DOMString会变成一项
        var arr = [];
        objE.innerHTML = arg;
        objE.childNodes.forEach(item => arr.push(item));
        return arr;
    };

    window.Zfast = new Zfast();
})(window);
