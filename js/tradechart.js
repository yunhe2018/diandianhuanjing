$(document).ready(function () {
    $(".combinationWrap div").css({ "width": "100%", "height": "335px", "WebkitTransform": "scale(1,1)", "marginLeft": "0" });
    $(".combinationWrap canvas").css({ "width": "100%", "height": "100%" });
    pageIndex = 0;
    pageSize = 10;
    UseAppFangFa.CaoZuo("refresh", "", "true");
    $("#btnback").click(function () {
        window.location.replace(g_const_PageURL.TradeMain + "?t=" + Math.random());
    });
    $("#btnlist").click(function () {
        window.location.replace(g_const_PageURL.TradePrice + "?t=" + Math.random());
    });
    api_Request.month = 1;
    api_Request.GetList("0");
    FooterMenu.Set(1);
    $("#span_add").click(function () {
        pageIndex += 1;
        api_Request.GetList(api_Request.selectCityID);
    });
    $("#span_minus").click(function () {
        pageIndex -= 1;
        if (pageSize<0) {
            pageSize = 0;
        }
        api_Request.GetList(api_Request.selectCityID);
    });
    $("#ul_time li").on("click", function () {
        api_Request.month = $(this).attr('month');
        api_Request.GetCity();
        $(this).addClass("curr").siblings().removeClass("curr");

    });
});
var colorlist = ["ff3f10", "fece0a", "ff66fe", "9b6ff6", "26d18d", "07a1ff", "83ca40", "ffd900"];
var pageSize = 10;
var pageIndex = 0;
var selectCityID = '';
var api_Request = {
    selectCityID: '',
    month:1,
    GetList: function (cityid) {
        api_Request.selectCityID = cityid;
        $("#ul_city li").each(function (n) {
            $(this).attr("class", "");
        });
        $("#li_City_" + api_Request.selectCityID).addClass("curr");
        var s_api_input = JSON.stringify({ "month": api_Request.month });
        if (api_Request.selectCityID != '0') {
            s_api_input = JSON.stringify({ "cityId": cityid, "month": api_Request.month }); 
        }

        var obj_data = { "api_input": s_api_input, "api_target": "trade_deals_chart", "api_token": g_const_api_token.Unwanted };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
          //  msg = JSON.parse("{\"resultCode\":0,\"repCount\":6815,\"repList\":[{\"closePrice\":36,\"dealPrice\":36,\"cityId\":\"886d00c18d28401c85ac9979822abbd1\",\"dealAmount\":190120,\"cityName\":\"福建\",\"dealNum\":5248,\"openPrice\":36,\"lowPrice\":36,\"highPrice\":36,\"dealDate\":\"2017-03-09\"},{\"closePrice\":20,\"dealPrice\":20,\"cityId\":\"aae0171546b7de7e0146b7de7ec30000\",\"dealAmount\":200,\"cityName\":\"重庆\",\"dealNum\":10,\"openPrice\":20,\"lowPrice\":20,\"highPrice\":20,\"dealDate\":\"2017-03-09\"},{\"closePrice\":49,\"dealPrice\":49,\"cityId\":\"aae0171545a30b490145a30b490a0000\",\"dealAmount\":387957,\"cityName\":\"北京\",\"dealNum\":7920,\"openPrice\":49,\"lowPrice\":49,\"highPrice\":49,\"dealDate\":\"2017-03-09\"},{\"closePrice\":15,\"dealPrice\":15,\"cityId\":\"aae0171545a30b490145a30d53cf0002\",\"dealAmount\":99475,\"cityName\":\"广东\",\"dealNum\":6600,\"openPrice\":15,\"lowPrice\":15,\"highPrice\":15,\"dealDate\":\"2017-03-09\"},{\"closePrice\":17,\"dealPrice\":17,\"cityId\":\"aae0171545b0ad680145b0adec280002\",\"dealAmount\":15698,\"cityName\":\"湖北\",\"dealNum\":898,\"openPrice\":17,\"lowPrice\":17,\"highPrice\":17,\"dealDate\":\"2017-03-08\"},{\"closePrice\":15,\"dealPrice\":15,\"cityId\":\"aae0171545a30b490145a30d53cf0002\",\"dealAmount\":42972,\"cityName\":\"广东\",\"dealNum\":2866,\"openPrice\":15,\"lowPrice\":15,\"highPrice\":15,\"dealDate\":\"2017-03-08\"},{\"closePrice\":15,\"dealPrice\":15,\"cityId\":\"aae0171545b0ad680145b0ad68ee0000\",\"dealAmount\":0,\"cityName\":\"天津\",\"dealNum\":0,\"openPrice\":15,\"lowPrice\":15,\"highPrice\":15,\"dealDate\":\"2017-03-08\"},{\"closePrice\":37,\"dealPrice\":37,\"cityId\":\"886d00c18d28401c85ac9979822abbd1\",\"dealAmount\":231557,\"cityName\":\"福建\",\"dealNum\":6201,\"openPrice\":37,\"lowPrice\":37,\"highPrice\":37,\"dealDate\":\"2017-03-08\"},{\"closePrice\":18,\"dealPrice\":18,\"cityId\":\"aae0171546b7de7e0146b7de7ec30000\",\"dealAmount\":443,\"cityName\":\"重庆\",\"dealNum\":25,\"openPrice\":18,\"lowPrice\":18,\"highPrice\":18,\"dealDate\":\"2017-03-08\"},{\"closePrice\":133,\"dealPrice\":133,\"cityId\":\"aae0171545b0ad680145b0adbeaf0001\",\"dealAmount\":60,\"cityName\":\"深圳\",\"dealNum\":2,\"openPrice\":133,\"lowPrice\":133,\"highPrice\":133,\"dealDate\":\"2017-03-08\"}]}");
            if (msg.resultCode == g_const_Success_Code) {
                var data = [];
                var data1 = [{
                    name: '',
                    value: [],
                    color: '#34a1d9',
                    line_width: 2
                }];
                var leftMax = 0;
                var rightMax = 0;

                try {
                    var htmlMark = "";
                    var htmlStr = "<li class=\"curr\" onclick=\"api_Request.GetList('0')\" id=\"li_City_0\">全国</li>";
                    var flow = [];
                    var flowmarket = [];
                    var cityRatioflow = [];
                    var marketRatioflow = [];
                    var starttime = "";
                    var endtime = "";
                    var cityPrice = 0;
                    var cityRatio = 0.00;
                    var marketPrice = 0;
                    var marketRatio = 0.00;
                    $.each(msg.list, function (i, n) {

                        htmlMark += "<li class=\"co_" + colorlist[i] + "\"><span class=\"txt\">" + n.cityName + "</span></li>";
                        htmlStr += "<li onclick=\"api_Request.GetList('" + n.deals[0].cityId + "')\" id=\"li_City_" + n.deals[0].cityId + "\">" + n.cityName + "</li>";
                        flow = [];
                        starttime = "";
                        endtime = "";
                        $.each(n.deals, function (j, m) {
                            flow.push(m.dealPrice);
                            flowmarket.push(m.marketAvgPrice);
                            cityRatioflow.push(m.dealUpDownRatio);
                            marketRatioflow.push(m.marketAvgPriceUpDownRatio);
                            if (j==0) {
                                endtime = getFormatDate(m.dealDate, "YY/MM/dd");
                                startPrice = m.dealPrice;
                            }
                            else if (j == n.deals.length-1) {
                                starttime = getFormatDate(m.dealDate, "YY/MM/dd");
                                cityPrice = m.dealPrice;
                                cityRatio = m.dealUpDownRatio;
                                marketPrice = m.marketAvgPrice;
                                marketRatio = m.marketAvgPriceUpDownRatio;
                            }
                        });
                        data.push({ name: n.cityName, value: flow, color: "#" + colorlist[i], line_width: 1 });
                    });
                    if (api_Request.selectCityID == '0') {
                        $("#ul_city").html(htmlStr);
                        //上导航横滑
                        var oULWidth = 0;
                        var oLength = $(".switch_nav li").length;
                        for (var i = 0; i < oLength; i++) {
                            oULWidth += $(".switch_nav li").eq(i).outerWidth() + 22;
                        }
                        $(".switch_nav ul").width(oULWidth);

                        //..........
                        var myscroll = new IScroll("#switch_nav", {
                            scrollX: true, scrollY: false, mouseWheel: true, preventDefault: false
                        });
                        $(".switch_nav li").click(function () {
                            $(this).addClass("curr").siblings().removeClass("curr");
                            var win_width = $(window).width() * 0.5;
                            var w_left = win_width - $(this).position().left - 30;
                            //win_width<$(this).position().left<$("#switch_nav").width()-win_width
                            if ($(".switch_nav ul").width() > $(".switch_nav").width()) {
                                if ($(this).position().left < win_width) {
                                    myscroll.scrollTo(0, 0, 1000, IScroll.utils.ease.elastic);
                                } else if ($(this).position().left > win_width && $(this).position().left < $("#switch_nav ul").width() - win_width - 30) {
                                    myscroll.scrollTo(w_left, 0, 1000, IScroll.utils.ease.elastic);
                                } else {
                                    myscroll.scrollTo($(window).width() - $("#switch_nav ul").width(), 0, 1000, IScroll.utils.ease.elastic);
                                }
                            }
                        })
                        $("#div_city").hide();
                        $("#div_all").show();
                    }
                    else {
                        data.push({ name: "市场均价", value: flowmarket, color: '#26d18d', line_width: 1 });
                        $("#span_city_1").html(msg.list[0].cityName);
                        $("#span_city_2").html(msg.list[0].cityName);

                        $("#span_city_price").html(cityPrice);
                        $("#span_city_ratio").html(cityRatio + "%");
                        $("#span_market_price").html(marketPrice);
                        $("#span_market_ratio").html(marketRatio + "%");

                        $("#div_city").show();
                        $("#div_all").hide();
                    }
                    $("#ul_city_mark").html(htmlMark);
                    api_Request.GetLineCity(data, starttime, endtime, cityRatioflow, marketRatioflow);
                } catch (e) {

                }
            }
            else {
                ShowMesaage(g_const_API_Message["7001"]);
            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    GetCity: function () {
        var s_api_input = JSON.stringify({});
        var obj_data = { "api_input": s_api_input, "api_target": "trade_city", "api_token": g_const_api_token.Unwanted };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
         //   msg = JSON.parse("{\"citys\": [{\"cityName\": \"上海\",\"cityId\": \"aae0171545a30b490145a30bb34e0001\"},{\"cityName\": \"福建\",\"cityId\": \"886d00c18d28401c85ac9979822abbd1\"},{\"cityName\": \"广东\",\"cityId\": \"aae0171545a30b490145a30d53cf0002\"},{\"cityName\": \"天津\",\"cityId\": \"aae0171545b0ad680145b0ad68ee0000\"},{\"cityName\": \"重庆\",\"cityId\": \"aae0171546b7de7e0146b7de7ec30000\"},{\"cityName\": \"湖北\",\"cityId\": \"aae0171545b0ad680145b0adec280002\"},{\"cityName\": \"北京\",\"cityId\": \"aae0171545a30b490145a30b490a0000\"},{\"cityName\": \"深圳\",\"cityId\": \"aae0171545b0ad680145b0adbeaf0001\"}]}");
            try {
                var htmlStr = "";
                
                htmlStr += "<li class=\"curr\" onclick=\"api_Request.GetList('0')\" id=\"li_City_0\">全国</li>";
                $.each(msg.citys, function (i, n) {
                    htmlStr += "<li onclick=\"api_Request.GetList('" + n.cityId + "')\" id=\"li_City_" + n.cityId + "\">" + n.cityName + "</li>";
                    
                });
                
                $("#ul_city").html(htmlStr);
                
                api_Request.GetList("0");
                //上导航横滑
                var oULWidth = 0;
                var oLength = $(".switch_nav li").length;
                for (var i = 0; i < oLength; i++) {
                    oULWidth += $(".switch_nav li").eq(i).outerWidth() + 22;
                }
                $(".switch_nav ul").width(oULWidth);

                //..........
                var myscroll = new IScroll("#switch_nav", {
                    scrollX: true, scrollY: false, mouseWheel: true, preventDefault: false
                });
            } catch (e) {

            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    GetLineCity: function (data, starttime, endtime, cityRatioflow, marketRatioflow) {
        var canvasH = $(".canvasDiv").width();
        //alert(canvasH);
        //var flow01 = [2, 4, 12, 3, 9, 4, 18, 12, 4, 1, 16, 0, 2, 15, 4, 22, 3, 0];
        //var flow02 = [18, 15, 20, 17, 20, 14, 20, 18, 24, 47, 19, 20, 20, 28, 24, 17, 19, 20];
        //var flow03 = [34, 29, 52, 27, 30, 34, 30, 68, 34, 27, 29, 30, 30, 28, 34, 27, 79, 30];
        //var flow04 = [46, 42, 42, 47, 40, 44, 40, 48, 64, 47, 49, 42, 40, 48, 34, 47, 39, 40];
        //var flow05 = [12, 9, 18, 7, 9, 12, 10, 14, 8, 7, 13, 10, 8, 8, 6, 7, 9, 10];
        //var flow06 = [72, 79, 48, 77, 79, 52, 70, 74, 78, 47, 73, 70, 78, 87, 46, 77, 79, 71];
        //for(var i=0;i<12;i++){//显示数量自定义
        //    flow.push(Math.floor(Math.random()*(3000+((i%12)*5)))+10);
        //}
        //var data = [
        //            {
        //                name: '步数',
        //                value: flow01,//[1,1652,20,26,30,132,29,222,0,0,132,29],
        //                color: '#ff3f10',
        //                line_width: 1
        //            },
        //            {
        //                name: '步数',
        //                value: flow02,//[1,1652,20,26,30,132,29,222,0,0,132,29],
        //                color: '#fece0a',
        //                line_width: 1
        //            },
        //            {
        //                name: '步数',
        //                value: flow03,//[1,1652,20,26,30,132,29,222,0,0,132,29],
        //                color: '#ff66fe',
        //                line_width: 1
        //            },
        //            {
        //                name: '步数',
        //                value: flow04,//[1,1652,20,26,30,132,29,222,0,0,132,29],
        //                color: '#9b6ff6',
        //                line_width: 1
        //            },
        //            {
        //                name: '步数',
        //                value: flow05,//[1,1652,20,26,30,132,29,222,0,0,132,29],
        //                color: '#26d18d',
        //                line_width: 1
        //            },
        //            {
        //                name: '步数',
        //                value: flow06,//[1,1652,20,26,30,132,29,222,0,0,132,29],
        //                color: '#07a1ff',
        //                line_width: 1
        //            }
        //];
        var labels = []
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
                point_size: 0,
                label: false,
                listeners: {
                    click: function (r, e, m) {
                        if (api_Request.selectCityID != '0') {
                            if (m.name == "市场均价") {
                                $("#span_market_price").html(m.value);
                                $("#span_market_ratio").html(marketRatioflow[m.i] + "%");
                            }
                            else {
                                $("#span_city_price").html(m.value);
                                $("#span_city_ratio").html(cityRatioflow[m.i] + "%");
                            }
                        }
                        //Step.Set_Step((r.get('value') / g_const_Step_distance), r.get('name'));
                    }
                }
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
            },
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
                .fillText(endtime, x + w - 35, y + h + 10, false, '#555555')
                .fillText(starttime, x - 20, y + h + 10, false, '#555555');

            }
        }));
        chart.draw();
    }
}