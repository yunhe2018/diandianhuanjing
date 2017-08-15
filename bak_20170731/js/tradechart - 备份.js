$(document).ready(function () {

    pageIndex = 0;
    pageSize = 10;
    UseAppFangFa.CaoZuo("refresh", "", "true");
    $("#btnback").click(function () {
        window.location.replace(g_const_PageURL.TradeMain + "?t=" + Math.random());
    });
    $("#btnlist").click(function () {
        window.location.replace(g_const_PageURL.TradePrice + "?t=" + Math.random());
    });
    api_Request.GetCity();
    api_Request.GetList('');
});
var pageSize = 10;
var pageIndex = 0;
var api_Request = {
    GetList: function (cityid, obj) {
        $("#ul_city li").each(function (n) {
            $(this).attr("class", "");
        });
        $(obj).addClass("curr");
        var s_api_input = JSON.stringify({ "cityid": cityid, "pageSize": pageSize, "pageIndex": pageIndex });
        var obj_data = { "api_input": s_api_input, "api_target": "1025", "api_token": g_const_api_token.Unwanted };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
            msg = JSON.parse("{\"deals\": [{\"cityName\": \"北京\",\"lowPrice\": 51,\"dealAmount\": 0,\"highPrice\": 51,\"dealDate\": 1489334400000,\"openPrice\": 51,\"cityId\": \"aae0171545a30b490145a30b490a0000\",\"closePrice\": 51,\"dealNum\": 0,\"dealPrice\": 51},{\"cityName\": \"北京\",\"lowPrice\": 51,\"dealAmount\": 0,\"highPrice\": 51,\"dealDate\": 1489075200000,\"openPrice\": 51,\"cityId\": \"aae0171545a30b490145a30b490a0000\",\"closePrice\": 51,\"dealNum\": 0,\"dealPrice\": 51},{\"cityName\": \"北京\",\"lowPrice\": 49,\"dealAmount\": 387957,\"highPrice\": 49,\"dealDate\": 1488988800000,\"openPrice\": 49,\"cityId\": \"aae0171545a30b490145a30b490a0000\",\"closePrice\": 49,\"dealNum\": 7920,\"dealPrice\": 49}]}");
            try {
                var htmlStr = "";
                htmlStr += "<dt><span class=\"cel-20\">城市</span><span class=\"cel-20\">日期</span><span class=\"cel-20\">成交价格</span><span class=\"cel-20\">交易额(元)</span><span class=\"cel-20\">交易量(吨)</span></dt>";
                $.each(msg.deals, function (i, n) {
                    htmlStr += "<dd><span class=\"cel-20\">" + n.cityName + "</span><span class=\"cel-20\">" + n.dealDate + "</span><span class=\"cel-20\">" + n.dealPrice + "</span><span class=\"cel-20\">" + n.dealAmount + "</span><span class=\"cel-20\">" + n.dealPrice + "</span></dd>";
                });
                $("#tb_list").html(htmlStr);
            } catch (e) {

            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    GetCity: function () {
        var s_api_input = JSON.stringify({});
        var obj_data = { "api_input": s_api_input, "api_target": "1025", "api_token": g_const_api_token.Unwanted };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
            msg = JSON.parse("{\"citys\": [{\"cityName\": \"上海\",\"cityId\": \"aae0171545a30b490145a30bb34e0001\"},{\"cityName\": \"福建\",\"cityId\": \"886d00c18d28401c85ac9979822abbd1\"},{\"cityName\": \"广东\",\"cityId\": \"aae0171545a30b490145a30d53cf0002\"},{\"cityName\": \"天津\",\"cityId\": \"aae0171545b0ad680145b0ad68ee0000\"},{\"cityName\": \"重庆\",\"cityId\": \"aae0171546b7de7e0146b7de7ec30000\"},{\"cityName\": \"湖北\",\"cityId\": \"aae0171545b0ad680145b0adec280002\"},{\"cityName\": \"北京\",\"cityId\": \"aae0171545a30b490145a30b490a0000\"},{\"cityName\": \"深圳\",\"cityId\": \"aae0171545b0ad680145b0adbeaf0001\"}]}");
            try {
                var htmlStr = "";
                htmlStr += "<li class=\"curr\" onclick=\"api_Request.GetList('',this)\">全国</li>";
                $.each(msg.citys, function (i, n) {
                    htmlStr += "<li onclick=\"api_Request.GetList('" + n.cityId + "',this)\">" + n.cityName + "</li>";
                });
                $("#ul_city").html(htmlStr);
                //上导航横滑
                var oULWidth = 0;
                var oLength = $(".switch_nav li").length;
                for (var i = 0; i < oLength; i++) {
                    oULWidth += $(".switch_nav li").eq(i).outerWidth() + 22;
                }
                $(".switch_nav ul").width(oULWidth);

                //..........
                var myscroll = new IScroll("#switch_nav", {
                    scrollX: true, scrollY: false, mouseWheel: true, preventDefault: false
                });
            } catch (e) {

            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    }
}