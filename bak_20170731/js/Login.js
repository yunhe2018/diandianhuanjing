

$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
    //密码登录
    $("#btnToLogin").click(function () {
        if (UserLogin.LoadIng == 1) {
            return;
        }
        if ($("#txtLogin").val().length == 0) {
            ShowMesaage(g_const_API_Message["7901"]);
            return;
        }
        if (!isMobile($("#txtLogin").val())) {
            ShowMesaage(g_const_API_Message["7902"]);
            return;
        }
        if ($("#txtPass").val().length == 0) {
            ShowMesaage(g_const_API_Message["7903"]);
            return;
        }
        if ($("#txtPass").val().length < 6 || $("#txtPass").val().length > 16 || $("#txtPass").val().indexOf(' ') > -1) {
            ShowMesaage(g_const_API_Message["7904"]);
            return;
        }
        UserLogin.LoadIng = 1;
        $("#btnToLogin").html("登录中...");
        //if (CheckFromApp.param.app == "") {
            //微信商城使用
            UserLogin.Main()
        //}
        //else {
        //    //App跳转使用
        //    AppLogin.userlogin(String.Replace($("#txtLogin").val()), String.Replace($("#txtPass").val()));
        //}
    });

    //返回
    $("#back_btn").click(function () {
        //window.location.replace(PageUrlConfig.BackTo(1));
        window.location.href = g_const_PageURL.MyAccount + "?t=" + Math.random();
    });
    //注册
    $("#btnReg").click(function () {
        window.location.href = g_const_PageURL.Reg + "?t=" + Math.random();
    });


    //忘记密码
    $("#btnPhoneLogin").click(function () {
        window.location.href = g_const_PageURL.PhoneLogin + "?t=" + Math.random();
    });

    //密码是否可见
    $("#d_emp").click(function () {
        if ($("#txtPass").attr("type") == "password") {
            //密码可见
            $("#txtPass").attr("type", "text");
            $("#d_emp").removeClass("d_emp");
        }
        else {
            //密码隐藏
            $("#txtPass").attr("type", "password");
            $("#d_emp").attr("class", "d_emp");
        }
    });
    //输入显示清除内容
    $("#txtLogin").keyup(function () {
        //只能输入数字
        this.value = this.value.replace(/\D/g, '')
        if ($("#txtLogin").val() != "") {
            $("#d_close").show();
        }
        else {
            $("#d_close").hide();
        }
    });

    $("#txtLogin").click(function () {
        //只能输入数字
        this.value = this.value.replace(/\D/g, '')
        if ($("#txtLogin").val() != "") {
            $("#d_close").show();
        }
        else {
            $("#d_close").hide();
        }
    });

    //点击清除
    $("#d_close").click(function () {
        $("#txtLogin").val("");
        $("#d_close").hide();
    });


    //输入显示清除内容
    $("#txtPass").keyup(function () {
        if ($("#txtPass").val() != "") {
            $("#d_close_psw").show();
        }
        else {
            $("#d_close_psw").hide();
        }

    });

    $("#txtPass").click(function () {
        if ($("#txtPass").val() != "") {
            $("#d_close_psw").show();
        }
        else {
            $("#d_close_psw").hide();
        }
    });


    //点击清除
    $("#d_close_psw").click(function () {
        $("#txtPass").val("");
        $("#d_close_psw").hide();
    });



    //取消操作
    $(".btns a").on("click", function (e) {
        var objthis = e.target;
        switch ($(objthis).attr("operate")) {
            case "yes":
                //返回提交前的页面
                if (localStorage.getItem(g_const_localStorage.BackURL).length > 0) {
                    pageurl = localStorage.getItem(g_const_localStorage.BackURL);
                }
                else {
                    pageurl = "/";
                }
                //location = pageurl;
                window.location.replace(pageurl);

                break;

        }

    });

    $("#txtLogin").focus();


    //微信登录
    $("#weixin_login").click(function () {
        window.location.replace(g_const_PageURL.OauthLogin + "?oauthtype=WeiXin&gobackurlaa=" + Base64.base64encode(PageUrlConfig.BackTo(1)));
    });
    //QQ登录
    $("#qq_login").click(function () {
        window.location.replace("/loginother.html?oauthtype=QQ&gobackurlaa=" + Base64.base64encode(PageUrlConfig.BackTo(1)));
    });
    //微博登录
    $("#weibo_login").click(function () {
        window.location.replace("/loginother.html?oauthtype=WeiBo&gobackurlaa=" + Base64.base64encode(PageUrlConfig.BackTo(1)));
    });
    //支付宝登录
    $("#alipay_login").click(function () {
        window.location.replace("/loginother.html?oauthtype=AliPay&gobackurlaa=" + Base64.base64encode(PageUrlConfig.BackTo(1)));
    });
    var clientType = GetClientType();
    switch (clientType) {
        case 1:
            $("#weixin_login").show();
            break;
        case 2:
        case 3:
          //  $("#weixin_login").show();
           // $("#qq_login").show();
            $("#weibo_login").show();
            $("#alipay_login").show();
            break;
        case 4:
         //   $("#qq_login").show();
            $("#weibo_login").show();
            $("#alipay_login").show();
            break;
    }
});

var UserLogin = {
    LoadIng:0,
    api_target: "user_login",
    api_input: { "phone": "", "password": "" },
    Main: function () {
        UserLogin.api_input.phone = $("#txtLogin").val();
        UserLogin.api_input.password = $("#txtPass").val();
        var s_api_input = JSON.stringify(UserLogin.api_input);
        var obj_data = { "api_input": s_api_input, "api_target": UserLogin.api_target, "api_token": 0 };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });

        request.done(function (msg) {
            if (msg.resultCode == g_const_Success_Code) {
                UserLogin.Load_List(msg);
            }
            else {
                UserLogin.LoadIng = 0;
                $("#btnToLogin").html("登录");
                ShowMesaage(msg.resultMessage);
            }
        });

        request.fail(function (jqXHR, textStatus) {
            UserLogin.LoadIng = 0;
            $("#btnToLogin").html("登录");
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },

    Load_List: function (msg) {
        try {
            AppLoginYYG.SaveInfo(UserLogin.api_input.phone);
        } catch (e) {

        }
        window.location.replace(PageUrlConfig.BackTo(1));
    },

};


var Message = {
    ShowToPage: function (message, pageurl, time, str_callback) {
        ShowMesaage(message);
        setTimeout("window.location.replace( \"" + pageurl + "\");", time);

    }
};


/*使用微信jsapi获取当前地址*/
var GetLocation = {
    /*获取当前地址*/
    SetWXGetLocation: function () {
        if (IsInWeiXin.check()) {
            WX_JSAPI_T.wx = wx;
            WX_JSAPI_T.wxparam.debug = false;
            WX_JSAPI_T.jsApiList = g_const_wx_jsapi.getLocation;
            //点击按钮的回调方法[不在此处执行回调]
            WX_JSAPI_T.func_CallBack = "";
            WX_JSAPI_T.LoadParam(g_const_wx_jsapi.getLocation);
        }
    },
};




