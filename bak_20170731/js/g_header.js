/// <reference path="jquery-2.1.4.js" />
/// <reference path="functions/g_Const.js" />
/// <reference path="functions/g_Type.js" />

//接口相关参数--开始
/*接口外部地址*/var g_APIUTL = "/Ajax/API.aspx";
/*接口外部地址*/var g_APIUTL_In = "/Ajax/API_In.aspx";
/*接口Method*/var g_APIMethod = "POST";
/*接口响应数据格式*/var g_APIResponseDataType = "json";
//接口相关参数--结束

/*是否是测试*/var IsDebug = false;

String.prototype.Trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.Replace = function (postStr) {
    postStr = postStr.replace(/%/g, "%25");
    postStr = postStr.replace(/\&/g, "%26");
    postStr = postStr.replace(/\+/g, "%2B");
    postStr = postStr.replace(/\//g, "%2f");
    return postStr;
}

String.DelHtmlTag = function (str) {
    return str.replace(/<[^>]+>/g, "");//去掉所有的html标记
}


Date.prototype.Format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Date.prototype.AddDays = function (days) {
    var day = 86400000;
    return new Date(this.getTime() + days * day);
}
Date.prototype.AddMinutes = function (minutes) {
    var minute = g_const_minutes;
    return new Date(this.getTime() + minutes * minute);
}
Date.prototype.AddSeconds = function (seconds) {
    var second = g_const_seconds;
    return new Date(this.getTime() + seconds * second);
}
//将指定的月份数加到此实例的值上 
Date.prototype.addMonths = function (value) {
    var month = this.getMonth();
    this.setMonth(month + value);
    return this;
};
Date.Parse = function (sdatetime) {
    var day = 86400000;
    //"yyyy-MM-dd HH:mm:ss";
    var arrDate = sdatetime.split(/-|:| /ig);   
    var objDate = new Date(parseInt(arrDate[0], 10), parseInt(arrDate[1], 10) - 1, parseInt(arrDate[2], 10), parseInt(arrDate[3], 10), parseInt(arrDate[4], 10), parseInt(arrDate[5], 10));
    return objDate;
}

function ShowMesaage(sMessage) {
    new Toast({ context: $('body'), message: sMessage, top: '50%' }).show();
}
function ShowMesaageCallback(sMessage, callback,times) {
    new Toast({ context: $('body'), message: sMessage, top: '50%' }).show();

    setTimeout(callback, times);
    //if (typeof (callback) == "function")
    //    callback();
}
function GetQueryString(name) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)', "ig").exec(window.location.href);
    if (results != null)
        return results[1];
    else
        return "";
}
function renderTemplate(template, data) {
    var s = template.replace(g_const_regex_template, function (fullMatch, capture) {
        if (data[capture])
           return data[capture];
        else
           return "";
    });
    return s;
}
function FormatText(s, l) {
    if (s == "") {
        return "&nbsp;";
    } else {
        return s;
    }

    //if (s.Trim().length > l)
    //    return s.substr(0, l) + "...";
    //else
    //    return s;
}
function GetWeekName(day) {
    switch (day)
    {
        case 0:
            return "周日";
        case 1:
            return "周一";
        case 2:
            return "周二";
        case 3:
            return "周三";
        case 4:
            return "周四";
        case 5:
            return "周五";
        case 6:
            return "周六";
    }
}
/*根据链接类型转换链接地址,t:‘显示更多’链接类型(g_const_showmoreLinktype),u:目标*/
var g_GetLocationByShowmoreLinktype= function(t,u){
    var _r = Math.random().toString();
    var sreturn = "";
    if (u.Trim().length > 0) {
        switch (t) {
            case g_const_showmoreLinktype.URL:                
                sreturn = u;
                break;
            case g_const_showmoreLinktype.ProductDetail:
                sreturn = "/Product_Detail.html?pid=" + u;
                break;
            case g_const_showmoreLinktype.ProductType:
                sreturn = "/Product_List.html?showtype=category&keyword=" + u;
            case g_const_showmoreLinktype.KeyWordSearch:
                sreturn = "/Product_List.html?keyword=" + encodeURIComponent(u);
                break;
                /*396 首页H5弹层*/
            case g_const_showmoreLinktype.IndexH5:
                sreturn = "Action396H5.ShowH5()";
                break;
            case g_const_showmoreLinktype.ShowLayer:
            default:
                return "javascript:void(0);";
        }
    
        if (t != g_const_showmoreLinktype.IndexH5) {
            if (sreturn.indexOf("?") != -1)
                sreturn += "&_r=" + _r;
            else
                sreturn += "?_r=" + _r;
        }
    }
    else
        sreturn = "javascript:void(0);";
    return sreturn;
}
function g_GetPictrue(picurl) {
    if (picurl == "")
        return g_goods_Pic;
    else
        return picurl;
}
function g_GetBrandPictrue(picurl) {
    if (picurl == "")
        return g_brand_Pic;
    else
        return picurl;
}

function g_GetMemberPictrue(picurl) {
    if (picurl == "")
        return g_member_Pic;
    else
        return picurl;
}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

function getFormatDate(dateDstr, formatStr) {
    var str = dateDstr.replace(/-/g, "/");
    return date = new Date(str).Format(formatStr);
}
var PageBack = {
    //传入地址
    SetUrl: function (url) {
        //if (localStorage.getItem(g_const_localStorage.BackURLList) != null) {
        //    g_const_BackUrlList = localStorage.getItem(g_const_localStorage.BackURLList).split(',');
        //}
        ////判断左后一个页面是否和传入的url一致，不同时保存，相同则忽略
        //if (g_const_BackUrlList[g_const_BackUrlList.length - 1] != url) {
        //    g_const_BackUrlList.push(url);
        //    localStorage[g_const_localStorage.BackURLList] = g_const_BackUrlList;
        //}
        //    location = pageurl;
    },
    //传入步骤
    BackTo: function (num) {
        var pageurl = "/index.html";
        //if (localStorage.getItem(g_const_localStorage.BackURLList) != null) {
        //    g_const_BackUrlList = localStorage.getItem(g_const_localStorage.BackURLList).split(',');
        //}
        //if (g_const_BackUrlList.length > 0) {
        //    if (!num) {
        //        num = 1;
        //    }
        //    pageurl = g_const_BackUrlList[g_const_BackUrlList.length - num];
        //    for (var i = 0; i < num; i++) {
        //        g_const_BackUrlList.pop();
        //    }
        //    localStorage[g_const_localStorage.BackURLList] = g_const_BackUrlList.join(",");;
        //}
        //// location = pageurl;
        return pageurl;
    },
    //传入地址
    Clear: function () {
        //g_const_BackUrlList = [];
        //g_const_BackUrlList.push("/index.html");
        //localStorage[g_const_localStorage.BackURLList] = g_const_BackUrlList.join(",");;
    },
};
var PageUrlConfig = {
    //获取跳转地址
    GetSource: function (source, currurl) {
        $.each(g_const_PageUrlConfig, function (i, item) {
            if (item[0] == source && item[1] == currurl) {
                localStorage[g_const_localStorage.PageUrlConfig] = item[0];
            }
        })
        
    },
    //获取返回地址
    GetBack: function (url) {
        // location = pageurl;
        return localStorage[g_const_localStorage.PageUrlConfig];
    },
    //传入地址
    SetUrl: function (url) {
        if (url==null||url=="") {
            url = location.pathname+location.search;
        }
        if (localStorage.getItem(g_const_localStorage.PagePathList) != null && localStorage.getItem(g_const_localStorage.PagePathList).length>0) {
            g_const_PagePathList = localStorage.getItem(g_const_localStorage.PagePathList).split(',');
        }

        if (g_const_PagePathList[g_const_PagePathList.length - 1] != url) {
            g_const_PagePathList.push(url);
            localStorage[g_const_localStorage.PagePathList] = g_const_PagePathList;
        }
    },
    //传入步骤
    //传入步骤
    BackTo: function (num) {
        var pageurl = "/index.html";
        if (localStorage.getItem(g_const_localStorage.PagePathList) != null) {
            g_const_PagePathList = localStorage.getItem(g_const_localStorage.PagePathList).split(',');
        }
        if (g_const_PagePathList.length > 0) {
            if (!num) {
                num = 1;
            }
            pageurl = g_const_PagePathList[g_const_PagePathList.length - num];
            for (var i = 0; i < num; i++) {
                if (!(pageurl == "/index.html" || pageurl == "/")) {
                    g_const_PagePathList.pop();
                }
            }
            localStorage[g_const_localStorage.PagePathList] = g_const_PagePathList.join(",");;
        }
        // location = pageurl;
        return pageurl;
    },
    //传入地址
    Clear: function () {
        g_const_PagePathList = ["/index.html"];
        localStorage[g_const_localStorage.PagePathList] = g_const_PagePathList.join(",");;
        localStorage["selpaytype"] = "";
    },
};
var WxInfo = {
    GetPayID: function (url) {
        var backurl = url;
        if (backurl.indexOf("?")>-1) {
            backurl += "&showwxpaytitle=1";
        }
        else{
            backurl += "?showwxpaytitle=1";

        }
        window.location.replace(g_const_PageURL.OauthLogin + "?oauthtype=WeiXin&returnurl=" + encodeURIComponent(backurl) + "&scope=b&ispay=1");
    },
};

//保存跳转支付宝点击数
var SaveClickNum = {
    save: function (url,clienttype,other) {
        var source = url;
        $.ajax({
            type: "POST",//用POST方式传输
            dataType: "text",//数据格式:JSON
            url: '/Ajax/API.aspx',//目标地址
            data: "t=" + Math.random() +
                    "&action=sourceclicknum" +
                    "&source=" + escape(source) +
                    "&clienttype=" + escape(clienttype)+
                    "&other=" + escape(other),
            beforeSend: function () { },//发送数据之前
            complete: function () {  },//接收数据完毕
            success: function (data) {
            }
        });
    },
};

//判断是否为微信浏览器
var IsInWeiXin = {
    check: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
};

//检测登录
var UserInfo = {
    Check: function (callback) {
        //判断来源，安卓和ios且不再微信中时，表示是在APP中
        //alert("进入type.js的UserLogin.Check")
        //if (GroupPhone_LinShi.AppUseOnly(false, callback)) {
        //    //alert("进入type.js的UserLogin.Check,符合条件，等待抓取手机号和登录")
        //}
        //else {
        //alert("进入type.js的UserLogin.Check,不是APP调用，正常操作");
        var purl = g_APIUTL_In;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: "t=" + Math.random() + "&action=checklogin",
            dataType: "json"
        });
        request.done(function (msg) {

            //登录状态 0 未登录； 1 已登录
            if (msg.resultcode == g_const_Success_Code_IN) {
                UserInfo.LoginStatus = g_const_YesOrNo.YES;
                UserInfo.LoginName = msg.resultmessage;
            }
            else {
                UserInfo.LoginStatus = g_const_YesOrNo.NO;
            }
            if (typeof (callback) == "function")
                callback();
        });

        request.fail(function (jqXHR, textStatus) {
            //ShowMesaage(g_const_API_Message["7001"]);
        });
        //}
    },
    LoginStatus: 0,
    LoginName: "",
};

var Message = {
    ShowToPage: function (message, pageurl, time, str_callback, setbackurl) {
        var backurl = window.location.href;
        if (str_callback != "") {
            if (backurl.indexOf("?") != -1) {
                backurl += "&callback=" + encodeURIComponent(str_callback);
            }
            else {
                backurl += "callback=" + encodeURIComponent(str_callback);
            }
        }

        if (setbackurl) {
            backurl = setbackurl;
        }
        localStorage[g_const_localStorage.BackURL] = backurl;
        PageUrlConfig.SetUrl(backurl);

        if (message != "") {
            ShowMesaage(message);
        }
        setTimeout("window.location.replace(\"" + pageurl + "\");", time);
    },
};

var g_type_loginjs = {
    /*登陆会员信息*/
    Member: {
        Member: {
            /*账号绑定类型*/
            accounttype: g_const_accounttype.ICHSY,
            /*来源*/
            from: "",
            /*手机号*/
            phone: "",
            /*三方绑定唯一编号*/
            uid: ""
        }
    },
    /*登陆成功后要调用的方法数组*/
    calls: [],
    /*登陆成功后要转向的地址*/
    returnurl: "",
    /*登陆会员绑定信息到前台缓存*/
    SetMemberInfo: function () {
        try {
            localStorage[g_const_localStorage.Member] = JSON.stringify(g_type_loginjs.Member);
            return true;
        }
        catch (e) {
            //alert('本地缓存已满')
            localStorage.clear();
            return false;
        }
    },
    /*执行*/
    Execute: function (str_loginjs) {
        if (str_loginjs != '') {
            $("body").css("display", "none");
            var loginjs;
            eval('loginjs=' + str_loginjs);
            g_type_loginjs.returnurl = loginjs.returnurl;
            g_type_loginjs.Member.Member = loginjs.Member;
            for (var k in loginjs.calls) {
                var call = loginjs.calls[k];
                eval(call);
            }
            //同步本地缓存浏览历史记录
            //g_type_history.AddToServer();

            //if (loginjs.Member.phone != "")
            //    g_type_cart.Upload(g_type_loginjs.AfterCartUpload);
            //else
            g_type_loginjs.AfterCartUpload();
        }
    },
    /*同步购物车完成执行的操作*/
    AfterCartUpload: function (msg) {
        if (g_type_loginjs.SetMemberInfo()) {
            if (g_type_loginjs.returnurl != "") {
                var rurl = g_type_loginjs.returnurl;
                var r = rurl.split("^");
                var shortkey = r[0];
                if (typeof (ShortURL) != "undefined") {
                    for (var k in ShortURL) {
                        var shorturl = ShortURL[k];
                        if (shortkey.Trim() == shorturl.key.Trim()) {
                            rurl = shorturl.value;
                            break;
                        }
                    }
                }
                window.location.replace(rurl);
            }
        }
    }
};

/*Base64编码和解码*/
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
var Base64 = {

    /** 
     * base64编码 
     * @param {Object} str 
     */
    base64encode: function (str) {
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    },
    /** 
     * base64解码 
     * @param {Object} str 
     */
    base64decode: function (str) {
        var c1, c2, c3, c4;
        var i, len, out;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            /* c1 */
            do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            }
            while (i < len && c1 == -1);
            if (c1 == -1)
                break;
            /* c2 */
            do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            }
            while (i < len && c2 == -1);
            if (c2 == -1)
                break;
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
            /* c3 */
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61)
                    return out;
                c3 = base64DecodeChars[c3];
            }
            while (i < len && c3 == -1);
            if (c3 == -1)
                break;
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
            /* c4 */
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61)
                    return out;
                c4 = base64DecodeChars[c4];
            }
            while (i < len && c4 == -1);
            if (c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    },
    /** 
     * utf16转utf8 
     * @param {Object} str 
     */
    utf16to8: function (str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            }
            else
                if (c > 0x07FF) {
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                }
                else {
                    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                }
        }
        return out;
    },
    /** 
     * utf8转utf16 
     * @param {Object} str 
     */
    utf8to16: function (str) {
        var out, i, len, c;
        var char2, char3;
        out = "";
        len = str.length;
        i = 0;
        while (i < len) {
            c = str.charCodeAt(i++);
            switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    // 0xxxxxxx  
                    out += str.charAt(i - 1);
                    break;
                case 12:
                case 13:
                    // 110x xxxx 10xx xxxx  
                    char2 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx10xx xxxx10xx xxxx  
                    char2 = str.charCodeAt(i++);
                    char3 = str.charCodeAt(i++);
                    out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    },
};

var CheckMachine = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return { //移动终端浏览器版本信息  
            trident: u.indexOf('Trident') > -1, //IE内核 
            presto: u.indexOf('Presto') > -1, //opera内核 
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核 
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端 
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器 
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器 
            iPad: u.indexOf('iPad') > -1, //是否iPad 
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部 ,
            inWeiXin: window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}