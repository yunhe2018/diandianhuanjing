$(document).ready(function () {
    Project.api_input.path = GetQueryString("path");
    $("#p_projectname").html(decodeURIComponent(GetQueryString("title")));
    //Project.api_input.lpCode = GetQueryString("title");
    //Project.GetList();
    $("#btnDownload").click(function () {
        window.location.href = Project.api_input.path;
    });
    $("#btnApp").click(function () {
        //if (CheckMachine.versions.ios || CheckMachine.versions.iPhone || CheckMachine.versions.iPad) {
            
        //    window.location.href="http://itunes.apple.com/us/app/%E7%82%B9%E7%82%B9%E7%8E%AF%E5%A2%83/id1169859873?mt=8";
        //}
        //else if (CheckMachine.versions.android) {
        //    // window.location.replace("http://www.ecomapit.com/app/ddhj.apk");
        //    window.location.replace("http://a.app.qq.com/o/simple.jsp?pkgname=com.huijiayou.pedometer");
        //}
        window.location.replace("http://a.app.qq.com/o/simple.jsp?pkgname=com.huijiayou.pedometer");
    });
});
var Project = {
    api_target: "report_lp",
    api_input: { "lpCode": "" },
    path:"",
    //加载多页
    GetList: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(Project.api_input);
        var obj_data = { "api_input": s_api_input, "api_target": Project.api_target, "api_token": "0" };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        //正常返回
        request.done(function (msg) {
            if (msg.resultCode == g_const_Success_Code) {
                $("#p_projectname").html(msg.name);
                var imageList = JSON.parse(msg.image);
                var g_const_share_pic = "";
                if (imageList.length == 0) {
                    $("#img_projectimg").attr("src", "/img/default_big_4.jpg");
                    //  g_const_share_pic = "/img/defalt.jpg";
                }
                else {
                    $("#img_projectimg").attr("src", msg.image[0]);
                    //   g_const_share_pic = msg.image[0];
                }
            }
            else {
                ShowMesaage(msg.resultMessage);
            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
        //}

    },
};