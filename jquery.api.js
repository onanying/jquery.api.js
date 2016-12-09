; (function($) {

    var method = "api";

    $[method] = new Object();

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

    // jQuery ajax方法加入公共控制
    $[method].ajax = function(conf) {
        var success = conf.success;
        conf.success = function(json) {
            $[method].commonControl(json, success);
        }
        $.ajax(conf);
    }

    // jQuery getJSON方法加入公共控制
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