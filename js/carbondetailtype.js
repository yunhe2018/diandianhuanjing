$(document).ready(function () {
    Init.api_input.operationType = GetQueryString("type");
    pageIndex = 0;
    pageSize = 5;
    UserInfo.Check(Init.GetCarbonDetail);
    $("#back_btn").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
    });
    $("#btn_recharge").click(function () {
        PageUrlConfig.SetUrl();
        window.location.replace(g_const_PageURL.Recharge + "?t=" + Math.random());
    });
    $("#btnDetail").click(function () {
        PageUrlConfig.SetUrl();
        window.location.replace(g_const_PageURL.CarbonDetailAll + "?t=" + Math.random());
    });
    $("#btnChoose").click(function () {
        $("#div_filter").show();
    });
    $("#ul_detail li").on("click", function () {
        $(this).addClass("curr").siblings().removeClass("curr");
        Init.api_input.operationType = $(this).attr('detailtype');
        Init.GetCarbonDetail();
    });
    if (Init.api_input.operationType == "DC170208100002") {
        $("#li_in").attr("class", "curr");
        $("#div_more").click(function () {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.CarbonDetailAll + "?type=DC170208100002&t=" + Math.random();
        });
    }
    else {
        $("#li_out").attr("class", "curr");
        $("#div_more").click(function () {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.CarbonDetailAll + "?type=DC170208100003&t=" + Math.random();
        });
    }
});
var pageSize = 5;
var pageIndex = 0;
var detailType = "";
var Init = {
    api_input: { "operationType": "","operationTypeChild":"", "pageSize": pageSize, "pageIndex": pageIndex },
    GetCarbonDetail: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
            return;
        }
        User.GetInfo();
        Chart.api_input.operationType = Init.api_input.operationType;
        Chart.Load();
        //组织提交参数
        var s_api_input = JSON.stringify(Init.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "user_carbon_detail_time", "api_token": g_const_api_token.Wanted };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
            try {
                if (msg.resultCode == g_const_Success_Code) {
                    var htmlStr = "";
                    var direct = "+";
                    $.each(msg.list, function (i, n) {
                        htmlStr += "<li>";
                        switch (n.operationTypeChild) {
                            case "DC170208100010":
                                htmlStr += "<img src=\"img/menu08.png\">";
                                direct = "+";
                                break;
                            case "DC170208100009":
                                htmlStr += "<img src=\"img/mune07.png\">";
                                direct = "-";
                                break;
                            case "DC170208100004":
                                htmlStr += "<img src=\"img/menu08.png\">";
                                direct = "+";
                                break;
                            case "DC170208100008":
                                htmlStr += "<img src=\"img/menu09.png\">";
                                direct = "-";
                                break;
                            case "DC170208100007":
                                htmlStr += "<img src=\"img/menu10.png\">";
                                direct = "-";
                                break;
                            case "DC170208100006":
                                htmlStr += "<img src=\"img/mune04.png\">";
                                direct = "+";
                                break;
                        }
                        htmlStr += "<p class=\"mode\">" + n.operationTypeChildName + "</p>";
                        htmlStr += "<p class=\"time\">" + n.createTime + "</p>";
                        if (direct == "+") {
                            htmlStr += "<span class=\"co_red\">+" + n.carbonSum + "</span>";
                        }
                        else {
                            htmlStr += "<span class=\"co_green\">-" + n.carbonSum + "</span>";
                        }
                        
                        htmlStr += "</li>";
                    });
                    $("#ul_recordlist").html(htmlStr);
                }

            } catch (e) {

            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
}

var Chart = {
    api_input: { "operationType": "", "operationTypeChild": "", "pageSize": 20, "pageIndex": pageIndex },
    Load: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
            return;
        }
        User.GetInfo();
        //组织提交参数
        var s_api_input = JSON.stringify(Chart.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "user_carbon_type_detail", "api_token": g_const_api_token.Wanted };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
            try {
                if (msg.resultCode == g_const_Success_Code) {
                    var htmlStr = "";
                    var flow = [];
                    var startday = "";
                    var endday = "";
                    $.each(msg.list, function (i, n) {
                        flow.push(n.carbonSum);
                        if (i==0) {
                            startday = n.createTime;
                        }
                        if (i==msg.list.length-1) {
                            endday = n.createTime;
                        }
                    });
                    var data = [
                    {
                        name: '碳币',
                        value: flow,
                        color: '#ff3f10',
                        line_width: 1
                    }
                    ];
                    Chart.Set(data, startday, endday);
                }

            } catch (e) {

            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    Set: function (data, startday, endday) {
        var canvasH = $(".canvasDiv").width();
        var labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "21"]
        var chart = new iChart.LineBasic2D({
            render: 'canvasDiv',
            data: data,
            // title : '北京2012年平均温度情况',
            width: canvasH,//+100
            height: 260,
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
                line_color: '#62bce9'
            },
            sub_option: {
                label: true,
                hollow_inside: true,
                point_size: 6
            },
            coordinate: {
                height: '80%',
                background_color: null,
                grid_color: '#e5e5e5',//经纬线
                axis: {
                    color: '#fff',
                    width: [0, 0, 0, 0]//上下左右标线
                },
                grids: {
                    vertical: {
                        way: 'share_alike',
                        value: 10//经线条数
                    }
                },
                scale: [{//配置自定义值轴
                    position: 'left',//配置左值轴
                    start_scale: 0,//设置开始刻度为0
                    end_scale: 0,//设置结束刻度为26
                    scale_space: 0,//设置刻度间距
                    label: { color: '#a7a7a7', fontsize: 11 },//刻度值
                    scale_color: '#fff',
                    listeners: {//配置事件
                        parseText: function (t, x, y) {//设置解析值轴文本
                            return { text: t + "" }//左侧刻度单位
                        }
                    }
                }//,{
                    // position:'bottom',
                     //label : {color:'#333',font : '微软雅黑',fontsize:11},
                     //scale_enable : false,
                    //labels:labels
                //}]
                ]
                //labels:["1","2","3","4","5","6","7","8","9","10","11","21"]
            }
        });

        //利用自定义组件构造左侧说明文本
        chart.plugin(new iChart.Custom({
            drawFn: function () {
                //计算位置
                var coo = chart.getCoordinate(),
                    x = coo.get('originx'),
                    y = coo.get('originy'),
                    w = coo.width,
                    h = coo.height;
                //在左上侧的位置，渲染一个单位的文字
                chart.target.textAlign('start')
                .textBaseline('bottom')
                .textFont('600 11px 微软雅黑')
                .fillText('成交价/元', x - 20, y - 12, false, '#555555')
                .textBaseline('top')
                .fillText(endday, x + w - 35, y + h + 10, false, '#555555')
                .fillText(startday, x - 20, y + h + 10, false, '#555555');

            }
        }));
        chart.draw();
    }
}

var User = {
    GetInfo: function () {
        var request = $.ajax({
            url: g_APIUTL,
            cache: false,
            method: g_APIMethod,
            data: { "api_input": JSON.stringify({}), "api_target": "user_data", "api_token": g_const_api_token.Wanted },
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
            if (msg.resultCode == g_const_Success_Code) {
                $("#p_balance").html(msg.user.carbonMoney);
            }
        });
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
};