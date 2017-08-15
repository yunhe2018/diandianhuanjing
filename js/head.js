$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
    $("#btnSave").click(function () {
        if (Head.api_input.headPic.length == 0) {
            ShowMesaage("请选择头像");
            return;
        }
        Head.Update();
    });
    $("#img_head").click(function () {
        Head.ChoosePic();
    });
    //返回
    $("#back_btn").click(function () {
        window.location.replace(g_const_PageURL.AccountSet + "?t=" + Math.random());
    });
    //登录
    $("#btnLogin").click(function () {
        window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
    });
});

var Head = {
    api_target: "user_edit_pic",
    api_input: { "headPic": "" },
    Update: function () {
        var s_api_input = JSON.stringify(Head.api_input);
        var obj_data = { "api_input": s_api_input, "api_target": Head.api_target, "api_token": 1 };
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
                Message.ShowToPage("头像修改成功，请重新登录后查看。", g_const_PageURL.AccountSet + "?t=" + Math.random(), 2000, "");
            }
            else {
                ShowMesaage(msg.resultMessage);
            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    ChoosePic: function () {
        var temp_html = "<form id=\"upLoadImg_Head\" method=\"post\" action=\"/Ajax/API_In.aspx?action=uploadimg_head&fileid=txtHead\" enctype=\"multipart/form-data\">"
                + "<div style=\"display:none;\"><input type=\"file\" name=\"txtHead\" id=\"txtHead\" onchange=\"UploadPro.UpLoadImg('upLoadImg_Head', Head.SetPic);\" value=\"\"  style=\"\"></div>"
                + "</form>";
        $("#div_upload").before(temp_html);
        $("#txtHead").trigger("click");
    },
    SetPic: function (formid,imgUrl) {
        $("#img_head").attr("src", imgUrl);
        $("#hidHead").val(imgUrl);
        Head.api_input.headPic = imgUrl;
        
    },
};

var UploadPro = {
    /*支持类型*/
    ImgType: [".jpg", ".jpeg", ".png"],
    /*支持类型文字*/
    ImgTypeStr: "JPG、PNG、JPEG",
    ImgIndex: "",
    /*基于jquery.form.min.js的 上传图片
    FormID：FormID
    FileControlName:file控件ID
    ShowControlID:显示上传图片控件ID
    */
    UpLoadImg: function (FormID, callback) {

        var $form = $("#" + FormID);
        var options = {
            dataType: "json",
            beforeSubmit: function () {
                var file = $form.find("input[type=file]").val();
                if (file.length > 0) {
                    var exName = file.substring(file.lastIndexOf('.'), file.length);
                    var isFind = UploadPro.ImgType.indexOf(exName.toLowerCase());
                    if (isFind == -1) {
                        ShowMesaage("上传图片类型错误，请重新选择。</br>仅支持" + UploadPro.ImgTypeStr + "格式。");
                        return false;
                    }
                }
                else {
                    return false;
                }
            },
            success: function (result) {
                if (result.resultcode == 0) {
                    if (typeof callback == "function") {
                        callback(FormID, result.resultmessage);
                    }
                }
                else {
                    ShowMesaage(result.resultmessage);
                }
            },
            error: function (result) {
                ShowMesaage("系统异常");
            }
        };
        $form.ajaxSubmit(options);
    },
};