//初始化数据
wing.init({
    sdkType: 'html5',
    platform: 'html5',
    debug: true,
});

//登录
function login(platform) {
    wing.user.login({
        platform: platform,
        success: function(){
            console.log("登录成功");
        },
        fail: function(){
            console.log("登录失败");
        },
        cancel: function(){
            console.log("登录取消")
        }
    });

}