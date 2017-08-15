$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
    FooterMenu.Set(-1);
    $(".columnList li").each(function () {
        if ($(this).text().length > 3) {
            $(this).css("fontSize", ".13rem")
        }
    })
    api_Request.GetList();
    $("#btnBuy").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.OrderConfirm + "?t=" + Math.random();
    });
    $("#buy").click(function () {
        window.location.href = g_const_PageURL.ProjectList1 + "?p=l&t=" + Math.random();
    });
    $("#loupan").click(function () {
        window.location.href = g_const_PageURL.ProjectList1 + "?p=m&t=" + Math.random();
    });
    $("#wode").click(function () {
        window.location.href = g_const_PageURL.MyAccount + "?t=" + Math.random();
    });
    $("#choose_city_goback").click(function () {
        window.location.href = g_const_PageURL.Index + "?t=" + Math.random();
    });
});
//var citylist = [{ "name": "北京市", "value": "北京" },
//                { "name": "上海市", "value": "上海" },
//                { "name": "广州市", "value": "广州" },
//                { "name": "深圳市", "value": "深圳" }];


var api_Request = {
    pageIndex: 0,
    //加载多页
    GetList: function () {
        var obj_data = { "api_input": JSON.stringify({}), "api_target": "hot_city", "api_token": g_const_api_token.Wanted };
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
                api_Request.Load_Result(msg.list);
                $("#p_listcount").html("共" + msg.repCount + "条消息");
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
    Load_Result: function (citylist) {
        var strhtml = "";
        strhtml += "<li  class=\"cityPosition\" onclick=\"api_Request.LoadCity('')\">定位</li>";
        $.each(citylist, function (i, n) {
            strhtml += "<li onclick=\"api_Request.LoadCity('" + n.name + "')\">" + n.name + "</li>";
        });
        $("#cityList").html(strhtml);
    },
    LoadCity: function (code) {
        localStorage[g_const_localStorage.City] = code;
        localStorage[g_const_localStorage.Position] = "";
        if (code != "") {   
            var myGeo = new BMap.Geocoder();
            myGeo.getPoint(code, function (point) {
                if (point) {
                    localStorage[g_const_localStorage.Position] = point.lat + "," + point.lng;
                    window.location.replace(PageUrlConfig.BackTo(1));
                }
            }, code);
        }
        else {
            window.location.replace(PageUrlConfig.BackTo(1));
        }
    }
};