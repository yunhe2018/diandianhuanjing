$(document).ready(function () {
    lng = GetQueryString("lng");
    lat = GetQueryString("lat");
    //lng = "39.9030952453613";
    //lat = "116.509201049805";

    //获取城市信息
    if (localStorage[g_const_localStorage.City]==undefined) {
        Project.api_input.city = "";
    }
    else {
        Project.api_input.city = localStorage[g_const_localStorage.City];
    }

        
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var geoc = new BMap.Geocoder();
                    var po = r.point;
                    if (IsDebug) {
                        po = new BMap.Point(g_const_Test_Point_lng, g_const_Test_Point_lat)
                    }
                    point_A = po;
                    geoc.getLocation(po, function (rs) {
                        var addComp = rs.addressComponents;
                        map.centerAndZoom(po, 13);
                        map.enableScrollWheelZoom();
                        Project.api_input.city = addComp.city.replace(/市/g, "");
                        var myCompOverlay = new ComplexCustomOverlay(po, "我的位置", "");
                        map.addOverlay(myCompOverlay);
                        $("#PositionName").html(addComp.district + addComp.street + addComp.streetNumber);
                        $("#p_PositionName").html(addComp.district + addComp.street + addComp.streetNumber);
                        Project.api_input.position = po.lat + "," + po.lng;
                        Project.GetObj1();

                        Project.api_input_tj.city = addComp.city.replace(/市/g, "");
                        Project.api_input_tj.position = po.lat + "," + po.lng;
                        Project.GetObj();
                        Project.GetObj_TJ();
                        $("#span_PositionName").html(addComp.district + addComp.street + addComp.streetNumber);
                    });
                }
            }, { enableHighAccuracy: true })

    $("#btnBuy").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.OrderConfirm + "?t=" + Math.random();
    });
    $("#loupan,#loupan1").click(function () {
        window.location.href = g_const_PageURL.ProjectList1 + "?p=m&t=" + Math.random();
    });
    $("#buy,#buy1").click(function () {
        window.location.href = g_const_PageURL.ProjectList1 + "?p=l&t=" + Math.random();
    });
    $("#wode,#wode1").click(function () {
        window.location.href = g_const_PageURL.MyAccount + "?t=" + Math.random();
    });
    $("#add_btn").click(function () {
        window.location.href = g_const_PageURL.City + "?t=" + Math.random();
    });
    $("#span_more").click(function () {
        window.location.href = g_const_PageURL.ProjectList1 + "?p=m&t=" + Math.random();
    });
    map.addEventListener("dragend", function () {
        var center = map.getCenter();
        if (map.getDistance(point_A, center) < g_const_Map_Distance) {
            return;
        }
        point_A = center;
        var geoc = new BMap.Geocoder();
        geoc.getLocation(center, function (rs) {
            var addComp = rs.addressComponents;
            // alert(addComp.province + ", " +addComp.city + ", " +addComp.district + ", " +addComp.street + ", " + addComp.streetNumber);
            map.centerAndZoom(center, 13);

            map.enableScrollWheelZoom();
            map.clearOverlays();
            var myCompOverlay = new ComplexCustomOverlay(center, "当前位置", "");
            map.addOverlay(myCompOverlay);
            $("#PositionName").html(addComp.district + addComp.street + addComp.streetNumber);
            Project.api_input.position = center.lat + "," + center.lng;
            Project.api_input.city = addComp.city.replace(/市/g, "");
            Project.GetObj1();
            Project.api_input_tj.city = addComp.city.replace(/市/g, "");
            Project.api_input_tj.position = center.lat + "," + center.lng;
            Project.GetObj();
            Project.GetObj_TJ();
            $("#span_PositionName").html(addComp.district + addComp.street + addComp.streetNumber);

        });
    });
});
var map = new BMap.Map("allmap");
var point_A;
function ComplexCustomOverlay(point, text, mouseoverText) {
    this._point = point;
    this._text = text;
    this._overText = mouseoverText;
}

ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function (map) {
    this._map = map;
    var div = this._div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.width = ".6rem";
    div.style.borderRadius = "8rem";
    div.style.backgroundColor = "#fa4343";
    div.style.padding = ".06rem .2rem";
    div.style.fontSize = ".15rem";
    div.style.color = "#fff";
    var span = this._span = document.createElement("span");
    div.appendChild(span);
    span.appendChild(document.createTextNode(this._text));
    var that = this;

    var arrow = this._arrow = document.createElement("span");
    arrow.style.position = "absolute";
    arrow.style.border = ".07rem solid transparent";
    arrow.style.borderTop = ".07rem solid #fa4343";
    arrow.style.width = "0";
    arrow.style.height = "0";
    arrow.style.content = "";
    arrow.style.left = "50%";
    arrow.style.marginLeft = "-.09rem";
    arrow.style.top = ".32rem";
    div.appendChild(arrow);

    //div.onmouseover = function () {
    //    this.style.backgroundColor = "#6BADCA";
    //    this.style.borderColor = "#0000ff";
    //    this.getElementsByTagName("span")[0].innerHTML = that._overText;
    //    arrow.style.backgroundPosition = "0px -20px";
    //}

    //div.onmouseout = function () {
    //    this.style.backgroundColor = "#EE5D5B";
    //    this.style.borderColor = "#BC3B3A";
    //    this.getElementsByTagName("span")[0].innerHTML = that._text;
    //    arrow.style.backgroundPosition = "0px 0px";
    //}

    //tmpfun = map.onclick;
   // map.onclick = null;
    div.addEventListener("touchstart", function () {
       // map.onclick = tmpfun;
        alert("click");
    });

    map.getPanes().labelPane.appendChild(div);

    return div;
}
ComplexCustomOverlay.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
    this._div.style.top = pixel.y - 30 + "px";
}
var Project = {
    api_target: "1032",
    api_input: { "position": "", "city": "", "radius": g_const_Map_Distance },
    api_input_tj: { "position": "", "city": "", "page": "1", "count": "10", "radius": g_const_Map_Distance },
    //加载多页
    GetObj: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(Project.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "1032", "api_token": g_const_api_token.Wanted };
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
                Project.Load_Result(msg.detailList);
                Project.Load_Info(msg);
                Project.Load_AQI(msg.AQIList);
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

            htmlStr += "<li class=\"fl\">";
            htmlStr += "<p>" + n.name + "<span class=\"t_state ";
            switch (n.level) {
                case "优":
                case "较远":
                case "较少":
                case "优良":
                    htmlStr += "verygood ";
                    break;
                case "良":
                    htmlStr += "good ";
                    break;
                case "轻度污染":
                    htmlStr += "bad ";
                    break;
                case "中度污染":
                    htmlStr += "verybad ";
                    break;
                default:
                    htmlStr += "verygood ";
                    break;
            }
            htmlStr += "\">" + n.level + "</span></p>";
            htmlStr += "<b>" + n.memo + "</b>";
            htmlStr += "</li>";

        });
        $("#ul_DetailList").html(htmlStr);
    },
    Load_AQI: function (resultlist) {

        var htmlStr = "";
        $.each(resultlist, function (i, n) {
            htmlStr += "<li class=\"fl\">";
            htmlStr += "<span class=\"week\">" + n.week + "</span>";
            htmlStr += "<span class=\"date\">" + n.date + "</span>";
            htmlStr += "<span class=\"pollute ";
            switch (n.level) {
                case "优":
                    htmlStr += "verygood ";
                    break;
                case "良":
                    htmlStr += "good ";
                    break;
                case "轻度污染":
                    htmlStr += "bad ";
                    break;
                case "中度污染":
                    htmlStr += "verybad ";
                    break;
            }
            htmlStr += "\">";
            switch (n.level) {
                case "轻度污染":
                    htmlStr += "轻污";
                    break;
                case "中度污染":
                    htmlStr += "中污";
                    break;
                default:
                    htmlStr += n.level;
                    break;
            }
            htmlStr += "</span>";
            htmlStr += "</li>";
        });
        $("#ul_week").html(htmlStr);
    },
    Load_Info: function (result) {

        $("#div_score").html(parseInt(result.score) + "分");
        if (result.tiptitle.length > 15) {
            $("#div_upper").html(result.tiptitle.substring(0, 15) + "...");
        }
        else {
            $("#div_upper").html(result.tiptitle);
        }
        switch (result.level) {
            case "优":
                $("#div_level").html("<img id src=\"img/good.png\"> ");
                break;
            case "良":
                $("#div_level").html("<img id src=\"img/good.png\"> ");
                break;
            case "轻度污染":
                $("#div_level").html("<img id src=\"img/good.png\"> ");
                break;
            case "重度污染":
                $("#div_level").html("<img id src=\"img/good.png\"> ");
                break;
            default:
                $("#div_level").html("<img id src=\"img/good.png\"> ");
                break;
        }

    },
    GetObj_TJ: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(Project.api_input_tj);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "1033", "api_token": g_const_api_token.Wanted };
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
                Project.Load_Result_TJ(msg.projectlist)
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
    Load_Result_TJ: function (resultlist) {

        var htmlStr = "";
        $.each(resultlist, function (i, n) {
            htmlStr += "<li>";
            htmlStr += "<a class=\"clearfix\" onclick=\"Project.Load_Detail('" + n.number + "')\">";
            htmlStr += "<div class=\"pic fl\"><img src=\"";
            if (n.img == "") {
                htmlStr += "/img/defalt.jpg";
            }
            else {
                htmlStr += n.img;
            }
            htmlStr += "\"></div><div class=\"con fl\">";
            htmlStr += "<h4>" + n.name + "<span></span></h4>";
            htmlStr += "<p class=\"title02\">" + n.distance + "km以内 | " + n.address + "</p>";
            htmlStr += "<div class=\"price02\">￥" + n.price + "</div>";
            htmlStr += "</div><b class=\"lookD\">查看详情</b></a></li>";
        });
        $("#ul_tjlist").html(htmlStr);
    },
    Load_Detail: function (code) {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.ProjectDetail + "?code=" + code + "&t=" + Math.random();
    },
    

    GetObj1: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(Project.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "1025", "api_token": g_const_api_token.Wanted };
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
              //  $("#PositionName").html(msg.name);
             //   $("#PositionScore").html(msg.score);
                //if (msg.tiptitle.length > 15) {
                //    $("#spantiptitle").html(msg.tiptitle.substring(0, 15) + "...");
                //}
                //else {
                //    $("#spantiptitle").html(msg.tiptitle);
                //}
                $("#span_PositionName").html(msg.name);
                $("#p_PositionName").html(msg.name);
                $("#span_temp").html(msg.tempmin + "°/" + msg.tempmax + "°");
                //$("#span_weather_icon").attr("style", "background:url(\"" + GetWeatherIcon + "\") no-repeat;");
                //$("#span_weather_text").html(msg.weather);
                //$("#wind_data").html(msg.windpower + "级");
                //$("#temp_data").html(msg.tempmin + "~" + msg.tempmax + ".C");
                //$("#div_upper").html(msg.tiptime);
                //$("#div_score").html(msg.score);
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