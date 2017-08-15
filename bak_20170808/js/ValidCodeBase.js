//获取验证码
var Send_ValidCode = {
    MerchantID:"",
    SendCodeImgEx: function (codeaction, phoneno, piccode,smstype) {
        var purl = g_APIUTL_In;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: "t=" + Math.random() + "&action=" + codeaction + "&mobileno=" + phoneno + "&piccode=" + piccode + "&smstype=" + smstype,
            dataType: "json"
        });

        request.done(function (msg) {
            
            if (msg.resultcode == g_const_Success_Code_IN) {
                if (codeaction == "loginvalidcode" ) {
                    Send_ValidCode.stime(g_const_ValidCodeTime);
                }
                else {
                    Send_ValidCode.stime(g_const_ValidCodeTime);
                }

                ShowMesaage(g_const_API_Message["7801"]);
            }
            else {
                //if (codeaction == "lqfxtqvalidcode") {
                //    $("#div_step1").show();
                //    $("#div_step2").hide();
                //}
                ToggleCode("Verify_codeImag", '/Ajax/LoginHandler.ashx');
                ShowMesaage(msg.resultmessage);
            }
            
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    sendingtime:0,
    stime: function (count) {
        Send_ValidCode.sendingtime = count;
        if (count == 0) {
            ToggleCode("Verify_codeImag", '/Ajax/LoginHandler.ashx');
          //  $('#btnCode').attr("class", "sendCode");
            $('#btnCode').html('获取验证码');
            return false;
        } else {
         //   $('#btnCode').attr("class", "sendCode disabled");
            $('#btnCode').html(count + 's后重发');
            count--;
        }
        setTimeout(function () { Send_ValidCode.stime(count); }, 1000)
    },
};

//=============================切换验证码======================================
function ToggleCode(obj, codeurl) {
    //$("#txtCode").val("");
    $("#" + obj).attr("src", codeurl + "?action=code&time=" + Math.random());
}