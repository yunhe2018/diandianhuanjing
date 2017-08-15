//客户端类型
var ClientType = {
    //微信
    WeiXin: 1,
    //苹果客户端
    JYH_Android: 2,
    //安卓客户端
    JYH_iOS: 3,
    //浏览器
    Other: 4
}
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

var GetClientType = function () {
    var ua = navigator.userAgent;
    if (ua.match(/MicroMessenger/i) !== null)
        return ClientType.WeiXin;
    else if (ua.match(/hjy-android/i) !== null)
        return ClientType.JYH_Android;
    else if (ua.match(/hjy-ios/i) !== null)
        return ClientType.JYH_iOS;
    else
        return ClientType.Other;
}

var AppLoginIOS = {
    GetPhoneNo: function () {

        if (typeof (OCModel) !== "undefined") {
            AppLoginYYG.mobile = OCModel.getphonenum();

        }
        else {
            window.setTimeout(AppLoginIOS.GetPhoneNo, 500);

        }
        
        if (AppLoginYYG.mobile != "") {
            AppLoginYYG.AutoLogin();
        }
    }
};


/*APP嵌入页面调用外部调用的关闭窗口、后退和隐藏头部*/
var UseAppFangFa = {
    /*来源*/
    from: "",
    /*目的*/
    to: "",
    /*手机号*/
    mobile: "",
    /*请求时间*/
    t: "",
    /*验签串*/
    mac: "",
    /*关闭窗口[只适用于web请求]*/
    WebCloseWin: function () {
        window.opener = null;
        window.open('', '_self');
        window.close();
    },
    /*是否显示关闭APP窗口按钮*/
    ShowCloseBtn: function (id) {
        var res = false;
        var clientType = GetClientType();
        if (clientType==2) {
            try {
                //隐藏头部【方法报错也不显示】
                UseAppFangFa.CaoZuo("hidehead");
                res = true;
            }
            catch (e) {

            }
        }
        else if (clientType == 3) {
            //ios因为框架原因，导致页面加载时主动调用方法失败，解决方法是提供独立的js方法【function apphidehead()】，ios中主动调用
            //try {
            //    //隐藏头部【方法报错也不显示】
            //    OCModel.hide_head();;
            //    res=true;
            //}
            //catch (e) {

            //}
        }

        //if (res) {
        //    $("#" + id).show();
        //}
        //else {
        //    $("#" + id).hide();
        //}
    },
    /*调用APP提供的方法*/
    CaoZuo: function (type, shareStr, isNeedRefresh) {
        //shareJSON：{"title":"标题","imgUrl":"分享图片","shareContent":"内容","shareUrl":"分享链接"}
        if (!(shareStr == undefined) && type == "share") {
            try {
                shareJSON = JSON.parse(shareStr);
            }
            catch (e) {
                alert("分享内容不是JSON结构,shareStr:" + shareStr);
                return false;

            }
        }
        var clientType = GetClientType();
        //获取来源
        if (clientType==2) {
            UseAppFangFa.from = "android";
            //安卓
            switch (type) {
                case "close":
                    //安卓提供的调用APP关闭窗口方法					
                    window.share.closewindow();
                    break;
                case "back":
                    //安卓提供的调用APP后退方法					
                    window.share.backwindow();
                    break;
                case "hidehead":
                    //安卓提供的调用APP隐藏头部方法					
                    window.share.hidehead();
                    break;
                case "showhead":
                    //安卓提供的调用APP显示头部方法					
                    window.share.showhide();
                    break;
                case "share":
                    //安卓提供的调用APP分享方法					
                    window.share.shareOnDialogAndroid(shareJSON.title, shareJSON.imgUrl, shareJSON.shareContent, shareJSON.shareUrl);
                    break;
                case "refresh":
                    //安卓提供的调用APP刷新方法					
                    window.share.isNeedPullRefresh(isNeedRefresh);
                    break;
                case "recharge":
                    //				
                    window.share.toCarbonrecharge();
                    break;
            }
        }
        else if (clientType == 3) {
            UseAppFangFa.from = "ios";
            //IOS
            switch (type) {
                case "close":
                    //安卓提供的调用APP关闭窗口方法					
                    OCModel.closewindow();
                    break;
                case "back":
                    //安卓提供的调用APP后退方法					
                    OCModel.backwindow();
                    break;
                case "hidehead":
                    //安卓提供的调用APP隐藏头部方法					
                    OCModel.hidehead();
                    break;
                case "showhead":
                    //安卓提供的调用APP显示头部方法				
                    OCModel.showhead();
                    break;
                case "share":
                    //安卓提供的调用APP分享方法,	
                    try {
                        OCModel.shareweb(shareStr);
                        //alert("ios:OCModel.shareweb完毕");
                    }
                    catch (fhhj) {
                        alert("ios:OCModel.shareweb(" + shareStr + ")报错了");

                    }
                case "refresh":
                    //安卓提供的调用APP刷新方法					
                    // OCModel.isNeedPullRefresh(isNeedRefresh);
                    //    alert(11);
                    break;
                case "recharge":
                    //				
                    OCModel.toCarbonrecharge();
                    break;
            }
        }
        else {
            ////web【暂不支持】
            UseAppFangFa.from = "web";
            //UseAppFangFa.mobile = GetQueryString("p");
            //UseAppFangFa.t = GetQueryString("tt");
            //UseAppFangFa.mac = GetQueryString("mac");
            //UseAppFangFa.AutoLogin();
        }


    },
};

/*IOS主动调用隐藏头部方法，解决首页调用IOS隐藏头部方法异常问题*/
function apphidehead() {

        try {
            //alert("ios_主动调用隐藏头部");
            //隐藏头部【方法报错也不显示】
   
            OCModel.hidehead();
            //res = true;
            //if (location.pathname.toLowerCase().indexOf("/index.html") > -1) {
            //    AppLoginIOS.GetPhoneNo();
            //}
            //首页显示关闭窗口层
           // $("#div_appclosewindow").show();
        }
        catch (e) {
            //alert("ios_主动调用隐藏头部报错啦OCModel.hidehead()");
        }

}
function isNeedPullRefresh() {


        try {
            if (location.pathname.toLowerCase().indexOf("loupan1") > -1) {
                return true;
            }
            if (location.pathname.toLowerCase().indexOf("orderlist") > -1) {
                return true;
            }
            if (location.pathname.toLowerCase().indexOf("index.html") > -1) {
                return true;
            }
        }
        catch (e) {
            return false;
        }

}

/*设置微信中分享内容*/
function SetWXShare(title, desc, picurl, gourl) {

    var shareurl = window.location.href;// "http://" + window.location.host + window.location.pathname;
    //var shareparam = "";
    //shareparam += "&_r=" + Math.random().toString();
    if (!(gourl == undefined)) {
        shareurl = gourl;
    }

    var clientType = GetClientType();

    //if ((CheckMachine.versions.android || (CheckMachine.versions.ios || CheckMachine.versions.iPhone || CheckMachine.versions.iPad)) && !CheckMachine.versions.inWeiXin && (clientType == ClientType.JYH_Android || clientType == ClientType.JYH_iOS)) {
        //调用 安卓\ios的分享方法
        try {

            //if (!($(".share") == undefined)) {
                //$(".share").show();
                //注册点击分享方法
                //$(".share").on("click", function () {
                var sharStr = "{\"title\":\"" + title + "\",\"imgUrl\":\"" + picurl + "\",\"shareContent\":\"" + desc + "\",\"shareUrl\":\"" + shareurl + "\"}";
                UseAppFangFa.CaoZuo("share", sharStr);
                //});
            //}
        }
        catch (e) {

        }
    //}
    //else {
    //    //if (!($(".share") == undefined)) {
    //    //    ////注册点击分享方法
    //    //    //$("#sharebtn_ego").on("tap", function () {

    //    //    //});
    //    //    $(".share").hide();
    //    //}
    //    //微信分享
    //    if (IsInWeiXin.check()) {
    //        try {
    //            var phoneno = "";

    //            WX_JSAPI.wx = wx;
    //            WX_JSAPI.wxparam.debug = false;
    //            WX_JSAPI.dataUrl = "";
    //            WX_JSAPI.desc = desc;// "谁再说我out我跟谁急，瞅你那损色，我没玩过的多了，这算老几...";
    //            WX_JSAPI.imgUrl = picurl;
    //            WX_JSAPI.link = shareurl;// + "?" + shareparam;
    //            WX_JSAPI.title = title;//"一元夺宝";
    //            WX_JSAPI.type = "";
    //            WX_JSAPI.LoadParam(g_const_wx_AllShare);
    //        }
    //        catch (e) { }
    //    }
    //}
}