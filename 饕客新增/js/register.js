/*
* Created by 小陌 on 2019/06/12.
* */

!(function () {
    let getCode = document.getElementById('getCode');
    let isClick = 1; //获取验证码 按钮状态
    let setGetCodeText = window.setGetCodeText = function () {
        if (!isClick) return;
		console.log('---')
        let self = this;
        let time = 60;
        isClick = 0;
        let timer = setInterval(function () {
            time--;
            self.innerText = `${time}S`;
            if (time == 0) {
                clearInterval(timer);
                isClick = 1;
                self.innerText = `重新获取`;
            }
        }, 1000)
    };
    getCode && getCode.addEventListener('click', setGetCodeText);
})();
