$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "true");
    if (GetQueryString("uid")!="") {
        $("#hid_uid").val(GetQueryString("uid"));
        localStorage["uid"] = GetQueryString("uid");
    }
    else {
        $("#hid_uid").val(localStorage["uid"]);
    }
    

    //返回
    $("#btnBack").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
    });
    if (GetQueryString("errorMsg")!="") {
        ShowMesaage(decodeURIComponent(GetQueryString("errorMsg")));
    }
    if (GetQueryString("order_status") != "") {
        orderStatus = GetQueryString("order_status");
    }
    else {
        orderStatus = localStorage["order_status"];
    }
    //switch (orderStatus) {
    //    case "0":
    //        $("#span_status").html("待付款");
    //        break;
    //    case "2":
    //    case "1":
    //        $("#span_status").html("下载报告");
    //        break;
    //    default:
    //        $("#span_status").html("全部订单");
    //        break;
    //}
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

//var User = {
//    LoginIng: 0,
//    CheckLogin: function () {
//        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
//            window.setTimeout('', 500);
//            UserInfo.Check(User.CheckLogin);
//        }
//        else {
//            Order.GetList();
//        }
//    }
//}
function SetOrderStatus(status,obj) {
    orderStatus = status;
    $("#ul_menu").find('li').each(function () {
        $(this).attr("class", "");
    });
    $(obj).attr("class", "curr");
    Order.GetList();
}
//我的订单列表
var Order = {
    api_target: "order_data",
    api_input: { "pageSize": "", "pageIndex": "", "status": "" },
    //加载多页
    GetList: function () {
        $("#p_listcount").html("共0份报告");
        $("#ul_orderlist").html("");
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
            //var clientType = GetClientType();
            //switch (clientType) {
            //    case 1:
            //    case 4:
            //        PageUrlConfig.SetUrl();
            //        window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
            //        return;
            //    case 2:
            //        AppLoginYYG.GetInfo();
            //        UserInfo.Check(User.CheckLogin);
            //        return;
            //    case 3:
            //        AppLoginIOS.GetPhoneNo();
            //        UserInfo.Check(User.CheckLogin);
            //        return;
            //}

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
            htmlStr += "<div class=\"pic fl\"><img src=\"img/default_small_4.jpg\"></div>";
            htmlStr += "<div class=\"con fl\">";
            htmlStr += "<h4>" + n.title + "</h4>";
            htmlStr += "<p class=\"title02\">报告等级 " + n.levelName + "</p>";
            htmlStr += "<div class=\"price02\">¥" + n.payPrice;
            if (n.carbonMoney>0) {
                htmlStr += "<span>碳币：" + n.carbonMoney + "</span>";
            }
            htmlStr += "</div></div></a>";
            htmlStr += "<div class=\"order_service\">" + Order.GetStatus(n.status)+Order.GetDiv(n.status, n.code, n.payCode, n.path, n.title) + "</div>";
            
        });
        $("#ul_orderlist").html(htmlStr);

    },
    GetStatus: function (orderStatus) {
        var statusName = "";
        switch (orderStatus) {
            case 0:
                statusName = "<label>等待付款</label>";
                break;
            case 1:
                statusName = "<label>未下载</label>";
                break;
            case 2:
                statusName = "<label>已下载</label>";
                break;
            case 3:
                statusName = "<label>已取消</label>";
                break;
            default:

                break;
        }
        return statusName;
    },
    GetDiv: function (orderStatus, ordercode, payCode, path, title) {
        var statusName = "";
        switch (orderStatus) {
            case 0:

                statusName = "<a onclick=\"Order.GotoPay('" + ordercode + "','" + payCode + "')\">支付</a> <a onclick=\"Order.UpdateStatus(3,'" + ordercode + "')\">取消</a>";
                break;
            case 1:
                statusName = "<a onclick=\"Order.Share('" + title + "','" + path + "')\">分享</a> <a onclick=\"Order.UpdateStatus(2,'" + ordercode + "','" + path + "')\">下载</a>";
                break;
            case 2:
                statusName = "<a onclick=\"Order.Share('" + title + "','" + path + "')\">分享</a> <a onclick=\"Order.UpdateStatus(2,'" + ordercode + "','" + path + "')\">查看</a>";
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
                if (Order.api_input_edit.status == 2) {
                    //localStorage[g_const_localStorage.Report] = Order.api_input_edit.path;
                    //window.location.href = g_const_PageURL.Report + "?t=" + Math.random();
                    var clientType = GetClientType();
                    
                    switch (clientType) {
                        case 3:
                        
                            localStorage[g_const_localStorage.Report] = Order.api_input_edit.path;
                            window.location.replace(g_const_PageURL.Report + "?t=" + Math.random());
                            break;
                        default:
                          //  alert(Order.api_input_edit.path);
                            window.location.replace(Order.api_input_edit.path);
                            //localStorage[g_const_localStorage.Report] = Order.api_input_edit.path;
                            //window.location.href = g_const_PageURL.Report + "?t=" + Math.random();
                            break;
                    }
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
    Share: function (title, path) {
        var shareurl = "http://www.ecomapit.com/ShareReport.html?title=" + title + "&path=" + path;
        SetWXShare(g_const_share_productdetail_title, title, g_const_share_pic, shareurl);
    }
};