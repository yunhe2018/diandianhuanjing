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
            api_Request.api_input.pageSize += 10
            api_Request.GetList();
        }
    })
    UserInfo.Check(getPosition);

});

function getPosition() {
    if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
    }
    if (localStorage[g_const_localStorage.Position] != undefined && localStorage[g_const_localStorage.Position] != "") {
        var po = new BMap.Point(localStorage[g_const_localStorage.Position].split(',')[1], localStorage[g_const_localStorage.Position].split(',')[0]);
        var geoc = new BMap.Geocoder();
        geoc.getLocation(po, function (rs) {
            api_Request.api_input.pageIndex = 0;
            api_Request.api_input.lat = po.lat;
            api_Request.api_input.lng = po.lng;
            api_Request.GetList();
        });
    }
    else {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var geoc = new BMap.Geocoder();
                var po = r.point; 
                geoc.getLocation(po, function (rs) {

                    api_Request.api_input.pageIndex = 0;
                    api_Request.api_input.lat = po.lat;
                    api_Request.api_input.lng = po.lng;
                    api_Request.GetList();

                });
            }
        }, { enableHighAccuracy: true })
    }
}
//我的订单列表
var api_Request = {
    api_target: "lp_follow_data",
    api_input: { "pageSize": "10", "pageIndex": "0", "lat": "", "lng": "" },
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
                api_Request.resultList1 = msg.list;
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

            htmlStr += "<li><a class=\"clearfix\"\" onclick=\"api_Request.Load_Detail('" + n.code + "')\">";
            htmlStr += "<div class=\"pic fl\"><img src=\"/img/default_small_4.jpg\"></div>";
            htmlStr += "<div class=\"con fl\">";
            htmlStr += "<h4>" + n.title + "<span>距离 " + n.distance + " km</span></h4>";
            htmlStr += "<p class=\"rcd_ads\">" + n.addressFull + "</p>";
            htmlStr += "</div>";
            htmlStr += "<b class=\"cancelFocuse\" onclick=\"delObj('" + n.code + "')\">取消关注</b></a></li>";
        });
        $("#details").html(htmlStr);

    },
    Load_Detail: function (code) {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.ProjectDetail + "?code=" + code + "&t=" + Math.random();
    },
    api_input_del: { "idList": "" },
    Delete: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(api_Request.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": JSON.stringify(api_Request.api_input_del), "api_target": "lp_follow_del", "api_token": g_const_api_token.Wanted };
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
                
            }
            else {
                ShowMesaage(msg.resultMessage);
            }
            api_Request.GetList()
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