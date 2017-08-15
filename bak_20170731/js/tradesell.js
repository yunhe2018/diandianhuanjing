$(document).ready(function () {
    //...........
    var oclienHeight = $(document).height();
    var oHeight = $(".topBoxWrap").height();
    $(".detail-table").height(oclienHeight - oHeight);
    //...........交易列表滚动
    $(document).on('touchmove', function (e) {
        var e = e || event;
        e.preventDefault();
    })
    var myscroll = new IScroll(".detail-table", {
        scrollX: false, scrollY: true, mouseWheel: true, preventDefault: false
    });
    $("#btnback").click(function () {
        window.location.replace(g_const_PageURL.TradeMain + "?t=" + Math.random());
    });
    $("#btnsell").click(function () {
        api_Request.Sell();
    });
    api_Request.GetCity();
    
    
});
var api_Request = {
    selectCityID: "",
    GetList: function () {
        
        $("#ul_city li").each(function (n) {
            $(this).attr("class", "");
        });
        $("#li_City_" + api_Request.selectCityID).addClass("curr");
        var s_api_input = JSON.stringify({ "objectCode": api_Request.selectCityID });
        var obj_data = { "api_input": s_api_input, "api_target": "trade_deal_price_amount", "api_token": g_const_api_token.Wanted };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
            msg = JSON.parse("{\"sellAmount\":6000,\"currentPrice\":51,\"buyAmount\":1000}");
            $("#span_Amount").html(msg.buyAmount);
            $("#txt_Amount").val(msg.buyAmount);
            $("#span_Price").html(msg.currentPrice);
            for (var i = 1; i < 6; i++) {
                $("#span_sell_price" + i.toString()).html(parseFloat(msg.currentPrice.toFixed(2)) + i / 100);
                $("#span_sell_amount" + i.toString()).html(Math.round(Math.random() * 9999 + 1));
                $("#span_buy_price" + i.toString()).html(parseFloat(msg.currentPrice.toFixed(2)) - i / 100);
                $("#span_buy_amount" + i.toString()).html(Math.round(Math.random() * 9999 + 1));
            }
            $("#span_add").html(parseFloat(msg.currentPrice.toFixed(2)) * 1.1);
            $("#span_stop").html(parseFloat(msg.currentPrice.toFixed(2)) * 0.9);
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    CityList: [],
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
            msg = JSON.parse("{\"citys\": [{\"cityName\": \"上海\",\"cityId\": \"aae0171545a30b490145a30bb34e0001\"},{\"cityName\": \"福建\",\"cityId\": \"886d00c18d28401c85ac9979822abbd1\"},{\"cityName\": \"广东\",\"cityId\": \"aae0171545a30b490145a30d53cf0002\"},{\"cityName\": \"天津\",\"cityId\": \"aae0171545b0ad680145b0ad68ee0000\"},{\"cityName\": \"重庆\",\"cityId\": \"aae0171546b7de7e0146b7de7ec30000\"},{\"cityName\": \"湖北\",\"cityId\": \"aae0171545b0ad680145b0adec280002\"},{\"cityName\": \"北京\",\"cityId\": \"aae0171545a30b490145a30b490a0000\"},{\"cityName\": \"深圳\",\"cityId\": \"aae0171545b0ad680145b0adbeaf0001\"}]}");
            try {
                api_Request.CityList = msg.citys;
                var htmlStr = "";
                $.each(msg.citys, function (i, n) {
                    if (i == 0) {
                        api_Request.selectCityID = n.cityId;
                    }
                    //else {
                    htmlStr += "<li onclick=\"api_Request.GetList('" + n.cityId + "')\" id=\"li_City_" + n.cityId + "\">" + n.cityName + "</li>";
                    //}
                });
                $("#ul_city").html(htmlStr);
                if (GetQueryString("cityid") != "") {
                    api_Request.selectCityID = GetQueryString("cityid");
                }
                api_Request.GetList();
                api_Request.Balance();
            } catch (e) {

            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    Sell: function () {
        if (parseFloat($("#txt_Amount").val()) > $("#span_Amount").html()) {
            ShowMesaage("买入数量不能超过最大可买数量");
            return;
        }
        var s_api_input = JSON.stringify({ "objectCode": api_Request.selectCityID, buySell: "C", price: $("#span_Price").html(), amount: $("#txt_Amount").val() });
        var obj_data = { "api_input": s_api_input, "api_target": "trade_send_order", "api_token": g_const_api_token.Wanted };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
            msg = JSON.parse("{\"resultCode\":1,\"resultMessage\":\"委托成功\"}");
            ShowMesaage(msg.resultMessage);
            if (msg.resultCode == 1) {
                api_Request.Balance();
            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    Balance: function () {
        var s_api_input = JSON.stringify({});
        var obj_data = { "api_input": s_api_input, "api_target": "trade_balance", "api_token": g_const_api_token.Wanted };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
            msg = JSON.parse("{\"objects\":[{\"amount\":4500,\"price\":10.50,\"userCode\":\"U161005100035\",\"objectCode\":\"aae0171545b0ad680145b0ad68ee0000\",\"buySell\":\"B\"},{\"amount\":6000,\"price\":14.50,\"userCode\":\"U161005100035\",\"objectCode\":\"aae0171545a30b490145a30b490a0000\",\"buySell\":\"B\"}]}");
            var htmlStr = "";
            var htmlCss = "";
            $.each(msg.objects, function (i, n) {
                if (n.buySell == "B") {
                    htmlCss = "class=\"co-red\"";
                }
                else {
                    htmlCss = "";
                }
                htmlStr += "<dd " + htmlCss + "><span class=\"cel-12\">" + api_Request.GetCityByCode(n.objectCode) + "</span><span class=\"cel-23\">" + n.amount + "</span><span class=\"cel-20\">" + n.price + "</span><span class=\"cel-22\" onclick=\"api_Request.ToBuy('" + n.objectCode + "')\">买入</span><span class=\"cel-22\" onclick=\"api_Request.ToSell('" + n.objectCode + "')\">卖出</span></dd>";
            });
            $("#dl_balance").html(htmlStr);
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    ToBuy: function(cityid) {
        window.location.replace(g_const_PageURL.TradeBuy + "?t=" + Math.random() + "&cityid=" + cityid);
    }
    ,
    ToSell: function (cityid) {
        window.location.replace(g_const_PageURL.TradeSell + "?t=" + Math.random() + "&cityid=" + cityid);
    },
    GetCityByCode: function (cityid) {
        var cityname = "";
        $.each(api_Request.CityList, function (i, n) {
            if (n.cityId == cityid) {
                cityname = n.cityName;
                return false;
            }
        });
        return cityname;
    }
}