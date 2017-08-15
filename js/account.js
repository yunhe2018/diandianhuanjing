$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
    FooterMenu.Set(4);
    //注册
    $("#btnLogin").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
    });
    //$("#li_dfk").click(function () {
    //    PageUrlConfig.SetUrl();
    //    window.location.href = g_const_PageURL.MyOrder_List + "?order_status=0&t=" + Math.random();
    //});
    //$("#li_all").click(function () {
    //   PageUrlConfig.SetUrl();
    //    window.location.href = g_const_PageURL.MyOrder_List + "?order_status=&t=" + Math.random();
    //});
    //以下三个链接未确定
    $("#report").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.MyOrder_List + "?order_status=0&t=" + Math.random();
    });
    $("#product").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.Order_List + "?order_status=0&t=" + Math.random();
    });


    $("#li_sc").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.SProduct_List + "?t=" + Math.random();
    });  
    $("#li_history").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.History + "?t=" + Math.random();
    });
    $("#li_question").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.History + "?t=" + Math.random();
    });
    //$("#li_download").click(function () {
    //    PageUrlConfig.SetUrl();
    //    window.location.href = g_const_PageURL.MyOrder_List + "?order_status=2&t=" + Math.random();
    //});

    //$("#li_history").click(function () {
    //    PageUrlConfig.SetUrl();
    //    window.location.href = g_const_PageURL.History + "?t=" + Math.random();
    //});

    //$("#li_collection").click(function () {
    //    PageUrlConfig.SetUrl();
    //    window.location.href = g_const_PageURL.Collecion + "?&t=" + Math.random();
    //});

    //$("#li_email").click(function () {
    //    PageUrlConfig.SetUrl();
    //    window.location.href = g_const_PageURL.Email + "?t=" + Math.random();
   // });

    //$("#li_msg").click(function () {
    //    window.location.href = g_const_PageURL.Message + "?t=" + Math.random();
    //});

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
    //$("#li_carbon").click(function () {
    //    PageUrlConfig.SetUrl();
    //    window.location.href = g_const_PageURL.Carbon + "?t=" + Math.random();
    //});


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
    UserInfo.Check(Account.LoadInfo);
    //User.GetInfo();
});

var Account = {
    LoadInfo: function () {
        var htmlStr = "";
        if (UserInfo.LoginStatus == g_const_YesOrNo.YES) {
            $("#divUser").show();
            $("#btnset").show();
            //登录后点击头像+账户区域跳转至设置-主页
            $("#atcHead").click(function () {
                PageUrlConfig.SetUrl();
                window.location.href = g_const_PageURL.AccountSet + "?t=" + Math.random();
            });
            
            $("#li_gz").click(function () {
                PageUrlConfig.SetUrl();
                window.location.href = g_const_PageURL.History + "?t=" + Math.random();
            });
            User.GetInfo();


        }
        else {
            $("#btnLogin").show();
            $("#div_Login").attr("class", "noLogin");
            $("#p_balance_login").attr("class", "loginTip");
            $("#p_balance_login").html("登录后可查看碳币余额");
            $("#span_noLogin").show();
          //  $("#report", "#product", "#li_gz").click(Account.LoginHerf());
        }
        //$("#tanbi").html(htmlStr);              
    },
    LoginHerf: function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
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
        User.GetOrderNum();
        User.GetMessageNum();
        var request = $.ajax({
            url: g_APIUTL,
            cache: false,
            method: g_APIMethod,
            data: { "api_input": JSON.stringify({ "status": "0" }), "api_target": "user_data", "api_token": g_const_api_token.Wanted },
            dataType: g_APIResponseDataType
        });

        request.done(function (msg) {

                if (msg.resultCode == g_const_Success_Code) {
                      User.Load_Result(msg.user);
                    $("#divUser").show();
                    $("#btnset").show();
                    $("#btnUserName").show();
                }
                else {
                    //ShowMesaage(msg.resultmessage);
                    $("#btnLogin").show();
                }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    Load_Result: function (userinfo) {


        $("#btnUserName").html((userinfo.phone.substr(0, 3) + "****" + userinfo.phone.substr(7, 4)));

        if (userinfo.headPic == "") {
            $("#div_headpic").css("background-image", "url(/img/lnologin@2x.png)");
        }
        else {
            $("#div_headpic").css("background-image", "url(" + userinfo.headPic + ")");
        }
        $("#p_balance_login").html(userinfo.carbonMoney);
        $("#p_balance_login").click(function () {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.CarbonDetailAll + "?t=" + Math.random();
        });
        var balanceStr = "<div class=\"books\"><span class=\"in\" id=\"span_last_in\">昨日收入:<i>+" + userinfo.income + "</i></span><span class=\"out\" id=\"span_last_out\">昨日支出:<i>-" + userinfo.expense + "</i></span></div>";
        $("#div_balance").html(balanceStr);
        $("#div_balance").show();
        $("#div_Login").attr("class", "Logined");
        $("#p_balance_login").attr("class", "balance");
        $("#span_last_in").click(function () {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.CarbonDetailType + "?type=DC170208100002&t=" + Math.random();
        });
        $("#span_last_out").click(function () {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.CarbonDetailType + "?type=DC170208100003&t=" + Math.random();
        });
    },
};