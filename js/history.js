$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
    $("#back_btn").click(function () {
        window.location.href = g_const_PageURL.MyAccount + "?t=" + Math.random();
    });
    $(window).on("scroll", function () {
        var oDeH = $("#imgod").offset().top;
        var scrollT = $(document).scrollTop();
        var clientH = $(window).height();
        var scrollB = scrollT + clientH;
        console.log((oDeH + 40) + "," + scrollT + "," + clientH);
        if ((oDeH + 40) <= scrollB) {
            api_Request.api_input.pageInde++;
            api_Request.GetList();
        }
    })
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var geoc = new BMap.Geocoder();
            var po = r.point; //new BMap.Point(39.9030952453613, 116.509201049805);//r.point;
            if (IsDebug) {
                po = new BMap.Point(g_const_Test_Point_lng, g_const_Test_Point_lat)
            }
            geoc.getLocation(po, function (rs) {

                api_Request.api_input.pageIndex = 0;
                api_Request.api_input.lat = po.lat;
                api_Request.api_input.lng = po.lng;
                api_Request.GetList();

            });
        }
    }, { enableHighAccuracy: true })
});

//我的订单列表
var api_Request = {
    api_target: "lp_visit_data",
    api_input: { "pageSize": "10", "pageIndex": "", "lat": "", "lng": "" },
    resultList1: [],
    //加载多页
    GetList: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(api_Request.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": api_Request.api_target, "api_token": g_const_api_token.Wanted };
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
            $("#details").html("");
            if (msg.resultCode == g_const_Success_Code) {
                $.each(msg.list, function (i, n) {
                    api_Request.resultList1.push(n);
                });
                api_Request.Load_Result();
                $("#p_listcount").html("共" + msg.total + "条记录");
            }
            else {
                $("#p_listcount").html("共0条记录");
                ShowMesaage(msg.resultMessage);
            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
        //}

    },
    //加载单页
    //接口返回成功后的处理
    Load_Result: function () {

        var htmlStr = "";
        $.each(api_Request.resultList1, function (i, n) {

            htmlStr += "<li><a class=\"clearfix\" href=\"javascript:;\">";
            htmlStr += "<div class=\"pic fl\"><img src=\"img/default_small_4.jpg\"></div>";
            htmlStr += "<div class=\"con fl\">";
            htmlStr += "<h4>" + n.title + "</h4>";
            htmlStr += "<p class=\"title02\">距离 <span> " + n.distance + "km</span></p>";
            htmlStr += "<div class=\"price02\">" + n.addressFull + "</div></div>";
            htmlStr += "<b class=\"cancelFocuse\" onclick=\"delObj('" + n.code + "')\">删除记录</b></a></li>";
        });
        $("#details").html(htmlStr);

    },
    api_input_del: { "idList": "" },
    Delete: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(api_Request.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": JSON.stringify(api_Request.api_input_del), "api_target": "lp_visit_del", "api_token": g_const_api_token.Wanted };
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
                api_Request.GetList()
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

function delObj(code) {
    api_Request.api_input_del.idList = code;
    api_Request.Delete();
}