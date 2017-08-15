$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
    $("#btnSave").click(function () {
        if ($("#txtEmail").val().length == 0) {
            ShowMesaage("请输入邮箱");
            return;
        }
        if (!isEmail($("#txtEmail").val())) {
            ShowMesaage("邮箱格式不正确");
            return;
        }
        Email.Update()
    });
    //返回
    $("#back_btn").click(function () {
        window.location.replace(g_const_PageURL.MyAccount + "?t=" + Math.random());
    });
});

var Email = {
    Update: function () {
        var obj_data = { "api_input": JSON.stringify({ "email": $("#txtEmail").val() }), "api_target": "user_edit_email", "api_token": 1 };
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
                ShowMesaage("邮箱修改成功");
            }
            else {
                ShowMesaage(msg.resultMessage);
            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
};