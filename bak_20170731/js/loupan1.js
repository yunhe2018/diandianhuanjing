$(document).ready(function () {
    
    Project.ChangePage(GetQueryString("p"));

    //if (localStorage[g_const_localStorage.City] == undefined) {
    //    Project.api_input.city = "";
    //}
    //else {
    //    Project.api_input.city = localStorage[g_const_localStorage.City];
    //}
    try {
       // if (Project.api_input.city == "") {
            //var geolocation = new BMap.Geolocation();
            //var geoc = new BMap.Geocoder();
            //var po = new BMap.Point(g_const_Test_Point_lng, g_const_Test_Point_lat);
            //point_A = point_C = po;
            //geoc.getLocation(po, function (rs) {
            //    var addComp = rs.addressComponents;
            //    SetMapData(addComp, po, "/img/lookArtHear.png", true);
        //});
        if (localStorage[g_const_localStorage.Position] != undefined && localStorage[g_const_localStorage.Position] != "") {
            var po = new BMap.Point(localStorage[g_const_localStorage.Position].split(',')[1], localStorage[g_const_localStorage.Position].split(',')[0]);
            var geoc = new BMap.Geocoder();
            point_A = point_C = po;
            geoc.getLocation(po, function (rs) {
                var addComp = rs.addressComponents;
                SetMapData(addComp, po, "/img/lookArtHear.png", true);
                switch (AppLoginYYG.clientType) {
                    case 1:
                        break;
                    case 2:
                    case 3:
                        $("#btnShare").show();
                        $("#btnShare").click(function () {
                            SetWXShare(g_const_share_productdetail_title, addComp.district + addComp.street + addComp.streetNumber, g_const_share_pic);
                        });
                        break;
                    case 4:
                        break;
                }
            });
        }
        else {
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var geoc = new BMap.Geocoder();
                    var po = r.point; 
                    point_A = point_C = po;
                    geoc.getLocation(po, function (rs) {
                        var addComp = rs.addressComponents;
                        SetMapData(addComp, po, "/img/lookArtHear.png", true);
                        switch (AppLoginYYG.clientType) {
                            case 1:
                                break;
                            case 2:
                            case 3:
                                $("#btnShare").show();
                                $("#btnShare").click(function () {
                                    SetWXShare(g_const_share_productdetail_title, addComp.district + addComp.street + addComp.streetNumber, g_const_share_pic);
                                });
                                break;
                            case 4:
                                break;
                        }


                        //Project.api_input.position = po.lat + "," + po.lng;
                        //Project.api_input.city = addComp.city.replace(/市/g, "");
                        //Project.GetList();
                        //Project1.api_input.position = po.lat + "," + po.lng;
                        //Project1.api_input.city = addComp.city.replace(/市/g, "");
                        //Project1.GetObj();

                    });
                }
            }, { enableHighAccuracy: true })
        }
        //}
        //else {
        //    var myGeo = new BMap.Geocoder();
        //    myGeo.getPoint(Project.api_input.city, function (po) {
        //        point_A = point_C = po;
        //        myGeo.getLocation(po, function (rs) {
        //            var addComp = rs.addressComponents;
        //            SetMapData(addComp, po, "/img/lookArtHear.png", true);
        //        });
        //    }, Project.api_input.city);
        //}
    } catch (e) {
        alert(e.toString());
    }
    $("#btnClose").click(function () {
        $("#txtSearch").val("");
    });
    $("#btnSearch").click(function () {
        if ($("#txtSearch").val().length > 0) {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.Search + "?k=" + encodeURIComponent($("#txtSearch").val()) + "&t=" + Math.random();
        }
        else {
            ShowMesaage("请输入查询关键字");
        }
    });
    $("#span_back").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
        });
    $("em").on("click", function() {
        var grade = $(this).attr("grade");
        var parentFont = $(this).parent().parent();
        $(parentFont).attr("class", "f" +grade).attr("grade", grade);
        $(parentFont).find("span").text(reviewGrade[grade]);
        switch(grade) {
            case "3":
                CommentSend.api_input.level = "0";
                break;
            case "2":
                CommentSend.api_input.level = "1";
                break;
            case "1":
                CommentSend.api_input.level = "2";
                break;
                }

                });
   
    $("#zhuye").click(function () {
        window.location.href = g_const_PageURL.Index + "?t=" + Math.random();
    });
    $("#wode").click(function () {
        window.location.href = g_const_PageURL.MyAccount + "?t=" + Math.random();
    });
    //$("#btnSearch").click(function () {
    //    PageUrlConfig.SetUrl();
    //    window.location.href = g_const_PageURL.Search + "?t=" + Math.random();
    //});
    $("#buy").click(function () {
        Project.ChangePage("l");
    });
    $("#loupan").click(function () {
        Project.ChangePage("p");
        var geoc = new BMap.Geocoder();
        geoc.getLocation(point_C, function (rs) {
            var addComp = rs.addressComponents;
            SetMapData(addComp, point_C, "/img/lookArtHear.png", true);
        });
    });
    $("#add_btn").click(function () {
        if (Project.showType == "l") {
            Project.ChangePage("p");
        }
        else {
            Project.ChangePage("l");
        }
    });
    $("#add_btn_project").click(function () {
        // $(this).hide("slow");
        if (GetQueryString("showtype") != 1) {
            $(".thirdIndex").css({ "WebkitTransform": "translate(0px, 0px)", "WebkitTransition": "1s all ease" });
            $("#lt_date").hide(200).removeClass("lt_date_02").addClass("lt_date").show(200);
            $(".updateOrCore").show();
            //$(".botNav").hide();
            $("#div_AQI").hide();
            $("#btnComment").hide();
        }
        else {
            window.location.replace(PageUrlConfig.BackTo(1));
        }

    })

    if (GetQueryString("showtype") == 1) {
        Baidu.ShowInfo(GetQueryString("lat"), GetQueryString("lng"), decodeURIComponent(GetQueryString("project")), GetQueryString("number"), GetQueryString("city"));
    }
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
    $("#a_type_all").click(function () {
        CommentAll.api_input.level = "";
        CommentAll.GetList();
        $("#a_type_all").addClass("curr");
        });
    $("#a_type_good").click(function () {
        CommentAll.api_input.level = "0";
        CommentAll.GetList();
        $("#a_type_good").addClass("curr");
        });
    $("#a_type_ok").click(function () {
        CommentAll.api_input.level = "1";
        CommentAll.GetList();
        $("#a_type_ok").addClass("curr");
        });
    $("#a_type_bad").click(function () {
        CommentAll.api_input.level = "2";
        CommentAll.GetList();
        $("#a_type_bad").addClass("curr");
        });
    map.addEventListener("dragend", function (e) {
        var center = e.point;
        var getData = true;
        if (map.getDistance(point_A, center) < g_const_Map_Distance) {
            getData = false;
        }
        var geoc = new BMap.Geocoder();
        geoc.getLocation(center, function (rs) {
            var addComp = rs.addressComponents;
            //map.centerAndZoom(center, 15);
            //map.enableScrollWheelZoom();
            //map.clearOverlays();
            //var myCompOverlay = new ComplexCustomOverlay(center, "点点环境", "fa4343", "");
            //map.addOverlay(myCompOverlay);
            SetMapData(addComp, center, "/img/lookArtHear.png",getData);

        });
    });
    
});
var reviewRelease = {
};
var reviewGrade = {
    "1" : "差评",
    "2": "中评",
    "3": "好评",
    //"4": "比较满意",
    //"5": "非常满意"
    };
function SetMapData(addComp, center, icon_url, getdata) {
    $("#span_currname").html(addComp.district + addComp.street + addComp.streetNumber);
       // map.clearOverlays();
    deletePoint();
    deleteCircle();
        var myIcon = new BMap.Icon(icon_url, new BMap.Size(22, 47));
        var marker = new BMap.Marker(center, { icon: myIcon });  // 创建标注
        map.addOverlay(marker);
       // marker.setLabel(new BMap.Label("点击位置", { offset: new BMap.Size(20, -10) }));
        //myIcon = new BMap.Icon("/img/cuurPosition.png", new BMap.Size(22, 47));
        //marker = new BMap.Marker(point_C, { icon: myIcon });  // 创建标注
        //map.addOverlay(marker);
    if (getdata) {
        map.centerAndZoom(center, 14);
        map.enableScrollWheelZoom();
        
        // var myCompOverlay = new ComplexCustomOverlay(point_C, "点点环境", "fa4343", "");
        // map.addOverlay(myCompOverlay);
        point_A = center;

        Project.api_input.position = center.lat + "," + center.lng;
        Project.api_input.city = addComp.city.replace(/市/g, "");
        Project.GetList();
        Project1.api_input.position = center.lat + "," + center.lng;
        Project1.api_input.city = addComp.city.replace(/市/g, "");
        //Project1.GetObj();
    }
    else {
        //$.each(Project.RetList, function (i, n) {
        //    Baidu.LoadData(new BMap.Point(n.position.split(',')[1], n.position.split(',')[0]), n.name, n.score, (n.img == "" ? "/img/default_small_4.jpg" : n.img), n.number, i + 1);

        //});
    }
    var circle = new BMap.Circle(center, g_const_Map_Distance, { fillColor: "#10a5fe", strokeWeight: 1, fillOpacity: 0.25, strokeOpacity: 0.3 });//设置覆盖物的参数，中心坐标，半径，颜色
    map.addOverlay(circle);//在地图上显示圆形覆盖物
}
function deletePoint() {
    var allOverlay = map.getOverlays();
    for (var i = 0; i < allOverlay.length - 1; i++) {
        if (allOverlay[i].xc) {
            if (allOverlay[i].xc.innerHTML.indexOf('lookArtHear') > -1) {
                map.removeOverlay(allOverlay[i]);
                return false;
            }
        }
    }
}
function deleteCircle() {
    var allOverlay = map.getOverlays();
    for (var i = 0; i < allOverlay.length - 1; i++) {
        if (allOverlay[i].va) {
            if (allOverlay[i].va == g_const_Map_Distance) {
                map.removeOverlay(allOverlay[i]);
                return false;
            }
        }

    }
}
function ComplexCustomOverlay(point, text, mouseoverText,code) {
    this._point = point;
    this._text = text;
    this._overText = mouseoverText;
    this._code = code;
}

ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function (map) {
    this._map = map;
    var div = this._div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.width = ".6rem";
    div.style.borderRadius = "8rem";
    div.style.backgroundColor = "#" + this._overText;
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
    arrow.style.borderTop = ".07rem solid #" + this._overText;
    arrow.style.width = "0";
    arrow.style.height = "0";
    arrow.style.content = "";
    arrow.style.left = "50%";
    arrow.style.marginLeft = "-.09rem";
    arrow.style.top = ".32rem";
    div.appendChild(arrow);
    //tmpfun = map.onclick;
    // map.onclick = null;
    if (this._code!="") {
        div.addEventListener("touchstart", function () {
                PageUrlConfig.SetUrl();
                window.location.href = g_const_PageURL.ProjectDetail + "?code=" + that._code + "&t=" + Math.random();
        
        });
    }
    map.getPanes().labelPane.appendChild(div);

    return div;
}
ComplexCustomOverlay.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
    this._div.style.top = pixel.y - 30 + "px";
}
var point_A;
var point_C;
var map = new BMap.Map("allmap");
var pageSize = 10;
var pageTime = 1;
var pageIndex = 0;
var orderStatus = 0;

var Baidu = {
    LoadData: function (point, projectname, address, pic, number,index,updatetime) {
        var html = "<div class=\"position_detial\" >"
         + "<div class=\"detailsWrap d_list\">"
         + "<ul class=\"details\"><li>"
         + "<a class=\"clearfix\" href=\"javascript:;\">"
         + "<div class=\"pic fl\"><img onclick=\"Baidu.ShowInfo('" + point.lat + "','" + point.lng + "','" + projectname + "','" + number + "')\" src=\"" + pic + "\"></div>"
         + "<div class=\"con fl\">"
         + (projectname.length > 5 ? "<h5 onclick=\"Baidu.Detail()\">" + projectname.substr(0, 8) + "</h5>" : "<h5>" + projectname + "</h5>")
         + "<p class=\"title02\">环境质量:" + parseInt(address) + "分"
         + "<br />区域排名:" + index + "</p></div>"
         + "<div class=\"update\">报告更新:" + updatetime.split(' ')[0] + "</div>"
         + "</div></a></li></ul><span class=\"bigCart\" onclick=\"Project.Load_Detail('" + number + "')\"></span></div></div>";
        var marker = new BMap.Marker(point);
        var infoWindow = new BMap.InfoWindow(html);
        map.addOverlay(marker);
        marker.addEventListener("click", function () {
            this.openInfoWindow(infoWindow);
        });
    },
    Detail: function () {
        window.location.href = g_const_PageURL.Index1 + "?showtype=1&t=" + Math.random();
    },
    ShowInfo: function (lat, lng, project, number,city) {
        var chartfontsize = 0;
        var oHeight = $(window).height() + chartfontsize;
        var oW = $(window).width();
        if (oW <= 320) {
            $(".chartTxt").css("fontSize", "12px");
        }
        $(".newBox").css("height", oHeight + "px");
        var oHeight = $(window).height();
        $(".thirdIndex").css({ "WebkitTransform": "translate(0px, " + (-oHeight) + "px)", "WebkitTransition": "1s all ease" });
        $(".botNav").fadeIn("slow");
        $("#lt_date").hide(200).removeClass("lt_date").addClass("lt_date_02").show(200);
        $(".updateOrCore").hide();
        $(".botNav").show();
        $("#btnComment").show();
        $("#span_PositionName").html(project);
        Project1.api_input.position = lat + "," + lng;
        Project1.SelectProjectCode = number;
        if (city) {
            Project1.api_input.city = city;
        }
        
        Project1.GetObj();
        CommentAll.api_input.lpCode = number;
        CommentAll.GetList();
        Project_Detail.api_input.lpCode = number;
        Project_Detail.GetList();
        CommentSend.api_input.lpCode = number;
        CommentSend.api_input.level = "1";
    }
};

//我的订单列表
var Project = {
    api_target: "1033",
    api_input: { "position": "", "city": "", "page": "1", "count": "50", "radius": g_const_Map_Distance },
    showType: "",
    RetList:[],
    //加载多页
    GetList: function () {
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
                switch (AppLoginYYG.clientType) {
                    case 1:
                        break;
                    case 2:
                    case 3:
                        $("#btnShare").show();
                        $("#btnShare").click(function () {
                            SetWXShare(g_const_share_productdetail_title, msg.currname, g_const_share_pic);
                        });
                        break;
                    case 4:
                        break;
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
    //加载单页
    //接口返回成功后的处理
    Load_Result: function (resultlist) {
        var colorlist = ["fb8b29", "ffd61a", "7e0123", "c93268", "83ca40"];
        var htmlStr = "";
        Project.RetList = resultlist;
        $.each(resultlist, function (i, n) {

            //htmlStr += "<li class=\"building-item\" onclick=\"Project.Load_Detail('" + n.number + "')\">";
            //htmlStr += "<span class=\"building-name\">" + n.name + "</span>";
            //htmlStr += "<span class=\"building-envi-level\">" + n.level + "</span>";
            //htmlStr += "<span class=\"building-envi-score\">" + n.score + "</span>";
            //htmlStr += "</li>";

            htmlStr += "<li><a class=\"clearfix\" onclick=\"Project.Load_Detail('"+n.number+"')\">";
            htmlStr += "<div class=\"pic fl\"><img src=\"";
            if (n.img=="") {
                htmlStr += "/img/default_small_4.jpg";
            }
            else {
                htmlStr += n.img;
            }
            htmlStr += "\"></div>";
            htmlStr += "<div class=\"con fl\">";
            htmlStr += "<h4>"+n.name+"</h4>";
            htmlStr += "<p class=\"title02\">"+n.distance+"km以内 | "+n.address+"</p>";
            htmlStr += "<div class=\"price02\">￥"+n.price+"</div>";
            htmlStr += "</div></a></li>";

            //var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(n.position.split(',')[1], n.position.split(',')[0]), n.name, colorlist[i % 5], n.number);
            //map.addOverlay(myCompOverlay);
            Baidu.LoadData(new BMap.Point(n.position.split(',')[1], n.position.split(',')[0]), n.name, n.score, (n.img == "" ? "/img/default_small_4.jpg" : n.img), n.number, i + 1, n.updateTime);

        });
        $("#ul_list").html(htmlStr);

    },
    Load_Detail: function (code) {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.ProjectDetail + "?code=" + code + "&t=" + Math.random();
    },
    ChangePage: function (page) {
        Project.showType = page;
        if (page == "l") {
            UseAppFangFa.CaoZuo("refresh", "", "true");
            $("#div_list").show();
            $("#allmap").hide();
            //$("#ul_DetailList").hide();
            $("#span_list").addClass("curr");
            $("#span_map").removeClass("curr");
            $("#add_btn").addClass("map");
            $("#add_btn").removeClass("bala");
            $("#span_update").hide();
            $("#span_core").hide();
            FooterMenu.Set(1);
        }
        else {
            UseAppFangFa.CaoZuo("refresh", "", "false");
            $("#allmap").show();
            $("#div_list").hide();
            //$("#ul_DetailList").show();
            $("#span_list").removeClass("curr");
            $("#span_map").addClass("curr");
            $("#add_btn").addClass("bala");
            $("#add_btn").removeClass("map");
            $("#span_update").show();
            $("#span_core").show();
            FooterMenu.Set(1);
        }
    }
};
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
var Project1 = {
    api_target: "1032",
    api_input: { "position": "", "city": "", "radius": g_const_Map_Distance },
    SelectProjectCode:"",
    //加载多页
    GetObj: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(Project1.api_input);
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
                Project1.Load_Result(msg.detailList);
                Project1.Load_Info(msg);
                if (msg.AQIList) {
                    Project1.Load_AQI(msg.AQIList);
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
    Load_AQIDialog: function (name) {
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

            htmlStr += "<li class=\"fl\" onclick=\"Project.Load_AQIDialog('" + n.name + "')\">";
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
                    if (n.name == "容积率") {
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
                    if (n.level != null) {
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
            htmlStr += "</span></p>";
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
        if (result.score < 60) {
            //$("#div_score").removeClass("pm fl");
            $("#div_pmwrap").attr("class", "pmWrap pmWrap-bad no clearfix");
            $("#div_score").attr("class", "pm bad fl");
            $("#div_level").html("<img src=\"img/bad.png\"> ");
            $("#div_level_general").html("<img src=\"img/bad.png\"> ");
            $("#div_upper").html("糟糕的环境质量就是我们一起赖床，一起蜗居的最好理由。");
            $("#div_chart_info").html("周边一项或多项环境数据严重不达标，可能会在一定程度上影响您的生活、健康与安全，了解更多请 <a onclick=\"Project.Load_Detail('" + Project1.SelectProjectCode + "')\" style=\"cursor:pointer;color:white\">购买该楼盘环境质量报告</a>");
        }
        else if (result.score > 80) {
            //$("#div_score").removeClass("pm fl");
            $("#div_pmwrap").attr("class", "pmWrap pmWrap-good no clearfix");
            $("#div_score").attr("class", "pm bad fl");
            $("#div_level").html("<img src=\"img/good.png\"> ");
            $("#div_level_general").html("<img src=\"img/good.png\"> ");
            $("#div_upper").html("不能辜负的好时节，让我们一起畅快的运动，尽情的吸氧吧。");
            $("#div_chart_info").html("周边空气清新，噪音干扰较平时更少，其它环境指标均符合国家相关标准，与各种污染源、辐射源存在一定的安全距离，潜在风险较低，了解更多请 <a onclick=\"Project.Load_Detail('" + Project1.SelectProjectCode + "')\" style=\"cursor:pointer;color:white\">购买该楼盘环境质量报告</a>");
        }
        else {
            //$("#div_score").removeClass("pm fl");
            $("#div_pmwrap").attr("class", "pmWrap pmWrap-liang no clearfix");
            $("#div_score").attr("class", "pm bad fl");
            $("#div_level").html("<img src=\"img/yiban.png\"> ");
            $("#div_level_general").html("<img src=\"img/yiban.png\"> ");
            $("#div_upper").html("周边的环境就像我们当下的生活，不好，但也不差。");
            $("#div_chart_info").html("周边一项或多项环境指标存在轻度或中度污染，与各种污染源、辐射源存在一定的安全距离，潜在风险可控，了解更多请 <a onclick=\"Project.Load_Detail('" + Project1.SelectProjectCode + "')\" style=\"cursor:pointer;color:white\">购买该楼盘环境质量报告</a>");
        }
        //if (result.tiptitle.length > 40) {
        //    $("#div_upper").html(result.tiptitle.substring(0, 40) + "...");
        //}
        //else {
        //    $("#div_upper").html(result.tiptitle);
        //}

    },

};
var CommentAll = {

    api_target: "lpc_data",
    api_input: { "lpCode": "", "pageSize": 10, "pageIndex": 0, "level": "" },
    //加载多页
    GetList: function () {
        $("#a_type_all").removeClass("curr");
        $("#a_type_good").removeClass("curr");
        $("#a_type_ok").removeClass("curr");
        $("#a_type_bad").removeClass("curr");
        //组织提交参数
        var s_api_input = JSON.stringify(CommentAll.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": CommentAll.api_target, "api_token": "" };
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
                CommentAll.Load_List(msg.list);
                $("#a_type_all").html("全部(" + msg.total + ")");
                $("#a_type_good").html("好评(" + msg.goodTotal + ")");
                $("#a_type_ok").html("中评(" + msg.mediumTotal + ")");
                $("#a_type_bad").html("差评(" + msg.badTotal + ")");
                if (msg.total > 0) {
                    $("#lbl_good").html("好评(" + parseInt(msg.goodTotal * 100 / msg.total) + "%)");
                    $("#lbl_ok").html("中评(" + parseInt(msg.mediumTotal * 100 / msg.total) + "%)");
                    $("#lbl_bad").html("差评(" + parseInt(msg.badTotal * 100 / msg.total) + "%)");
                    $("#span_good").width(parseInt(msg.goodTotal * 100 / msg.total) + "%");
                    $("#span_ok").width(parseInt(msg.mediumTotal * 100 / msg.total) + "%");
                    $("#span_bad").width(parseInt(msg.badTotal * 100 / msg.total) + "%");
                    $("#p_good").html(parseInt(msg.goodTotal * 100 / msg.total) + "%");
                }

            }
            else {
                $("#reviewList").html("");
                //  ShowMesaage(msg.resultMessage);
            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
            //  ShowMesaage(g_const_API_Message["7001"]);
        });
        //}

    },
    Load_List: function (resultlist) {

        var htmlStr = "";
        $.each(resultlist, function (i, n) {

            htmlStr += "<li><img src=\"/img/lnologin@2x.png\" alt=\"\" class=\"pic\">";
            htmlStr += "<h2><font class=\"f";
            switch (n.level) {
                case 0:
                    htmlStr += "3";
                    break;
                case 1:
                    htmlStr += "2";
                    break;
                case 2:
                    htmlStr += "1";
                    break;
            }
            htmlStr += "\"></font>" + n.phone.substr(0, 3) + "****" + n.phone.substr(7, 4) + "</h2>";
            htmlStr += "<b>" + n.content + "</b>";
            if (n.orderCode != "") {
                htmlStr += "<strong>" + n.orderTime.split(' ')[0] + " 等级：" + n.rlName + "</strong>";
            }
            htmlStr += "<div class=\"reply\"> <p></p><span> </span></div></li>";
        });
        $("#reviewList").html(htmlStr);

    },
    OpenComment: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO && document.referrer.toLowerCase().indexOf("login") == -1) {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
            return;
        }
        $("#div_Follow").show();
    },
    CloseComment: function () {
        $("#div_Follow").hide();
    },
};

var CommentSend = {
    api_target: "lpc_add",
    api_input: { "lpCode": "", "content": "", "level": "0" },
    //加载多页
    GetList: function () {
        CommentSend.api_input.content = $("#txtComment").val();

        //组织提交参数
        var s_api_input = JSON.stringify(CommentSend.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": CommentSend.api_target, "api_token": "1" };
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
               
                CommentAll.GetList();
                $("#div_Follow").hide();
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
var Project_Detail = {
    api_target: "report_lp",
    api_input: { "lpCode": "" },
    //ReportCount: 0,
    //ReportSelect: "",
    //加载多页
    GetList: function () {
        //var needToken = "";
        //if (UserInfo.LoginStatus != g_const_YesOrNo.NO) {
        //    needToken = "1";
        //}
        //组织提交参数
        var s_api_input = JSON.stringify(Project_Detail.api_input);
        
        var obj_data = { "api_input": s_api_input, "api_target": Project_Detail.api_target, "api_token": "0"
        };
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
                //$("#h_projectname").html(msg.name);
                //$("#div_price").html("￥"+msg.price);
                //if (msg.pic == "") {
                //    $("#div_img").html("<img src=\"/img/defalt.jpg\">");
                //}
                //else {
                //    $("#div_img").html("<img src=\"" + msg.pic + "\">");
                //}
                //$("#p_detail").html(msg.detail);
                var imageList = JSON.parse(msg.image);
                //var g_const_share_pic = "";
                if (imageList.length == 0) {
                    $("#img_report").attr("src", "/img/default_big_4.jpg");
                    //  g_const_share_pic = "/img/defalt.jpg";
                }
                else {
                    $("#img_report").attr("src", msg.image[0]);
                    //   g_const_share_pic = msg.image[0];
                }
                $("#img_report").html();
                $("#p_detail").html(msg.detail);
                //if (msg.isFollow == 1) {
                //    Collection.Status = 1;
                //    $("#b_AddCol").attr("class", "collect on");
                //}
                //else {
                //    $("#b_AddCol").attr("class", "collect");
                //}
                //Project.ReportCount = msg.levelList.length;
                //Project.Load_Level(msg.levelList);
                //$("#btnShare").click(function () {
                //    SetWXShare(g_const_share_productdetail_title, msg.name, g_const_share_pic);
                //}); 
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

};