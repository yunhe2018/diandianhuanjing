var verifyFlag = g_const_SMSPic_Flag;
var smstype = 4

$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
    //判断是否来源于app的请求
    //fromApp = CheckFromApp.Check();
    //if (CheckFromApp.param.app != "") {
    //    //来源于App的,且不传wxopenid的，隐藏微信登录
    //    if (CheckFromApp.param.wxopenid == "") {
    //        $(".d_other_login").hide();
    //    }
    //}


    //Merchant1.RecordValid();
    if (verifyFlag == 1) {
        $("#li_Verify").show();
        $("#Verify_codeImag").attr("src", "/Ajax/LoginHandler.ashx?action=code");

    }
    else {
        $("#li_Verify").hide();
        $("#Verify_codeImag").attr("src", "");
    }
    $("#btnPhoneRegister").click(function () {
        if (Register.LoadIng == 1) {
            return;
        }
        if ($("#txtPhoneNo").val().length == 0) {
            ShowMesaage(g_const_API_Message["7901"]);
            return;
        }
        if (!isMobile($("#txtPhoneNo").val())) {
            ShowMesaage(g_const_API_Message["7902"]);
            return;
        }
        if ($("#txtValidCode").val().length == 0) {
            ShowMesaage(g_const_API_Message["7802"]);
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
        Register.LoadIng = 1;
        $("#btnPhoneRegister").html("注册中...");
        Register.PhoneRegister()
    });
    //返回
    $("#back_btn").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
    });
    //登录
    $("#btnLogin").click(function () {
        window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
    });
    $("#btnCode").click(function () {
        if (Send_ValidCode.sendingtime > 0) {
            return;
        }
        var phoneNo = $("#txtPhoneNo").val();
        var piccode = $("#txtPicCode").val();
        if (verifyFlag == 1) {
            if (piccode.length == 0) {
                ShowMesaage(g_const_API_Message["8904"]);
                return;
            }
        }
        if (phoneNo.length == 0) {
            ShowMesaage(g_const_API_Message["7901"]);
            return;
        }
        if (!isMobile(phoneNo)) {
            ShowMesaage(g_const_API_Message["7902"]);
            return;
        }
        Register.PhoneCheck()
        //Send_ValidCode.stime(g_const_ValidCodeTime);
    });
    //协议
    $("#span_xy").on("click", function () {
        if (CheckFromApp.param.app == "") {
            window.location.replace(g_const_PageURL.xieyi + "?t=" + Math.random());
        }
        else {
            //App使用
            var ttt = CheckFromApp.UrlAddParam();
            window.location.replace(g_const_PageURL.xieyi + "?t=" + Math.random()+ttt);
        }
    });
    //返回
    $(".d_go_back").click(function () {
        if (CheckFromApp.param.app == "") {
            history.back();
            //window.location.replace(g_const_PageURL.AccountIndex);
        }
        else {
            //App使用
            var ttt = CheckFromApp.UrlAddParam();
            window.location.replace(g_const_PageURL.Login + "?t=" + Math.random() + ttt);
        }

    });
    //$(".d_go_back").on("tap", function () {
    //    //history.back();
    //    window.location.replace(g_const_PageURL.AccountIndex);

    //});

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
    $("#txtPhoneNo").keyup(function () {
        //只能输入数字
        this.value = this.value.replace(/\D/g, '')
        if ($("#txtPhoneNo").val() != "") {
            $("#d_close_tel").show();
        }
        else {
            $("#d_close_tel").hide();
        }
    });
    $("#txtPhoneNo").click(function () {
        //只能输入数字
        this.value = this.value.replace(/\D/g, '')
        if ($("#txtPhoneNo").val() != "") {
            $("#d_close_tel").show();
        }
        else {
            $("#d_close_tel").hide();
        }
    });
    //点击清除
    $("#d_close_tel").click(function () {
        $("#txtPhoneNo").val("");
        $("#d_close_tel").hide();
    });

    //输入显示清除内容
    $("#txtValidCode").keyup(function () {
        if ($("#txtValidCode").val() != "") {
            $("#d_close").show();
        }
        else {
            $("#d_close").hide();
        }
    });
    $("#txtValidCode").click(function () {
        if ($("#txtValidCode").val() != "") {
            $("#d_close").show();
        }
        else {
            $("#d_close").hide();
        }
    });

    //点击清除
    $("#d_close").click(function () {
        $("#txtValidCode").val("");
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
});
//注册
var Register = {
    LoadIng: 0,
    PhoneCheck: function () {
        var phoneNo = $("#txtPhoneNo").val();
        var piccode = $("#txtPicCode").val();
        var action = "validcode";
        Send_ValidCode.SendCodeImgEx(action, phoneNo, piccode, smstype);
    },
    PhoneRegister: function () {
        var purl = g_APIUTL_In;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: "t=" + Math.random() + "&action=phonereg&phoneno=" + $("#txtPhoneNo").val() + "&validcode=" + $("#txtValidCode").val() + "&password=" + $("#txtPass").val(),
            dataType: g_APIResponseDataType
        });

        request.done(function (msg) {
            if (msg.resultcode) {
                if (msg.resultcode == g_const_Success_Code) {
                    Register.Load_Result();
                }
                else {
                    Register.LoadIng = 0;
                    $("#btnPhoneRegister").html("注册");
                    ShowMesaage(msg.resultmessage);
                }
            }
        });

        request.fail(function (jqXHR, textStatus) {
            Register.LoadIng = 0;
            $("#btnPhoneRegister").html("注册");
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    Load_Result: function () {
        window.location.replace(PageUrlConfig.BackTo(1));
    },
};

var Message = {
    ShowToPage: function (message, pageurl, time, str_callback) {
        var backurl = window.location.href;
        if (str_callback != "") {
            if (backurl.indexOf("?") != -1) {
                backurl += "&callback=" + encodeURIComponent(str_callback);
            }
            else {
                backurl += "callback=" + encodeURIComponent(str_callback);
            }
        }

        localStorage[g_const_localStorage.BackURL] = backurl;
        ShowMesaage(message);
        setTimeout("window.location.replace(\"" + pageurl + "\");", time);
    }
};