$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
    var orderCode = GetQueryString("orderCode");
    OrderDetail.api_input.orderCode = orderCode;
    OrderDetail.GetList();

});
var productCode = "";
var OrderDetail = {
    api_target: "order_detail",
    api_input: { "orderCode": "" },
    //加载多页
    GetList: function () {
        //组织提交参数
        
        var s_api_input = JSON.stringify(OrderDetail.api_input);
        //提交接口api_token不为空
        var obj_data = { "api_input": s_api_input, "api_target": OrderDetail.api_target, "api_token": 1 };
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
        //var msg = { "entity": { "createTime": "2017-07-28\n\t\t14:45:07", "dispatching": 1, "updateTime": "2017-07-28 14:45:07", "code": "PD170728100001", "id": 3, "buyerCode": "U161011100001", "createUser": "U161011100001", "payMoney": 100, "details": [{ "product": { "mainPicUrl": "http://image-family.huijiayou.cn/cfiles/staticfiles/upload/275be/7391618ccf58429aaec031ba998c4654.jpg", "productName": "测试2" }, "productCode": "TP170726100003", "buyNum": 10, "currentPrice": 800 }], "address": { "createTime": "2017-07-28\n\t\t15:07:45", "phone": "13329994211", "userCode": "U161011100001", "areaCode": "122", "updateTime": "2017-07-28 15:07:45", "street": "错误是是是", "code": "AR170728100001", "provinces": "测试", "id": 4, "createUser": "add", "isDefault": 0, "name": "测试", "uuid": "ccb17f1ede3a44c89a5c756d9dcfa409", "updateUser": "add" }, "buyerPhone": "13422993311", "addressCode": "AR170728100001", "uuid": "fdd8238653174b308a535afb8de041c2", "updateUser": "U161011100001" }, "resultCode": 1, "resultMessage": "获取订单详情成功" }
            if (msg.resultCode >= g_const_Success_Code) {
                $("#orderCode").html(OrderDetail.api_input.orderCode);
                var dispatchingStr = "";
                if (msg.entity.dispatching == 1) {
                    dispatchingStr = "包邮";
                }
                $("#dispatching").html(dispatchingStr);
                //收货地址
                var htmlStr = "";
                    htmlStr += "<div>";
                    htmlStr += "<p class=\"address-t\"><span class=\"name\"><span id=\"spaddressuser\">" + msg.entity.address.name + "</span></span><span class=\"phone\"><span id=\"spaddressphone\">" + msg.entity.address.phone + "</span></span></p>";
                    htmlStr += "<p><span id=\"spaddressdetail\">" + msg.entity.address.street + "</span></p>";
                    htmlStr += "</div>";
                    $("#divAddressLogin").html(htmlStr);
                //商品详情
                htmlStr = "";
                $.each(msg.entity.details, function (i, n) {
                    htmlStr += "<li>";
                    htmlStr += "<a class=\"clearfix\">";
                    htmlStr += "<div class=\"pic fl\"><img src=\"" + n.product.mainPicUrl + "\"></div>";
                    htmlStr += "<div class=\"con fl\">";
                    htmlStr += "<h4>" + n.product.productName + "</h4><p class=\"title02\"></p>";
                    htmlStr += "<div class=\"price02\">" + n.currentPrice + "碳币<span>" + n.buyNum + "</span></div>";
                    htmlStr += "</div>";
                    htmlStr += "</a>";
                    htmlStr += "</li>";
                    productCode = n.productCode;
                });
                $("#ul_list").html(htmlStr);
                htmlStr = "";
                htmlStr += "<span class=\"pay\">实付款<i>" + msg.entity.payMoney + "炭币</i></span>";
                htmlStr += "<span class=\"payTime\">下单时间：" + msg.entity.createTime + "</span>";
                $("#priceAll").html(htmlStr);

                $("#buyAgain").click(function () {
                    window.location.href = g_const_PageURL.SProduct_Detail + "?productCode=" + productCode + "&t=" + Math.random();
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
    
};