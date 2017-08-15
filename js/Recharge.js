$(document).ready(function () {
    UserInfo.Check(Recharge.Init);
    $("#btnback").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
    });
    $("#balanceList li").on("click", function () {
        $(this).addClass("on").siblings().removeClass("on");
        Recharge.LoadMoney($(this).attr("data-m"));
    });
    Recharge.LoadPayType();
    $("#btnSubmit").on("click", function () {
        Recharge.Create();
    });
});
_orderNo = "";
var Recharge = {
    LoadMoney:function (carbon) {
        var s_api_input = JSON.stringify({ "carbonMoney": carbon });
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "exchange_money", "api_token": g_const_api_token.Unwanted };
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
            $("#span_money").html("￥"+ parseFloat(msg.money).toFixed(2));
            Recharge.api_input_create.payPrice = msg.money;
            Recharge.api_input_create.carbonMoney = carbon;
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    Init: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
        }
        Recharge.LoadMoney(0.05);

    },
    LoadRechargeList: function () {
        var data = rechargelist.ResultTable;
        var html = [];
        $(data).each(function (i) {
            html.push('<li class="' + (this.isdefault == "1" ? 'on' : '') + '" data-id="' + this.id + '" data-m="' + parseFloat(this.price).toFixed(0) + '">');
            var giveInfo = "";
            switch (this.givetype) {
                //赠送方式，0：无赠送，1：按比例送金额，2：金额，3：按比例送积分，4：积分
                case "0":
                    giveInfo = parseFloat(this.price).toFixed(0);
                    break;
                //case "1":
                //    giveInfo = '<i class="num">' + this.price + '</i><i class="fan">返' + this.givevalue + '%</i>';
                //    break;
                //case "2":
                //    giveInfo = '<i class="num">' + this.price + '</i><i class="fan">返' + this.givevalue + '元</i>';
                //    break;
                //case "3":
                //    giveInfo = '<i class="num">' + this.price + '</i><i class="fan">返' + this.givevalue + '%积分</i>';
                //    break;
                //case "4":
                //    giveInfo = '<i class="num">' + this.price + '</i><i class="fan">返' + this.givevalue + '积分</i>';
                    //    break;
                default:
                    giveInfo = '<i class="num">' + parseFloat(this.price).toFixed(0) + '</i><i class="fan">' + this.memo + '</i>';
                    break;
            }
            html.push(giveInfo);
            html.push('</li>');
        });
        html.push('<li data-m="0" data-id="0"><input type="text" class="txt_other" id="txtCustomMoney" placeholder="其他金额" /></li>');
        $('#balanceList').html(html.join(''));
    },
    LoadPayType: function () {
        var clientType = GetClientType();
        switch (clientType) {
            case 1:
                Recharge.api_input_create.payCode = g_pay_Type.WXpay;
                $("#divweixin").show();
                break;
            case 2:
            case 3:
                Recharge.api_input_create.payCode = g_pay_Type.APPAlipay;
                $("#divalipayapp").show();
                $("#divweixinapp").show();
                break;
            case 4:
                Recharge.api_input_create.payCode = g_pay_Type.Alipay;
                $("#divalipay").show();
                break;
        }
        $("#divalipayapp").click(function () {
            $("#a_app_wx").removeClass("sela on");
            $("#a_app_wx").addClass("sela");
            $("#a_app_al").removeClass("sela");
            $("#a_app_al").addClass("sela on");
            Recharge.api_input_create.payCode = g_pay_Type.APPAlipay;
        });
        $("#divweixinapp").click(function () {
            $("#a_app_wx").removeClass("sela");
            $("#a_app_wx").addClass("sela on");
            $("#a_app_al").removeClass("sela on");
            $("#a_app_al").addClass("sela");
            Recharge.api_input_create.payCode = g_pay_Type.APPWXpay;
        });


        //$("#paytype li").on("click", function () {
        //    $("#paytype .radio").removeClass("on");
        //    $(this).find("div[class=radio]").addClass("on");
        //    var type = $(this).attr("type");
        //    Recharge.PayType = g_pay_ment[type];
        //});
    },
    api_input: { "codes": "", },
    //加载多页

    api_input_create: { "payPrice": 5.5, "carbonMoney": 10.1 },
    Create: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(Recharge.api_input_create);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "carbon_money_order", "api_token": g_const_api_token.Wanted };
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
            if (msg.resultCode == 1) {
                Recharge.GotoPay(msg.orderCode);
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
        Recharge.api_input_pay.orderCode = order_code;
        Recharge.api_input_pay.payType = Recharge.api_input_create.payCode;
        //if (Order.api_input_pay.payType == g_pay_Type.WXpay) {
        //    Order.api_input_pay.openID = $("#hid_uid").val();
        //}
        var openidStr = "";
        if (Recharge.api_input_pay.payType == g_pay_Type.WXpay) {
            openidStr = "?openID=" + $("#hid_uid").val();
        }
        window.location.replace(g_Recharge_url + order_code + "/" + Recharge.api_input_create.payCode + ".htm" + openidStr);
        //window.location.replace(g_Alipay_url + "?apiTarget=order_pay&apiInput=" + JSON.stringify(Order.api_input_pay));
    },
};