CGSDK
==== 
推广SDK

# 简介

# 功能简介

# 集成CGSDK SDK
## 集成
将下面代码加入html中
```javascript
<script src="https://cdn.chipsgames.com/cgsdk/cgsdk.min_1.0.0.js" type="text/javascript" />
```
## 接口说明
### 初始化
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
    debug: true,
});
``` 
## 登录
```javascript
wing.user.login();
```
说明：该方法分为不弹出窗口（明确指定了platform）和弹出窗口方式（platform不传值则弹出登录方式选择框）

参数说明：

| 参数名 | 类型  | 必填  | 说明  |
|:----------:|:----------:|:---------:|:---------:|
| platform | string  | N  | ‘GUEST’、 ‘GOOGLE’、‘FACEBOOK’ |
| 参数名 | 类型  | 必填  | 说明  |
| 参数名 | 类型  | 必填  | 说明  |
| 参数名 | 类型  | 必填  | 说明  |

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
