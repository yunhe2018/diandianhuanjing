$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
    $("#btnSave").click(function () {
        if ($("#txtEmail").val().length == 0) {
            ShowMesaage("请输入密码");
            return;
        }

        Email.Update()
    });
    //返回
    $("#back_btn").click(function () {
        window.location.replace(g_const_PageURL.AccountSet + "?t=" + Math.random());
    });
});

var Email = {
    api_target: "user_edit_pass",
    api_input: { "new_password": "" },
    Update: function () {
        Email.api_input.new_password = $("#txtEmail").val();

        var s_api_input = JSON.stringify(Email.api_input);
        var obj_data = { "api_input": s_api_input, "api_target": Email.api_target, "api_token": 1 };
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
                window.location.replace(g_const_PageURL.AccountSet + "?t=" + Math.random());
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