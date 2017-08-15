$(document).ready(function () {
    $("#hidType").val(GetQueryString("type"));
    UseAppFangFa.CaoZuo("refresh", "", "false");
    pageIndex = 0;
    pageSize = 10;
    UserInfo.Check(Init.GetCarbonDetail);
    $("#btnback").click(function () {
        window.location.replace(g_const_PageURL.Carbon + "?t=" + Math.random());
    });
    $(window).on("scroll", function () {
        var oDeH = $("#imgod").offset().top;
        var scrollT = $(document).scrollTop();
        var clientH = $(window).height();
        var scrollB = scrollT + clientH;
        console.log((oDeH + 40) + "," + scrollT + "," + clientH);
        if ((oDeH + 40) <= scrollB) {
            pageSize += 10;
            Init.GetCarbonDetail();
        }
    });
    switch (GetQueryString("type")) {
        case "DC170208100004":
            $("#span_title").html("步数兑换碳币");
            $("#span_carbon_type").html("步数兑换碳币历史记录");
            $("#span_goto").html("");

            break;
        case "DC170208100005":
            $("#span_title").html("新能源里程兑换碳币");
            $("#span_carbon_type").html("新能源里程兑换碳币历史记录");
            $("#span_goto").html("");
            break;
        case "DC170208100006":
            $("#span_title").html("购买碳币");
            $("#span_carbon_type").html("碳币购买历史记录");
            $("#span_goto").html("去充值");
            $("#span_goto").click(function () {
                PageUrlConfig.SetUrl();
                window.location.replace(g_const_PageURL.Recharge + "?t=" + Math.random());
            });
            break;
        case "DC170208100010":
            $("#span_title").html("碳交易收入");
            $("#span_carbon_type").html("碳交易收入历史记录");
            $("#span_goto").html("去碳交易");
            $("#span_goto").click(function () {
                PageUrlConfig.SetUrl();
                window.location.replace(g_const_PageURL.TradeSell + "?t=" + Math.random());
            });
            break;
        case "DC170208100007":
            $("#span_title").html("碳币兑换环境质量报告");
            $("#span_carbon_type").html("碳币兑换环境质量报告历史记录");
            $("#span_goto").html("兑换报告");
            $("#span_goto").click(function () {
                PageUrlConfig.SetUrl();
                window.location.replace(g_const_PageURL.ProjectList1 + "?p=l&t=" + Math.random());
            });
            break;
        case "DC170208100008":
            $("#span_title").html("碳币支出记录");
            $("#span_carbon_type").html("碳币兑换奖品历史记录");
            $("#span_goto").html("去兑换");
            $("#span_goto").click(function () {
                PageUrlConfig.SetUrl();
                window.location.replace(g_const_PageURL.Gift + "?t=" + Math.random());
            });
            break;
        case "DC170208100009": 
            $("#span_title").html("碳交易支出");
            $("#span_carbon_type").html("碳交易支出历史记录");
            $("#span_goto").html("去碳交易");
            $("#span_goto").click(function () {
                PageUrlConfig.SetUrl();
                window.location.replace(g_const_PageURL.TradeBuy + "?t=" + Math.random());
            });
            break;
    }
});
var pageSize = 10;
var pageIndex = 0;
var Init = {
    GetCarbonDetail: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
            return;
        }
        //组织提交参数
        var s_api_input = JSON.stringify({ "type": $("#hidType").val(), "pageSize": pageSize, "pageIndex": pageIndex });
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "user_carbon_type_detail", "api_token": g_const_api_token.Wanted };
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
                    $.each(msg.list, function (i, n) {
                        htmlStr += "<li>";
                        htmlStr += "<p class=\"mode\">" + n.operationTypeChildName + "</i></p>";
                        htmlStr += "<p class=\"time\">" + n.createTime.substr(0,19) + "</p>";
                        htmlStr += "<span>" + n.carbonSum + "</span>";
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