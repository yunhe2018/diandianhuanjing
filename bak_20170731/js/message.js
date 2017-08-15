$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
    //返回
    $("#btnBack").click(function () {
        window.location.href = g_const_PageURL.MyAccount + "?t=" + Math.random();
    });
    api_Request.pageIndex = 0;
    api_Request.GetList();

    $(window).on("scroll", function () {
        var oDeH = $("#imgod").offset().top;
        var scrollT = $(document).scrollTop();
        var clientH = $(window).height();
        var scrollB = scrollT + clientH;
        console.log((oDeH + 40) + "," + scrollT + "," + clientH);
        if ((oDeH + 40) <= scrollB) {
            api_Request.api_input.pageInde++;
            api_Request.GetList();
        }
    })
});
//{"resultCode":0,"repCount":2,"repList":[{"typeName":"系统消息","content":"系统消息：测试测试法卡斯加的咖啡开始就分手了看到飞机开始的附件是发动机看电视就发生的纠纷的","createTime":"2016-10-12","typeCode":"DC161012100002","code":"M161012100007","outerCode":"","isRead":0},{"typeName":"活动消息","content":"活动消息：是大家看法是开放式空间方式打开了房间速度快放假快乐圣诞节疯狂数据库的附件三季度","createTime":"2016-10-12","typeCode":"DC161012100003","code":"M161012100008","outerCode":"","isRead":0}]}
//我的订单列表
var api_Request = {
    pageIndex: 0,
    resultList:[],
    //加载多页
    GetList: function () {
        var obj_data = { "api_input": JSON.stringify({ "pageIndex": api_Request.pageIndex, "pageSize": "10" }), "api_target": "message_data", "api_token": g_const_api_token.Wanted };
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
                api_Request.resultList = msg.repList;
                api_Request.Load_Result();
                $("#p_listcount").html("共" + msg.repCount + "条消息");
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
    //加载多页
    Read: function (code) {
        var obj_data = { "api_input": JSON.stringify({ "code": code }), "api_target": "message_sel", "api_token": g_const_api_token.Wanted };
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
                api_Request.GetList();
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
    Load_Result: function () {

        var htmlStr = "";
        $.each(api_Request.resultList, function (i, n) {
            htmlStr += "<li><a class=\"clearfix\" href=\"javascript:;\">";
            htmlStr += "<div class=\"con\">";
            htmlStr += "<h4>" + n.typeName + "</h4>";
            htmlStr += "<p class=\"title02\">" + n.content + "</p></div>";
            if (n.isRead=="0") {
                htmlStr += "<span class=\"pay\"><i onclick=\"api_Request.Read('" + n.code + "')\">已读</i></span>";
            }
            htmlStr += "<span class=\"time\">" + n.createTime + "</span></a></li>";
        });
        $("#ul_msglist").html(htmlStr);

    },
};