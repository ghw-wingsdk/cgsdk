CG LDP SDK
==== 
推广SDK

## 简介
市场推广渠道的常用形式为广告投放，作为付费性推广带来的用户质量和数量一般都会比运营推广渠道效果更好，是推广渠道中的主要形式。

## 功能简介
使用CG平台的SDK，推广过程中用户直接转化为CG平台的用户。整个导量转化的过程都是可控的，是平台推广的主要形式之一。

## 集成CGSDK SDK
### 集成
将下面代码加入html中
```javascript
<script src="https://cdn.chipsgames.com/cgsdk/cgsdk.min_2.0.0.js" type="text/javascript"></script>
```
### 接口说明
[1.初始化](#1-初始化)

#### 1. 初始化
```javascript
wing.init();
```
初始化sdk库，在调用其他方法前，必须先调用此方法。<br> 
<br> 
参数说明：

| 参数名 | 类型  | 必填  | 说明  |
|:----------:|:----------:|:---------:|:---------:|
| sdkType | string  | Y  | sdk类型: html5  |
| platform | string  | Y  | 使用平台: html5  |
| debug | boolean  | Y  | debug模式  |

示例：
```javascript
wing.init({
    sdkType: 'html5',
    platform: 'html5',
    debug: false,
});

``` 
#### 2. 注册
```javascript
wing.user.register();
```
参数说明：

| 参数名 | 类型  | 必填  | 说明  |
|:----------:|:----------:|:---------:|:---------:|
| email | string  | Y  | 注册email |
| passWord | string  | Y  | 注册密码 |
| success | Object  | N  | 成功回调方法  |
| fail | Object  | N  | 失败回调方法  |
| cancel | Object  | N  | 取消回调方法  |

示例：
```javascript
wing.user.register({
    email:’aaa@aaa.com’,
    passWord:’123456’,
    success: function(data){ 
        console.log("注册成功");
    },
    fail: function(){
        console.log("注册失败");
    },
    cancel: function(){
        console.log("注册取消")
    }
});
```

#### 3. 获取隐私政策
```javascript
wing.user.getPrivacyUrl();
```
参数说明：

| 参数名 | 类型  | 必填  | 说明  |
|:----------:|:----------:|:---------:|:---------:|
| success | Object  | N  | 成功回调方法  |
| fail | Object  | N  | 失败回调方法  |
| cancel | Object  | N  | 取消回调方法  |

示例：
```javascript
wing.user.getPrivacyUrl({
    success: function(data){ 
        console.log("获取Privacy成功");
        privacyUrl = data;

        window.open(privacyUrl, 'newwindow', 'width=400, height=600, top=' + iTop + ',left=' + iLeft + ', toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no');
    },
    fail: function(){
        console.log("获取Privacy失败");
    },
    cancel: function(){
        console.log("获取Privacy取消")
    }
});

```

#### 4. 登录
```javascript
wing.user.login();
```
说明：该方法分为不弹出窗口（明确指定了platform）和弹出窗口方式（platform不传值则弹出登录方式选择框）

参数说明：

| 参数名 | 类型  | 必填  | 说明  |
|:----------:|:----------:|:---------:|:---------:|
| platform | string  | N  | ‘GUEST’、 ‘GOOGLE’、‘FACEBOOK’ |
| success | Object  | N  | 成功回调方法  |
| fail | Object  | N  | 失败回调方法  |
| cancel | Object  | N  | 取消回调方法  |

示例：
```javascript
wing.user.login({
    platform: 'FACEBOOK',
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
```
