$(document).ready(function () {
    //返回
    $("#add_btn").click(function () {
        window.location.href = g_const_PageURL.ProjectList1 + "?t=" + Math.random();
    });
    //获取城市信息
    if (localStorage[g_const_localStorage.City] == undefined) {
        Project.api_input.city = "";
    }
    else {
        Project.api_input.city = localStorage[g_const_localStorage.City];
    }
    if (location.host == g_merchant_Act_Host) {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var geoc = new BMap.Geocoder();
                var po = r.point; 
                if (IsDebug) {
                    po = new BMap.Point(g_const_Test_Point_lng, g_const_Test_Point_lat)
                }
                geoc.getLocation(po, function (rs) {
                    var addComp = rs.addressComponents;
                    // alert(addComp.province + ", " +addComp.city + ", " +addComp.district + ", " +addComp.street + ", " + addComp.streetNumber);
                    Project.api_input.city = addComp.city.replace(/市/g, "");
                    Project.api_input.position = po.lat + "," + po.lng;
                    Project.GetList();
                    $("#span_currname").html(addComp.district + addComp.street + addComp.streetNumber);
                });
            }
        }, { enableHighAccuracy: true })
    }
    else {
        Project.api_input.position = "39.8797880000,116.4885590000";
        Project.api_input.city = "北京";
        Project.GetList();
    }

    // Project.GetList();
    //var ret = JSON.parse('[{"name":"美景东方","position":"39.875827697394,116.47692554189","level":"优","score":"85.64","number":"LP161004101620"},{"name":"金港国际","position":"39.9032745361328,116.487205505371","level":"优","score":"85.64","number":"LP161004101622"},{"name":"星河湾","position":"39.9302171,116.53217","level":"优","score":"85.64","number":"LP161004101641"},{"name":"青年汇","position":"39.928573630295,116.51838274217","level":"优","score":"85.64","number":"LP161004101642"},{"name":"珠江罗马嘉园三期","position":"39.9307250976563,116.520080566406","level":"优","score":"85.64","number":"LP161004101646"},{"name":"枣营北里","position":"39.9531593322754,116.477424621582","level":"优","score":"85.64","number":"LP161004101679"},{"name":"公园5号","position":"39.9318923950195,116.48429107666","level":"优","score":"85.64","number":"LP161004101690"},{"name":"卡夫卡公社","position":"39.9282902,116.506988","level":"优","score":"85.64","number":"LP161004101694"},{"name":"通惠家园","position":"39.9150695800781,116.512176513672","level":"优","score":"85.64","number":"LP161004101708"},{"name":"农光里小区","position":"39.8877410888672,116.470520019531","level":"优","score":"85.64","number":"LP161004101711"},{"name":"金都杭城","position":"39.9064616,116.498792","level":"优","score":"85.64","number":"LP161004101712"},{"name":"幸福二村","position":"39.9454612731934,116.456443786621","level":"优","score":"85.64","number":"LP161004101723"},{"name":"华业玫瑰东方","position":"39.9240226745606,116.49095916748","level":"优","score":"85.64","number":"LP161004101726"},{"name":"兴隆家园","position":"39.9219245910644,116.532081604004","level":"优","score":"85.64","number":"LP161004101734"},{"name":"远洋天地","position":"39.9189643859863,116.50106048584","level":"优","score":"85.64","number":"LP161004101736"},{"name":"金海国际","position":"39.899197235372,116.49198376503","level":"优","score":"85.64","number":"LP161004101739"},{"name":"南新园","position":"39.8749046325684,116.480888366699","level":"优","score":"85.64","number":"LP161004101750"},{"name":"乐成国际","position":"39.901897381993,116.47749590738","level":"优","score":"85.64","number":"LP161004101761"},{"name":"壹线国际","position":"39.915074095459,116.51217773058","level":"优","score":"85.64","number":"LP161004101763"},{"name":"都会华庭","position":"39.920654783169,116.50900770115","level":"优","score":"85.64","number":"LP161004101767"}]');
    //Project.Load_Result(ret);
    $("#shouye").click(function () {
        window.location.href = g_const_PageURL.Index + "?t=" + Math.random();
    });
    $("#wode").click(function () {
        window.location.href = g_const_PageURL.MyAccount + "?t=" + Math.random();
    });
    $("#loupan").click(function () {
        window.location.href = g_const_PageURL.ProjectList1 + "?t=" + Math.random();
    });

});
var winHeight = $(window).height();
$(window).scroll(function () {
    var el = $(this);
    var iScrollTop = el.scrollTop();
    if ((iScrollTop + winHeight) >= winHeight) {
        pageIndex++;
        Project.GetList();
    }
});
//var map = new BMap.Map("div_map");
var pageSize = 10;
var pageTime = 1;
var pageIndex = 1;
var orderStatus = 0;
var showType = 0;
//我的订单列表
var Project = {
    api_target: "1033",
    api_input: { "position": "", "city": "", "page": "1", },
    //加载多页
    GetList: function () {
        Project.api_input.page = pageIndex;
        //组织提交参数
        var s_api_input = JSON.stringify(Project.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": Project.api_target, "api_token": g_const_api_token.Wanted };
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
                $("#span_currname").html(msg.currname);
                Project.Load_Result(msg.projectlist);
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
    //加载单页
    //接口返回成功后的处理
    Load_Result: function (resultlist) {

        var htmlStr = "";
        $.each(resultlist, function (i, n) {

            htmlStr += "<li class=\"building-item\" onclick=\"Project.Load_Detail('" + n.number + "')\">";
            htmlStr += "<span class=\"building-name\">" + n.name + "</span>";
            htmlStr += "<span class=\"building-envi-level\">" + n.level + "</span>";
            htmlStr += "<span class=\"building-envi-score\">" + parseInt(n.score) + "%</span>";
            htmlStr += "</li>";
            //     Project.AddMarker(new BMap.Point(n.position.split(',')[0], n.position.split(',')[1]));
        });
        $("#ul_projectlist").html(htmlStr);

    },
    AddMarker(point){
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
    },
    Load_Detail: function (code) {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.ProjectDetail + "?code=" + code + "&t=" + Math.random();
    },
};