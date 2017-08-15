$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
    var productCode = GetQueryString("productCode");
    Product.api_input.productCode = productCode;
    Product.GetList();
    $("#minus-a").click(function () {
        Product.NumSelect('minus');
    });
    $("#add-a").click(function () {
        Product.NumSelect('add');
    });
});
var num = 1;  //购买数量
var stockNum = 0;  //商品库存
var Product = {
    api_target: "product_detail",
    api_input: { "productCode": "" },
    //加载多页
    GetList: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(Product.api_input);
        //提交接口api_token不为空
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
                Product.Load_Result(msg.mainpicUrl);
                $("#a_productName").html(msg.productName);
                $("#i_currentPrice").html(msg.currentPrice);
                $("#em_stockNumem_stockNum").html("剩余" + msg.stockNum + "件");
                $("#span_productTip").html(msg.productTip);
                // $("#discriptPic").html("<img src=\"" + msg.discriptPicList[0] + "\">");

                var htmlStr = "";
                $.each(msg.discriptPicList, function (i, n) {
                    htmlStr += "<img src=\""+n+"\">";
                });
                $("#discriptPic").html(htmlStr);

                $("#orderCreate").click(function () {               
                    //将商品信息存入缓存中
                    localStorage[g_const_localStorage.ProductDetail] = [{ "productCode": msg.productCode, "buyNum": parseInt($("#nums").val) }];
                    window.location.href = g_const_PageURL.Order_Create + "?t=" + Math.random();
                });
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
    Load_Result: function (mainpicUrlA) {
        //加载商品图片
        var htmlStr = "";
        $.each(mainpicUrlA, function (i, n) {
            htmlStr += "<div class=\"swiper-slide\"><img src=\"" + n + "\"></div>";
        });
        $("#mainPicUrl").html(htmlStr);
        var swiper = new Swiper('.swiper-container', {
            loop: true,
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            paginationClickable: true,
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
        });
    },
    NumSelect: function (opp) {
        if (opp == 'minus') {
            if (num > 1) {
                $("#nums").val(--num);
                $("#minus-a").attr({ "class": "btn-minus", "disabled": false });
            } else {
                $("#minus-a").attr({ "class": "btn-minus num-01", "disabled": true });
            }
            if (num < stockNum) {
                $("#add-a").attr({ "class": "btn-add", "disabled": false });
            }
        } else if (opp == 'add') {
            if (num < stockNum) {
                $("#nums").val(++num);
                $("#add-a").attr({ "class": "btn-add", "disabled": false });
            } else {
                $("#add-a").attr({ "class": "btn-add", "disabled": true });  //没有样式，让加号不可用
            }
            if (num > 1) {
                $("#minus-a").attr({ "class": "btn-minus", "disabled": false });
            }
        } else {

        }

    },
};