$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "true");
    $("#hid_uid").val(GetQueryString("uid"));
    //返回
    $("#btnBack").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
    });
    if (GetQueryString("errorMsg")!="") {
        ShowMesaage(decodeURIComponent(GetQueryString("errorMsg")));
    }
    orderStatus = GetQueryString("order_status");
    switch (orderStatus) {
        case "0":
            $("#span_status").html("待付款");
            break;
        case "2":
            $("#span_status").html("下载报告");
            break;
        default:
            $("#span_status").html("全部订单");
            break;
    }
    pageTime = 1;
    pageIndex = 0;
    pageSize = 10
    UserInfo.Check(Order.GetList);
     //Order.GetList();

    $(window).on("scroll", function () {
        var oDeH = $("#p_listcount").offset().top;
        var scrollT = $(document).scrollTop();
        var clientH = $(window).height();
        var scrollB = scrollT + clientH;
        console.log((oDeH + 40) + "," + scrollT + "," + clientH);
        if ((oDeH + 40) <= scrollB && maxOrderCount > pageSize) {
            pageSize += 10;
            Order.GetList();
        }
    })
});
var pageSize = 10;
var pageTime = 1;
var pageIndex = 0;
var orderStatus = 0;
var maxOrderCount = 0;
//我的订单列表
var Order = {
    api_target: "order_data",
    api_input: { "pageSize": "", "pageIndex": "", "status": "" },
    //加载多页
    GetList: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            var clientType = GetClientType();
            switch (clientType) {
                case 1:
                case 4:
                    PageUrlConfig.SetUrl();
                    window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
                    return;
                case 2:
                case 3:
                    AppLoginYYG.GetInfo(Order.GetList);
                    return;
            }

        }
        Order.api_input.pageSize = pageSize;
        Order.api_input.pageIndex = pageIndex;
        Order.api_input.status = orderStatus;
        //组织提交参数
        var s_api_input = JSON.stringify(Order.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": Order.api_target, "api_token": g_const_api_token.Wanted };
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
                Order.Load_Result(msg.repList);
                $("#p_listcount").html("共" + msg.repCount + "份报告");
                maxOrderCount = msg.repCount;
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
    Load_Result: function (resultlist) {

        var htmlStr = "";
        $.each(resultlist, function (i, n) {

            htmlStr += "<li><a class=\"clearfix\" href=\"javascript:;\">";
            htmlStr += "<div class=\"con\">";
            htmlStr += "<h4>" + n.title + "</h4>";
            htmlStr += "<p class=\"title02\">环境报告等级 " + n.levelName + "</p>";
            htmlStr += "<div class=\"price02\">¥" + n.payPrice + "</div></div>";
            htmlStr += Order.GetDiv(n.status, n.code, n.payCode, n.path);
            htmlStr += "<span class=\"waitPay\">" + Order.GetStatus(n.status) + "</span>";
          //  htmlStr += "<span class=\"orderstate_complet\"></span></a></li>";


            //htmlStr += "<li>";
            //htmlStr += "<div class=\"daifukuan_jieshaoBg clearfix\">";
            //htmlStr += "<div class=\"daifukuan_jieshao\">";
            //htmlStr += "<h3>" + n.title + "</h3>";
            //htmlStr += "<p>环境报告等级 <span>" + n.levelName + "</span></p>";
            //htmlStr += "<span>¥" + n.payPrice + "</span>";
            //htmlStr += "</div>";
            //htmlStr += "<div class=\"daifukuan_dengdaifukuan\">" + Order.GetStatus(n.status) + "</div>";
            //htmlStr += "</div>";
            
            //htmlStr += "<li>";
        });
        $("#ul_orderlist").html(htmlStr);

    },
    GetStatus: function (orderStatus) {
        var statusName = "";
        switch (orderStatus) {
            case 0:
                statusName = "等待付款";
                break;
            case 1:
                statusName = "未下载";
                break;
            case 2:
                statusName = "已下载";
                break;
            case 3:
                statusName = "已取消";
                break;
            default:

                break;
        }
        return statusName;
    },
    GetDiv: function (orderStatus, ordercode, payCode, path) {
        var statusName = "";
        switch (orderStatus) {
            case 0:

                statusName = "<span class=\"pay\"><i onclick=\"Order.GotoPay('" + ordercode + "','" + payCode + "')\">支付</i> <i onclick=\"Order.UpdateStatus(3,'" + ordercode + "')\">取消</i></span>";
                break;
            case 1:
                statusName = "<span class=\"pay\"><i onclick=\"Order.UpdateStatus(2,'" + ordercode + "','" + path + "')\">下载</i></span>";
                break;
            case 2:
                statusName = "<span class=\"pay\"><i onclick=\"Order.UpdateStatus(2,'" + ordercode + "','" + path + "')\">查看</i></span>";
                break;
            default:

                break;
        }
        return statusName;
    },
    api_input_edit: { "code": "", "status": "" },
    UpdateStatus: function (orderStatus,oudercode,path) {
        Order.api_input_edit.status = orderStatus;
        Order.api_input_edit.code = oudercode;
        Order.api_input_edit.path = path;
        //组织提交参数
        var s_api_input = JSON.stringify(Order.api_input_edit);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "order_edit", "api_token": g_const_api_token.Wanted };
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

                Order.GetList();
                if (Order.api_input_edit.status==2) {
                    window.location.replace(Order.api_input_edit.path);
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
    api_input_pay: { "orderCode": "", "payType": "", "openID": "", },

    GotoPay: function (order_code, payCode) {
        Order.api_input_pay.orderCode = order_code;

        var clientType = GetClientType();
        switch (clientType) {
            case 1:
                Order.api_input_pay.payType = g_pay_Type.WXpay;
                break;
            case 2:
            case 3:
                Order.api_input_pay.payType = g_pay_Type.APPAlipay;
                break;
            case 4:
                Order.api_input_pay.payType = g_pay_Type.Alipay;
                break;
        }
        //if (Order.api_input_pay.payType == g_pay_Type.WXpay) {
        //    Order.api_input_pay.openID = $("#hid_uid").val();
        //}
        var openidStr = "";
        if (Order.api_input_pay.payType == g_pay_Type.WXpay) {
            openidStr = "?openID=" + $("#hid_uid").val();
        }
        window.location.replace(g_Alipay_url + Order.api_input_pay.orderCode + "/" + Order.api_input_pay.payType + ".htm" + openidStr);
        //window.location.replace(g_Alipay_url + "?apiTarget=order_pay&apiInput=" + JSON.stringify(Order.api_input_pay));
    },

};