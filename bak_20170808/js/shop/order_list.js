$(document).ready(function () {
    Order.GetList();
    $(window).on("scroll", function () {
        var el = $(this);
        var iScrollTop = el.scrollTop();
        if ((iScrollTop + winHeight) >= winHeight) {
            pageSize = 10 * (pageTime++);
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
                $("#nums").html(msg.orderList.length);
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
            htmlStr += "<a class=\"clearfix\" onclick=\"Order.Load_Detail('" + n.orderCode + "')>";
            $.each(n.productList, function (j, o) {
                htmlStr += "<div class=\"pic fl\"><img src=\"" + o.imgUrl + "\"></div>";
                htmlStr += "<div class=\"con fl\">";
                htmlStr += "<h4>" + o.productName + "</h4><p class=\"title02\"></p>";
                htmlStr += "<div class=\"price02\">" + o.productPrice + "碳币<span></span></div>";
                htmlStr += "</div>";
            });
            htmlStr += "</a>";
            htmlStr += "</li>";                       
        });
        $("#ul_list").html(htmlStr);

    },
    Load_Detail: function (orderCode) {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.Order_Detail + "?orderCode=" + orderCode + "&t=" + Math.random();
    },
};