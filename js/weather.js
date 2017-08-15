$(document).ready(function () {
    FooterMenu.Set(0);
    var count = 0;
    var timer;
    $(".wea_data i").hide();
    timer = setInterval(function () {
        $(".wea_data i").eq(count).show();
        count++;
        if (count == 5) {
            count = 0;
            $(".wea_data i").hide();
        }
    }, 210);
    if ($("#div_index").attr("src") == "") {
        $(this).css("opacity", 0);
    }
    $("#span_updatetime").click(function () {
        api_Request.GetList();
    });
    $("#div_Energy").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.Energy + "?t=" + Math.random();
    });
    $("#span_overarea").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.IndexMap + "?t=" + Math.random();
    });
    $("#btn_add").click(function () {
        if (projectAddressList.length >= 10) {
            ShowMesaage("最多支持10个地址哦~");
            return;
        }
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.IndexMap + "?s=1&t=" + Math.random();
    });
    //获取城市信息
    if (localStorage[g_const_localStorage.City] == undefined || localStorage[g_const_localStorage.City] == "") {
        api_Request.api_input.city = "";
    }
    else {
        api_Request.api_input.city = localStorage[g_const_localStorage.City];
    }
    if (api_Request.api_input.city == "") {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var geoc = new BMap.Geocoder();
                var po = r.point;
                geoc.getLocation(po, function (rs) {
                    var addComp = rs.addressComponents;
                    api_Request.api_input.position = po.lat + "," + po.lng;
                    api_Request.api_input.city = addComp.city.replace(/市/g, "");
                    api_Request.show_position = addComp.city + addComp.district + addComp.street;
                    api_Request.GetList();
                    Environment.api_input_2050_A.city = addComp.city;
                    Environment.api_input_2050_A.area = addComp.district;
                    Environment.GetObj_2050_A();
                });
            }
        }, { enableHighAccuracy: true })
    }
    else {
        api_Request.api_input.pageIndex = 0;
        var po = new BMap.Point(localStorage[g_const_localStorage.Position].split(',')[1], localStorage[g_const_localStorage.Position].split(',')[0]);
        var geoc = new BMap.Geocoder();
        geoc.getLocation(po, function (rs) {
            var addComp = rs.addressComponents;
            api_Request.api_input.position = localStorage[g_const_localStorage.Position];
            api_Request.show_position = addComp.city + addComp.district + addComp.street;
            api_Request.GetList();
            Environment.api_input_2050_A.city = addComp.city;
            Environment.api_input_2050_A.area = addComp.district;
            Environment.GetObj_2050_A();
        });

    }
    //Init.GetStepCountByApp();
    api_Request.GetDate();
    UserInfo.Check(Step.GetList);
    var oW = $(window).width() * 0.65;
    $(".boxWrap").height(oW * 0.9);//oW*0.5
    $(".boxWrap").css({
        "borderTopLeftRadius": oW * 0.5 + "px",
        "WebkitBorderTopLeftRadius": oW * 0.5 + "px",
        "borderTopRightRadius": oW * 0.5 + "px",
        "WebkitBorderTopRightRadius": oW * 0.5 + "px"
    });
    var oC = document.getElementById('c1');
    var gd = oC.getContext('2d');
    clearInterval(timer);
    var oDegree = -180;
    var timer;
    timer = setInterval(function () {
        if (oDegree >= -91) {
            clearInterval(timer);
        }
        console.log(oDegree);
        gd.clearRect(0, 0, oC.width, oC.height);
        oDegree++;
        //第一条线
        gd.beginPath();
        gd.arc(oW * 0.5 + 2, oW * 0.5 + 2, oW * 0.5, d2a(-225), d2a(45), false);
        gd.lineCap = 'round';
        gd.strokeStyle = '#d5d5d5';
        gd.lineWidth = 4;
        gd.stroke();
        //第二条线
        gd.beginPath();
        gd.arc(oW * 0.5 + 2, oW * 0.5 + 2, oW * 0.5, d2a(-225), d2a(oDegree), false);
        gd.lineCap = 'round';
        //尝试渐变
        // var grad=gd.createLinearGradient(0, 0, 0, 200);
        // grad.addColorStop(0.7, 'red');
        // grad.addColorStop(1, 'green');
        // gd.strokeStyle=grad;
        gd.strokeStyle = '#32cd33';//#32cd33
        gd.lineWidth = 4;
        gd.stroke();
    }, 8);
    $(".page_02_top").height($(window).height() - $(".botNav").height());
    $("#div_header").click(function (event) {
        PageType = true;
        $("#div_page01").show();
        $(".page_02").css({
            "transform": "translate(" + ($(window).width() - 50) + "px, 0px)",
            "transition": "all 1s ease"
        })
        event.stopPropagation();    //  阻止事件冒泡
    })
    $(".header02 .edit").click(function () {
        if ($(this).html() == "编辑") {
            $(".page_02").css({
                "transform": "translate(" + ($(window).width()) + "px, 0px)",
                "transition": "all 1s ease"
            })
            $(".searchHistory li").css({
                "transform": "translate(0px, 0px)",
                "transition": "all 1s ease"
            })
            $(".header02 .toLeft").css({
                "transform": "translate(0px, 0px)",
                "transition": "all 1s ease"
            })
            $(this).html("完成");
        } else if ($(this).html() == "完成") {
            $(".page_02").css({
                "transform": "translate(" + ($(window).width() - 50) + "px, 0px)",
                "transition": "all 1s ease"
            })
            $(".searchHistory li").css({
                "transform": "translate(-0.34rem, 0px)",
                "transition": "all 1s ease"
            })
            $(".header02 .toLeft").css({
                "transform": "translate(-.5rem, 0px)",
                "transition": "all 1s ease"
            })
            $(this).html("编辑");
        }
    })
    $(".page_02").click(function () {
        if (PageType) {
            $(this).css({
                "transform": "translate(0px, 0px)",
                "transition": "all 1s ease"
            })
        }

    })
});
var PageType = false;
var Step = {
    api_target: "step_data",
    api_input: { "equipmentCode": "" },
    //加载多页
    GetList: function () {
        Address.Load();
        //判断是否登录
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {

            return;
        }
        //组织提交参数
        var s_api_input = JSON.stringify(Step.api_input);
        var obj_data = { "api_input": s_api_input, "api_target": Step.api_target, "api_token": 1 };
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
                Step.Load_Result(msg.week);
            } else {
                ShowMesaage(msg.resultMessage);
            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },

    //接口返回成功后的处理
    Load_Result: function (resultlist) {
        var data = [];
        var date = '';
        var max = 0;
        var todayStep = 0;
        $.each(resultlist, function (i, n) {

        });
        $("#span_step").html(resultlist[resultlist.length - 1].step);
        $("#span_co2").html(resultlist[resultlist.length - 1].step * 0.008);
        $("#span_carbon").html(resultlist[resultlist.length - 1].step * 0.00008);
        $("#h1_TodayStatusWrap").show();
        $("#div_TodayStatusWrap").show();
    },
};
//我的订单列表
var api_Request = {
    api_input: { "position": "", "city": "", "radius": g_const_Map_Distance },
    show_position:"",
    //加载多页
    GetList: function () {
        Environment.api_input.city = api_Request.api_input.city;
        Environment.api_input.position = api_Request.api_input.position;
        Environment.GetObj();
        //组织提交参数
        var s_api_input = JSON.stringify(api_Request.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "1025", "api_token": "" };
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
                api_Request.Load_Result(msg);
            }
            else {
                $("#i_city").html("<i></i>" + api_Request.show_position);
                $("#div_index").attr("src", "/img/wea_good.png");
                $("#bg_img").attr("src", "/img/indexbg/good/3.jpg");
                $("#div_index").show();
                //ShowMesaage(msg.resultMessage);
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
    Load_Result: function (msg) {
        $("#i_city").html("<i></i>"+api_Request.show_position);
        $("#span_score").html(parseInt(msg.score));
      //  $("#span_weather").html(parseInt(msg.score));
        var level = "";
        if (msg.level =="差") {
            level = "#ef5646";
            //$("#span_score").removeClass("pm fl");
            //$("#span_score").addClass("pm bad");
            $("#div_index").attr("src", "/img/wea_bad.png");
            $("#bg_img").attr("src", "/img/indexbg/bad/" + "4.jpg");
            $("#span_overarea").attr("style", "background: #ef5646");
            //if (msg.score < 60 && msg.score >= 50) {
            //    $("#b_overarea").html("优于全国45%地区");
            //}
            //else if (msg.score < 50 && msg.score >= 40) {
            //    $("#b_overarea").html("优于全国35%地区");
            //}
            //else if (msg.score < 40 && msg.score >= 30) {
            //    $("#b_overarea").html("优于全国25%地区");
            //}
            //else if (msg.score < 30 && msg.score >= 20) {
            //    $("#b_overarea").html("优于全国20%地区");
            //}
            //else if (msg.score < 20 && msg.score >= 10) {
            //    $("#b_overarea").html("优于全国15%地区");
            //}
            //else if (msg.score < 10 && msg.score >= 0) {
            //    $("#b_overarea").html("优于全国10%地区");
            //}
        }
        else if (msg.level == "优") {
            level = "#32cd33";
            //$("#span_score").removeClass("pm fl");
            //$("#span_score").addClass("pm good");
            $("#div_index").attr("src", "/img/wea_good.png");
            $("#bg_img").attr("src", "/img/indexbg/good/" + "3.jpg");
            $("#span_overarea").attr("style", "background: #85c84a");
            //$("#b_overarea").html("优于全国70%地区");
        }
        else {
            level = "#ffd61a";
            //$("#span_score").removeClass("pm fl");
            //$("#span_score").addClass("pm yiban");

            $("#div_index").attr("src", "/img/wea_liang.png");
            $("#bg_img").attr("src", "/img/indexbg/normal/" + "2.jpg");
            $("#span_overarea").attr("style", "background: #ffd61a");
            //if (msg.score < 80 && msg.score >=70) {
            //    $("#b_overarea").html("优于全国65%地区");
            //}
            //else if (msg.score < 70 && msg.score >= 60) {
            //    $("#b_overarea").html("优于全国55%地区");
            //}
        }
        //$("#span_level").html(msg.level);
        //$("#span_date").html(msg.tiptime);
        //$("#p_tiptitle").html(msg.tiptitle);
        $("#span_weather").html(msg.weather + " " + msg.tempmin + "/" + msg.tempmax + "°" + " " + msg.windpower);
        $("#span_updatetime").html("<i id=\"i_updatetime\"> </i>发布时间: " + msg.updateTime.substr(0, 5));
        $("#i_updatetime").click(function () {
            api_Request.GetList();
        });
        //$("#p1").html("温度：" + msg.temperature + "℃");
        //$("#p2").html("湿度：" + msg.humidity + "%");
        //$("#p3").html("风力：" + msg.windpower);
        var oDate = new Date();
        var daytype = "";
        if (oDate.getHours() >= 7 && oDate.getHours() < 19) {
            daytype = "day/";
        }
        else {
            daytype = "night/";
        }
        if (msg.weatherId.fa == msg.weatherId.fb) {
            $("#span_weather_icon_2").attr("style", "background:url(\"/img/weather/" + daytype + msg.weatherId.fa + ".png\") no-repeat;width: .14rem;height: .14rem;background-size: 100%;margin-right: .05rem;");
            $("#span_weather_icon_2").show();
        }
        else {
            $("#span_weather_icon_1").attr("style", "background:url(\"/img/weather/" + daytype + msg.weatherId.fa + ".png\") no-repeat;width: .14rem;height: .14rem;background-size: 100%;margin-right: .05rem;");
            $("#span_weather_icon_1").show();
            $("#span_weather_icon_2").attr("style", "background:url(\"/img/weather/" + daytype + msg.weatherId.fb + ".png\") no-repeat;width: .14rem;height: .14rem;background-size: 100%;margin-right: .05rem;");
            $("#span_weather_icon_2").show();
        }
        $("#span_general").html(msg.tempmin + "/" + msg.tempmax);
        //$("#span_wind").html(msg.windpower);
        //$("#span_pm25").html("pm2.5:"+msg.pm25);
        //$("#span_weather").html(msg.weather);
        //$("#span_temperature").html("今天 "+msg.temperature + "℃");
        //$("#span_humidity").html("湿度:"+msg.humidity + "%");
       // $("#img_weather").html(msg.weather);
        //if (msg.weatherId.fa == msg.weatherId.fb) {
        //    $("#img_weather_2").attr("src", "/img/weather/" + daytype + msg.weatherId.fa + ".png");
        //    $("#img_weather_2").show();
        //}
        //else {
        //    $("#img_weather_1").attr("src", "/img/weather/" + daytype + msg.weatherId.fa + ".png");
        //    $("#img_weather_1").show();
        //    $("#img_weather_2").attr("src", "/img/weather/" + daytype + msg.weatherId.fb + ".png");
        //    $("#img_weather_2").show();
        //}
        //$("#span_wind_to").html(msg.futureData.wind);
        //$("#span_pm25_to").html("pm2.5:" + msg.futureData.pm25);
        //$("#span_weather_to").html(msg.futureData.weather);
        //$("#span_temperature_to").html("明天 "+msg.futureData.futureTemperature + "℃");
        //$("#span_humidity_to").html("湿度:" + msg.futureData.futureHumidity + "%");
       // $("#img_weather_to").html(msg.futureData.weather);
        //if (msg.futureData.weatherId.fa == msg.futureData.weatherId.fb) {
        //    $("#img_weather_to_2").attr("src", "/img/weather/" + daytype + msg.futureData.weatherId.fa + ".png");
        //    $("#img_weather_to_2").show();
        //}
        //else {
        //    $("#img_weather_to_1").attr("src", "/img/weather/" + daytype + msg.futureData.weatherId.fa + ".png");
        //    $("#img_weather_to_1").show();
        //    $("#img_weather_to_2").attr("src", "/img/weather/" + daytype + msg.futureData.weatherId.fb + ".png");
        //    $("#img_weather_to_2").show();
        //}
        //$("#p_weather").show();
        //$("#div_index").show();
        Init.Weather(parseInt(msg.score)*1.80, level);
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
    GetDate: function () {
        //组织提交参数
        var s_api_input = JSON.stringify({});
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "2051", "api_token": "" };
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
            if (msg.flag) {
                $("#span_date").html(msg.date.replace(/-/g, ".") +" "+ msg.weekday);
            }
            else {
                if (msg.date == msg.holidayFestival) {
                    $("#span_date").html(msg.date.replace(/-/g, ".") + " " + msg.weekday + " <span>" + msg.holidayName + msg.lunarYear + msg.lunar + "</span>");
                }
                else {
                    $("#span_date").html(msg.date.replace(/-/g, ".") + " " + msg.weekday + " <span>" + msg.lunarYear + msg.lunar + "</span>");
                }
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
                OCModel.hidehead();
            }
            else {
                window.setTimeout(Init.GetStepCountByApp, 500);

            }
        }
        else {
            UserInfo.Check(Init.GetTodayStep);
        }
        $("#span_step").html(stepCount);
        $("#span_carbon").html((stepCount * 0.00008).toFixed(2));
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
                    $("#span_step").html(_step);
                    $("#span_carbon").html(parseFloat(_carbon).toFixed(2));
                }
            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    Weather: function (score, color) {
        var oW = $(window).width() * 0.65;
        $(".boxWrap").height(oW * 0.9);//oW*0.5
        $(".boxWrap").css({
            "borderTopLeftRadius": oW * 0.5 + "px",
            "WebkitBorderTopLeftRadius": oW * 0.5 + "px",
            "borderTopRightRadius": oW * 0.5 + "px",
            "WebkitBorderTopRightRadius": oW * 0.5 + "px"
        });
        var oC = document.getElementById('c1');
        var gd = oC.getContext('2d');
        clearInterval(timer);
        var oDegree = -180;
        var timer;
        timer = setInterval(function () {
            if (oDegree >= -91) {
                clearInterval(timer);
            }
            console.log(oDegree);
            gd.clearRect(0, 0, oC.width, oC.height);
            oDegree++;
            //第一条线
            gd.beginPath();
            gd.arc(oW * 0.5 + 2, oW * 0.5 + 2, oW * 0.5, d2a(-225), d2a(45), false);
            gd.lineCap = 'round';
            gd.strokeStyle = '#d5d5d5';
            gd.lineWidth = 4;
            gd.stroke();
            //第二条线
            gd.beginPath();
            gd.arc(oW * 0.5 + 2, oW * 0.5 + 2, oW * 0.5, d2a(-225), d2a(score - 180), false);
            gd.lineCap = 'round';
            //尝试渐变
            // var grad=gd.createLinearGradient(0, 0, 0, 200);
            // grad.addColorStop(0.7, 'red');
            // grad.addColorStop(1, 'green');
            // gd.strokeStyle=grad;
            gd.strokeStyle = color;//'#32cd33';//#ffd61a//#ef5646
            gd.lineWidth = 4;
            gd.stroke();
        }, 8);
    }
}
//角度->弧度
function d2a(n) {
    //之前对PI理解不对：PI=180°（这个理解不对）！！应当是：一弧度=PI/180！！ 然后求几度的弧度数则为如下：
    return n * Math.PI / 180;
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

var Environment = {
    api_target: "1032",
    api_input: { "position": "", "city": "", "radius": g_const_Map_Distance },
    SelectProjectCode: "",
    //加载多页
    GetObj: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(Environment.api_input);
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
                Environment.Load_Result(msg.detailList);
                Environment.Load_Info(msg);
                if (msg.AQIList) {
                    Environment.Load_AQI(msg.AQIList);
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
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Environment.Close_AQIDialog()\"></span><p>空气质量指数（Air Quality Index，简称AQI）可以定量描述空气质量状况。空气质量按照空气质量指数大小分为六级，相对应空气质量的六个类别，指数越大、级别越高说明污染的情况越严重，对人体的健康危害也就越大。";
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
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Environment.Close_AQIDialog()\"></span><p>凡是妨碍人们正常休息、学习和工作的声音，以及对人们要听的声音产生干扰的声音都属于噪音。按照普通人的听力水平，50分贝相当于正常交谈的声音，30-40分贝是比较安静的正常环境，60分贝以上就属于吵闹范围了。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_02'>";
                htmlStr += "<thead><tr><th class='cel-33'>级别</th><th class='cel-33'>昼间分贝数</th><th class='cel-33'>夜间分贝数</th></tr></thead>";
                htmlStr += "<tbody><tr><td>I 类 优</td><td>55以下</td><td>45以下</td></tr>";
                htmlStr += "<tr><td>II类 良</td><td>60以下</td><td>50以下</td></tr>";
                htmlStr += "<tr><td>III类 中度污染</td><td>65以下</td><td>55以下</td></tr>";
                htmlStr += "<tr><td>IV类 严重污染</td><td>65以上</td><td>55以上</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "危险品":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Environment.Close_AQIDialog()\"></span><p>危险品包括爆炸品、易燃物、氧化剂、毒害品、放射性物、腐蚀品等。根据《危险化学品经营企业开业条件和技术要求》，大中型危险化学品仓库应与周围公共建筑物、交通干线（公路、铁路、水路）、工矿企业等距离至少保持1000米。但是中国国内尚没有对危化品堆场与住宅、学校等人口密集区域、甚至饮用水源地的安全距离作出清晰的法律规定。</p>";
                break;
            case "水质":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Environment.Close_AQIDialog()\"></span><p>水质是水体的物理性质（如色度、浊度、臭味等）、化学组成（无机物和有机物的含量）、生物学特性（细菌、微生物、浮游生物、底栖生物）的总称。依照《地面水环境质量标准》（GB3838-2002）中规定，地面水使用目的和保护目标，我国地面水分五大类。";
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
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Environment.Close_AQIDialog()\"></span><p>土壤是地球陆地的表面由矿物质、有机质、水、空气和生物组成的，具有肥力并能生长植物的疏松表层。根据土壤应用功能和保护目标，可将土壤划分为三类。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_04'>";
                htmlStr += "<thead><tr><th class='cel-18'>级别</th><th class='cel-82'>说明</th></tr></thead>";
                htmlStr += "<tbody><tr><td>I类一级</td><td>适用于国家规定的自然保护区、集中式生活饮用水源地、茶园、牧场和其他保护地区的土壤，土壤质量基本上保持自然背景水平。</td></tr>";
                htmlStr += "<tr><td>II类二级</td><td>适用于一般农田、蔬菜地、茶园果园、牧场等土壤，土壤质量基本上对人体、植物和环境不造成危害和污染</td></tr>";
                htmlStr += "<tr><td>III类三级</td><td>适用于林地土壤及污染物容量较大的高背景值土壤和矿产附近等地的农田土壤。土壤质量对人体、植物和环境造成的危害和污染较小。</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "污染源":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Environment.Close_AQIDialog()\"></span><p>目前可查询的污染源包括化工厂和垃圾处理中心。点点环境将会持续增加其它污染源信息。化工厂在生产、储运过程中如发生爆炸、泄露或非法排放，有可能对人体造成中毒、窒息、化学灼伤等伤害。垃圾处理中心则存在垃圾臭气、垃圾渗沥液、焚烧产生的二噁英等污染物的潜在风险。距离污染源越近，风险等级越高，对人造成危害的可能性越大。";
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
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Environment.Close_AQIDialog()\"></span><p>目前可查询的辐射为高压线辐射。高压线产生的电磁场一般称为极低频电磁场或者叫工频电场。高压线、变电站会产生电磁辐射，它产生的工频电场是感应电场感应磁场，因为它的波长非常长，所以它不会像电磁辐射那样被人体直接吸收，但是会在人体里头感应出电流来，这个感应电流需要控制。工频电场会在人体中产生感应电流，为了防止对人体产生影响，需要将感应电流密度控制在一定的范围内。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_01'>";
                htmlStr += "<thead><tr><th class='cel-50'>高压线级别</th><th class='cel-50'>安全距离</th></tr></thead>";
                htmlStr += "<tbody><tr><td>220千伏</td><td>100米外</td></tr>";
                htmlStr += "<tr><td>132千伏</td><td>20米外</td></tr>";
                htmlStr += "<tr><td>11-66千伏</td><td>10米外</td></tr>";
                htmlStr += "<tr><td>地埋高压线</td><td>5米外</td></tr></tbody>";

                htmlStr += "</table></div>";
                break;
            case "容积率":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Environment.Close_AQIDialog()\"></span><p>容积率又称建筑面积毛密度，指项目用地范围内地上总建筑面积与项目总用地面积的比值。容积率是衡量建设用地使用强度的一项重要指标。现行城市规划法规体系详细制定了各类居住用地容积率标准。住宅小区容积率小于1.0的，为非普通住宅。";
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
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Environment.Close_AQIDialog()\"></span><p>居住区绿地率是描述居住区用地范围内各类绿地的总和与居住区用地的比率。绿地率所指的\"居住区用地范围内各类绿地\"主要包括公共绿地、宅旁绿地等。其中，公共绿地，又包括居住区公园、小游园、组团绿地及其他的一些块状、带状化公共绿地。绿地率=绿地面积/用地面积×100%。 根据《城市居住区规划设计规范》，绿地率的级别可分为三大类。";
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

            htmlStr += "<li class=\"fl\" onclick=\"Environment.Load_AQIDialog('" + n.name + "')\">";
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
            $("#div_chart_info").html("周边一项或多项环境数据严重不达标，可能会在一定程度上影响您的生活、健康与安全，了解更多请<br> <span class=\"chartTxt_cart\"><img src=\"/img/chartTxt_cart.png\"></span><a onclick=\"Environment.Load_List()\" style=\"cursor:pointer;\">去报告库</a>");
        }
        else if (result.score > 80) {
            //$("#div_score").removeClass("pm fl");
            $("#div_pmwrap").attr("class", "pmWrap pmWrap-good no clearfix");
            $("#div_score").attr("class", "pm bad fl");
            $("#div_level").html("<img src=\"img/good.png\"> ");
            $("#div_level_general").html("<img src=\"img/good.png\"> ");
            $("#div_upper").html("不能辜负的好时节，让我们一起畅快的运动，尽情的吸氧吧。");
            $("#div_chart_info").html("周边空气清新，噪音干扰较平时更少，其它环境指标均符合国家相关标准，与各种污染源、辐射源存在一定的安全距离，潜在风险较低，了解更多请<br> <span class=\"chartTxt_cart\"><img src=\"/img/chartTxt_cart.png\"></span><a onclick=\"Environment.Load_List()\" style=\"cursor:pointer;\">去报告库</a>");
        }
        else {
            //$("#div_score").removeClass("pm fl");
            $("#div_pmwrap").attr("class", "pmWrap pmWrap-liang no clearfix");
            $("#div_score").attr("class", "pm bad fl");
            $("#div_level").html("<img src=\"img/yiban.png\"> ");
            $("#div_level_general").html("<img src=\"img/yiban.png\"> ");
            $("#div_upper").html("周边的环境就像我们当下的生活，不好，但也不差。");
            $("#div_chart_info").html("周边一项或多项环境指标存在轻度或中度污染，与各种污染源、辐射源存在一定的安全距离，潜在风险可控，了解更多请<br> <span class=\"chartTxt_cart\"><img src=\"/img/chartTxt_cart.png\"></span><a onclick=\"Environment.Load_List()\" style=\"cursor:pointer;\">去报告库</a>");
        }
        //if (result.tiptitle.length > 40) {
        //    $("#div_upper").html(result.tiptitle.substring(0, 40) + "...");
        //}
        //else {
        //    $("#div_upper").html(result.tiptitle);
        //}

    },
    Load_List: function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.ProjectList1 + "?t=" + Math.random();
    },
    api_input_2050_B: { "city": "", "area": "", "type": "B" },
    GetObj_2050_B: function (AQI_list) {
        //组织提交参数
        var s_api_input = JSON.stringify(Environment.api_input_2050_B);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "2050", "api_token": g_const_api_token.Unwanted };
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
            if (msg.resultCode == 1) {
                Environment.Load_Result_2050_B(msg.date, AQI_list);

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
    Load_Result_2050_B: function (resultlist, AQI_list) {
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
        var htmlStr = "";
        var htmlWeather = "";
        var htmlWind = "";
        var oDate = new Date();
        var flow_max = [];
        var flow_min = [];
        var labels = [];
        $.each(resultlist, function (i, n) {
            if (i < 7) {
                labels.push((oDate.AddDays(i).getMonth() + 1).toString() + "." + oDate.AddDays(i).getDate().toString());
                flow_max.push(n.tmp_max);
                flow_min.push(n.tmp_min);
                //data.labels.push((oDate.AddDays(i + 1).getMonth() + 1).toString() + "." + oDate.AddDays(i + 1).getDate().toString());
                // data.datasets[0].data.push(n.tmp_max);
                //  data.datasets[1].data.push(n.tmp_min);
                htmlStr += "<li><p class=\"txt01\">";
                if (i == 0) {
                    htmlStr += "今天";
                }
                else if (i == 1) {
                    htmlStr += "明天";
                }
                else {
                    htmlStr += GetWeekName(oDate.AddDays(i).getDay());
                }
                htmlStr += "</p><p class=\"txt02\">";
                htmlStr += (oDate.AddDays(i).getMonth() + 1).toString() + "." + oDate.AddDays(i).getDate().toString() + "</p></li>";

                htmlWeather += "<li><span style=\"width:.20rem;height:.20rem;background:url(../img/weather/day/" + n.cw_am + ".png) no-repeat;background-size:100%;position:absolute;left:50%;margin-left:-.075rem;top:2px;\"></span>";
                htmlWeather += "<span style=\"width:.20rem;height:.20rem;background:url(../img/weather/night/" + n.cw_pm + ".png) no-repeat;background-size:100%;position:absolute;left:50%;margin-left:-.075rem;bottom:2px;\"></span></li>";
                htmlWind += "<li><span class=\"time\">" + n.wd + "<b>" + n.wind + "</b></span>";
                if (AQI_list[i] > 0 && AQI_list[i] <= 50) {
                    htmlWind += "<span class=\"pollute verygood\">优</span>";
                } else if (AQI_list[i] > 50 && AQI_list[i] <= 100) {
                    htmlWind += "<span class=\"pollute good\">良</span>";
                } else if (AQI_list[i] > 100 && AQI_list[i] <= 150) {
                    htmlWind += "<span class=\"pollute bad\">轻污</span>";
                } else if (AQI_list[i] > 150 && AQI_list[i] <= 200) {
                    htmlWind += "<span class=\"pollute verybad\">中污</span>";
                } else if (AQI_list[i] > 200 && AQI_list[i] <= 300) {
                    htmlWind += "<span class=\"pollute veryverybad\">重污</span>";
                } else {
                    htmlWind += "<span class=\"pollute veryverybadandbad\">严污</span>";
                }
                htmlWind += "</li>";
            }
        });
        $("#ul_week_kline_7").html(htmlStr);
        $("#ul_week_night_7").html(htmlWeather);
        $("#ul_week_wind_7").html(htmlWind);
        // window.myLineChart = new Chart(document.getElementById("myChart_k_wearher").getContext("2d")).Line(data, options);
        Environment.InitKline_B(flow_max, flow_min, labels, "myChart_k_wearher", "#fff", "", $(window).width() + 10)
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
            width: (canvasH + 10) * 2,
            height: 240,
            shadow: true,
            shadow_color: '#fff',
            shadow_blur: 0,
            shadow_offsetx: 0,
            shadow_offsety: 0,
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
                    label: { color: 'transparent', font: '微软雅黑', fontsize: 1, fontweight: 600 },
                    scale_enable: false,
                    labels: labels
                }]
                //labels:["1","2","3","4","5","6","7","8","9","10","11","21"]
            }
        });

        chart.draw();
    },
    api_input_2050_A: { "city": "", "area": "", "type": "A" },
    GetObj_2050_A: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(Environment.api_input_2050_A);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "2050", "api_token": g_const_api_token.Unwanted };
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
            if (msg.resultCode == 1) {
                Environment.api_input_2050_B.city = Environment.api_input_2050_A.city;
                Environment.api_input_2050_B.area = Environment.api_input_2050_A.area;
                Environment.GetObj_2050_B(msg.date);
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
};
var projectAddressList = [];
var Address = {
    api_input: {  },
    SelectProjectCode: "",
    //加载多页
    Load: function () {
        
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            if (localStorage[g_const_localStorage.ProjectAddress]) {
                projectAddressList = JSON.parse(localStorage[g_const_localStorage.ProjectAddress]);
                Address.SetList(projectAddressList);
            }
            else {
                Address.SetList([]);
            }
        }
        else {
            //组织提交参数
            var s_api_input = JSON.stringify(Address.api_input);
            //提交接口[api_token不为空，公用方法会从sission中获取]
            var obj_data = { "api_input": s_api_input, "api_target": "address_enshrine_list", "api_token": g_const_api_token.Wanted };
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
                    projectAddressList = msg.data;
                }
                Address.SetList(projectAddressList);
            });
            //接口异常
            request.fail(function (jqXHR, textStatus) {

            });
        }
    },
    SetList: function (resultlist) {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var geoc = new BMap.Geocoder();
                var po = r.point;
                geoc.getLocation(po, function (rs) {
                    var addComp = rs.addressComponents;
                    var htmlStr = "";
                    htmlStr += "<li onclick=\"Address.SetCurr()\">";
                    htmlStr += "<p class=\"openPosition\">选择定位</p>";
                    htmlStr += "<span>" + addComp.city + addComp.district + addComp.street + "</span>";
                    htmlStr += "</li>";
                    var htmlAddress = "<li class=\"curr\" onclick=\"Address.SetCurr()\"></li>";
                    $.each(resultlist.reverse(), function (i, n) {
                        htmlStr += "<li onclick=\"Address.SetInfo('" + n.lat + "','" + n.lng + "','" + n.address + "','" + n.city + "','" + n.district + "')\">";
                        htmlStr += "<div class=\"delete\"></div>";
                        htmlStr += "<p class=\"openPosition\">" + n.name + "</p>";
                        htmlStr += "<span>" + n.address + "</span>";
                        htmlStr += "<div class=\"quality you\">" + n.level + "</div>";
                        htmlStr += "</li>";
                        htmlAddress += "<li onclick=\"Address.SetInfo('" + n.lat + "','" + n.lng + "','" + n.address + "','" + n.city + "','" + n.district + "')\"></li>";
                    });
                    $("#ul_addresslist").html(htmlStr);
                    $("#ul_address_collection").html(htmlAddress);
                });
            }
        }, { enableHighAccuracy: true })

    },
    SetInfo: function (lat, lng, address, city, district) {
        if ($("#b_edit").html() == "完成") {
            Address.api_input_del.lat = lat;
            Address.api_input_del.lng = lng;
            $("#divAlert").show();
            //Address.Del();
        }
        else {
            localStorage[g_const_localStorage.Position] = lat + "," + lng;
            api_Request.api_input.position = lat + "," + lng;
            api_Request.api_input.city = city;
            api_Request.show_position = address;
            api_Request.GetList();
            Environment.api_input_2050_B.city = city;
            Environment.api_input_2050_B.area = district;
            Environment.GetObj_2050_B();
            $("#page_02").css({
                "transform": "translate(0px, 0px)",
                "transition": "all 1s ease"
            })
        }

    },
    SetCurr: function () {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var geoc = new BMap.Geocoder();
                var po = r.point;
                geoc.getLocation(po, function (rs) {
                    var addComp = rs.addressComponents;
                    api_Request.api_input.position = po.lat + "," + po.lng;
                    api_Request.api_input.city = addComp.city.replace(/市/g, "");
                    api_Request.show_position = addComp.city + addComp.district + addComp.street;
                    api_Request.GetList();
                    Environment.api_input_2050_A.city = addComp.city;
                    Environment.api_input_2050_A.area = addComp.district;
                    Environment.GetObj_2050_A();
                });
            }
        }, { enableHighAccuracy: true })
        $("#page_02").css({
            "transform": "translate(0px, 0px)",
            "transition": "all 1s ease"
        })
    },
    api_input_del: { "lat": "", "lng": "" },
    Del: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            var projectAddressListNew = [];
            $.each(projectAddressList, function (i, n) {
                if (!(n.lat == Address.api_input_del.lat && n.lng == Address.api_input_del.lng)) {
                    projectAddressListNew.push(n);
                }
            });
            localStorage[g_const_localStorage.ProjectAddress] = JSON.stringify(projectAddressListNew);
            Address.Load();
        }
        else {
            var s_api_input = JSON.stringify(Address.api_input_del);
            //提交接口[api_token不为空，公用方法会从sission中获取]
            var obj_data = { "api_input": s_api_input, "api_target": "del_address_enshrine", "api_token": g_const_api_token.Wanted };
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
                    Address.Load();
                }
            });
            //接口异常
            request.fail(function (jqXHR, textStatus) {

            });
        }
    }
};

