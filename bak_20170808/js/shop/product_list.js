$(document).ready(function () {
    Product.GetList();
    $(window).on("scroll", function () {
        var oDeH = $("#p_listend").offset().top;
        var scrollT = $(document).scrollTop();
        var clientH = $(window).height();
        var scrollB = scrollT + clientH;
        console.log((oDeH) + "," + scrollT + "," + clientH);
        if (oDeH  <= scrollB && maxCount > pageSize) {
            pageSize += 10;
            Product.GetList();
        }
    })
});
var pageSize = 10;
var pageTime = 1;
var pageIndex = 0;
var maxCount = 0;
//商品列表
var Product = {
    api_target: "product_list",
    api_input: { "pageSize": "", "pageIndex": "" },
    //加载多页
    GetList: function () {
        Product.api_input.pageSize = pageSize;
        Product.api_input.pageIndex = pageIndex;
        //组织提交参数
        var s_api_input = JSON.stringify(Product.api_input);
        var obj_data = { "api_input": s_api_input, "api_target": Product.api_target, "api_token": "" };
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
                maxCount = msg.recCount;
                Product.Load_Result(msg.productList);
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
            htmlStr += "<li onclick=\"Product.Load_Detail('" + n.productCode + "')\">";
            htmlStr += "<div class=\"goods-item\"><img src=\"" + n.mainPicUrl + "\" onerror=\"this.src='/img/default/pic_default_small.png'\" style=\"height:" + $(window).width() * 0.49 + "px\"></div>";
            htmlStr += "<h1 class=\"goods-item-tit-02\">" + n.productName + "</h1>";
            htmlStr += "<span class=\"goods-item-price\">" + n.currentPrice + "<i>碳币</i><b>剩" + n.stockNum + "件</b></span>";
            htmlStr += "</li>";
        });
        $("#ul_productl").html(htmlStr);

    },
    Load_Detail: function (productCode) {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.SProduct_Detail + "?productCode=" + productCode + "&t=" + Math.random();
    },
};