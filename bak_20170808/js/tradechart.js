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
    api_Request.GetCity();
    $("#span_add").click(function () {
        pageIndex += 1;
        api_Request.GetList(selectCityID);
    });
    $("#span_minus").click(function () {
        pageIndex -= 1;
        if (pageSize<0) {
            pageSize = 0;
        }
        api_Request.GetList(selectCityID);
    });
});
var pageSize = 10;
var pageIndex = 0;
var selectCityID = '';
var api_Request = {
    GetList: function (cityid, obj) {
        selectCityID = cityid
        if (obj) {
            $("#ul_city li").each(function (n) {
                $(this).attr("class", "");
            });
            $(obj).addClass("curr");
        }
        var s_api_input = JSON.stringify({ "pageSize": pageSize, "pageIndex": pageIndex });
        if (selectCityID != '') {
            s_api_input = JSON.stringify({ "cityId": cityid, "pageSize": pageSize, "pageIndex": pageIndex });
        }
        var obj_data = { "api_input": s_api_input, "api_target": "trade_deals", "api_token": g_const_api_token.Unwanted };
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
                    //var data = [
                    //        { name: 'JUL\n2011', value: 1000, color: '#c52120' },
                    //        { name: 'AUG\n2011', value: 1.2, color: '#c52120' },
                    //        { name: 'SEP\n2011', value: 2, color: '#c52120' },
                    //        { name: 'OCT\n2011', value: 3.2, color: '#c52120' },
                    //        { name: 'NOV\n2011', value: 4.8, color: '#c52120' },
                    //        { name: 'DEC\n2011', value: 7.8, color: '#c52120' },
                    //        { name: 'JAN\n2012', value: 11.8, color: '#c52120' }
                    //    ];
                    //var data1 = [
                    //                {
                    //                    name: '',
                    //                    value: [16, 20, 52, 92, 88, 78, 96],
                    //                    color: '#34a1d9',
                    //                    line_width: 2
                    //                }
                    //];
                    var htmlStr = "";
                    $.each(msg.repList, function (i, n) {
                        data.push({ name: n.cityName + '\n' + getFormatDate(n.dealDate, "Md"), value: (n.dealNum / 1000).toFixed(3), color: '#c52120' });
                        //data.push({ name: n.cityName + '\n' + n.dealAmount, value: n.dealAmount, color: '#c52120' })
                        data1[0].value.push(n.dealPrice);
                        htmlStr += "<li>" + n.dealPrice + "</li>";
                        if (leftMax < n.dealNum) {
                            leftMax = n.dealNum
                        }
                        if (rightMax < n.dealPrice) {
                            rightMax = n.dealPrice
                        }
                    });
                    $("#ul_price").html(htmlStr);
                    api_Request.GetLine(data, data1, leftMax, rightMax);
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
                var selectid = "";
                $.each(msg.citys, function (i, n) {
                    if (i==0) {
                        selectid = n.cityId;
                    }
                    htmlStr += "<li onclick=\"api_Request.GetList('" + n.cityId + "',this)\">" + n.cityName + "</li>";
                });
                api_Request.GetList(selectid);
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
            } catch (e) {

            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    GetLine: function (data, data1, leftMax, rightMax) {


        var chart = new iChart.Column2D({
            render: 'combinationWrap',
            data: data,
            // title:{
            //     text:'The Rise of Pinterest',
            //     color:'#4572a7',
            //     textAlign:'left',
            //     padding:'0 40',
            //     border:{
            //         enable:true,
            //         width:[0,0,4,0],
            //         color:'#4572a7'
            //     },
            //     height:40
            // },
            // footnote : {
            //     text : 'source:comScore',
            //     height:30,
            //     color:'#c52120',
            //     fontweight : 600,
            //     padding : '0 40'
            // },
            offsetx: 0,
            width: $(window).width() * 1,
            height: 335,
            padding: 0,
            label: {
                fontsize: 11,
                fontweight: 200,
                color: '#333'
            },
            shadow: false,
            shadow_blur: 2,
            shadow_color: '#aaaaaa',
            shadow_offsetx: 1,
            shadow_offsety: 0,
            background_color: '#fff',
            column_width: 62,
            sub_option: {
                //label: false,
                border: {
                    width: 2,
                    radius: '5 5 0 0',//上圆角设置
                    color: '#ffffff'
                },
                listeners: {
                    parseText: function (r, t) {
                        //自定义柱形图上方label的格式。
                        return t * 1000;//℃
                    }
                }
            },
            //coordinate: {
            //    background_color: null,
            //    grid_color: '#c0c0c0',
            //    width: 680,
            //    height: 220,
            //    axis: {
            //        color: '#c0d0e0',
            //        width: [0, 0, 1, 0]
            //    },
            //    scale: [{
            //        position: 'left',
            //        start_scale: 0,
            //        end_scale: rightMax/100,
            //        scale_space: Math.round(rightMax / 600),
            //        scale_enable: false,
            //        label: {
            //            fontsize: 11,
            //            fontweight: 600,
            //            color: '#666666'
            //        }
            //    }, {
            //        position: 'right',
            //        start_scale: 0,
            //        scale_space: Math.round(rightMax / 6),
            //        end_scale: rightMax,
            //        scale_enable: false,
            //        scaleAlign: 'right',
            //        label: {
            //            fontsize: 11,
            //            fontweight: 600,
            //            color: '#666666'
            //        }
            //    }]
            //}
            coordinate: {
                background_color: '#000000',
                grid_color: '#000000',
                width: 680,
                height: 220,
                axis: {
                    color: '#c0d0e0',
                    width: [0, 0, 1, 0]
                },
                scale: [{
                    position: 'left',
                    start_scale: 0,
                    end_scale: 18,
                    scale_space: 3,
                    scale_enable: false,
                    label: {
                        fontsize: 11,
                        fontweight: 600,
                        color: '#666666'
                    }
                }, {
                    position: 'right',
                    start_scale: 0,
                    scale_space: 30,
                    end_scale: 180,
                    scale_enable: false,
                    scaleAlign: 'right',
                    label: {
                        fontsize: 11,
                        fontweight: 600,
                        color: '#666666'
                    }
                }]
            }
        });
        //构造折线图
        var line = new iChart.LineBasic2D({
            z_index: 1000,
            data: data1,
            label: {
                color: '#4c4f48'
            },
            point_space: chart.get('column_width') + chart.get('column_space'),
            scaleAlign: 'right',
            sub_option: {
                //label: false,
                point_size: 9,
                //label: {
                //    fontunit: 'px',//自定义em单位    rem  px
                //    fontsize: 24,  //chartfontsize   24
                //    color: '#000000',
                //    fontweight: 100
                //},
                listeners: {
                    parseText: function (r, t) {
                        //自定义柱形图上方label的格式。
                        return t;//℃
                    }
                }
            },
            coordinate: chart.coo//共用坐标系
            //coordinate: {
            //    background_color: null,
            //    grid_color: '#c0c0c0',
            //    width: 680,
            //    height: 220,
            //    axis: {
            //        color: '#c0d0e0',
            //        width: [0, 0, 1, 0]
            //    },
            //    scale: [{
            //        position: 'left',
            //        start_scale: 0,
            //        end_scale: 12,
            //        scale_space: 2,
            //        scale_enable: false,
            //        label: {
            //            fontsize: 11,
            //            fontweight: 600,
            //            color: '#666666'
            //        }
            //    }, {
            //        position: 'right',
            //        start_scale: 0,
            //        scale_space: 10,
            //        end_scale: 60,
            //        scale_enable: false,
            //        scaleAlign: 'right',
            //        label: {
            //            fontsize: 11,
            //            fontweight: 600,
            //            color: '#666666'
            //        }
            //    }]
            //}
        });

        chart.plugin(line);


        //利用自定义组件构造左侧说明文本
        // chart.plugin(new iChart.Custom({
        //         drawFn:function(){
        //             //计算位置
        //             var coo = chart.getCoordinate(),
        //                 x = coo.get('originx'),
        //                 y = coo.get('originy');
        //             //在左上侧的位置，渲染一个单位的文字
        //             chart.target.textAlign('start')
        //             .textBaseline('bottom')
        //             .textFont('600 16px Verdana')
        //             .fillText('U.S UNIQUE VISITORS',x-20,y-20,false,'#c52120')
        //             .textFont('600 11px Verdana')
        //             .fillText('in millions',x-20,y-10,false,'#c52120');

        //             //在右上侧的位置，渲染一个单位的文字
        //             chart.target.textAlign('end')
        //             .textBaseline('bottom')
        //             .textFont('600 16px Verdana')
        //             .fillText('AVERAGE MINUTES PRE VISITOR',x+20+coo.width,y-20,false,'#34a1d9')
        //             .textFont('600 11px Verdana')
        //             .fillText('in thousands',x+20+coo.width,y-10,false,'#34a1d9');

        //         }
        // }));
        chart.draw();
    }
}