; (function($) {

    var method = "api";

    $[method] = new Object();

    // 刷新token有效期
    $[method].refreshExpires = function() {
        var timestamp = new Date().getTime();        
        if(sessionStorage.tokenLastRefresh) {
            if(timestamp - sessionStorage.tokenLastRefresh > 600 * 1000){
                // 刷新token
                $.getJSON('/api/v1/account/refreshExpires?access_token=' + sessionStorage.access_token, function(json){
                    if(json.errcode == 0){
                        sessionStorage.tokenLastRefresh = timestamp;
                    }
                });
            }
        }else{
            sessionStorage.tokenLastRefresh = timestamp;
        }
    }

    // 公共控制方法
    $[method].commonControl = function(json, success) {

    	/* 公共控制代码开始 */

        // 错误码控制
        if (json.errcode == 30001 || json.errcode == 30002) {
            sessionStorage.clear(); // 清空用户数据
            window.location.href = '/'; // 跳转至首页
            return false;
        }

        // token有效期控制
        $[method].refreshExpires();

        /* 公共控制代码结束 */

        success(json);
    }

    // 重新封装jQuery.ajax方法
    $[method].ajax = function(conf) {
        var success = conf.success;
        conf.success = function(json) {
            $[method].commonControl(json, success);
        }
        $.ajax(conf);
    }

    // 重新封装jQuery.getJSON方法
    $[method].getJSON = function() {
        switch (arguments.length) {
        case 2:
            var success = arguments[1];
            arguments[1] = function(json) {
                $[method].commonControl(json, success);
            }
            $.getJSON(arguments[0], arguments[1]);
            break;
        case 3:
            var success = arguments[2];
            arguments[2] = function(json) {
                $[method].commonControl(json, success);
            }
            $.getJSON(arguments[0], arguments[1], arguments[2]);
            break;
        }
    }

} (jQuery));