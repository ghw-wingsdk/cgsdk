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
  * [初始化](#1-初始化)
  * [注册](#2-注册)
  * [获取隐私政策](#3-获取隐私政策)
  * [登录](#4-登录)
  * [附录1](#5-附录1)

#### 1. 初始化
```javascript
wing.init();
```
初始化sdk库，在调用其他方法前，必须先调用此方法。<br> 
<br> 
参数说明：

| 参数名 | 类型  | 必填  | 说明  |
|:----------:|:----------:|:---------:|:---------:|
| debug | boolean  | Y  | debug模式  |

示例：
```javascript
wing.init({
    debug: false
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

成功返回结果参数说明：

| 参数名 | 类型  | 说明  |
|:----------:|:----------:|:---------:|
| userId | long  | 用户Id |
| userStatus | int  | 0-封号，1-解封 |
| sdkToken | string  | 在线token，登录成功的时候SDK服务器通过h5服务端返回，如果传入的token未过期，而且userId没变直接返回原来的token，否则返回更新后的token（使用下面方式加密，客户端使用反方式解密：AES(原始sdkToken), 密码为clientId）  |
| h5Token | string  | H5服务端的token，用来维持h5客户端的会话。登录成功后的请求接口部分要求携带此参数，如果此h5Token过期则要求重新登录。（使用下面方式加密，客户端使用反方式解密：AES(原始h5Token), 密码为clientId+userId）  |
| puserId | string  | 用户在第三方平台的Id，访客登录返回NULL  |
| platform | string  | 平台标识 FACEBOOK、  GOOGLE、GUEST等 |
| userName | string  | 用户名称 |
| userIconUrl | string  | 用户头像地址  |

失败返回结果参数说明：

| 参数名 | 类型  | 说明  |
|:----------:|:----------:|:---------:|
| code | int  | 状态码[(附录1)](#5-附录1) |
| message | string  | 结果描述 |

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

成功返回结果参数说明：

| 参数名 | 类型  | 说明  |
|:----------:|:----------:|:---------:|
| result | string  | 隐私协议Url地址 |

失败返回结果参数说明：

| 参数名 | 类型  | 说明  |
|:----------:|:----------:|:---------:|
| code | int  | 状态码[(附录1)](#5-附录1) |
| message | string  | 结果描述 |

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

成功返回结果参数说明：

| 参数名 | 类型  | 说明  |
|:----------:|:----------:|:---------:|
| userId | long  | 用户Id |
| userStatus | int  | 0-封号，1-解封 |
| sdkToken | string  | 在线token，登录成功的时候SDK服务器通过h5服务端返回，如果传入的token未过期，而且userId没变直接返回原来的token，否则返回更新后的token（使用下面方式加密，客户端使用反方式解密：AES(原始sdkToken), 密码为clientId）  |
| h5Token | string  | H5服务端的token，用来维持h5客户端的会话。登录成功后的请求接口部分要求携带此参数，如果此h5Token过期则要求重新登录。（使用下面方式加密，客户端使用反方式解密：AES(原始h5Token), 密码为clientId+userId）  |
| puserId | string  | 用户在第三方平台的Id，访客登录返回NULL  |
| platform | string  | 平台标识 FACEBOOK、  GOOGLE、GUEST等 |
| userName | string  | 用户名称 |
| userIconUrl | string  | 用户头像地址  |
| privacyUrl | string  | 隐私政策链接，此值不为空时需要弹隐私窗口，为空或者没有此值则不需要弹  |
| isFirstLogin | int  | 是否是第一次登录，0-否，1-是  |

失败返回结果参数说明：

| 参数名 | 类型  | 说明  |
|:----------:|:----------:|:---------:|
| code | int  | 状态码[(附录1)](#5-附录1) |
| message | string  | 结果描述 |

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

#### 5. 附录1
返回状态码说明

| 状态码code | 说明  |
|:----------:|:---------:|
| 400 | 错误请求：请求参数有错，头信息有误等，导致请求无法被正确理解 |
| 401 | 请求未认证：访问受限资源是缺少认证信息，或者认证未通过 |
| 500 | 服务器内部故障 |
| 4010 | body数据必须为json格式 |
| 4011 | 缺少字段或有字段的值为null |
| 4012 | 请求超时，重新请求 |
| 4013 | 找不到服务，重新请求 |
| 4054 | 已存在邮箱（注册功能） |