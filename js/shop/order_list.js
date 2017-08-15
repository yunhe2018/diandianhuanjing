$(document).ready(function () {
    if (GetQueryString("token") != "") {
        UserInfo.Set(GetQueryString("token"),Order.GetList);
    }
    else {
        UserInfo.Check(Order.GetList);
    }
    var cType = GetClientType();
    if (cType == ClientType.JYH_Android || cType == ClientType.JYH_iOS) {
        //隐藏头部
        if (cType == ClientType.JYH_Android) {
            UseAppFangFa.CaoZuo('hidehead');
        }
    }
    $(window).on("scroll", function () {
        var oDeH = $("#nums").offset().top;
        var scrollT = $(document).scrollTop();
        var clientH = $(window).height();
        var scrollB = scrollT + clientH;
        console.log((oDeH) + "," + scrollT + "," + clientH);
        if (oDeH <= scrollB && maxCount > pageSize) {
            pageSize += 10;
            Product.GetList();
        }
    })
    $("#back_btn").click(function () {
        if (cType == ClientType.JYH_Android || cType == ClientType.JYH_iOS) {
            UseAppFangFa.CaoZuo('close');
        }
        else {
            window.location.replace(PageUrlConfig.BackTo(1));
        }
    });
});
var pageSize = 10;
var pageTime = 1;
var pageIndex = 0;
//订单列表
var Order = {
    api_target: "order_list",
    api_input: { "orderStatus":"", "pageSize": "", "pageIndex": "" },
    //加载多页
    GetList: function () {
        Order.api_input.orderStatus = "";//0 待付款 1 已付款 2 已取消 3 已删除 为空表示所有订单
        Order.api_input.pageSize = pageSize;
        Order.api_input.pageIndex = pageIndex;
        //组织提交参数
        var s_api_input = JSON.stringify(Order.api_input);
        var obj_data = { "api_input": s_api_input, "api_target": Order.api_target, "api_token": 1 };
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
            if (msg.resultCode >= g_const_Success_Code) {
                $("#nums").html("共" + msg.orderList.length + "个订单");
                $("#tel").html(msg.telCS);
                Order.Load_Result(msg.orderList);
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
        var htmlStr = "";
        $.each(resultlist, function (i, n) {
            htmlStr += "<li>"; 
            htmlStr += "<a class=\"clearfix\" onclick=\"Order.Load_Detail('" + n.orderCode + "')\">";
            $.each(n.productList, function (j, o) {
                htmlStr += "<div class=\"pic fl\"><img src=\"" + o.imgUrl + "\" onerror=\"this.src='/img/default/pic_default_small.png'\"></div>";
                htmlStr += "<div class=\"con fl\">";
                htmlStr += "<h4>" + o.productName + "</h4><p class=\"title02\"> </p>";
                htmlStr += "<div class=\"price02\">" + o.productPrice + "碳币<span>x1"+"</span></div>";
                htmlStr += "</div>";
            });
            htmlStr += "</a>";
            htmlStr += "<div class=\"order_service\">";
            if (n.orderStatus == "8866001") {
                htmlStr += "<label>下单成功(已付款)</label>";
                htmlStr += "<a onclick=\"Order.Buy_Product('" + n.productList[0].productCode + "')\">再次购买</a>";
            }
            
            htmlStr += "</div>";
            htmlStr += "</li>";                       
        });
        $("#ul_list").html(htmlStr);

    },
    Load_Detail: function (orderCode) {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.Order_Detail + "?orderCode=" + orderCode + "&t=" + Math.random();
    },
    Buy_Product: function (productCode) {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.SProduct_Detail + "?productCode=" + productCode + "&t=" + Math.random();
    }
};