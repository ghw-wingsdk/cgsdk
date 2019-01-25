//初始化数据
wing.init({
    debug: true,
});

// 校验Email
function checkEmail(emailInput) {
    var validate = true;

    var email = emailInput.value;

    if(typeof(email) == 'undefined' || !email){
        alert("Email is empty!");
        validate = false;
    } else {
        var reg = new RegExp("^[A-Za-z\\d]+([-_.][A-Za-z\\d]+)*@([A-Za-z\\d]+[-.])+[A-Za-z\\d]{2,4}$");
        if(!reg.test(email)){
            alert("Error in Email format!");
            validate = false;
        }
    }

    emailInput.style.borderColor= validate ? "#5abfdd" : "#FF0000";

    return validate;
}

// 校验密码
function checkPsw(pswInput) {
    var validate = true;

    var id = pswInput.id;

    if (id == 'passWord') {
        var passWord = pswInput.value;

        if(typeof(passWord) == 'undefined' || !passWord){
            alert("PassWord is empty!");
            validate = false;
        } else {
            if(passWord.length < 6 || passWord.length > 20){
                alert("PassWord must be 6~20 letters, numbers or symbols！")
                validate = false;
            }
        }
    } else if (id == 'confirmPassWord') {
        var passWord = document.getElementById("passWord").value;
        var confirmPassword = pswInput.value;

        if(passWord != confirmPassword){
            alert("PassWord and Confirm password different!")
            validate = false;
        }
    }

    pswInput.style.borderColor= validate ? "#5abfdd" : "#FF0000";

    return validate;
}

// 查看协议
var privacyUrl;
function openPrivacy() {
    var iWidth=400; //弹出窗口的宽度;
    var iHeight=600;  //弹出窗口的高度
    var iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置
    var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置

    if(typeof(privacyUrl) == 'undefined' || !privacyUrl){
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
        alert("please select the Privacy Policy!")
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
        fail: function(){
            divLoading.style.display="none";
            console.log("注册失败");
        },
        cancel: function(){
            divLoading.style.display="none";
            console.log("注册取消")
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