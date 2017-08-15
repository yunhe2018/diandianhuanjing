$(document).ready(function () {
    pageIndex = 0;
    pageSize = 20;
    UseAppFangFa.CaoZuo("refresh", "", "true");
    $("#btnback").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
    });
    $("#btnchart").click(function () {
        window.location.replace(g_const_PageURL.TradeChart + "?t=" + Math.random());
    });
    api_Request.GetCity();
    FooterMenu.Set(1);
    $(window).on("scroll", function () {
        var oDeH = $("#p_list").offset().top;
        var scrollT = $(document).scrollTop();
        var clientH = $(window).height();
        var scrollB = scrollT + clientH;
        if (oDeH <= scrollB && maxListCount > pageSize) {
            pageSize += 20;
            api_Request.GetList(api_Request.selectCityID);
        }
    })
});
var pageSize = 20;
var pageIndex = 0;
var maxListCount = 0;
var api_Request = {
    selectCityID : '',
    GetList: function (cityid) {
        api_Request.selectCityID = cityid;
        $("#ul_city li").each(function (n) {
            $(this).attr("class", "");
        });
        $("#li_City_" + api_Request.selectCityID).addClass("curr");       
        var s_api_input = JSON.stringify({ "pageSize": pageSize, "pageIndex": pageIndex });
        if (api_Request.selectCityID != "0") {
            s_api_input = JSON.stringify({ "cityId": cityid, "pageSize": pageSize, "pageIndex": pageIndex });
        }
        var obj_data = { "api_input": s_api_input, "api_target": "trade_deals", "api_token": g_const_api_token.Unwanted };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
            //  msg = JSON.parse("{\"deals\": [{\"cityName\": \"北京\",\"lowPrice\": 51,\"dealAmount\": 0,\"highPrice\": 51,\"dealDate\": 1489334400000,\"openPrice\": 51,\"cityId\": \"aae0171545a30b490145a30b490a0000\",\"closePrice\": 51,\"dealNum\": 0,\"dealPrice\": 51},{\"cityName\": \"北京\",\"lowPrice\": 51,\"dealAmount\": 0,\"highPrice\": 51,\"dealDate\": 1489075200000,\"openPrice\": 51,\"cityId\": \"aae0171545a30b490145a30b490a0000\",\"closePrice\": 51,\"dealNum\": 0,\"dealPrice\": 51},{\"cityName\": \"北京\",\"lowPrice\": 49,\"dealAmount\": 387957,\"highPrice\": 49,\"dealDate\": 1488988800000,\"openPrice\": 49,\"cityId\": \"aae0171545a30b490145a30b490a0000\",\"closePrice\": 49,\"dealNum\": 7920,\"dealPrice\": 49}]}");
            if (msg.resultCode == g_const_Success_Code) {
                maxListCount = msg.repCount;
                try {
                    var htmlStr = "";
                    htmlStr += "<dt><span class=\"cel-12\">交易所</span><span class=\"cel-23\">交易日期</span><span class=\"cel-20\">收盘价/元</span><span class=\"cel-22\">交易额/元</span><span class=\"cel-22\">日涨幅</span></dt>";
                    $.each(msg.repList, function (i, n) {
                        htmlStr += "<dd onclick=\"api_Request.ToBuy('" + n.cityId + "')\"><span class=\"cel-12\">" + n.cityName + "</span><span class=\"cel-23\">" + n.dealDate + "</span><span class=\"cel-20\">" + n.closePrice + "</span><span class=\"cel-22\">" + n.dealAmount + "</span><span class=\"" + (n.dealUpDownRatio<0?"act":"") + " cel-22\">" + n.dealUpDownRatio + "%</span></dd>";
                    });
                    $("#tb_list").html(htmlStr);
                } catch (e) {

                }
            }
            else {
                ShowMesaage(g_const_API_Message["7001"]);
            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    GetCity: function () {
    var s_api_input = JSON.stringify({});
    var obj_data = { "api_input": s_api_input, "api_target": "trade_city", "api_token": g_const_api_token.Unwanted };
    var purl = g_APIUTL;
    var request = $.ajax({
        url: purl,
        cache: false,
        method: g_APIMethod,
        data: obj_data,
        dataType: g_APIResponseDataType
    });
    request.done(function (msg) {
      //  msg = JSON.parse("{\"citys\": [{\"cityName\": \"上海\",\"cityId\": \"aae0171545a30b490145a30bb34e0001\"},{\"cityName\": \"福建\",\"cityId\": \"886d00c18d28401c85ac9979822abbd1\"},{\"cityName\": \"广东\",\"cityId\": \"aae0171545a30b490145a30d53cf0002\"},{\"cityName\": \"天津\",\"cityId\": \"aae0171545b0ad680145b0ad68ee0000\"},{\"cityName\": \"重庆\",\"cityId\": \"aae0171546b7de7e0146b7de7ec30000\"},{\"cityName\": \"湖北\",\"cityId\": \"aae0171545b0ad680145b0adec280002\"},{\"cityName\": \"北京\",\"cityId\": \"aae0171545a30b490145a30b490a0000\"},{\"cityName\": \"深圳\",\"cityId\": \"aae0171545b0ad680145b0adbeaf0001\"}]}");
            try {
                var htmlStr = "";
                htmlStr += "<li class=\"curr\" onclick=\"api_Request.GetList('0')\" id=\"li_City_0\">全国</li>";
                $.each(msg.citys, function (i, n) {
                    htmlStr += "<li onclick=\"api_Request.GetList('" + n.cityId + "')\" id=\"li_City_" + n.cityId + "\">" + n.cityName + "</li>";
                });
                $("#ul_city").html(htmlStr);
                api_Request.GetList("0");
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
                $(".switch_nav li").click(function () {
                    $(this).addClass("curr").siblings().removeClass("curr");
                    var win_width = $(window).width() * 0.5;
                    var w_left = win_width - $(this).position().left - 30;
                    //win_width<$(this).position().left<$("#switch_nav").width()-win_width
                    if ($(".switch_nav ul").width() > $(".switch_nav").width()) {
                        if ($(this).position().left < win_width) {
                            myscroll.scrollTo(0, 0, 1000, IScroll.utils.ease.elastic);
                        } else if ($(this).position().left > win_width && $(this).position().left < $("#switch_nav ul").width() - win_width - 30) {
                            myscroll.scrollTo(w_left, 0, 1000, IScroll.utils.ease.elastic);
                        } else {
                            myscroll.scrollTo($(window).width() - $("#switch_nav ul").width(), 0, 1000, IScroll.utils.ease.elastic);
                        }
                    }
                })
            } catch (e) {

            }
    });

    request.fail(function (jqXHR, textStatus) {
        ShowMesaage(g_const_API_Message["7001"]);
    });
    },
    ToBuy: function (cityid) {
        PageUrlConfig.SetUrl();
        window.location.replace(g_const_PageURL.TradeBuy + "?t=" + Math.random() + "&cityid=" + cityid);
    }
}