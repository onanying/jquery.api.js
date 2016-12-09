## jquery.api.js

web开发前后端分离，前端ajax访问API接口，需统一对返回的结果做公共控制，所以在jquery的ajax上增加一层封装来实现。

### 使用场景

> javascript访问api接口，当access_token过期时，所有接口都会返回一个统一的错误码，这时javascript需要清空用户本地信息并跳转至登录页。


### 说明文档

#### 修改公共代码

打开 jquery.api.js 在 commonControl 方法内，设置你的项目公共控制代码

```javascript
// 公共控制方法
$[method].commonControl = function(json, success) {
    
    /* 公共控制代码开始 */
    if (json.errcode == 30001 || json.errcode == 30002) {
        sessionStorage.clear(); // 清空用户数据
        window.location.href = '/'; // 跳转至首页
        return false;
    }
    /* 公共控制代码结束 */

    success(json);
}
```

#### 引用文件

首先引用jQuery与jquery.api.js

```javascript
<script src="http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js"></script>
<script src="jquery.api.js"></script>
```

#### 访问接口
然后就可以像使用jQuery一样使用ajax，只需增加 $.api. 即可

```javascript
// ajax
$.api.ajax({
    type:"get",
    url:'http://www.example.com/api/v1/Account/token?mobile=***&password=***',
    dataType:"jsonp",
    jsonp:"callbak",
    success:function(json){
        console.log(json);
    }
});
// getJSON
$.api.getJSON("http://www.example.com/api/v1/Account/token?callbak=?", {mobile:"***",password:"***"}, function(json){
    console.log(json);
});
```