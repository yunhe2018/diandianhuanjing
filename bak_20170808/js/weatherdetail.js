$(document).ready(function () {
    $("#back_btn").click(function () {
        window.location.href = g_const_PageURL.Index + "?t=" + Math.random();
    });
    $("#a_report").click(function () {
        window.location.href = g_const_PageURL.ProjectList1 + "?t=" + Math.random();
    });
    $("#div_index").click(function () {
        window.location.href = g_const_PageURL.Index1 + "?t=" + Math.random();
    });
    $("#span_time").click(function () {
        api_Request.GetList();
    });
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
                Project.api_input_2050_A.city = addComp.city;
                Project.api_input_2050_A.area = addComp.district;
                Project.GetObj_2050_A();
                Project.api_input_2050_B.city = addComp.city;
                Project.api_input_2050_B.area = addComp.district;
                Project.GetObj_2050_B();

            });
        }
    }, { enableHighAccuracy: true })
    //Init.GetStepCountByApp();
    //api_Request.GetDate();
    //AppLoginYYG.GetInfo();
});

//我的订单列表
var api_Request = {
    api_input: { "position": "", "city": "", "radius": g_const_Map_Distance },
    show_position: "",
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
    Load_Result: function (msg) {
        $("#i_city").html(api_Request.show_position);
        $("#span_score").html(msg.temperature + "<i>°</i>");
        $("#span_time").html(" " + msg.updateTime.substr(0, 5));
        var weathericon="";
        var oDate = new Date();
        var daytype = "";
        if (oDate.getHours() >= 7 && oDate.getHours() < 19) {
            daytype = "day/";
        }
        else {
            daytype = "night/";
        }
        if (msg.weatherId.fa == msg.weatherId.fb) {
            weathericon="<i><img src=\"img/weather/" + daytype + msg.weatherId.fa + ".png\" /></i>";
        }
        else {
            weathericon = "<i class=\"two\"><img src=\"img/weather/" + daytype + msg.weatherId.fa + ".png\" /><img src=\"img/weather/" + daytype + msg.weatherId.fb + ".png\" /></i>";

        }
        $("#span_weather").html(weathericon+msg.weather + " " + msg.windpower);
        //if (msg.weatherId.fa == msg.weatherId.fb) {
        //    $("#span_weather_icon_2").attr("style", "background:url(\"../img/weather/" + daytype + msg.weatherId.fa + ".png\") no-repeat;width: .14rem;height: .14rem;background-size: 100%;margin-right: .05rem;");
        //    $("#span_weather_icon_2").show();
        //}
        //else {
        //    $("#span_weather_icon_1").attr("style", "background:url(\"../img/weather/" + daytype + msg.weatherId.fa + ".png\") no-repeat;width: .14rem;height: .14rem;background-size: 100%;margin-right: .05rem;");
        //    $("#span_weather_icon_1").show();
        //    $("#span_weather_icon_2").attr("style", "background:url(\"../img/weather/" + daytype + msg.weatherId.fb + ".png\") no-repeat;width: .14rem;height: .14rem;background-size: 100%;margin-right: .05rem;");
        //    $("#span_weather_icon_2").show();
        //}
        if (msg.score < 60) {
            $("#div_index").attr("src", "/img/hb_wth_bad.png");
            $("#span_index").html("空气： " + parseInt(msg.score) + " 差");
        }
        else if (msg.score > 80) {
            $("#div_index").attr("src", "/img/hb_wth_good.png");
            $("#span_index").html("空气： " + parseInt(msg.score) + " 优");
        }
        else {
            $("#div_index").attr("src", "/img/hb_wth_liang.png");
            $("#span_index").html("空气： " + parseInt(msg.score) + " 良");
        }
        return;
        var level = "";
        if (msg.score < 60) {
            //$("#span_score").removeClass("pm fl");
            //$("#span_score").addClass("pm bad");
            $("#div_index").attr("src", "/img/wea_bad.png");
        }
        else if (msg.score > 80) {
            //$("#span_score").removeClass("pm fl");
            //$("#span_score").addClass("pm good");
            $("#div_index").attr("src", "/img/wea_good.png");
        }
        else {
            //$("#span_score").removeClass("pm fl");
            //$("#span_score").addClass("pm yiban");
            $("#div_index").attr("src", "/img/wea_liang.png");
        }
        //$("#span_level").html(msg.level);
        //$("#span_date").html(msg.tiptime);
        //$("#p_tiptitle").html(msg.tiptitle);
        //$("#span_weather").html(msg.weather + " " + msg.windpower + " " + msg.tempmin + "°/" + msg.tempmax + "°");
        $("#p1").html("温度：" + msg.temperature + "℃");
        $("#p2").html("湿度：" + msg.humidity);
        $("#p3").html("风力：" + msg.windpower);
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
            if (msg.flag == false) {
                $("#span_date").html(msg.date.replace(/-/g, ".") + msg.weekday);
            }
            else {
                if (msg.date == msg.holidayFestival) {
                    $("#span_date").html(msg.date.replace(/-/g, ".") + msg.weekday + " " + msg.holidayName + "<i>" + msg.lunarYear + msg.lunar + "</i>");
                }
                else {
                    $("#span_date").html(msg.date.replace(/-/g, ".") + msg.weekday + "<i>" + msg.lunarYear + msg.lunar + "</i>");
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
}
var Project = {
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
                ShowMesaage(msg.resultMessage);
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
            if (n > 0 && n <= 50) {
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
        Project.InitKline_A(flow, labels, "myChart_k", "#fff", "", $(window).width() + 10);
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
            border: 0,
            background_color: "",
            // title : '北京2012年平均温度情况',
            width: (canvasH + 10) * 2,
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
                ShowMesaage(msg.resultMessage);
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
                htmlStr += "<li><p class=\"txt01\">" + GetWeekName(oDate.AddDays(i + 1).getDay());
                htmlStr += "</p><p class=\"txt02\">";
                htmlStr += (oDate.AddDays(i + 1).getMonth() + 1).toString() + "." + oDate.AddDays(i + 1).getDate().toString() + "</p></li>";

                htmlWeather += "<li><span style=\"width:.20rem;height:.20rem;background:url(../img/weather/day/" + n.cw_am + ".png) no-repeat;background-size:100%;position:absolute;left:50%;margin-left:-.075rem;top:2px;\"></span>";
                htmlWeather += "<span style=\"width:.20rem;height:.20rem;background:url(../img/weather/night/" + n.cw_pm + ".png) no-repeat;background-size:100%;position:absolute;left:50%;margin-left:-.075rem;bottom:2px;\"></span></li>";
            }
        });
        $("#ul_week_kline_7").html(htmlStr);
        $("#ul_week_night_7").html(htmlWeather);
        Project.InitKline_B(flow_max, flow_min, labels, "myChart_k_wearher", "#fff", "", $(window).width() + 10)
    },
    InitKline_B: function (flow1, flow2, labels, div, color, dataname, canvasH) {
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
};