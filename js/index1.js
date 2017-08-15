$(document).ready(function () {
 //   UseAppFangFa.CaoZuo("refresh", "", "false");
    FooterMenu.Set(0);
    var clientType = GetClientType();
    var chartfontsize = 0;
    switch (clientType) {
        case 1:
            break;
        case 2:

            break;
        case 3:
            //chartfontsize = 45;
            break;
        case 4:

            break;
    }
    var oHeight = $(window).height() + chartfontsize;
    var oW = $(window).width();
    if (oW <= 320) {
        $(".chartTxt").css("fontSize", "12px");
    }
    $(".newBox").css("height", oHeight + "px");
    $(".thirdIndex .pmWrap").click(function () {
        var oHeight = $(window).height();
        $(".thirdIndex").css({ "WebkitTransform": "translate(0px, " + (-oHeight) + "px)", "WebkitTransition": "1s all ease" });
        $(".botNav").fadeIn("slow");
        //$("#lt_date").hide(200).removeClass("lt_date").addClass("lt_date_02").show(200);
        $(".updateOrCore").hide();
        $(".botNav").show();
        $("#loupan").hide();
        
        
    })
    if (GetQueryString("showtype")==1) {
        var oHeight = $(window).height();
        $(".thirdIndex").css({ "WebkitTransform": "translate(0px, " + (-oHeight) + "px)", "WebkitTransition": "1s all ease" });
        $(".botNav").fadeIn("slow");
        //$("#lt_date").hide(200).removeClass("lt_date").addClass("lt_date_02").show(200);
        $(".updateOrCore").hide();
        $(".botNav").show();
        $("#loupan").hide();
    }
    $("#add_btn").click(function () {
        // $(this).hide("slow");
        if (GetQueryString("showtype") != 1) {
            $(".thirdIndex").css({ "WebkitTransform": "translate(0px, 0px)", "WebkitTransition": "1s all ease" });
            //$("#lt_date").hide(200).removeClass("lt_date_02").addClass("lt_date").show(200);
            $(".updateOrCore").show();
            $(".botNav").hide();
            $("#div_AQI").hide();
            $("#loupan").show();
        }
        else {
            window.location.replace(PageUrlConfig.BackTo(1));
        }
    })

    //App嵌入时显示“关闭窗口”
    //AppLoginYYG.GetInfo();
    UseAppFangFa.ShowCloseBtn('div_appclosewindow');
    //获取城市信息
    //if (localStorage[g_const_localStorage.City] == undefined) {
    //    Project.api_input.city = "";
    //}
    //else {
    //    Project.api_input.city = localStorage[g_const_localStorage.City];
    //}

    //if (GetQueryString("lng") != "" && GetQueryString("lat") != "") {
    if (localStorage[g_const_localStorage.Position] != undefined && localStorage[g_const_localStorage.Position] != "") {
        var po = new BMap.Point(localStorage[g_const_localStorage.Position].split(',')[1], localStorage[g_const_localStorage.Position].split(',')[0]);
        var geoc = new BMap.Geocoder();
        point_A = point_C = po;
        geoc.getLocation(po, function (rs) {
            var addComp = rs.addressComponents;
            SetMapData(addComp, po, "/img/lookArtHear.png", true);
        });
    }
    else {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {

            var geoc = new BMap.Geocoder();
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                po = r.point;
                // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
            }
            else {
                ShowMesaage('failed' + this.getStatus());
            }
            point_A = point_C = po;
            geoc.getLocation(po, function (rs) {
                var addComp = rs.addressComponents;
                //   alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                SetMapData(addComp, po, "/img/lookArtHear.png", true);
            });
        }, { enableHighAccuracy: true })
    }


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

    $("#zhuye,#span_back").click(function () {
        window.location.href = g_const_PageURL.Index + "?t=" + Math.random();
        //$(".header").fadeOut("slow");
        //$(".botNav").fadeOut("slow");
        //$(".kongSpace").hide();
    });

    //$("#add_btn").click(function () {
    //    window.location.href = g_const_PageURL.City + "?t=" + Math.random();
    //});
    $("#span_more").click(function () {
        window.location.href = g_const_PageURL.ProjectList1 + "?p=m&t=" + Math.random();
    });
    $("#div_step").click(function () {
        window.location.href = g_const_PageURL.Step + "?t=" + Math.random();
    });
    $("#div_carbon").click(function () {
        window.location.href = g_const_PageURL.Carbon + "?t=" + Math.random();
    });
    $("#div_weather").click(function () {
        window.location.href = g_const_PageURL.Weather + "?t=" + Math.random();
    });
    //$("#div_weather").click(function () {
    //    window.location.href = g_const_PageURL.Weather + "?t=" + Math.random();
    //});
    $("#span_ProjectList").click(function () {
        Project.GetObj_TJ();
        $("#ul_tjlist").show();
        $("#span_ProjectList").hide();
    });
    $("#span_core").click(function () {
        localStorage[g_const_localStorage.City] = "";
        Project.api_input.city = "";
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var geoc = new BMap.Geocoder();
                var po = r.point;
                point_A = point_C = po;
                geoc.getLocation(po, function (rs) {
                    var addComp = rs.addressComponents;


                    SetMapData(addComp, po, "/img/lookArtHear.png", true);
                });
            }
        }, { enableHighAccuracy: true })
        //var geoc = new BMap.Geocoder();
        //geoc.getLocation(point_C, function (rs) {
        //    var addComp = rs.addressComponents;
        //    SetMapData(addComp, point_C, "/img/cuurPosition.png",true);
        //});
    });
    $("#span_update").click(function () {
        window.location.reload();
    });

    if (clientType == 2) {
        var startX = startY = endX = endY = 0;
        map.addEventListener("touchstart", function (e) {
            var touch = e.changedTouches[0];
            startX = touch.pageX;
            startY = touch.pageY;
        });
        map.addEventListener("touchend", function (e) {
            var touch = e.changedTouches[0];
            endX = touch.pageX;
            endY = touch.pageY;
       //     if (startX == endX && startY == endY) {
                var center = e.point;
                var getData = true;
                if (map.getDistance(point_A, center) < g_const_Map_Distance) {
                    getData = false;
                }

                var geoc = new BMap.Geocoder();
                geoc.getLocation(center, function (rs) {
                    var addComp = rs.addressComponents;
                 //   localStorage[g_const_localStorage.Position] = center.lat + "," + center.lng;
                    SetMapData(addComp, center, "/img/lookArtHear.png", getData);
                });
        //    }
        });
    }
    else {
        map.addEventListener("click", function (e) {
            var center = e.point;
            var getData = true;
            if (map.getDistance(point_A, center) < g_const_Map_Distance) {
                getData = false;
            }

            var geoc = new BMap.Geocoder();
            geoc.getLocation(center, function (rs) {
                var addComp = rs.addressComponents;
              //  localStorage[g_const_localStorage.Position] = center.lat + "," + center.lng;
                SetMapData(addComp, center, "/img/lookArtHear.png", getData);
            });
        });
    }



   // Init.GetStepCountByApp();


});
var options = {
    scaleOverlay: false,
    //Boolean - If we should show the scale at all
    showScale: false,
    //Boolean - whether to make the chart responsive to window resizing
    responsive: false,
    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,

    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth: 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve: true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension: 0,//0.4k线的弧度

    //Boolean - Whether to show a dot for each point
    pointDot: true,

    //Number - Radius of each point dot in pixels
    pointDotRadius: 2,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth: 3,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius: 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke: true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth: 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill: true,
    //Boolean - Whether to show labels on the scale    
    // 是否显示y轴的标签
    scaleShowLabels: true,

    //Interpolated JS string - can access value
    // 标签显示值
    scaleLabel: "<%=value%>",

    //String - Scale label font declaration for the scale label
    // 标签的字体
    scaleFontFamily: "'Arial'",

    //Number - Scale label font size in pixels    
    // 标签字体的大小
    scaleFontSize: 12,

    //String - Scale label font weight style
    // 标签字体的样式
    scaleFontStyle: "normal",

    //String - Scale label font colour    
    // 标签字体的颜色
    scaleFontColor: "#666",
    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};
var Init = {
    GetStepCountByApp: function () {
        var cType = GetClientType();
        var stepCount = 0;
        if (cType == ClientType.JYH_Android) {
            var aMod = JSON.parse(window.share.getStepCount());
            stepCount = aMod.step;
        }
        else if (cType == ClientType.JYH_iOS) {
            if (typeof (OCModel) !== "undefined") {
                stepCount = OCModel.getTodaySteps();

            }
            else {
                window.setTimeout(Init.GetStepCountByApp, 500);

            }
        }
        else {
            $("#div_zuji").hide();
            $("#div_tb").hide();
            UserInfo.Check(Init.GetTodayStep);
        }
        $("#span_step").html(stepCount);
        $("#span_tb").html((stepCount * 0.00008).toFixed(2));
    },
    GetTodayStep: function () {
        var purl = g_APIUTL_In;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: "t=" + Math.random() + "&action=gettodaystep&phoneno=" + UserInfo.LoginName,
            dataType: g_APIResponseDataType
        });

        request.done(function (msg) {

            if (msg.resultcode) {
                if (msg.resultcode == g_const_Success_Code) {
                    var _step = 0;
                    var _carbon = 0.0;
                    var productData = JSON.parse(msg.resultmessage).ResultTable;
                    $.each(productData, function (i, n) {
                        _step = n.step;
                        _carbon = n.carbon;
                    });
                    if (_step > 0) {
                        $("#span_step").html(_step);
                        $("#span_tb").html(parseFloat(_carbon).toFixed(2));
                        $("#div_zuji").show();
                        $("#div_tb").show();
                    }
                }
            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
}

var map = new BMap.Map("allmap");
var point_A;
var point_C;

function SetMapData(addComp, center, icon_url,getdata) {
    

    
    $("#p_PositionName").html(addComp.district + addComp.street + addComp.streetNumber);
    $("#span_PositionName").html(addComp.district + addComp.street + addComp.streetNumber);
    map.clearOverlays();
    var myIcon = new BMap.Icon(icon_url, new BMap.Size(22, 47));
    var marker = new BMap.Marker(center, { icon: myIcon });  // 创建标注
    map.addOverlay(marker);
    myIcon = new BMap.Icon("/img/lookArtHear.png", new BMap.Size(22, 47));
    marker = new BMap.Marker(point_C, { icon: myIcon });  // 创建标注
    map.addOverlay(marker);
    if (getdata) {
        point_A = center;
        map.centerAndZoom(center, 14);
        map.enableScrollWheelZoom();
        
    
        Project.api_input.position = center.lat + "," + center.lng;
        Project.api_input.city = addComp.city.replace(/市/g, "");
        Project.GetObj1();
        Project.api_input_tj.city = addComp.city.replace(/市/g, "");
        Project.api_input_tj.position = center.lat + "," + center.lng;
        Project.GetObj();
        Project.api_input_2050_A.city = addComp.city;
        Project.api_input_2050_A.area = addComp.district;
        Project.GetObj_2050_A();
        Project.api_input_2050_B.city = addComp.city;
        Project.api_input_2050_B.area = addComp.district;
        Project.GetObj_2050_B();
    }
    var circle = new BMap.Circle(center, g_const_Map_Distance, { fillColor: "#10a5fe", strokeWeight: 1, fillOpacity: 0.25, strokeOpacity: 0.3 });//设置覆盖物的参数，中心坐标，半径，颜色
    map.addOverlay(circle);//在地图上显示圆形覆盖物
}
var radarChartData = {
    labels: [],
    datasets: [
        {
            label: "",
            fillColor: "rgba(0,0,0,0)",
            strokeColor: "rgba(0,0,0,0)",
            pointColor: "rgba(0,0,0,0)",
            pointStrokeColor: "rgba(0,0,0,0)",
            pointHighlightFill: "rgba(0,0,0,0)",
            pointHighlightStroke: "rgba(0,0,0,0)",
            data: [5, 5, 5, 5, 5, 5, 5, 5, 5]
        },
        {
            label: "",
            fillColor: "rgba(105,145,92,0.9)", //rgba(255,239,229,0.6)面积颜色
            strokeColor: "rgba(250,250,250,0)", //rgba(227,211,201,0.6) 面积外框颜色
            pointColor: "rgba(250,250,250,0)", //rgba(255,95,1,1) 断点颜色
            pointStrokeColor: "transparent", //"#ff5f01"  transparent
            pointHighlightFill: "transparent", //"#ff5f01"
            pointHighlightStroke: "rgba(200,76,4,0)", //rgba(200,76,4,0.8)
            data: []
        }
    ]
};
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
     //   alert("click");
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
                if (msg.AQIList) {
                    Project.Load_AQI(msg.AQIList);
                }
                
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
    Load_AQIDialog:function (name) {
        var htmlStr = "";
        switch (name) {
            case "空气":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>空气质量指数（Air Quality Index，简称AQI）可以定量描述空气质量状况。空气质量按照空气质量指数大小分为六级，相对应空气质量的六个类别，指数越大、级别越高说明污染的情况越严重，对人体的健康危害也就越大。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_01'>";
                htmlStr += "<thead><tr><th class='cel-50'>级别</th><th class='cel-50'>空气质量指数</th></tr></thead>";
                htmlStr += "<tbody><tr><td>1级 优</td><td>0-50</td></tr>";
                htmlStr += "<tr><td>2级 良</td><td>51-100</td></tr>";
                htmlStr += "<tr><td>3级 轻度污染</td><td>101-200</td></tr>";
                htmlStr += "<tr><td>4级 中度污染</td><td>201-250</td></tr>";
                htmlStr += "<tr><td>5级 重度污染</td><td>251-300</td></tr>";
                htmlStr += "<tr><td>6级 严重污染</td><td>300以上</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "噪音":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>凡是妨碍人们正常休息、学习和工作的声音，以及对人们要听的声音产生干扰的声音都属于噪音。按照普通人的听力水平，50分贝相当于正常交谈的声音，30-40分贝是比较安静的正常环境，60分贝以上就属于吵闹范围了。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_02'>";
                htmlStr += "<thead><tr><th class='cel-33'>级别</th><th class='cel-33'>昼间分贝数</th><th class='cel-33'>夜间分贝数</th></tr></thead>";
                htmlStr += "<tbody><tr><td>I 类 优</td><td>55以下</td><td>45以下</td></tr>";
                htmlStr += "<tr><td>II类 良</td><td>60以下</td><td>50以下</td></tr>";
                htmlStr += "<tr><td>III类 中度污染</td><td>65以下</td><td>55以下</td></tr>";
                htmlStr += "<tr><td>IV类 严重污染</td><td>65以上</td><td>55以上</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "危险品":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>危险品包括爆炸品、易燃物、氧化剂、毒害品、放射性物、腐蚀品等。根据《危险化学品经营企业开业条件和技术要求》，大中型危险化学品仓库应与周围公共建筑物、交通干线（公路、铁路、水路）、工矿企业等距离至少保持1000米。但是中国国内尚没有对危化品堆场与住宅、学校等人口密集区域、甚至饮用水源地的安全距离作出清晰的法律规定。</p>";
                break;
            case "水质":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>水质是水体的物理性质（如色度、浊度、臭味等）、化学组成（无机物和有机物的含量）、生物学特性（细菌、微生物、浮游生物、底栖生物）的总称。依照《地面水环境质量标准》（GB3838-2002）中规定，地面水使用目的和保护目标，我国地面水分五大类。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_04'>";
                htmlStr += "<thead><tr><th class='cel-12'>级别</th><th class='cel-88'>说明</th></tr></thead>";
                htmlStr += "<tbody><tr><td>I 类</td><td>水质良好。地下水只需消毒处理，地表水经简易净化处理(如过滤)、消毒后即可供生活饮用者。</td></tr>";
                htmlStr += "<tr><td>II类</td><td>主要适用于集中式生活饮用水，经常规净化处理(如絮凝、沉淀、过滤、消毒等)，其水质即可供生活饮用者。</td></tr>";
                htmlStr += "<tr><td>III类</td><td>适用于集中式生活饮用水、但水质受轻度污染，一般是鱼类保护区及游泳区。</td></tr>";
                htmlStr += "<tr><td>IV类</td><td>存在比较严重污染，不能供生活应用者，主要适用于一般工业用水区及人体非直接接触的娱乐用水区。</td></tr>";
                htmlStr += "<tr><td>V类</td><td>主要适用于农业用水区及一般景观要求水域。</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "土壤":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>土壤是地球陆地的表面由矿物质、有机质、水、空气和生物组成的，具有肥力并能生长植物的疏松表层。根据土壤应用功能和保护目标，可将土壤划分为三类。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_04'>";
                htmlStr += "<thead><tr><th class='cel-18'>级别</th><th class='cel-82'>说明</th></tr></thead>";
                htmlStr += "<tbody><tr><td>I类一级</td><td>适用于国家规定的自然保护区、集中式生活饮用水源地、茶园、牧场和其他保护地区的土壤，土壤质量基本上保持自然背景水平。</td></tr>";
                htmlStr += "<tr><td>II类二级</td><td>适用于一般农田、蔬菜地、茶园果园、牧场等土壤，土壤质量基本上对人体、植物和环境不造成危害和污染</td></tr>";
                htmlStr += "<tr><td>III类三级</td><td>适用于林地土壤及污染物容量较大的高背景值土壤和矿产附近等地的农田土壤。土壤质量对人体、植物和环境造成的危害和污染较小。</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "污染源":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>目前可查询的污染源包括化工厂和垃圾处理中心。点点环境将会持续增加其它污染源信息。化工厂在生产、储运过程中如发生爆炸、泄露或非法排放，有可能对人体造成中毒、窒息、化学灼伤等伤害。垃圾处理中心则存在垃圾臭气、垃圾渗沥液、焚烧产生的二噁英等污染物的潜在风险。距离污染源越近，风险等级越高，对人造成危害的可能性越大。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_03'>";
                htmlStr += "<thead><tr><th rowspan='2' class='cel-20'>污染源类型</th><th colspan='3' class='botb'>所在地与污染源之间距离</th></tr>";
                htmlStr += "<tr><th class='cel-25'>安全(米)</th><th class='cel-30'>存在一定潜在风险(米)</th><th class='cel-25'>潜在风险高(米)</th></tr></thead>";
                htmlStr += "<tbody><tr><td>化工厂</td><td>&lt;2000</td><td>1000&lt;<i>☺</i>&lt;2000</td><td>&lt;1000</td></tr>";
                htmlStr += "<tr><td>垃圾转运站</td><td>&lt;1000</td><td>300&lt;<i>☺</i>&lt;1000</td><td>&lt;300</td></tr>";
                htmlStr += "<tr><td>垃圾填埋场</td><td>&lt;1000</td><td>300&lt;<i>☺</i>&lt;1000</td><td>&lt;300</td></tr>";
                htmlStr += "<tr><td>垃圾焚烧场</td><td>&lt;3000</td><td>1000&lt;<i>☺</i>&lt;3000</td><td>&lt;1000</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "辐射":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>目前可查询的辐射为高压线辐射。高压线产生的电磁场一般称为极低频电磁场或者叫工频电场。高压线、变电站会产生电磁辐射，它产生的工频电场是感应电场感应磁场，因为它的波长非常长，所以它不会像电磁辐射那样被人体直接吸收，但是会在人体里头感应出电流来，这个感应电流需要控制。工频电场会在人体中产生感应电流，为了防止对人体产生影响，需要将感应电流密度控制在一定的范围内。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_01'>";
                htmlStr += "<thead><tr><th class='cel-50'>高压线级别</th><th class='cel-50'>安全距离</th></tr></thead>";
                htmlStr += "<tbody><tr><td>220千伏</td><td>100米外</td></tr>";
                htmlStr += "<tr><td>132千伏</td><td>20米外</td></tr>";
                htmlStr += "<tr><td>11-66千伏</td><td>10米外</td></tr>";
                htmlStr += "<tr><td>地埋高压线</td><td>5米外</td></tr></tbody>";

                htmlStr += "</table></div>";
                break;
            case "容积率":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>容积率又称建筑面积毛密度，指项目用地范围内地上总建筑面积与项目总用地面积的比值。容积率是衡量建设用地使用强度的一项重要指标。现行城市规划法规体系详细制定了各类居住用地容积率标准。住宅小区容积率小于1.0的，为非普通住宅。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_01'>";
                htmlStr += "<thead><tr><th class='cel-50'>居住用地种类</th><th class='cel-50'>容积率标准</th></tr></thead>";
                htmlStr += "<tbody><tr><td>独立别墅</td><td>0.2-0.5</td></tr>";
                htmlStr += "<tr><td>联排别墅</td><td>0.4-0.7</td></tr>";
                htmlStr += "<tr><td>6层以下住宅</td><td>0.8-1.2</td></tr>";
                htmlStr += "<tr><td>11层以下小高层住宅</td><td>1.5-2</td></tr>";
                htmlStr += "<tr><td>18层高层住宅</td><td>1.8-2.5</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "绿化率":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>居住区绿地率是描述居住区用地范围内各类绿地的总和与居住区用地的比率。绿地率所指的\"居住区用地范围内各类绿地\"主要包括公共绿地、宅旁绿地等。其中，公共绿地，又包括居住区公园、小游园、组团绿地及其他的一些块状、带状化公共绿地。绿地率=绿地面积/用地面积×100%。 根据《城市居住区规划设计规范》，绿地率的级别可分为三大类。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_01'>";
                htmlStr += "<thead><tr><th class='cel-50'>绿地率</th><th class='cel-50'>说明</th></tr></thead>";
                htmlStr += "<tbody><tr><td>30%以上</td><td>绿化程度非常好的小区。</td></tr>";
                htmlStr += "<tr><td>25%-30%</td><td>绿地率一般。</td></tr>";
                htmlStr += "<tr><td>25%以下</td><td>绿地率较低。</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
        }
        $("#div_AQI").html(htmlStr);
        $("#div_AQI").show();
    },
    Close_AQIDialog: function () {
        $("#div_AQI").hide();
    },
    Load_AQIDialogNew:function(name){
        window.location.href = "AQIDialog.html?name=" + encodeURI(name) + "&t=" + Math.random();
    },
    //加载单页
    //接口返回成功后的处理
    Load_Result: function (resultlist) {
        //var list = [{ "name": "空气", "level": "良", "memo": "67" }
        //          , { "name": "噪音", "level": "III类", "memo": "55/65" }
        //          , { "name": "危险品", "level": "安全", "memo": "无" }
        //          , { "name": "水质", "level": "优良", "memo": "色度低" } 
        //          , { "name": "土壤", "level": "优", "memo": "无污染" }
        //          , { "name": "污染源", "level": "垃圾站/化工厂", "memo": "5Km以外" }
        //          , { "name": "辐射", "level": "优", "memo": "无" }
        //          , { "name": "容积率", "level": "1.2", "memo": "最近楼盘名称" }
        //          , { "name": "绿化率", "level": "25%", "memo": "最近楼盘名称" }]
        var htmlStr = "";
        var radarVal = 0;
        var radarKey = [];
        $.each(resultlist, function (i, n) {

            //htmlStr += "<li class=\"fl\" onclick=\"Project.Load_AQIDialog('" + n.name + "')\">";
            htmlStr += "<li class=\"fl\" onclick=\"Project.Load_AQIDialogNew('" + n.name + "')\">";
            htmlStr += "<p>" + (n.name != null ? n.name.replace(/绿化率/g, "绿地率") : "") + "<span class=\"t_state ";
            switch (n.level) {
                case "优":
                case "较远":
                case "较少":
                case "优良":
                case "I类":
                case "I":
                case "l类":
                case "高":
                case "无":
                case "安全":
                    if (n.name=="容积率") {
                        htmlStr += "bad ";
                        radarVal = 1;
                    }
                    else {
                        htmlStr += "verygood ";
                        radarVal = 5;
                    }
                    break;
                case "良":
                case "II类":
                case "II":
                case "ll类":
                case "中":
                    htmlStr += "good ";
                    radarVal = 4;
                    break;
                case "III类":
                case "III":
                case "lll类":
                    htmlStr += "yiban ";
                    radarVal = 3;
                    break;
                case "IV类":
                case "IV":
                case "lV类":
                case "低":
                case "轻度污染":
                case "中度污染":
                case "垃圾站":
                case "化工厂":
                case "高压电":
                    if (n.name == "容积率") {
                        htmlStr += "verygood ";
                        radarVal = 4;
                    }
                    else {
                        htmlStr += "bad ";
                        radarVal = 2;
                    }
                    break;
                case "IIV":
                case "IIV类":
                case "llV类":
                case "重度污染":
                case "严重污染":
                    htmlStr += "verybad ";
                    radarVal = 1;
                    break;
                default:
                    if (n.level.indexOf('%') > -1) {
                        radarVal = parseInt(n.level.replace(/%/g, "")) / 10;
                    }
                    else {
                        
                        radarVal = parseFloat(n.level) / 0.5;
                    }
                    htmlStr += "verygood ";
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
                case "重度污染":
                    htmlStr += "重污";
                    break;
                case "严重污染":
                    htmlStr += "严污";
                    break;
                default:
                    if (n.level!=null) {
                        if (n.level.indexOf('/') > -1) {
                            htmlStr += n.level.split('/')[0] + n.level.split('/')[1].substr(0, 1);
                        }
                        else {
                            htmlStr += (n.level != null ? n.level : "");
                        }
                    }
                    else {
                        htmlStr += "";
                    }
                    break;
            }
            htmlStr +="</span></p>";
            htmlStr += "<b>" + (n.memo != null ? n.memo : "") + "</b>";
            htmlStr += "</li>";
            radarKey.push((n.name != null ? n.name.replace(/绿化率/g, "绿地率") : ""));
            //  radarChartData.labels.push((n.name != null ? n.name.replace(/绿化率/g, "绿地率"): ""));
            //radarChartData.labels=["空气", "噪音", "污染源", "水质", "土壤", "危险品", "辐射", "容积率", "绿化率"];
            radarChartData.datasets[1].data.push(radarVal);

        });
        radarChartData.labels = radarKey;
        $("#ul_DetailList").html(htmlStr);
        window.myRadar = new Chart(document.getElementById("myChart").getContext("2d")).Radar(radarChartData, {
            responsive: true,
            //Number - Point label font size in pixels  
            pointLabelFontSize: 8,
            //String - Colour of the scale line 
            scaleLineColor: "rgba(255,255,255,.7)",
            //Number - Scale label font size in pixels  
            scaleFontSize: 1,
            //String - Scale label font colour  
            scaleFontColor: "#fff",
            //String - The colour of the label backdrop 
            scaleBackdropColor: "rgba(255,255,255,0.75)",
            //String - Colour of the angle line
            angleLineColor: "rgba(255,255,255,0.75)",
            //String - Point label font colour  
            pointLabelFontColor: "#fff"
        });
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
                case "重度污染":
                    htmlStr += "veryverybad ";
                    break;
                case "严重污染":
                    htmlStr += "veryverybadandbad ";
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
                case "重度污染":
                    htmlStr += "重污";
                    break;
                case "严重污染":
                    htmlStr += "严污";
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

        $("#div_score").html("<p>环境质量评分：</p>" + parseInt(result.score) + "<span>分</span>");
        $("#div_score_general").html("<span>环境质量评分：</span>" + parseInt(result.score));
        if (result.score<60) {
            //$("#div_score").removeClass("pm fl");
            $("#div_pmwrap").attr("class", "pmWrap pmWrap-bad no clearfix");
            $("#div_score").attr("class", "pm bad fl");
            $("#div_level").html("<img src=\"img/bad.png\"> ");
            $("#div_level_general").html("<img src=\"img/bad.png\"> ");
            $("#div_upper").html("糟糕的环境质量就是我们一起赖床，一起蜗居的最好理由。");
            $("#div_chart_info").html("周边一项或多项环境数据严重不达标，可能会在一定程度上影响您的生活、健康与安全，了解更多请<a href=\"" + g_const_PageURL.ProjectList1 + "?p=l&t=" + Math.random() + "\" style=\"cursor:pointer;color:white\">购买周边楼盘环境质量报告</a>");
        }
        else if (result.score > 80) {
            //$("#div_score").removeClass("pm fl");
            $("#div_pmwrap").attr("class", "pmWrap pmWrap-good no clearfix");
            $("#div_score").attr("class", "pm bad fl");
            $("#div_level").html("<img src=\"img/good.png\"> ");
            $("#div_level_general").html("<img src=\"img/good.png\"> ");
            $("#div_upper").html("不能辜负的好时节，让我们一起畅快的运动，尽情的吸氧吧。");
            $("#div_chart_info").html("周边空气清新，噪音干扰较平时更少，其它环境指标均符合国家相关标准，与各种污染源、辐射源存在一定的安全距离，潜在风险较低，了解更多请<a href=\"" + g_const_PageURL.ProjectList1 + "?p=l&t=" + Math.random() + "\"style=\"cursor:pointer;color:white\">购买周边楼盘环境质量报告</a>");
        }
        else {
            //$("#div_score").removeClass("pm fl");
            $("#div_pmwrap").attr("class", "pmWrap pmWrap-liang no clearfix");
            $("#div_score").attr("class", "pm bad fl");
            $("#div_level").html("<img src=\"img/yiban.png\"> ");
            $("#div_level_general").html("<img src=\"img/yiban.png\"> ");
            $("#div_upper").html("周边的环境就像我们当下的生活，不好，但也不差。");
            $("#div_chart_info").html("周边一项或多项环境指标存在轻度或中度污染，与各种污染源、辐射源存在一定的安全距离，潜在风险可控，了解更多请<a href=\"" + g_const_PageURL.ProjectList1 + "?p=l&t=" + Math.random() + "\"style=\"cursor:pointer;color:white\">购买周边楼盘环境质量报告</a>");
        }
        //if (result.tiptitle.length > 40) {
        //    $("#div_upper").html(result.tiptitle.substring(0, 40) + "...");
        //}
        //else {
        //    $("#div_upper").html(result.tiptitle);
        //}

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
                htmlStr += "/img/default_small_4.jpg";
            }
            else {
                htmlStr += n.img;
            }
            htmlStr += "\"></div><div class=\"con fl\">";
            htmlStr += "<h4 style=\"color:#fff\">" + n.name + "<span></span></h4>";
            htmlStr += "<p class=\"title02\" style=\"color:#fff\">" + n.distance + "km以内 | " + n.address + "</p>";
            htmlStr += "<div class=\"price02\" style=\"color:#fff\">￥" + n.price + "</div>";
            htmlStr += "</div><b class=\"lookD\" style=\"color:#fff\">查看详情</b></a></li>";
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
                //$("#span_PositionName").html(msg.name);
                //$("#p_PositionName").html(msg.name);
                $("#span_temp").html(msg.tempmin + "°/" + msg.tempmax + "°");
                $("#span_general").html(msg.tempmin + "°/" + msg.tempmax + "°");
                var oDate = new Date();
                var daytype = "";
                if (oDate.getHours() >= 7 && oDate.getHours() < 19) {
                    daytype = "day/";
                }
                else {
                    daytype = "night/";
                }
                if (msg.weatherId.fa == msg.weatherId.fb) {
                    $("#span_weather_icon_2").attr("style", "background:url(\"../img/weather/" + daytype + msg.weatherId.fa + ".png\") no-repeat;width: .14rem;height: .14rem;background-size: 100%;margin-right: .05rem;");
                    $("#span_weather_icon_2").show();
                }
                else {
                    $("#span_weather_icon_1").attr("style", "background:url(\"../img/weather/" + daytype + msg.weatherId.fa + ".png\") no-repeat;width: .14rem;height: .14rem;background-size: 100%;margin-right: .05rem;");
                    $("#span_weather_icon_1").show();
                    $("#span_weather_icon_2").attr("style", "background:url(\"../img/weather/" + daytype + msg.weatherId.fb + ".png\") no-repeat;width: .14rem;height: .14rem;background-size: 100%;margin-right: .05rem;");
                    $("#span_weather_icon_2").show();
                }
                //$("#span_weather_icon").html(msg.weatherId.fa + "-" + msg.weatherId.fb);
                //$("#span_weather_icon").attr("style", "background:url(\"../img/"++".png\") no-repeat;");
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

    api_input_2050_A: { "city": "", "area": "", "type": "A" },
    GetObj_2050_A: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(Project.api_input_2050_A);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "2050", "api_token": g_const_api_token.Wanted };
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
            if (msg.code == 1) {
                Project.Load_Result_2050_A(msg.date);

            }
            else {
               // ShowMesaage(msg.resultMessage);
            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    Load_Result_2050_A: function (resultlist) {
        var htmlStr = "";
        var data = {
            labels: [],
            datasets: [
            {
                label: "空气污染",
                fillColor: "rgba(220,220,220,0)",
                strokeColor: "rgba(220,220,220,1)",//线
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            }
            ]
        };
        var htmlStr = "";
        var oDate = new Date();
        var flow = [];
        var labels = [];
        $.each(resultlist, function (i, n) {
            labels.push((oDate.AddDays(i + 1).getMonth() + 1).toString() + "." + oDate.AddDays(i + 1).getDate().toString());
            flow.push(n);
            htmlStr += "<li><span class=\"time\">";
            htmlStr += (oDate.AddDays(i + 1).getMonth() + 1).toString() + "." + oDate.AddDays(i + 1).getDate().toString();
            htmlStr += "</span><span class=\"pollute ";
            if (n>0&&n<=50) {
                htmlStr += "verygood\">优";
            } else if (n > 50 && n <= 100) {
                htmlStr += "good\">良";
            } else if (n > 100 && n <= 150) {
                htmlStr += "bad\">轻污";
            } else if (n > 150 && n <= 200) {
                htmlStr += "verybad\">中污";
            } else if (n > 200 && n <= 300) {
                htmlStr += "veryverybad\">重污";
            } else {
                htmlStr += "veryverybadandbad\">严污";
            }
            
            htmlStr += "</span></li>";
        });
        $("#ul_week_kline").html(htmlStr);
        Project.InitKline_A(flow, labels, "myChart_k", "#fff", "", $(window).width()+10);
       // window.myLineChart = new Chart(document.getElementById("myChart_k").getContext("2d")).Line(data, options);
        //$("#myChart_k").width($(window).width()*0.85);
    },
    InitKline_A: function (flow, labels, div, color, dataname, canvasH) {
      //  var canvasH = $("#" + div).width();
        //   alert(flow[0] + "," + flow[1] + "," + flow[2] + "," + flow[3] + "," + flow[4] + "," + flow[5] + "," + flow[6]);
        //var flow = [0,0,0,0,0,0,0];
        //for (var i = 0; i < 12; i++) {//显示数量自定义
        //    flow.push(Math.floor(Math.random() * (3000 + ((i % 12) * 5))) + 10);
        //}
        var data = [
                    {
                        name: dataname,
                        value: flow,//[1,1652,20,26,30,132,29,222,0,0,132,29],
                        color: color,
                        line_width: 4
                    }
        ];
        // var labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "21"]
        var chart = new iChart.LineBasic2D({
            render: div,
            data: data,
            border:0,
            background_color:"",
            // title : '北京2012年平均温度情况',
            width: (canvasH+10)*2,
            height: 200,
            //shadow: false,
            // shadow_color : 'red',
            // shadow_blur : 4,
            // shadow_offsetx : 0,
            // shadow_offsety : 2,
            crosshair: {
                enable: true,
                line_color: color
            },

            sub_option: {
                smooth: true,//平滑曲线
                point_size: 18,
                label: {
                    fontunit: 'rem',//自定义em单位
                    fontsize: 25,
                    color: '#fff',
                    fontweight: 100
                },
                listeners: {
                    parseText: function (r, t) {
                    //自定义柱形图上方label的格式。
                        return '';//℃
                        }
                    }
            },
            tip: {
                enable: true,
                shadow: true
            },
            legend: {
                enable: false
            },
            coordinate: {
                height: '70%',
                background_color: null,
                grid_color: 'transparent',//经纬线
                axis: {
                    color: 'transparent',
                    width: [0, 0, 0, 0]//上下左右标线
                },
                grids: {
                    vertical: {
                        way: 'share_alike',
                        value: 5
                    }
                },
                scale: [{//配置自定义值轴
                    position: 'left',//配置左值轴
                    start_scale: 0,//设置开始刻度为0
                    end_scale: 0,//设置结束刻度为26
                    scale_space: 0,//设置刻度间距
                    label: { color: 'transparent', fontsize: 11 },//刻度值
                    scale_color: 'transparent',
                    listeners: {//配置事件
                        parseText: function (t, x, y) {//设置解析值轴文本
                            return { text: "" }
                        }
                    }
                }, {
                    position: 'bottom',
                    label: { color: 'transparent', font: '微软雅黑', fontsize: 11 },
                    scale_enable: false,
                    labels: labels
                }]
                //labels:["1","2","3","4","5","6","7","8","9","10","11","21"]
            }
        });

        chart.draw();
    },
    api_input_2050_B: { "city": "", "area": "", "type": "B" },
    GetObj_2050_B: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(Project.api_input_2050_B);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "2050", "api_token": g_const_api_token.Wanted };
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
            if (msg.code == 1) {
                Project.Load_Result_2050_B(msg.date);

            }
            else {
            //    ShowMesaage(msg.resultMessage);
            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    Load_Result_2050_B: function (resultlist) {
        var htmlStr = "";
        var data = {
            labels: [],
            datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0)",
                strokeColor: "rgba(220,220,220,1)",//线
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: []
            }
            ]
        };
        //var options = {


        //    ///Boolean - Whether grid lines are shown across the chart
        //    scaleShowGridLines: true,

        //    //String - Colour of the grid lines
        //    scaleGridLineColor: "rgba(0,0,0,0)",

        //    //Number - Width of the grid lines
        //    scaleGridLineWidth: 1,

        //    //Boolean - Whether to show horizontal lines (except X axis)
        //    scaleShowHorizontalLines: true,

        //    //Boolean - Whether to show vertical lines (except Y axis)
        //    scaleShowVerticalLines: true,

        //    //Boolean - Whether the line is curved between points
        //    bezierCurve: true,

        //    //Number - Tension of the bezier curve between points
        //    bezierCurveTension: 0,//0.4k线的弧度

        //    //Boolean - Whether to show a dot for each point
        //    pointDot: true,

        //    //Number - Radius of each point dot in pixels
        //    pointDotRadius: 4,

        //    //Number - Pixel width of point dot stroke
        //    pointDotStrokeWidth: 1,

        //    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        //    pointHitDetectionRadius: 20,

        //    //Boolean - Whether to show a stroke for datasets
        //    datasetStroke: true,

        //    //Number - Pixel width of dataset stroke
        //    datasetStrokeWidth: 2,

        //    //Boolean - Whether to fill the dataset with a colour
        //    datasetFill: true,

        //    //String - A legend template
        //    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

        //};
        var htmlStr = "";
        var htmlWeather = "";
        var oDate = new Date();
        var flow_max = [];
        var flow_min = [];
        var labels = [];
        $.each(resultlist, function (i, n) {
            if (i < 7) {
                labels.push((oDate.AddDays(i + 1).getMonth() + 1).toString() + "." + oDate.AddDays(i + 1).getDate().toString());
                flow_max.push(n.tmp_max);
                flow_min.push(n.tmp_min);
                //data.labels.push((oDate.AddDays(i + 1).getMonth() + 1).toString() + "." + oDate.AddDays(i + 1).getDate().toString());
               // data.datasets[0].data.push(n.tmp_max);
              //  data.datasets[1].data.push(n.tmp_min);
                htmlStr += "<li><p class=\"txt01\">" + GetWeekName(oDate.AddDays(i + 1).getDay());
                htmlStr += "</p><p class=\"txt02\">";
                htmlStr += (oDate.AddDays(i + 1).getMonth() + 1).toString() + "." + oDate.AddDays(i + 1).getDate().toString() + "</p></li>";

                htmlWeather += "<li><span style=\"width:.20rem;height:.20rem;background:url(../img/weather/day/" + n.cw_am + ".png) no-repeat;background-size:100%;position:absolute;left:50%;margin-left:-.075rem;top:2px;\"></span>";
                htmlWeather += "<span style=\"width:.20rem;height:.20rem;background:url(../img/weather/night/" + n.cw_pm + ".png) no-repeat;background-size:100%;position:absolute;left:50%;margin-left:-.075rem;bottom:2px;\"></span></li>";
            }
        });
        $("#ul_week_kline_7").html(htmlStr);
        $("#ul_week_night_7").html(htmlWeather);
       // window.myLineChart = new Chart(document.getElementById("myChart_k_wearher").getContext("2d")).Line(data, options);
        Project.InitKline_B(flow_max, flow_min, labels, "myChart_k_wearher", "#fff", "", $(window).width()+10)
    },
    InitKline_B: function (flow1, flow2, labels, div, color, dataname, canvasH) {
        // var clientType = GetClientType();
        // var chartfontsize = 0;
        // switch(clientType) {
        //     case 1:
        //         if (CheckMachine.versions.android) {
        //             chartfontsize = 2.0;
        //         }
        //         else if (CheckMachine.versions.ios || CheckMachine.versions.iPhone || CheckMachine.versions.iPad) {
        //             chartfontsize = 25;
        //         }
        //         break;
        //     case 2:
        //         chartfontsize = 1.5;
        //         break;
        //     case 3:
        //         chartfontsize = 25;
        //         break;
        //     case 4:
        //         chartfontsize = 300;
        //         break;
        // }
        //  var canvasH = $("#" + div).width();
        //   alert(flow[0] + "," + flow[1] + "," + flow[2] + "," + flow[3] + "," + flow[4] + "," + flow[5] + "," + flow[6]);
        //var flow = [0,0,0,0,0,0,0];
        //for (var i = 0; i < 12; i++) {//显示数量自定义
        //    flow.push(Math.floor(Math.random() * (3000 + ((i % 12) * 5))) + 10);
        //}
        var data = [
                    {
                        name: dataname,
                        value: flow1,//[1,1652,20,26,30,132,29,222,0,0,132,29],
                        color: color,
                        line_width: 4,
                    },
                    {
                        name: dataname,
                        value: flow2,//[1,1652,20,26,30,132,29,222,0,0,132,29],
                        color: color,
                        line_width: 4
                    }
        ];
        // var labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "21"]
        var chart = new iChart.LineBasic2D({
            render: div,
            data: data,
            border: 0,
            background_color: "",
            // title : '北京2012年平均温度情况',
            width: (canvasH + 10)*2,
            height: 240,
            shadow: true,
            shadow_color : '#fff',
            shadow_blur : 0,
            shadow_offsetx : 0,
            shadow_offsety : 0,
            crosshair: {
                enable: true,
                line_color: color
            },

            sub_option: {
                smooth: true,//平滑曲线
                point_size: 18,
                label: {
                    fontunit: 'px',//自定义em单位    rem  px
                    fontsize: 24,  //chartfontsize   24
                    color: '#fff',
                    fontweight: 100
                },
                listeners: {
                    parseText: function (r, t) {
                        //自定义柱形图上方label的格式。
                        return t + '℃';//℃
                    }
                }
            },
            //tip: {
                //enable: true,
              //  shadow: true,
            //},
            legend: {
                enable: false
            },
            coordinate: {
                height: '70%',
                background_color: null,
                grid_color: 'transparent',//经纬线
                axis: {
                    color: 'transparent',
                    width: [0, 0, 1, 0]//上下左右标线
                },
                grids: {
                    vertical: {
                        way: 'share_alike',
                        value: 5
                    }
                },
                scale: [{//配置自定义值轴
                    position: 'left',//配置左值轴
                    start_scale: 0,//设置开始刻度为0
                    end_scale: 0,//设置结束刻度为26
                    scale_space: 0,//设置刻度间距
                    label: { color: 'transparent', fontsize: 11 },//刻度值
                    scale_color: 'transparent',
                    listeners: {//配置事件
                        parseText: function (t, x, y) {//设置解析值轴文本
                            return { text: "" }
                        }
                    }
                }, {
                    position: 'bottom',
                    label: { color: 'transparent', font: '微软雅黑', fontsize: 1,fontweight : 600 },
                    scale_enable: false,
                    labels: labels
                }]
                //labels:["1","2","3","4","5","6","7","8","9","10","11","21"]
            }
        });

        chart.draw();
    },
};