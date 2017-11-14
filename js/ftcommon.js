/**
 * Created by Administrator on 2017-3-22.
 */
(function() {
    window.xgxx = window.xgxx || {
            // server_Domain: "http://10.3.1.74:8095/",//胡中亚
            // server_Domain: "http://10.3.1.82:8091/",//胡中亚成缆
            // server_Domain: "http://10.3.1.35:8081/",//邵部
            // server_Domain: "http://10.3.0.246:8095/",//王玉
            // server_Domain: "http://10.3.0.246:8096/",//成缆
            // server_Domain: "http://10.3.1.74:8095/",//胡中亚
            // server_Domain: "http://192.168.133.1:8098",//胡中亚
            // server_Domain: "http://10.3.1.63:8095/",//孙鹏
            // server_Domain: "http://10.3.1.114:86/",//马陀
            // server_Domain: "http://10.3.1.78:86/",//马陀

            // server_Domain: "http://192.188.22.100:8095/",//富通服务器

            // server_Domain: "http://10.100.2.11:8095/",//正式富通服务器

            ajax: function(url, settings) {
                var ajaxSettings = {
                    data: settings.data || {},
                    type: settings.type || 'get',
                    async:false,
                    dataType : "jsonp",
                    jsonp: "callbackparam",
                    jsonpCallback:"callback",
                    timeout: settings.timeout || 100000000,
                    success: function(response, status, xhr) {
                        if (settings.success)
                            settings.success(response);
                    }
                };
                url = url.indexOf("http") >= 0 ? url : (xgxx.server_Domain + url);
                $.ajax(url, ajaxSettings);
            }
        };
})(window, $);

//显示loading动画
function showLoading(){
    $('#loading').show();
}
//关闭loading动画
function closeLoading(){
    $('#loading').hide();
}

//定位弹出框
/* 定位到页面中心 */
function adjust(id) {
    var w = $(id).width();
    var h = $(id).height();

    var t = scrollY() + (windowHeight()/2) - (h/2);
    if(t < 0) t = 0;

    var l = scrollX() + (windowWidth()/2) - (w/2);
    if(l < 0) l = 0;

    $(id).css({left: l+'px', top: t+'px'});
}

//浏览器视口的高度
function windowHeight() {
    var de = document.documentElement;

    return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
}

//浏览器视口的宽度
function windowWidth() {
    var de = document.documentElement;

    return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth
}

/* 浏览器垂直滚动位置 */
function scrollY() {
    var de = document.documentElement;

    return self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
}

/* 浏览器水平滚动位置 */
function scrollX() {
    var de = document.documentElement;

    return self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
}






/* 显示遮罩层 */
function showOverlay() {
    $("#overlay").height(pageHeight());
    $("#overlay").width(pageWidth());

    // fadeTo第一个参数为速度，第二个为透明度
    // 多重方式控制透明度，保证兼容性，但也带来修改麻烦的问题
    $("#overlay").fadeTo(200, 0.5);
}

/* 隐藏覆盖层 */
function hideOverlay() {
    $("#overlay").fadeOut(200);
}

/* 当前页面高度 */
function pageHeight() {
    return document.body.scrollHeight;
}

/* 当前页面宽度 */
function pageWidth() {
    return document.body.scrollWidth;
}

//日期格式化  调用示例  var formatDate=Format(d,"yyyy-MM-dd HH:mm:ss");
function Format(now,mask)
{
    var d = now;
    var zeroize = function (value, length)
    {
        if (!length) length = 2;
        value = String(value);
        for (var i = 0, zeros = ''; i < (length - value.length); i++)
        {
            zeros += '0';
        }
        return zeros + value;
    };

    return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function ($0)
    {
        switch ($0)
        {
            case 'd': return d.getDate();
            case 'dd': return zeroize(d.getDate());
            case 'ddd': return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][d.getDay()];
            case 'dddd': return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d.getDay()];
            case 'M': return d.getMonth() + 1;
            case 'MM': return zeroize(d.getMonth() + 1);
            case 'MMM': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
            case 'MMMM': return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][d.getMonth()];
            case 'yy': return String(d.getFullYear()).substr(2);
            case 'yyyy': return d.getFullYear();
            case 'h': return d.getHours() % 12 || 12;
            case 'hh': return zeroize(d.getHours() % 12 || 12);
            case 'H': return d.getHours();
            case 'HH': return zeroize(d.getHours());
            case 'm': return d.getMinutes();
            case 'mm': return zeroize(d.getMinutes());
            case 's': return d.getSeconds();
            case 'ss': return zeroize(d.getSeconds());
            case 'l': return zeroize(d.getMilliseconds(), 3);
            case 'L': var m = d.getMilliseconds();
                if (m > 99) m = Math.round(m / 10);
                return zeroize(m);
            case 'tt': return d.getHours() < 12 ? 'am' : 'pm';
            case 'TT': return d.getHours() < 12 ? 'AM' : 'PM';
            case 'Z': return d.toUTCString().match(/[A-Z]+$/);
            // Return quoted strings with the surrounding quotes removed
            default: return $0.substr(1, $0.length - 2);
        }
    });
};

// 在数组中查找最大值
function arrayMax(arrs) {
    var max = arrs[0];
    for(var i = 1,ilen = arrs.length; i < ilen; i++) {
        if(arrs[i] > max) {
            max = arrs[i];
        }
    }
    return max;
}

//将json数据里的null转化为空
function NullToBlank(jsonData) {
    for(var j=0; j<jsonData.length; j++){
        var obj = jsonData[j];
        for(var i in obj) {
            if(Object.prototype.hasOwnProperty.call(obj,i)) { //过滤
                if(obj[i]==null){
                    obj[i]="";
                }
            }
        }
    }
    return jsonData;
}