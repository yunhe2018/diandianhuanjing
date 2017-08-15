$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
    FooterMenu.Set(4);
    //注册
    $("#btnLogin").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
    });
    $("#li_dfk").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.MyOrder_List + "?order_status=0&t=" + Math.random();
    });
    $("#li_all").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.MyOrder_List + "?order_status=&t=" + Math.random();
    });
    $("#li_download").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.MyOrder_List + "?order_status=2&t=" + Math.random();
    });

    $("#li_history").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.History + "?t=" + Math.random();
    });

    $("#li_collection").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.Collecion + "?&t=" + Math.random();
    });

    $("#li_email").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.Email + "?t=" + Math.random();
    });

    $("#li_msg").click(function () {
        window.location.href = g_const_PageURL.Message + "?t=" + Math.random();
    });

    $("#li_nickname").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.NickName + "?t=" + Math.random();
    });

    $("#li_head").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.Head + "?t=" + Math.random();
    });
    $("#li_step").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.Step + "?t=" + Math.random();
    });
    $("#li_carbon").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.Carbon + "?t=" + Math.random();
    });


    $("#btnset").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.AccountSet + "?t=" + Math.random();
    });
    $("#zhuye").click(function () {
        window.location.href = g_const_PageURL.Index + "?t=" +Math.random();
        });
    $("#loupan").click(function () {
        window.location.href = g_const_PageURL.ProjectList1 + "?p=m&t=" + Math.random();
    });
    $("#buy").click(function () {
        window.location.href = g_const_PageURL.ProjectList1 + "?p=l&t=" + Math.random();
    });
    //UserInfo.Check(Account.LoadInfo);
    User.GetInfo();
});

var Account = {
    LoadInfo: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.YES) {
            $("#divUser").show();
            $("#btnset").show();
            User.GetInfo();
        }
        else {
            $("#btnLogin").show();
        }
    },
};

var User = {
    GetOrderNum: function () {
        var request = $.ajax({
            url: g_APIUTL,
            cache: false,
            method: g_APIMethod,
            data: { "api_input": JSON.stringify({"status":"0"}), "api_target": "order_total", "api_token": g_const_api_token.Wanted },
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
            if (msg.total > 0) {
                $("#em_dfk").html(msg.total > 99 ? "99+" : msg.total);
                $("#em_dfk").show();
            }
        });
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    GetMessageNum: function () {
        var request = $.ajax({
            url: g_APIUTL,
            cache: false,
            method: g_APIMethod,
            data: { "api_input": JSON.stringify({ "is_read": "0" }), "api_target": "message_total", "api_token": g_const_api_token.Wanted },
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
            if (msg.total > 0) {
                $("#em_msg").html(msg.total > 99 ? "99+" : msg.total);
                $("#em_msg").show();
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
                    User.GetOrderNum();
                      User.GetMessageNum();
                    
                    User.Load_Result(msg.resultmessage);
                    $("#divUser").show();
                    $("#btnset").show();
                    $("#btnUserName").show();
                }
                else {
                    //ShowMesaage(msg.resultmessage);
                    $("#btnLogin").show();
                }
            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    Load_Result: function (userinfo) {
        var userMod = JSON.parse(userinfo);
      //  if (userMod.nickName == "") {
            if (userMod.phone) {
                $("#btnUserName").html((userMod.phone.substr(0, 3) + "****" + userMod.phone.substr(7, 4)));
            }
        //}
        //else {
        //    $("#btnUserName").html(userMod.nickName);
        //}
        if (userMod.headPic == "") {
            $("#div_headpic").css("background-image", "url(/img/lnologin@2x.png)");
        }
        else {
            $("#div_headpic").css("background-image", "url(" + userMod.headPic + ")");
        }
    },
};