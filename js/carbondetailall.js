$(document).ready(function () {
    Init.api_input.operationType = GetQueryString("type");
    pageIndex = 0;
    pageSize = 20;
    UserInfo.Check(Init.GetCarbonDetail);
    $("#back_btn").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
    });
    $("#btnChoose").click(function () {
        $("#div_filter").show();
    });
    $(window).on("scroll", function () {
        var oDeH = $("#p_listend").offset().top;
        var scrollT = $(document).scrollTop();
        var clientH = $(window).height();
        var scrollB = scrollT + clientH;
        console.log((oDeH) + "," + scrollT + "," + clientH);
        if (oDeH <= scrollB && maxCount > pageSize) {
            pageSize += 20;
            Init.GetCarbonDetail();
        }
    })
    $("#ul_carbon li").on("click", function () {
        $(this).addClass("curr").siblings().removeClass("curr");
        Init.api_input.operationType = $(this).attr('type');
        Init.api_input.operationTypeChild = $(this).attr('detailtype');
        Init.GetCarbonDetail();
        $("#div_filter").hide();
    });
});
var pageSize = 20;
var pageIndex = 0;
var detailType = "";
var Init = {
    api_input: { "operationType": "", "operationTypeChild": "", "pageSize": pageSize, "pageIndex": pageIndex },
    GetCarbonDetail: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
            return;
        }
        //组织提交参数
        var s_api_input = JSON.stringify(Init.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "user_carbon_detail_time", "api_token": g_const_api_token.Wanted };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
            try {
                if (msg.resultCode == g_const_Success_Code) {
                    var htmlStr = "";
                    var direct = "+";
                    $.each(msg.list, function (i, n) {
                        htmlStr += "<li>";
                        switch (n.operationTypeChild) {
                            case "DC170208100010":
                                htmlStr += "<img src=\"img/menu08.png\">";
                                direct = "+";
                                break;
                            case "DC170208100009":
                                htmlStr += "<img src=\"img/mune07.png\">";
                                direct = "-";
                                break;
                            case "DC170208100004":
                                htmlStr += "<img src=\"img/menu08.png\">";
                                direct = "+";
                                break;
                            case "DC170208100008":
                                htmlStr += "<img src=\"img/menu09.png\">";
                                direct = "-";
                                break;
                            case "DC170208100007":
                                htmlStr += "<img src=\"img/menu10.png\">";
                                direct = "-";
                                break;
                            case "DC170208100006":
                                htmlStr += "<img src=\"img/mune04.png\">";
                                direct = "+";
                                break;
                        }
                        htmlStr += "<p class=\"mode\">" + n.operationTypeChildName + "</p>";
                        htmlStr += "<p class=\"time\">" + n.createTime + "</p>";

                        htmlStr += "<span class=\"co_red\">" + direct + n.carbonSum + "</span>";
                        htmlStr += "</li>";
                    });
                    $("#ul_recordlist").html(htmlStr);
                }

            } catch (e) {

            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    }
}