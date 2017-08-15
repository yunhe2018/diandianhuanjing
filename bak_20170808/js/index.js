$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
    var oH = $(window).height();
    var oW = $(window).width();
    var oH02 = $(".header").height() + $(".indexBox .pmWrap").height() - oH;
    var oFlideUp = function () {
        var that = $(this);
        $(this).css({ "WebkitTransform": "translate(0px, " + oH02 + "px)", "WebkitTransition": "1s all ease" });
        //$(".zuji").css({ "WebkitTransform": "translate(" + (oW - 25 - $(".zuji").outerWidth()) + "px,0px)", "WebkitTransition": "1s all ease" });
        $("#lt_date").hide(200).removeClass("lt_date").addClass("lt_date_02").show(200);
        $(".slide").hide();
        setTimeout(function () {
            $(document).scrollTop(0);
            that.css({ "WebkitTransform": "translate(0px, 0px)", "WebkitTransition": "0s all ease", "position": "relative" });
        }, 1000);
        $(".header").fadeIn("slow");
        $(".botNav").fadeIn("slow");
        $(".kongSpace").show();
        $(this).unbind();
    };
    $(".secondIndex .indexBox").click(oFlideUp);

    //点击导航首页 首页向下滑动到初始状态
    $(".botNav li:first,#add_btn").click(function () {
        $("#div_AQI").hide();
        $(".secondIndex .indexBox").css({ "WebkitTransform": "translate(0px, " + ($(document).scrollTop()+oH - $(".indexBox .pmWrap").height()) + "px)", "WebkitTransition": "1s all ease" });
        setTimeout(function () {
            $(".secondIndex .indexBox").css({ "WebkitTransform": "translate(0px, 0px)", "WebkitTransition": "0s all ease", "position": "fixed" });
        }, 1000);
        //$(".zuji").css({ "WebkitTransform": "translate(0px,0px)", "WebkitTransition": "1s all ease" });
        $("#lt_date").hide(200).removeClass("lt_date_02").addClass("lt_date").show(200);
        $(".header").fadeOut("slow");
        $(".botNav").fadeOut("slow");
        $(".kongSpace").hide();
        $(".slide").show();
        $(".secondIndex .indexBox").click(oFlideUp);

    })
    $("#add_btn").click(function () {
        $("#div_AQI").hide();
        $(".secondIndex .indexBox").css({ "WebkitTransform": "translate(0px, " + (oH - $(".indexBox .pmWrap").height()) + "px)", "WebkitTransition": "1s all ease" });
        setTimeout(function () {
            $(".secondIndex .indexBox").css({ "WebkitTransform": "translate(0px, 0px)", "WebkitTransition": "0s all ease", "position": "fixed" });
        }, 1000);
        $(".zuji").css({ "WebkitTransform": "translate(0px,0px)", "WebkitTransition": "1s all ease" });
        $(".header").fadeOut("slow");
        $(".botNav").fadeOut("slow");
        $(".kongSpace").hide();
        $(".slide").show();
        $(".secondIndex .indexBox").click(oFlideUp);
    })


    //App嵌入时显示“关闭窗口”
    AppLoginYYG.GetInfo();
    UseAppFangFa.ShowCloseBtn('div_appclosewindow');
    //获取城市信息
    if (localStorage[g_const_localStorage.City] == undefined) {
        Project.api_input.city = "";
    }
    else {
        Project.api_input.city = localStorage[g_const_localStorage.City];
    }

    if (Project.api_input.city=="") {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var geoc = new BMap.Geocoder();
                var po = r.point;
                //if (IsDebug) {
                //    po = new BMap.Point(g_const_Test_Point_lng, g_const_Test_Point_lat)
                //}
                point_A = point_C = po;
                geoc.getLocation(po, function (rs) {
                    var addComp = rs.addressComponents;


                    SetMapData(addComp, po, "/img/lookArtHear.png", true);
                    //$("#PositionName").html(addComp.district + addComp.street + addComp.streetNumber);
                    //$("#p_PositionName").html(addComp.district + addComp.street + addComp.streetNumber);
                    //Project.api_input.position = po.lat + "," + po.lng;
                    //Project.GetObj1();

                    //Project.api_input_tj.city = addComp.city.replace(/市/g, "");
                    //Project.api_input_tj.position = po.lat + "," + po.lng;
                    //Project.GetObj();
                    //Project.GetObj_TJ();
                    // $("#span_PositionName").html(addComp.district + addComp.street + addComp.streetNumber);
                });
            }
        }, { enableHighAccuracy: true })
    }
    else {
        //map.centerAndZoom("上海", 15);
        var myGeo = new BMap.Geocoder();
        myGeo.getPoint(Project.api_input.city, function (po) {
            point_A = point_C = po;
            myGeo.getLocation(po, function (rs) {
                var addComp = rs.addressComponents;
                SetMapData(addComp, po, "/img/lookArtHear.png", true);
            });
        }, Project.api_input.city);
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

    $("#zhuye").click(function () {
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
    map.addEventListener("click", function (e) {
        var center = e.point;
        var getData = true;
        if (map.getDistance(point_A, center) < g_const_Map_Distance) {
            getData = false;
        }
        
        var geoc = new BMap.Geocoder();
        geoc.getLocation(center, function (rs) {
            var addComp = rs.addressComponents;
            // alert(addComp.province + ", " +addComp.city + ", " +addComp.district + ", " +addComp.street + ", " + addComp.streetNumber);
            //map.centerAndZoom(center, 13);

            //map.enableScrollWheelZoom();
            //map.clearOverlays();
            //var myCompOverlay = new ComplexCustomOverlay(center, "点点环境", "");
            //map.addOverlay(myCompOverlay);



            SetMapData(addComp, center, "/img/lookArtHear.png", getData);
            

            //$("#PositionName").html(addComp.district + addComp.street + addComp.streetNumber);
            //$("#p_PositionName").html(addComp.district + addComp.street + addComp.streetNumber);
            //Project.api_input.position = center.lat + "," + center.lng;
            //Project.api_input.city = addComp.city.replace(/市/g, "");
            //Project.GetObj1();
            //Project.api_input_tj.city = addComp.city.replace(/市/g, "");
            //Project.api_input_tj.position = center.lat + "," + center.lng;
            //Project.GetObj();
            //Project.GetObj_TJ();
            //$("#span_PositionName").html(addComp.district + addComp.street + addComp.streetNumber);

        });
    });
    map.addEventListener("dragend", function () {

    });

    Init.GetStepCountByApp();
});

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
    }
    var circle = new BMap.Circle(center, g_const_Map_Distance, { fillColor: "#10a5fe", strokeWeight: 1, fillOpacity: 0.25, strokeOpacity: 0.3 });//设置覆盖物的参数，中心坐标，半径，颜色
    map.addOverlay(circle);//在地图上显示圆形覆盖物
}

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
                htmlStr += "<span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span>空气质量指数（Air Quality Index，简称AQI）可以定量描述空气质量状况。空气质量按照空气质量指数大小分为六级，相对应空气质量的六个类别，指数越大、级别越高说明污染的情况越严重，对人体的健康危害也就越大。";
                htmlStr += "<div class='tb'><table  border='0' class='tb_01'>";
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
                htmlStr += "<span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span>凡是妨碍人们正常休息、学习和工作的声音，以及对人们要听的声音产生干扰的声音都属于噪音。按照普通人的听力水平，50分贝相当于正常交谈的声音，30-40分贝是比较安静的正常环境，60分贝以上就属于吵闹范围了。";
                htmlStr += "<div class='tb'><table  border='0' class='tb_02'>";
                htmlStr += "<thead><tr><th class='cel-33'>级别</th><th class='cel-33'>昼间分贝数</th><th class='cel-33'>夜间分贝数</th></tr></thead>";
                htmlStr += "<tbody><tr><td>I 类 优</td><td>55以下</td><td>45以下</td></tr>";
                htmlStr += "<tr><td>II类 良</td><td>60以下</td><td>50以下</td></tr>";
                htmlStr += "<tr><td>III类 中度污染</td><td>65以下</td><td>55以下</td></tr>";
                htmlStr += "<tr><td>IV类 严重污染</td><td>65以上</td><td>55以上</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "危险品":
                htmlStr += "<span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span>危险品包括爆炸品、易燃物、氧化剂、毒害品、放射性物、腐蚀品等。根据《危险化学品经营企业开业条件和技术要求》，大中型危险化学品仓库应与周围公共建筑物、交通干线（公路、铁路、水路）、工矿企业等距离至少保持1000米。但是中国国内尚没有对危化品堆场与住宅、学校等人口密集区域、甚至饮用水源地的安全距离作出清晰的法律规定。";
                break;
            case "水质":
                htmlStr += "<span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span>水质是水体的物理性质（如色度、浊度、臭味等）、化学组成（无机物和有机物的含量）、生物学特性（细菌、微生物、浮游生物、底栖生物）的总称。依照《地面水环境质量标准》（GB3838-2002）中规定，地面水使用目的和保护目标，我国地面水分五大类。";
                htmlStr += "<div class='tb'><table  border='0' class='tb_04'>";
                htmlStr += "<thead><tr><th class='cel-12'>级别</th><th class='cel-88'>说明</th></tr></thead>";
                htmlStr += "<tbody><tr><td>I 类</td><td>水质良好。地下水只需消毒处理，地表水经简易净化处理(如过滤)、消毒后即可供生活饮用者。</td></tr>";
                htmlStr += "<tr><td>II类</td><td>主要适用于集中式生活饮用水，经常规净化处理(如絮凝、沉淀、过滤、消毒等)，其水质即可供生活饮用者。</td></tr>";
                htmlStr += "<tr><td>III类</td><td>适用于集中式生活饮用水、但水质受轻度污染，一般是鱼类保护区及游泳区。</td></tr>";
                htmlStr += "<tr><td>IV类</td><td>存在比较严重污染，不能供生活应用者，主要适用于一般工业用水区及人体非直接接触的娱乐用水区。</td></tr>";
                htmlStr += "<tr><td>V类</td><td>主要适用于农业用水区及一般景观要求水域。</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "土壤":
                htmlStr += "<span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span>土壤是地球陆地的表面由矿物质、有机质、水、空气和生物组成的，具有肥力并能生长植物的疏松表层。根据土壤应用功能和保护目标，可将土壤划分为三类。";
                htmlStr += "<div class='tb'><table  border='0' class='tb_04'>";
                htmlStr += "<thead><tr><th class='cel-18'>级别</th><th class='cel-82'>说明</th></tr></thead>";
                htmlStr += "<tbody><tr><td>I类一级</td><td>适用于国家规定的自然保护区、集中式生活饮用水源地、茶园、牧场和其他保护地区的土壤，土壤质量基本上保持自然背景水平。</td></tr>";
                htmlStr += "<tr><td>II类二级</td><td>适用于一般农田、蔬菜地、茶园果园、牧场等土壤，土壤质量基本上对人体、植物和环境不造成危害和污染</td></tr>";
                htmlStr += "<tr><td>III类三级</td><td>适用于林地土壤及污染物容量较大的高背景值土壤和矿产附近等地的农田土壤。土壤质量对人体、植物和环境造成的危害和污染较小。</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "污染源":
                htmlStr += "<span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span>目前可查询的污染源包括化工厂和垃圾处理中心。点点环境将会持续增加其它污染源信息。化工厂在生产、储运过程中如发生爆炸、泄露或非法排放，有可能对人体造成中毒、窒息、化学灼伤等伤害。垃圾处理中心则存在垃圾臭气、垃圾渗沥液、焚烧产生的二噁英等污染物的潜在风险。距离污染源越近，风险等级越高，对人造成危害的可能性越大。";
                htmlStr += "<div class='tb'><table  border='0' class='tb_03'>";
                htmlStr += "<thead><tr><th rowspan='2' class='cel-20'>污染源类型</th><th colspan='3' class='botb'>所在地与污染源之间距离</th></tr>";
                htmlStr += "<tr><th class='cel-25'>安全(米)</th><th class='cel-30'>存在一定潜在风险(米)</th><th class='cel-25'>潜在风险高(米)</th></tr></thead>";
                htmlStr += "<tbody><tr><td>化工厂</td><td>&lt;2000</td><td>1000&lt;<i>☺</i>&lt;2000</td><td>&lt;1000</td></tr>";
                htmlStr += "<tr><td>垃圾转运站</td><td>&lt;1000</td><td>300&lt;<i>☺</i>&lt;1000</td><td>&lt;300</td></tr>";
                htmlStr += "<tr><td>垃圾填埋场</td><td>&lt;1000</td><td>300&lt;<i>☺</i>&lt;1000</td><td>&lt;300</td></tr>";
                htmlStr += "<tr><td>垃圾焚烧场</td><td>&lt;3000</td><td>1000&lt;<i>☺</i>&lt;3000</td><td>&lt;1000</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "辐射":
                htmlStr += "<span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span>目前可查询的辐射为高压线辐射。高压线产生的电磁场一般称为极低频电磁场或者叫工频电场。高压线、变电站会产生电磁辐射，它产生的工频电场是感应电场感应磁场，因为它的波长非常长，所以它不会像电磁辐射那样被人体直接吸收，但是会在人体里头感应出电流来，这个感应电流需要控制。工频电场会在人体中产生感应电流，为了防止对人体产生影响，需要将感应电流密度控制在一定的范围内。";
                htmlStr += "<div class='tb'><table  border='0' class='tb_01'>";
                htmlStr += "<thead><tr><th class='cel-50'>高压线级别</th><th class='cel-50'>安全距离</th></tr></thead>";
                htmlStr += "<tbody><tr><td>220千伏</td><td>100米外</td></tr>";
                htmlStr += "<tr><td>132千伏</td><td>20米外</td></tr>";
                htmlStr += "<tr><td>11-66千伏</td><td>10米外</td></tr>";
                htmlStr += "<tr><td>地埋高压线</td><td>5米外</td></tr></tbody>";

                htmlStr += "</table></div>";
                break;
            case "容积率":
                htmlStr += "<span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span>容积率又称建筑面积毛密度，指项目用地范围内地上总建筑面积与项目总用地面积的比值。容积率是衡量建设用地使用强度的一项重要指标。现行城市规划法规体系详细制定了各类居住用地容积率标准。住宅小区容积率小于1.0的，为非普通住宅。";
                htmlStr += "<div class='tb'><table  border='0' class='tb_01'>";
                htmlStr += "<thead><tr><th class='cel-50'>居住用地种类</th><th class='cel-50'>容积率标准</th></tr></thead>";
                htmlStr += "<tbody><tr><td>独立别墅</td><td>0.2-0.5</td></tr>";
                htmlStr += "<tr><td>联排别墅</td><td>0.4-0.7</td></tr>";
                htmlStr += "<tr><td>6层以下住宅</td><td>0.8-1.2</td></tr>";
                htmlStr += "<tr><td>11层以下小高层住宅</td><td>1.5-2</td></tr>";
                htmlStr += "<tr><td>18层高层住宅</td><td>1.8-2.5</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "绿化率":
                htmlStr += "<span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span>居住区绿地率是描述居住区用地范围内各类绿地的总和与居住区用地的比率。绿地率所指的\"居住区用地范围内各类绿地\"主要包括公共绿地、宅旁绿地等。其中，公共绿地，又包括居住区公园、小游园、组团绿地及其他的一些块状、带状化公共绿地。绿地率=绿地面积/用地面积×100%。 根据《城市居住区规划设计规范》，绿地率的级别可分为三大类。";
                htmlStr += "<div class='tb'><table  border='0' class='tb_01'>";
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
        $.each(resultlist, function (i, n) {

            htmlStr += "<li class=\"fl\" onclick=\"Project.Load_AQIDialog('" + n.name + "')\">";
            htmlStr += "<p>" + (n.name != null ? n.name.replace(/绿化率/g, "绿地率") : "") + "<span class=\"t_state ";
            switch (n.level) {
                case "优":
                case "较远":
                case "较少":
                case "优良":
                case "I类":
                case "l类":
                case "高":
                    if (n.name=="容积率") {
                        htmlStr += "bad ";
                    }
                    else {
                        htmlStr += "verygood ";
                    }
                    break;
                case "良":
                case "II类":
                case "ll类":
                case "中":
                    htmlStr += "good ";
                    break;
                case "III类":
                case "lll类":
                    htmlStr += "yiban ";
                    break;
                case "IV类":
                case "lV类":
                case "低":
                case "轻度污染":
                case "中度污染":
                case "垃圾站":
                case "化工厂":
                    if (n.name == "容积率") {
                        htmlStr += "verygood ";
                    }
                    else {
                        htmlStr += "bad ";
                    }
                    break;
                case "IIV类":
                case "llV类":
                case "重度污染":
                case "严重污染":
                    htmlStr += "verybad ";
                    break;
                default:
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
        if (result.score<60) {
            //$("#div_score").removeClass("pm fl");
            $("#div_score").attr("class", "pm bad fl");
            $("#div_level").html("<img id src=\"img/bad.png\"> ");
            $("#div_upper").html("环境质量差，一项或多项环境指标严重不达标。更多详情，请购买环境质量报告。<a href=\"" + g_const_PageURL.ProjectList1 + "?p=l&t=" + Math.random() + "\" class=\"cart\"></a>");
        }
        else if (result.score > 80) {
            //$("#div_score").removeClass("pm fl");
            $("#div_score").attr("class", "pm good fl");
            $("#div_level").html("<img id src=\"img/good.png\"> ");
            $("#div_upper").html("环境质量优，远离污染源，潜在风险低。更多详情，请购买环境质量报告。<a href=\"" + g_const_PageURL.ProjectList1 + "?p=l&t=" + Math.random() + "\" class=\"cart\"></a>");
        }
        else {
            //$("#div_score").removeClass("pm fl");
            $("#div_score").attr("class", "pm yiban fl");
            $("#div_level").html("<img id src=\"img/yiban.png\"> ");
            $("#div_upper").html("环境质量良，重大污染源与您存在一定距离，潜在风险可控。更多详情，请购买环境质量报告。<a href=\"" + g_const_PageURL.ProjectList1 + "?p=l&t=" + Math.random() + "\" class=\"cart\"></a>");
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
                //$("#span_PositionName").html(msg.name);
                //$("#p_PositionName").html(msg.name);
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