$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "true");
    $("#btnback").click(function () {
        window.location.replace(g_const_PageURL.TradeMain + "?t=" + Math.random());
    });
    UserInfo.Check(api_Request.GetCity);
});

var api_Request = {
    CityList: [],
    GetCity: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
        }
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
         //   msg = JSON.parse("{\"citys\": [{\"cityName\": \"上海\",\"cityId\": \"aae0171545a30b490145a30bb34e0001\"},{\"cityName\": \"福建\",\"cityId\": \"886d00c18d28401c85ac9979822abbd1\"},{\"cityName\": \"广东\",\"cityId\": \"aae0171545a30b490145a30d53cf0002\"},{\"cityName\": \"天津\",\"cityId\": \"aae0171545b0ad680145b0ad68ee0000\"},{\"cityName\": \"重庆\",\"cityId\": \"aae0171546b7de7e0146b7de7ec30000\"},{\"cityName\": \"湖北\",\"cityId\": \"aae0171545b0ad680145b0adec280002\"},{\"cityName\": \"北京\",\"cityId\": \"aae0171545a30b490145a30b490a0000\"},{\"cityName\": \"深圳\",\"cityId\": \"aae0171545b0ad680145b0adbeaf0001\"}]}");
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
                api_Request.GetList();
            } catch (e) {

            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    GetList: function () {
        var s_api_input = JSON.stringify({ });
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
        //    msg = JSON.parse("{\"objects\":[{\"amount\":4500,\"price\":10.50,\"userCode\":\"U161005100035\",\"objectCode\":\"aae0171545b0ad680145b0ad68ee0000\",\"buySell\":\"B\"},{\"amount\":6000,\"price\":14.50,\"userCode\":\"U161005100035\",\"objectCode\":\"aae0171545a30b490145a30b490a0000\",\"buySell\":\"B\"}]}");
            var htmlStr = "";
            var htmlCss = "";
            htmlStr += "<dt><span class=\"cel-12\">产品</span><span class=\"cel-23\">数量</span><span class=\"cel-20\">成本/现价</span><span class=\"cel-22\">盈亏</span><span class=\"cel-22\">操作</span></dt>";
            $.each(msg.objects, function (i, n) {
                if (n.profitLoss < 0) {
                    htmlCss = "";
                }
                else {
                    htmlCss = "class=\"co-red\"";
                }
                htmlStr += "<dd " + htmlCss + "><span class=\"cel-12\">" + api_Request.GetCityByCode(n.objectCode) + "</span><span class=\"cel-23\">" + n.amount + "</span><span class=\"cel-20\">" + n.price + "/" + n.lastPrice + "</span><span class=\"cel-22\">" + n.profitLoss + "</span><span class=\"cel-22\"><a onclick=\"api_Request.ToBuy('" + n.objectCode + "')\">买入</a> / <a  onclick=\"api_Request.ToSell('" + n.objectCode + "')\">卖出</a></span></dd>";
            });
            $("#dl_balance").html(htmlStr);
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    ToBuy: function (cityid) {
        PageUrlConfig.SetUrl();
        window.location.replace(g_const_PageURL.TradeBuy + "?t=" + Math.random() + "&cityid=" + cityid);
    },
    ToSell: function (cityid) {
        PageUrlConfig.SetUrl();
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