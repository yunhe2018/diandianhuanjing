$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
    $("#hid_uid").val(GetQueryString("uid"));
    if (localStorage[g_const_localStorage.OrderConfirm]!=undefined) {
        Order.api_input.codes = localStorage[g_const_localStorage.OrderConfirm];
        UserInfo.Check(Order.Confirm);
    }
    else {
        window.location.replace(g_const_PageURL.ProjectList1 + "?p=m&t=" + Math.random());
    }
    //if (localStorage[g_const_localStorage.FaPiao]) { window.location.href = g_const_PageURL.ProjectList1 + "?p=m&t=" + Math.random();
    //    if (localStorage[g_const_localStorage.FaPiao] == "") {
    //        $("#spanBill").html("不开发票");
    //    }
    //    else {
    //        $("#spanBill").html(localStorage[g_const_localStorage.FaPiao]);
    //    }
    //}
    var clientType = GetClientType();
    switch (clientType) {
        case 1:
            Order.api_input_create.payCode = g_pay_Type.WXpay;
            $("#divweixin").show();
            break;
        case 2:
        case 3:
            Order.api_input_create.payCode = g_pay_Type.APPAlipay;
            $("#divalipayapp").show();
            $("#divweixinapp").show();
            break;
        case 4:
            Order.api_input_create.payCode = g_pay_Type.Alipay;
            $("#divalipay").show();
            break;
    }
    //if (IsInWeiXin.check()) {
    //    //$("#spanPaytype").html("微信支付");
    //    PayType = g_pay_Type.WXpay;
    //    $("#divweixin").show();
    //}
    //else {
    //   // $("#spanPaytype").html("支付宝");
    //    PayType = g_pay_Type.Alipay;
    //    $("#divalipay").show();
    //}
    $("#btnPay").click(function () {


        Order.api_input_create.invoiceTitle = $("#txtBill").val();
        //Order.api_input_create.payCode = PayType;
        //Order.api_input_create.payPrice = Order.api_input_create.payPrice;
        Order.api_input_create.reportCode = Order.api_input.codes;
        //Order.api_input_create.carbonMoney = 0;
        Order.api_input_create.couponCodes = "";
        //Order.api_input_create.checkPayMoney = Order.api_input_create.payPrice;
        Order.api_input_create.buyerMobile = "";
        Order.api_input_create.buyerCode = "";
        Order.api_input_create.invoiceType = "";
        Order.api_input_create.invoiceContent = "";
        Order.Create();
    });
    $("#btnback").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
    });
    $("#divalipayapp").click(function () {
        $("#a_app_wx").removeClass("sela on");
        $("#a_app_wx").addClass("sela");
        $("#a_app_al").removeClass("sela");
        $("#a_app_al").addClass("sela on");
        Order.api_input_create.payCode = g_pay_Type.APPAlipay;
    });
    $("#divweixinapp").click(function () {
        $("#a_app_wx").removeClass("sela");
        $("#a_app_wx").addClass("sela on");
        $("#a_app_al").removeClass("sela on");
        $("#a_app_al").addClass("sela");
        Order.api_input_create.payCode = g_pay_Type.APPWXpay;
    });
    $("#balanceModel").click(function () {
        if (Order.api_input_create.carbonMoney==0) {
            Order.SetOrderPrice(Order.api_input_create.checkPayMoney, $("#hid_carbon").val());
            if (Order.api_input_create.carbonMoney>0) {
                $("#balanceCheck").removeClass("orderConfirmCarbon_div3");
                $("#balanceCheck").addClass("orderConfirmCarbon_div2");
            }
        }
        else {
            Order.api_input_create.carbonMoney = 0;
            Order.SetOrderPrice(Order.api_input_create.checkPayMoney, Order.api_input_create.carbonMoney);
            $("#balanceCheck").removeClass("orderConfirmCarbon_div2");
            $("#balanceCheck").addClass("orderConfirmCarbon_div3");
        }
    });
});
var Order = {
    api_input: { "codes": "", },
    //加载多页
    Confirm: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO && (document.referrer.toLowerCase().indexOf("projectdetail") > -1 || document.referrer.toLowerCase()=="")) {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
            return;
        }
        //组织提交参数
        var s_api_input = JSON.stringify(Order.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "order_affirm", "api_token": g_const_api_token.Wanted };
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
                $("#hid_carbon").val(msg.carbonMoney);
                Order.SetOrderPrice(msg.payMoney, 0);
                Order.Load_Result(msg.reportList);
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
    SetOrderPrice: function (price,carbon) {
        Order.api_input_create.checkPayMoney = price;
        if (price > carbon) {
            Order.api_input_create.carbonMoney = carbon;
        }
        else {
            Order.api_input_create.carbonMoney = price;
        }
        Order.api_input_create.payPrice = Order.api_input_create.checkPayMoney - Order.api_input_create.carbonMoney;
        $("#balanceInfo").html($("#hid_carbon").val() + " 碳币");
        $("#balanceUse").html(Order.api_input_create.carbonMoney + " 碳币");
        $("#span_paymonay").html("实付：¥" + Order.api_input_create.payPrice);
    },

    //加载单页
    //接口返回成功后的处理
    Load_Result: function (resultlist) {

        var htmlStr = "";
        $.each(resultlist, function (i, n) {
            //htmlStr += "<li class=\"clearfix li2\">";
            //htmlStr += "<img src=\"";
            //if (n.pic!="") {
            //    htmlStr += n.pic;
            //}
            //else {
            //    htmlStr += "/img/defalt.jpg";
            //}
            //htmlStr += "\" alt=\"\" class=\"zuofudong baogaoimg\"/>";
            //htmlStr += "<h3 class=\"fontC222 fontS34\">" + n.title + "</h3>";
            //htmlStr += "<p class=\"fontC555 fontS26\">环境报告等级 <span class=\"fontC18b6b9\">" + n.levelName + "</span></p>";
            //htmlStr += "<span class=\"fontS36 fontCdc2916\">¥" + n.price + "</span>";
            //htmlStr += "</li>";
            $("#divyhqnum").html(n.levelName);
            htmlStr += "<li><a class=\"clearfix\" href=\"javascript:;\">";
            htmlStr += "<div class=\"pic fl\"><img src=\"";
            if (n.pic!="") {
                htmlStr += n.pic;
            }
            else {
                htmlStr += "/img/defalt.jpg";
            }
            htmlStr += "\"></div>";
            htmlStr += "<div class=\"con fl\">";
            htmlStr += "<h4>" + n.title + "</h4>";
            htmlStr += "<div class=\"price\">￥" + n.price + "</div>";
            htmlStr += "</div>";
            htmlStr += "</a>";
            htmlStr += "</li>";
        });
        $("#projectlist").html(htmlStr);

    },
    api_input_create: { "reportCode": "", "payCode": "", "invoiceTitle": "", "payPrice": "", "carbonMoney": 0, "couponCodes": "", "checkPayMoney": 0, "buyerMobile": "", "buyerCode": "", "invoiceType": "", "invoiceContent": "" },
    Create: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(Order.api_input_create);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "order_add", "api_token": g_const_api_token.Wanted };
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
                localStorage[g_const_localStorage.OrderConfirm] = undefined;
                if (Order.api_input_create.payPrice==0) {
                    window.location.replace(g_const_PageURL.MyOrder_List + "?order_status=1&t=" + Math.random());
                }
                else {
                    Order.GotoPay(msg.code);
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


    },
    api_input_pay: { "orderCode": "", "payType": "", "openID": "", },
    GotoPay: function (order_code) {
        Order.api_input_pay.orderCode = order_code;
        Order.api_input_pay.payType = Order.api_input_create.payCode;
        //if (Order.api_input_pay.payType == g_pay_Type.WXpay) {
        //    Order.api_input_pay.openID = $("#hid_uid").val();
        //}
        var openidStr = "";
        if (Order.api_input_pay.payType == g_pay_Type.WXpay) {
            openidStr = "?openID=" + $("#hid_uid").val();
        }
        window.location.replace(g_Alipay_url + order_code + "/" + Order.api_input_create.payCode + ".htm" + openidStr);
        //window.location.replace(g_Alipay_url + "?apiTarget=order_pay&apiInput=" + JSON.stringify(Order.api_input_pay));
    },
};