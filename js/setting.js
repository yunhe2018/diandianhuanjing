$(document).ready(function () {
    //注册
    UseAppFangFa.CaoZuo("refresh", "", "false");
    $("#btnback").click(function () {
        window.location.href = g_const_PageURL.MyAccount + "?t=" + Math.random();
    });
    $("#btnLoginout").click(function () {
        User.Logout();
    });
    $("#li_ResetPassword").click(function () {
        window.location.href = g_const_PageURL.PassWord + "?t=" + Math.random();
    });
    $("#li_HeadPic").click(function () {
        window.location.href = g_const_PageURL.Head + "?t=" + Math.random();
    });
    User.GetInfo();
});

var User = {
    Logout: function () {
        var purl = g_APIUTL_In;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: "t=" + Math.random() + "&action=userlogout",
            dataType: g_APIResponseDataType
        });

        request.done(function (msg) {
            if (msg.resultcode == g_const_Success_Code) {
                AppLoginYYG.Logout();
                window.location.href = g_const_PageURL.MyAccount + "?t=" + Math.random();
            }
            else {
                ShowMesaage(msg.resultmessage);
            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    GetInfo: function () {
        var purl = g_APIUTL_In;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: "t=" + Math.random() + "&action=getuser",
            dataType: g_APIResponseDataType
        });

        request.done(function (msg) {
            if (msg.resultcode) {
                if (msg.resultcode == g_const_Success_Code) {
                    User.Load_Result(msg.resultmessage);
                }
                else {
                    PageUrlConfig.SetUrl();
                    window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
                }
            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    Load_Result: function (userinfo) {
        var userMod = JSON.parse(userinfo);

        if (userMod.phone) {
            $("#span_phone").html((userMod.phone.substr(0, 3) + "****" + userMod.phone.substr(7, 4)));
        }
        
        if (userMod.headPic == "") {
            $("#img_headpic").attr("src", "/img/zuji.png");
        }
        else {
            $("#img_headpic").attr("src", userMod.headPic);
        }
    },
};