$(document).ready(function () {
    $(".combinationWrap div").css({  "height": "335px", "WebkitTransform": "scale(1,1)", "marginLeft": "0" });//"width": "100%",
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
    api_Request.GetList('');
    
});
var pageSize = 10;
var pageIndex = 0;
var api_Request = {
    GetList: function (cityid, obj) {
        $("#ul_city li").each(function (n) {
            $(this).attr("class", "");
        });
        $(obj).addClass("curr");
        var s_api_input = JSON.stringify({ "cityid": cityid, "pageSize": pageSize, "pageIndex": pageIndex });
        var obj_data = { "api_input": s_api_input, "api_target": "1025", "api_token": g_const_api_token.Unwanted };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
            msg = JSON.parse("{\"resultCode\":0,\"repCount\":6815,\"repList\":[{\"closePrice\":36,\"dealPrice\":36,\"cityId\":\"886d00c18d28401c85ac9979822abbd1\",\"dealAmount\":190120,\"cityName\":\"福建\",\"dealNum\":5248,\"openPrice\":36,\"lowPrice\":36,\"highPrice\":36,\"dealDate\":\"2017-03-09\"},{\"closePrice\":20,\"dealPrice\":20,\"cityId\":\"aae0171546b7de7e0146b7de7ec30000\",\"dealAmount\":200,\"cityName\":\"重庆\",\"dealNum\":10,\"openPrice\":20,\"lowPrice\":20,\"highPrice\":20,\"dealDate\":\"2017-03-09\"},{\"closePrice\":49,\"dealPrice\":49,\"cityId\":\"aae0171545a30b490145a30b490a0000\",\"dealAmount\":387957,\"cityName\":\"北京\",\"dealNum\":7920,\"openPrice\":49,\"lowPrice\":49,\"highPrice\":49,\"dealDate\":\"2017-03-09\"},{\"closePrice\":15,\"dealPrice\":15,\"cityId\":\"aae0171545a30b490145a30d53cf0002\",\"dealAmount\":99475,\"cityName\":\"广东\",\"dealNum\":6600,\"openPrice\":15,\"lowPrice\":15,\"highPrice\":15,\"dealDate\":\"2017-03-09\"},{\"closePrice\":17,\"dealPrice\":17,\"cityId\":\"aae0171545b0ad680145b0adec280002\",\"dealAmount\":15698,\"cityName\":\"湖北\",\"dealNum\":898,\"openPrice\":17,\"lowPrice\":17,\"highPrice\":17,\"dealDate\":\"2017-03-08\"},{\"closePrice\":15,\"dealPrice\":15,\"cityId\":\"aae0171545a30b490145a30d53cf0002\",\"dealAmount\":42972,\"cityName\":\"广东\",\"dealNum\":2866,\"openPrice\":15,\"lowPrice\":15,\"highPrice\":15,\"dealDate\":\"2017-03-08\"},{\"closePrice\":15,\"dealPrice\":15,\"cityId\":\"aae0171545b0ad680145b0ad68ee0000\",\"dealAmount\":0,\"cityName\":\"天津\",\"dealNum\":0,\"openPrice\":15,\"lowPrice\":15,\"highPrice\":15,\"dealDate\":\"2017-03-08\"},{\"closePrice\":37,\"dealPrice\":37,\"cityId\":\"886d00c18d28401c85ac9979822abbd1\",\"dealAmount\":231557,\"cityName\":\"福建\",\"dealNum\":6201,\"openPrice\":37,\"lowPrice\":37,\"highPrice\":37,\"dealDate\":\"2017-03-08\"},{\"closePrice\":18,\"dealPrice\":18,\"cityId\":\"aae0171546b7de7e0146b7de7ec30000\",\"dealAmount\":443,\"cityName\":\"重庆\",\"dealNum\":25,\"openPrice\":18,\"lowPrice\":18,\"highPrice\":18,\"dealDate\":\"2017-03-08\"},{\"closePrice\":133,\"dealPrice\":133,\"cityId\":\"aae0171545b0ad680145b0adbeaf0001\",\"dealAmount\":60,\"cityName\":\"深圳\",\"dealNum\":2,\"openPrice\":133,\"lowPrice\":133,\"highPrice\":133,\"dealDate\":\"2017-03-08\"}]}");
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
                    var data = [
                           { name: 'JUL\n0000', value: 10, color: '#c52120' },
                           { name: 'AUG\n2011', value: 12, color: '#c52120' },
                           { name: 'SEP\n2011', value: 2, color: '#c52120' },
                           { name: 'OCT\n2011', value: 10, color: '#c52120' },
                           { name: 'NOV\n2011', value: 4.8, color: '#c52120' },
                           { name: 'DEC\n2011', value: 6, color: '#c52120' },
                           { name: 'JAN\n2012', value: 11.8, color: '#c52120' },
                           { name: 'JUL\n2011', value: 10, color: '#c52120' },
                           { name: 'AUG\n2011', value: 1.2, color: '#c52120' },
                           { name: 'SEP\n2011', value: 10, color: '#c52120' },
                           { name: 'JUL\n2011', value: 10, color: '#c52120' },
                           { name: 'AUG\n2011', value: 12, color: '#c52120' },
                           { name: 'SEP\n2011', value: 10, color: '#c52120' },
                           { name: 'JAN\n2012', value: 11.8, color: '#c52120' },
                           { name: 'JUL\n2011', value: 10, color: '#c52120' },
                           { name: 'AUG\n2011', value: 12, color: '#c52120' },
                           { name: 'SEP\n2011', value: 10, color: '#c52120' },
                           { name: 'JUL\n2011', value: 10, color: '#c52120' },
                           { name: 'AUG\n2011', value: 12, color: '#c52120' },
                           { name: 'SEP\n2011', value: 10, color: '#c52120' },
                           { name: 'OCT\n9999', value: 12, color: '#c52120' }
                       ];
                    var data1 = [
                                   {
                                       name: '',
                                       value: [16, 20, 52, 92, 88, 78, 96, 20, 52,96, 20, 52, 92,96, 20, 52,96, 20, 52, 92, 88],
                                       color: '#34a1d9',
                                       line_width: 2
                                   }
                    ];
                    var htmlStr = "";
                    var elemWidth = $(window).width()/7;
                    var oWidth = elemWidth*(data.length);
                    $.each(msg.repList, function (i, n) {
                        //data.push({ name: n.cityName + '\n' + getFormatDate(n.dealDate, "MM.dd") + '\n' + n.dealNum, value: Math.round(n.dealNum/1000), color: '#c52120' });
                        //data.push({ name: n.cityName + '\n' + n.dealAmount, value: n.dealAmount, color: '#c52120' })
                        //data1[0].value.push(n.dealPrice);
                        htmlStr += "<li>" + n.dealPrice + "</li>";
                        if (leftMax < n.dealNum) {
                            leftMax = n.dealNum
                        }
                        if (rightMax < n.dealPrice) {
                            rightMax = n.dealPrice
                        }
                        if (i > 5) {
                            return false;
                        }
                    });
                    $("#ul_price").html(htmlStr);
                    api_Request.GetLine(data, data1, leftMax, rightMax,oWidth);
                    api_Request.chatScroll(Math.ceil(data.length/7));
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
        var obj_data = { "api_input": s_api_input, "api_target": "1025", "api_token": g_const_api_token.Unwanted };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });
        request.done(function (msg) {
            msg = JSON.parse("{\"citys\": [{\"cityName\": \"上海\",\"cityId\": \"aae0171545a30b490145a30bb34e0001\"},{\"cityName\": \"福建\",\"cityId\": \"886d00c18d28401c85ac9979822abbd1\"},{\"cityName\": \"广东\",\"cityId\": \"aae0171545a30b490145a30d53cf0002\"},{\"cityName\": \"天津\",\"cityId\": \"aae0171545b0ad680145b0ad68ee0000\"},{\"cityName\": \"重庆\",\"cityId\": \"aae0171546b7de7e0146b7de7ec30000\"},{\"cityName\": \"湖北\",\"cityId\": \"aae0171545b0ad680145b0adec280002\"},{\"cityName\": \"北京\",\"cityId\": \"aae0171545a30b490145a30b490a0000\"},{\"cityName\": \"深圳\",\"cityId\": \"aae0171545b0ad680145b0adbeaf0001\"}]}");
            try {
                var htmlStr = "";
                htmlStr += "<li class=\"curr\" onclick=\"api_Request.GetList('',this)\">全国</li>";
                $.each(msg.citys, function (i, n) {
                    htmlStr += "<li onclick=\"api_Request.GetList('" + n.cityId + "',this)\">" + n.cityName + "</li>";
                });
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
    GetLine: function (data, data1, leftMax, rightMax,oWidth) {


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
            width: oWidth,//表格宽度
            height: 335,
            padding: 0,
            label: {
                fontsize: 11,
                fontweight: 200,
                color: '#333'
            },
            shadow: true,
            shadow_blur: 2,
            shadow_color: '#aaaaaa',
            shadow_offsetx: 1,
            shadow_offsety: 0,
            background_color: '#fff',
            column_width: 62,
            sub_option: {
                label: false,
                border: {
                    width: 2,
                    radius: '5 5 0 0',//上圆角设置
                    color: '#ffffff'
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
                background_color: null,
                grid_color: '#c0c0c0',
                width: 680,
                height: 220,
                axis: {
                    color: '#c0d0e0',
                    width: [0, 0, 1, 0]
                },
                scale: [{
                    position: 'left',
                    start_scale: 0,
                    end_scale: 120,
                    scale_space: 20,
                    scale_enable: false,
                    label: {
                        fontsize: 11,
                        fontweight: 600,
                        color: '#f90'
                    }
                }, {
                    position: 'right',
                    start_scale: 0,
                    scale_space: 20,
                    end_scale: 120,
                    scale_enable: false,
                    scaleAlign: 'right',
                    label: {
                        fontsize: 11,
                        fontweight: 600,
                        color: '#ffffff'
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
                label: false,
                point_size: 9
            },
            coordinate: chart.coo//共用坐标系
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
    },
    chatScroll:function(pageNum){
        var iNow = 0;
        var x =0;
        //document.addEventListener('DOMContentLoaded', function (){
            var oDiv=$("#combinationWrap>div")[0];
            oDiv.addEventListener('touchstart', function (ev){
                var disX=ev.targetTouches[0].pageX;
                var downX=ev.targetTouches[0].pageX-oDiv.offsetLeft;
                function move(ev)
                {   
                    x = ev.targetTouches[0].pageX-disX;
                    //oDiv.style.left=x+'px';
                }
                function end(ev)
                {
                    oDiv.removeEventListener('touchmove', move, false);
                    oDiv.removeEventListener('touchend', end, false);
                    if(Math.abs(x)>30){
                        //走
                        if(x<0){
                            //如果x是负数，往左走
                            iNow--;
                            if(iNow<1-pageNum){
                                iNow=1-pageNum;
                            }
                        }else{
                            //否则往右走
                            iNow++;
                            if(iNow>0){
                                iNow=0;
                            }
                        }
                    }
                    console.log(pageNum,x,iNow);
                    //$(oDiv).css("left",$(window).width()*iNow+"px");//$(window).width()*iNow;
                    //oDiv.style.WebkitTransition='0.2s all ease';
                    //oDiv.style.WebkitTransform='translateX('+$(window).width()*iNow+'px)';
                    $(oDiv).animate({
                        "left":$(window).width()*iNow+'px'
                    },200)
                }
                oDiv.addEventListener('touchmove', move, false);
                oDiv.addEventListener('touchend', end, false);
                
                ev.preventDefault(); 
            }, false);
        //});
    }
}