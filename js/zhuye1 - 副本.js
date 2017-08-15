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
    if (Project.api_input.city == "") {
        if (location.host == g_merchant_Act_Host) {
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var geoc = new BMap.Geocoder();
                    geoc.getLocation(r.point, function (rs) {
                        var addComp = rs.addressComponents;
                        // alert(addComp.province + ", " +addComp.city + ", " +addComp.district + ", " +addComp.street + ", " + addComp.streetNumber);
                        Project.api_input.city = addComp.city.replace(/市/g, "");
                    });
                }
            }, { enableHighAccuracy: true })
        }
        else {

        }
    }
    
    //获取坐标信息
    if (location.host == g_merchant_Act_Host) {
        var map = new BMap.Map("allmap");
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                map.centerAndZoom(r.point, 15);
                //map.centerAndZoom(new BMap.Point(116.3964, 39.9093), 15);
                //var opts = {
                //    position: r.point,    // 指定文本标注所在的地理位置
                //    offset: new BMap.Size(30, -30)    //设置文本偏移量
                //}
                //var label = new BMap.Label("我的位置", opts);  // 创建文本标注对象
                //label.setStyle({
                //    color: "red",
                //    fontSize: "20px",
                //    height: "40px",
                //    lineHeight: "40px",
                //    fontFamily: "微软雅黑"
                //});
               // map.addOverlay(label);
                map.enableScrollWheelZoom();

                // 复杂的自定义覆盖物


             //   var txt = "银湖海岸城", mouseoverTxt = txt + " " + parseInt(Math.random() * 1000, 10) + "套";

                var myCompOverlay = new ComplexCustomOverlay(r.point, "我的位置", "");

                map.addOverlay(myCompOverlay);


                Project.api_input.position = r.point.lng + ',' + r.point.lat;
              //  Project.GetObj();
                Project.GetObj1();
            }
            else {

            }
        }, { enableHighAccuracy: true })

    }

    if (lng != "" && lat!="") {
        Project.api_input.position = lng + ',' + lat;
        var ret = JSON.parse('{"score":"82.64","AQIList":[{"week":"周三","date":"9.7","level":"优"},{"week":"周四","date":"9.8","level":"良"},{"week":"周五","date":"9.9","level":"优"},{"week":"周六","date":"9.10","level":"良"},{"week":"周日","date":"9.11","level":"优"},{"week":"周二","date":"9.13","level":"轻度污染"},{"week":"周三","date":"9.14","level":"良"}],"tiptitle":"可以接受的，除极少数对某种污染物特别敏感的人以外，对公众健康没有危害。","level":"优","name":"沿海赛洛城","detailList":[{"name":"空气","level":"良","memo":"80"},{"name":"天气","level":"良","memo":"阵雨"},{"name":"垃圾","level":"较远","memo":"2Km以外"},{"name":"水质","level":"优良","memo":"色度低"},{"name":"噪音","level":"较少","memo":"2Km以外"}],"resultCode":0,"resultMessage":"SUCCESS"}');
        Project.Load_Result(ret.detailList);
    }
    $("#btnBuy").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.OrderConfirm + "?t=" + Math.random();
    });
    $("#loupan").click(function () {
        window.location.href = g_const_PageURL.ProjectList + "?t=" + Math.random();
    });
    $("#zhuye").click(function () {
        window.location.href = g_const_PageURL.Index1 + "?t=" + Math.random();
    });
    $("#wode").click(function () {
        window.location.href = g_const_PageURL.MyAccount + "?t=" + Math.random();
    });
    $("#add_btn").click(function () {
        window.location.href = g_const_PageURL.City + "?t=" + Math.random();
    });
    
});
var lng = "";
var lat = "";
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
 //   div.style.lineHeight = "18px";
  //  div.style.whiteSpace = "nowrap";
  //  div.style.MozUserSelect = "none";
    div.style.fontSize = ".15rem";
    div.style.color = "#fff";
    var span = this._span = document.createElement("span");
    div.appendChild(span);
    span.appendChild(document.createTextNode(this._text));
    var that = this;

    var arrow = this._arrow = document.createElement("span");
   // arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
    /*arrow.style.position = "absolute";
    arrow.style.border = ".07rem solid #fa4343";
    arrow.style.backgroundColor = "#fa4343";
    arrow.style.width = "0";
    arrow.style.height = "0";
    arrow.style.content = "' '";
    arrow.style.top = ".32rem";
    arrow.style.left = "50%";
    arrow.style.overflow = "hidden";*/
    //arrow.style.marginLeft = "-.09rem";
    //arrow.style.overflow = "hidden";
   //arrow.style.border-top = ".07rem solid #fa4343";
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
    api_input: { "position": "", "city": "" },
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
                Project.Load_Result(msg.DetailList);
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

        var htmlStr1 = "";
        var htmlStr2 = "";
        $.each(resultlist, function (i, n) {
            if (i<4) {
                htmlStr1 += "<td>";
                htmlStr1 += "<span>" + n.name + "</span>";
                htmlStr1 += "<span class=\"";
                switch (i) {
                    case 0:
                        htmlStr1 += "air ";
                        break;
                    case 1:
                        htmlStr1 += "water ";
                        break;
                    case 2:
                        htmlStr1 += "rubbish ";
                        break;
                    case 3:
                        htmlStr1 += "radiation ";
                        break;
                }
                htmlStr1 += "envi-bg wbc-text-on-color\">" + n.level + "</span>";
                htmlStr1 += "</td>";
                htmlStr2 += "<td>" + n.memo + "</td>";
            }
        });
        $("#tr_aqi_1").html(htmlStr1);
        $("#tr_aqi_2").html(htmlStr2);
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
                $("#PositionName").html(msg.name);
                $("#PositionScore").html(msg.score);
                if (result.tiptitle.length > 15) {
                    $("#spantiptitle").html(result.tiptitle.substring(0, 15) + "...");
                }
                else {
                    $("#spantiptitle").html(result.tiptitle);
                }
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
    GetWeatherIcon: function (weather) {
        var iconName = "";
        switch (weather) {
            case "1":
                iconName = "等待付款";
                break;
            case "2":

                break;
            default:

                break;
        }
        return iconName;
    },
};