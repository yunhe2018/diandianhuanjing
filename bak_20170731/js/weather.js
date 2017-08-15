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
                    api_Request.api_input.pageIndex = 0;
                    api_Request.api_input.position = po.lat + "," + po.lng;
                    api_Request.api_input.city = addComp.city.replace(/市/g, "");
                    api_Request.show_position = addComp.city + addComp.district + addComp.street;
                    api_Request.GetList();

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
        });

    }
    Init.GetStepCountByApp();
    api_Request.GetDate();
    AppLoginYYG.GetInfo();
    
});

//我的订单列表
var api_Request = {
    api_input: { "position": "", "city": "", "radius": g_const_Map_Distance },
    show_position:"",
    //加载多页
    GetList: function () {
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
        if (msg.score < 60) {
            level = "#ef5646";
            //$("#span_score").removeClass("pm fl");
            //$("#span_score").addClass("pm bad");
            $("#div_index").attr("src", "/img/wea_bad.png");
            $("#bg_img").attr("src", "/img/indexbg/bad/" + "4.jpg");
            $("#span_overarea").attr("style", "background: #ef5646");
            if (msg.score < 60 && msg.score >= 50) {
                $("#b_overarea").html("优于全国45%地区");
            }
            else if (msg.score < 50 && msg.score >= 40) {
                $("#b_overarea").html("优于全国35%地区");
            }
            else if (msg.score < 40 && msg.score >= 30) {
                $("#b_overarea").html("优于全国25%地区");
            }
            else if (msg.score < 30 && msg.score >= 20) {
                $("#b_overarea").html("优于全国20%地区");
            }
            else if (msg.score < 20 && msg.score >= 10) {
                $("#b_overarea").html("优于全国15%地区");
            }
            else if (msg.score < 10 && msg.score >= 0) {
                $("#b_overarea").html("优于全国10%地区");
            }
        }
        else if (msg.score > 80) {
            level = "#32cd33";
            //$("#span_score").removeClass("pm fl");
            //$("#span_score").addClass("pm good");
            $("#div_index").attr("src", "/img/wea_good.png");
            $("#bg_img").attr("src", "/img/indexbg/good/" + "3.jpg");
            $("#span_overarea").attr("style", "background: #85c84a");
            $("#b_overarea").html("优于全国70%地区");
        }
        else {
            level = "#ffd61a";
            //$("#span_score").removeClass("pm fl");
            //$("#span_score").addClass("pm yiban");

            $("#div_index").attr("src", "/img/wea_liang.png");
            $("#bg_img").attr("src", "/img/indexbg/normal/" + "2.jpg");
            $("#span_overarea").attr("style", "background: #ffd61a");
            if (msg.score < 80 && msg.score >=70) {
                $("#b_overarea").html("优于全国65%地区");
            }
            else if (msg.score < 70 && msg.score >= 60) {
                $("#b_overarea").html("优于全国55%地区");
            }
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