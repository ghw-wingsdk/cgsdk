//初始化数据
wing.init({
    debug: true,
});

// 校验Email
function checkEmail(emailInput) {
    var validate = true;

    var email = emailInput.value;

    if(typeof(email) == 'undefined' || !email){
        showErr(emailInput.id, "This field is required.");
        validate = false;
    } else {
        var reg = new RegExp("^[A-Za-z\\d]+([-_.][A-Za-z\\d]+)*@([A-Za-z\\d]+[-.])+[A-Za-z\\d]{2,4}$");
        if(!reg.test(email)){
            showErr(emailInput.id, "Invalid email address.");
            validate = false;
        }
    }

    if (validate) {
        hiddenErr(emailInput.id);
    }

    return validate;
}

// 校验密码
function checkPsw(pswInput) {
    var validate = true;

    var id = pswInput.id;

    if (id == 'passWord') {
        var passWord = pswInput.value;

        if(typeof(passWord) == 'undefined' || !passWord){
            showErr(id, "This field is required.");
            validate = false;
        } else {
            if(passWord.length < 6){
                // alert("Minimum 6 characters required.")
                showErr(id, "Minimum 6 characters required.");
                validate = false;
            } else if(passWord.length > 20){
                // alert("Maximum 20 characters allowed.")
                showErr(id, "Maximum 20 characters allowed.");
                validate = false;
            }
        }
    } else if (id == 'confirmPassWord') {
        var passWord = document.getElementById("passWord").value;
        var confirmPassword = pswInput.value;

        if(typeof(passWord) == 'undefined' || !passWord){
            showErr(id, "This field is required.");
            validate = false;
        } else if(passWord != confirmPassword){
            showErr(id, "Fields do not match.");
            validate = false;
        }
    }

    if (validate) {
        hiddenErr(id);
    }

    return validate;
}

// 查看协议
var privacyUrl;
function openPrivacy() {
    var iWidth=400; //弹出窗口的宽度;
    var iHeight=600;  //弹出窗口的高度
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置

    if(typeof(privacyUrl) != 'undefined' && privacyUrl){
        window.open(privacyUrl, 'newwindow', 'width=400, height=600, top=' + iTop + ',left=' + iLeft + ', toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
    } else {
        var divLoading = document.getElementById("divLoading");
        divLoading.style.display="block";
        wing.user.getPrivacyUrl({
            success: function(data){
                divLoading.style.display="none";
                console.log("获取Privacy成功");
                privacyUrl = data;

                window.open(privacyUrl, 'newwindow', 'width=400, height=600, top=' + iTop + ',left=' + iLeft + ', toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
            },
            fail: function(){
                divLoading.style.display="none";
                console.log("获取Privacy失败");
            },
            cancel: function(){
                divLoading.style.display="none";
                console.log("获取Privacy取消")
            }
        });
    }
}

// 注册
function register() {
    var emailInput = document.getElementById("email");
    if (! checkEmail(emailInput))
        return;

    var passWordInput = document.getElementById("passWord");
    if (! checkPsw(passWordInput))
        return;

    var confirmPasswordInput = document.getElementById("confirmPassWord");
    if (! checkPsw(confirmPasswordInput))
        return;

    var email = emailInput.value;
    var passWord = passWordInput.value;


    var isChecked = document.getElementById("selectPrivacy").checked;
    if(! isChecked){
        alert("Please accept to continue.")
        return;
    }

    var divLoading = document.getElementById("divLoading");
    divLoading.style.display="block";

    wing.user.register({
        email: email,
        passWord: passWord,
        success: function(data){
            divLoading.style.display="none";
            console.log("注册成功");
        },
        fail: function(data){
            divLoading.style.display="none";
            console.log("注册失败");
            if (data.code == 4054)
                showErr(emailInput.id,data.message);
            else
                alert(data.message);
        },
        cancel: function(){
            divLoading.style.display="none";
            console.log("注册取消")
            alert("注册取消");
        }
    });
}

//登录
function login(platform) {
    var divLoading = document.getElementById("divLoading");
    divLoading.style.display="block";

    wing.user.login({
        platform: platform,
        success: function(data){
            divLoading.style.display="none";
            console.log("登录成功");
        },
        fail: function(){
            divLoading.style.display="none";
            console.log("登录失败");
        },
        cancel: function(){
            divLoading.style.display="none";
            console.log("登录取消")
        }
    });
}

// 显示错误提示
function showErr(idName, message) {
    hiddenErr(idName);
    var input = document.getElementById(idName);

    var htmlStr = '<div style="background:#ee0101; color: #FFF; padding: 4px 10px 4px 10px;border: 2px solid white;'
        + 'border-radius:5px 5px 5px 5px;text-align: left;font-family: MicrosoftYaHei;font-size: 14px;">'
        + '* ' + message + '</div>'
        + '<div style="float:right;margin-top:-1px;margin-right:30px;">'
        + '<div style="position:absolute;border-style:solid;border-width: 12px 12px 12px 12px;'
        + 'border-color: white transparent transparent transparent;width:0px;height:0px;"></div>'
        + '<div style="position:absolute;margin-top:-1px;margin-left:1px;border-style:solid;border-width: 10px 10px 10px 10px;'
        + 'border-color: #ee0101 transparent transparent transparent;width:0px;height:0px;"></div>'
        + '</div></div>';

    var divRoot = document.createElement('div');
    divRoot.id="err_alert_" + idName;
    divRoot.style.position="absolute";
    divRoot.style.maxWidth = input.clientWidth + "px";
    divRoot.innerHTML = htmlStr;
    divRoot.onclick = function () {
        hiddenErr(idName);
    };

    input.parentElement.insertBefore(divRoot, input);
    divRoot.style.marginLeft = (input.clientWidth - divRoot.clientWidth) + "px";
    divRoot.style.marginTop = (-divRoot.clientHeight) + "px";
}

// 隐藏错误提示
function hiddenErr(idName) {
    var div = document.getElementById("err_alert_" + idName);
    if (div != null)
        div.parentNode.removeChild(div);
}