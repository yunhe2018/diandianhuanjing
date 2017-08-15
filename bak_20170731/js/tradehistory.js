$(document).ready(function () {
    pageIndex = 0;
    pageSize = 10;
    UseAppFangFa.CaoZuo("refresh", "", "true");
    var now = new Date(),
    max = new Date(now.getFullYear() + 100, now.getMonth(), now.getDate());

    $("#time_start,#time_end").mobiscroll().date({
        theme: 'ios7',
        lang: 'zh',
        display: 'bottom',
        max: max
    });
    $("#btnback").click(function () {
        window.location.replace(g_const_PageURL.TradeMain + "?t=" + Math.random());
    });
    var winHeight = $(window).height();
    $(window).on("scroll", function () {
        var el = $(this);
        var iScrollTop = el.scrollTop();
        if (iScrollTop + winHeight + 110 >= winHeight * (awardList.PageIndex + 2)) {
            pageSize += 10;
            api_Request.GetList();
        }
    });
    UserInfo.Check(api_Request.GetCity);
});
var pageSize = 10;
var pageIndex = 0;

var api_Request = {

    CityList:[],
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
        var s_api_input = JSON.stringify({ "pageSize": pageSize, "pageIndex": pageIndex });
        var obj_data = { "api_input": s_api_input, "api_target": "trade_query_order", "api_token": g_const_api_token.Wanted };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
           // msg = JSON.parse("{\"orders\":[{\"amount\":1000,\"createTime\":\"2017-03-16 08:41:00\",\"price\":10.50,\"userCode\":\"U161005100035\",\"status\":1,\"orderCode\":\"DD170316100002\",\"objectCode\":\"aae0171545b0ad680145b0ad68ee0000\",\"buySell\":\"C\"},{\"amount\":1000,\"createTime\":\"2017-03-16 08:42:12\",\"price\":10.50,\"userCode\":\"U161005100035\",\"status\":1,\"orderCode\":\"DD170316100003\",\"objectCode\":\"aae0171545b0ad680145b0ad68ee0000\",\"buySell\":\"B\"},{\"amount\":1000,\"createTime\":\"2017-03-16 13:36:31\",\"price\":10.50,\"userCode\":\"U161005100035\",\"status\":1,\"orderCode\":\"DD170316100004\",\"objectCode\":\"aae0171545b0ad680145b0ad68ee0000\",\"buySell\":\"B\"}]}");
            try {
                var htmlStr = "";
                var htmlCss = "";
                htmlStr += "<dt><span class=\"cel-12\">城市</span><span class=\"cel-23\">日期</span><span class=\"cel-20\">成交价格</span><span class=\"cel-22\">交易数量</span><span class=\"cel-22\">操作</span></dt>";
                $.each(msg.orders, function (i, n) {
                    if (n.buySell == "B") {
                        htmlCss = "class=\"co-red\"";
                    }
                    else {
                        htmlCss = "";
                    }
                    htmlStr += "<dd " + htmlCss + "><span class=\"cel-12\">" + api_Request.GetCityByCode(n.objectCode) + "</span><span class=\"cel-23\">" + n.createTime + "</span><span class=\"cel-20\">" + n.price + "</span><span class=\"cel-22\">" + n.amount + "</span><span class=\"cel-22\">" + (n.buySell == "B" ? "买入" : "卖出") + "</span></dd>";
                });
                $("#dl_balance").html(htmlStr);
            } catch (e) {

            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
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