$(document).ready(function () {
    FooterMenu.Set(2);
    UserInfo.Check(Step.GetList);
    $("#li_MyCarbon").click(function () {
        PageUrlConfig.SetUrl();
        window.location.replace(g_const_PageURL.CarbonDetail + "?type=DC170208100004&t=" + Math.random());
    });
});

var Step = {
    api_target: "step_data",
    api_input: { "equipmentCode": "" },
    //加载多页
    GetList: function () {
        //判断是否登录
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
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
    //加载单页
    //接口返回成功后的处理
    Load_Result: function (resultlist) {
        var data = [];
        var date = '';
        var max = 0;
        var todayStep = 0;
        $.each(resultlist, function (i, n) {
            data.push({ name: getFormatDate(n.createDate, "MM.dd"), value: ((n.step * g_const_Step_distance).toFixed(2)), color: '#9bd9ff' });
            date = getFormatDate(n.createDate, "MM.dd");
            if (max < (n.step * g_const_Step_distance).toFixed(2)) {
                max = (n.step * g_const_Step_distance).toFixed(2);
            }
            todayStep = n.step;
        });
        Step.Load_Detail(data, max);
        Step.Set_Step(todayStep, date);
    },
    Load_Detail: function (data, max) {
        var canvasH = $(".canvasDiv").width();
        //var data = [
        //            { name: '05/27', value: 26, color: '#9bd9ff' },
        //            { name: '28', value: 17, color: '#9bd9ff' },
        //            { name: '29', value: 14, color: '#9bd9ff' },
        //            { name: '30', value: 23, color: '#9bd9ff' },
        //            { name: '31', value: 18, color: '#9bd9ff' },
        //            { name: '01', value: 25, color: '#9bd9ff' },
        //            { name: '今天', value: 16, color: '#04a1ff' }
        //];

        new iChart.Column2D({
            render: 'canvasDiv',
            data: data,
            //labels:["05/27","28","29","30","31","今天"],
            showpercent: false,//总数的百分比
            decimalsnum: 3,//小数点几位
            width: canvasH,
            height: 260,
            //padding:'0 0',
            sub_option: {
                label: { fontsize: 12, fontweight: 200 },//数值color:'#fff',设置为相当于不显示
                border: false
            },
            label: { color: '#a7a7a7', font: '微软雅黑', fontsize: 11, fontweight: 400 },////底部数值设置
            coordinate: {
                offsetx: 10,
                // width:320,
                // height:160,
                grid_color: '#e5e5e5',
                axis: {
                    color: '#4e5464',
                    width: [0, 0, 0, 0]
                },
                scale: [{
                    position: 'left',
                    start_scale: 0,
                    end_scale: max*1.05,
                    scale_space: max*0.25,
                    label: { color: '#a7a7a7', fontsize: 11 },//刻度值
                    scale_color: '#fff',
                    listeners: {
                        parseText: function (t, x, y) {
                            return { text: t + "km" }
                        }
                    }
                }]
            },
            sub_option: {
                listeners: {
                    click: function (r, e, m) {
                        Step.Set_Step((r.get('value') / g_const_Step_distance), r.get('name'));
                    }
                }
            }
        }).draw();
    },
    Set_Step: function (step, date) {
        $("#span_date").html(date);
        $("#span_step").html(step);
        $("#span_distance").html((step * g_const_Step_distance).toFixed(2));
        $("#span_co2").html(step * 0.008);
        $("#span_carbon").html(step * 0.00008);
    }
};