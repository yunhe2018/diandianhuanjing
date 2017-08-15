$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
    UserInfo.Check(Init.GetCarbonByApp);
    FooterMenu.Set(-1);
    $("#btnback").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
    });
    $("#li_Walk").click(function () {
        window.location.replace(g_const_PageURL.CarbonDetail + "?type=DC170208100004&t=" + Math.random());
    });
    $("#li_NewEnergy").click(function () {
        window.location.replace(g_const_PageURL.CarbonDetail + "?type=DC170208100005&t=" + Math.random());
    });
    $("#span_Buy").click(function () {
        
        window.location.replace(g_const_PageURL.CarbonDetail + "?type=DC170208100006&t=" + Math.random());
    });
    $("#span_Recharge").click(function () {
        PageUrlConfig.SetUrl();
        window.location.replace(g_const_PageURL.Recharge + "?t=" + Math.random());
    });
    $("#span_ExchangeReport").click(function () {
        window.location.replace(g_const_PageURL.CarbonDetail + "?type=DC170208100007&t=" + Math.random());
    });
    $("#span_ExchangeGift").click(function () {
        window.location.replace(g_const_PageURL.CarbonDetail + "?type=DC170208100008&t=" + Math.random());
    });
    $("#span_Speculate").click(function () {
        window.location.replace(g_const_PageURL.CarbonDetail + "?type=DC170208100009&t=" + Math.random());
    });
    $("#span_BuyCarbon,#span_SellCarbon").click(function () {
        PageUrlConfig.SetUrl();
        window.location.replace(g_const_PageURL.TradeBuy + "?t=" + Math.random());
    });
    $("#span_SellCarbon").click(function () {
        PageUrlConfig.SetUrl();
        window.location.replace(g_const_PageURL.TradeSell + "?t=" + Math.random());
    });
    $("#span_Trade").click(function () {
        window.location.replace(g_const_PageURL.CarbonDetail + "?type=DC170208100010&t=" + Math.random());
    });
    $("#span_Gift").click(function () {
        PageUrlConfig.SetUrl();
        window.location.replace(g_const_PageURL.Gift + "?t=" + Math.random());
    });
    $("#span_Report").click(function () {
        PageUrlConfig.SetUrl();
        window.location.replace(g_const_PageURL.ProjectList1 + "?p=m&t=" + Math.random());
    });
});

var Step = {
    InitKline: function (flow, labels, div, color, dataname) {
        var canvasH = $("#" + div).width();
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
                        line_width: 1
                    }
        ];
        // var labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "21"]
        var chart = new iChart.LineBasic2D({
            render: div,
            data: data,
            // title : '北京2012年平均温度情况',
            width: canvasH+70,
            height: ($(window).height()-400)/2,
            shadow: false,
            // shadow_color : 'red',
            // shadow_blur : 4,
            // shadow_offsetx : 0,
            // shadow_offsety : 2,
            tip: {
                enable: true,
                shadow: true
            },
            crosshair: {
                enable: true,
                line_color: color
            },
            sub_option: {
                label: false,
                hollow_inside: true,
                point_size: 6
            },
            coordinate: {
                height: '70%',
                background_color: null,
                grid_color: '#fff',//经纬线
                axis: {
                    color: '#c0d0e0',
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
                    label: { color: '#fff', fontsize: 11 },//刻度值
                    scale_color: '#fff',
                    listeners: {//配置事件
                        parseText: function (t, x, y) {//设置解析值轴文本
                            return { text: t + " cm" }
                        }
                    }
                }, {
                    position: 'bottom',
                    label: { color: '#333', font: '微软雅黑', fontsize: 11 },
                    scale_enable: false,
                    labels: labels
                }]
                //labels:["1","2","3","4","5","6","7","8","9","10","11","21"]
            }
        });

        chart.draw();
    },
    SetCount: function (count) {
        //  var count = 18036;
        var num01 = count % 258;
        var oSetNum = $("#stepNum");
        //$("#stepNum")
        clearTimeout(oTimout);
        var oTimout = setTimeout(function () {
            clearInterval(timer);
            var timer = setInterval(function () {
                if (parseInt(oSetNum.text()) == count) { clearInterval(timer); }
                if (count != 0 && oSetNum.text() < (count - num01)) {
                    oSetNum.text(parseInt(oSetNum.text()) + 258);
                } else {
                    oSetNum.text(parseInt(oSetNum.text()) + num01);
                    clearInterval(timer);
                }
            }, 20)
        }, 200);
    }
};

var api_Request = {
    //api_target: "step_sync",
    api_input: { "phone": "", "equipmentCode": "", "data": "" },
    //{"resultCode":0,"month":[{"createDate":"2016-09-18","step":0},{"createDate":"2016-09-19","step":0},{"createDate":"2016-09-20","step":0},{"createDate":"2016-09-21","step":0},{"createDate":"2016-09-22","step":0},{"createDate":"2016-09-23","step":0},{"createDate":"2016-09-24","step":0},{"createDate":"2016-09-25","step":0},{"createDate":"2016-09-26","step":0},{"createDate":"2016-09-27","step":0},{"createDate":"2016-09-28","step":0},{"createDate":"2016-09-29","step":0},{"createDate":"2016-09-30","step":0},{"createDate":"2016-10-01","step":0},{"createDate":"2016-10-02","step":0},{"createDate":"2016-10-03","step":0},{"createDate":"2016-10-04","step":0},{"createDate":"2016-10-05","step":0},{"createDate":"2016-10-06","step":0},{"createDate":"2016-10-07","step":0},{"createDate":"2016-10-08","step":0},{"createDate":"2016-10-09","step":0},{"createDate":"2016-10-10","step":0},{"createDate":"2016-10-11","step":0},{"createDate":"2016-10-12","step":0},{"createDate":"2016-10-13","step":0},{"createDate":"2016-10-14","step":0},{"createDate":"2016-10-15","step":0},{"createDate":"2016-10-16","step":100},{"createDate":"2016-10-17","step":100}],"year":[{"month":0,"step":6},{"month":1,"step":0},{"month":2,"step":0},{"month":3,"step":0},{"month":4,"step":0},{"month":5,"step":0},{"month":6,"step":0},{"month":7,"step":0},{"month":8,"step":0},{"month":9,"step":0},{"month":10,"step":0},{"month":11,"step":0}],"resultMessage":"查询列表成功","week":[{"createDate":"2016-10-11","step":0},{"createDate":"2016-10-12","step":0},{"createDate":"2016-10-13","step":0},{"createDate":"2016-10-14","step":0},{"createDate":"2016-10-15","step":0},{"createDate":"2016-10-16","step":100},{"createDate":"2016-10-17","step":100}]}
    resultList_month: [],
    resultList_year: [],
    resultList_week: [],
    //加载多页
    GetList: function () {

        //组织提交参数
        var s_api_input = JSON.stringify(api_Request.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "step_sync", "api_token": "" };
        var request = $.ajax({
            url: g_APIUTL,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        //正常返回
        request.done(function (msg) {
            if (msg.resultCode == g_const_Success_Code) {
                ShowMesaage(msg.resultMessage);
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

    api_input_get: { "equipmentCode": "" }
,
    GetData: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(api_Request.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": JSON.stringify(api_Request.api_input_get), "api_target": "step_data", "api_token": "" };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
            if (msg.resultCode == g_const_Success_Code) {
                api_Request.resultList_week = msg.week;
                api_Request.resultList_month = msg.month;
                api_Request.resultList_year = msg.year.reverse();
                api_Request.LoadResult(api_Request.resultList_month);
            }
            else {
                //  ShowMesaage(msg.resultMessage);
            }
        });
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    LoadResult: function (list) {
        var flow = [];
        var labels = [];
        var startDate = "";
        var endDate = "";
        $.each(list, function (i, n) {
            flow.push(n.step);
            if (list.length == 7) {
                labels.push(getFormatDate(n.createDate, "MM.dd"));
                if (i == 0) {
                    startDate = getFormatDate(n.createDate, "MM") + "月";
                }
                if (i == list.length - 1) {
                    endDate = getFormatDate(n.createDate, "MM") + "月";
                }
            }
            else if (list.length == 12) {

                var date = new Date();
                date.addMonths(-n.month);
                labels.push(getFormatDate(date.Format("yyyy-MM-dd"), "MM") + "月");
                if (i == 0) {
                    startDate = getFormatDate(date.Format("yyyy-MM-dd"), "yyyy") + "年";
                }
                if (i == list.length - 1) {
                    endDate = getFormatDate(date.Format("yyyy-MM-dd"), "yyyy") + "年";
                }
            }
            else {
                labels.push("");
                if (i == 0) {
                    startDate = getFormatDate(n.createDate, "MM") + "月";
                }
                if (i == list.length - 1) {
                    endDate = getFormatDate(n.createDate, "MM") + "月";
                }
            }
        });
        Step.InitKline(flow, labels, "canvasDiv", "#5ebb8d", "步数");
        Step.InitKline([10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "canvasDiv02", "#1ea3fc", "里程");
        if (startDate == endDate) {
            $("#span_date").html(startDate);
        }
        else {
            $("#span_date").html(startDate + "/" + endDate);
        }
    }
};

var Init = {
    GetCarbonByApp: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
            return;
        }
        //组织提交参数
        var s_api_input = JSON.stringify({});
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "user_carbon_detail", "api_token": g_const_api_token.Wanted };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
            Init.GetInfo();
            try {
                var flow = [];
                var labels = [];
                var startDate = "";
                var endDate = "";
                $("#span_Walk").html(JSON.parse(msg.walkCarbon).toFixed(2));
                $("#span_NewEnergy").html(JSON.parse(msg.newEnergyCarbon).toFixed(2));
                $("#span_Buy").html(JSON.parse(msg.buyCarbon).toFixed(2));
                $("#span_ExchangeReport").html(JSON.parse(msg.exchangeReport).toFixed(2));
                $("#span_ExchangeGift").html(JSON.parse(msg.exchangeGift).toFixed(2));
                $("#span_Speculate").html(JSON.parse(msg.spendForCarbonDeal).toFixed(2));
                $("#span_Trade").html(JSON.parse(msg.inComeFormCarbonDeal).toFixed(2));
                var productData = msg.incomeCarbon;
                var currday_carbon = 0.00;
                $.each(productData, function (i, n) {
                    if (i >= productData.length - 10) {
                        if (i == productData.length - 10) {
                            startDate = getFormatDate(n.createTime, "MM") + "月";
                        }
                        if (i == productData.length - 1) {
                            endDate = getFormatDate(n.createTime, "MM") + "月";
                        }
                        flow.push(n.carbonSum);
                        labels.push(getFormatDate(n.createTime, "dd"));
                        currday_carbon = n.carbonSum;
                    }
                });
                $("#span_carbon_in").html("当日收入：" + currday_carbon);
                if (startDate == endDate) {
                    $("#span_date_in").html(startDate + "碳币收入表");
                }
                else {
                    $("#span_date_in").html(startDate + "/" + endDate + "碳币收入表");
                }
                Step.InitKline(flow, labels, "canvasDiv", "#5ebb8d", "碳币");

                flow = [];
                labels = [];
                startDate = "";
                endDate = "";
                productData = msg.expendCarbon;
                currday_carbon = 0.00;
                $.each(productData, function (i, n) {
                    if (i >= productData.length - 10) {
                        if (i == productData.length - 10) {
                            startDate = getFormatDate(n.createTime, "MM") + "月";
                        }
                        if (i == productData.length - 1) {
                            endDate = getFormatDate(n.createTime, "MM") + "月";
                        }
                        flow.push(n.carbonSum);
                        labels.push(getFormatDate(n.createTime, "dd"));
                        currday_carbon = n.carbonSum;
                    }
                });
                $("#span_carbon_out").html("当日支出：" + currday_carbon);
                if (startDate == endDate) {
                    $("#span_date_out").html(startDate + "碳币支出表");
                }
                else {
                    $("#span_date_out").html(startDate + "/" + endDate + "碳币支出表");
                }
                Step.InitKline(flow, labels, "canvasDiv02", "#ef5646", "碳币");
                
            } catch (e) {

            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });

        var obj_data_balance = { "api_input": s_api_input, "api_target": "user_", "api_token": g_const_api_token.Wanted };
        var request_balance = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request_balance.done(function (msg) {
            try {
                $("#span_carbon_balance").html(msg.user.carbonMoney);

            } catch (e) {

            }
        });

        request_balance.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    GetInfo: function () {
        //var purl = g_APIUTL_In;
        //var request = $.ajax({
        //    url: purl,
        //    cache: false,
        //    method: g_APIMethod,
        //    data: "t=" + Math.random() + "&action=getuser",
        //    dataType: g_APIResponseDataType
        //});
    var request = $.ajax({
        url: g_APIUTL,
        cache: false,
        method: g_APIMethod,
        data: { "api_input": "", "api_target": "user_data", "api_token": g_const_api_token.Wanted },
        dataType: g_APIResponseDataType
    });

    request.done(function (msg) {
        if (msg.resultCode == g_const_Success_Code) {
            $("#span_carbon_balance").html(msg.user.carbonMoney);
        }
        else {

        }
    });

    request.fail(function (jqXHR, textStatus) {
        ShowMesaage(g_const_API_Message["7001"]);
    });
},
}