﻿$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
   
    //调用订单确认接口，返回库存和商品信息
    //取得用户默认收货地址
    UserInfo.Check(address.LoadInfo); //判断用户是否登录
    orderConfirm.api_input.productList = localStorage[g_const_localStorage.ProductDetail][0];
    orderConfirm.Main();
    //初始化数量选择框
    $("#nums").val(num);
    if (num==1) {
        $("#minus-a").attr({ "class": "btn-minus num-01", "disabled": true });
    }
    if (num == stockNum) {
        $("#add-a").attr({ "class": "btn-add", "disabled": true });  //没有样式，让加号不可用
    }
   
    $("#minus-a").click(function () {
        orderSub.NumSelect('minus');
        orderConfirm.Main();
    });
    $("#add-a").click(function () {
        orderSub.NumSelect('add');
        orderConfirm.Main();
    });

});
var num = 1;  //购买数量
var stockNum = 0;  //商品库存
var pageSize = 10;
var pageIndex = 0;
var address = {
    api_target: "address_list",
    api_input: { "pageSize": "", "pageIndex": "" },
    LoadInfo: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
        }
        var s_api_input = JSON.stringify(address.api_input);
        var obj_data = { "api_input": s_api_input, "api_target": address.api_target, "api_token": 1 };
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
                if (msg.addressList.length == 0) {
                    var htmlStr = "";
                    htmlStr += "<div class=\"noAddress\">";
                    htmlStr += "<div id=\"addressAdd\">请填写收货地址</div>";
                    htmlStr += "</div>";
                    $("#addressdiv").html(htmlStr);
                    $("#addressAdd").click(function () {
                        PageUrlConfig.SetUrl();
                        window.location.href = g_const_PageURL.Address_New + "?t=" + Math.random();
                    });
                    
                } else {
                    //加缓存，在地址列表页存用户选择的地址，如果为空，则取默认地址，缓存在用户提交订单的时候清空
                    var addressSelectId = "";
                    if (localStorage[g_const_localStorage.OrderAddress] != undefined && localStorage[g_const_localStorage.OrderAddress] != "") {
                        addressSelectId = localStorage[g_const_localStorage.OrderAddress];
                    }
                    $.each(msg.productListConfirm, function (i, n) {                        
                        if(addressSelectId!=""){
                            if (addressSelectId==n.addressID) {
                                orderConfirm.addressID = n.addressID;
                                var htmlStr = "";
                                htmlStr += "<div class=\"address\" id=\"divAddressLogin\">";
                                htmlStr += "<div>";
                                htmlStr += "<p class=\"address-t\"><span class=\"name\"><span id=\"spaddressuser\">" + n.name + "</span></span><span class=\"phone\"><span id=\"spaddressphone\">" + n.phone + "</span></span></p>";
                                htmlStr += "<p><span id=\"spaddressdetail\">" + n.street + "</span></p>";
                                htmlStr += "</div>";
                                htmlStr += "</div>";
                                $("#addressdiv").html(htmlStr);                               
                                return false;
                            }
                            
                        }
                        else if (n.isDefault == '1') {
                            orderConfirm.addressID = n.addressID;
                            var htmlStr = "";
                            htmlStr += "<div class=\"address\" id=\"divAddressLogin\">";
                            htmlStr += "<div>";
                            htmlStr += "<p class=\"address-t\"><span class=\"name\"><span id=\"spaddressuser\">" + n.name + "</span></span><span class=\"phone\"><span id=\"spaddressphone\">" + n.phone + "</span></span></p>";
                            htmlStr += "<p><span id=\"spaddressdetail\">" + n.street + "</span></p>";
                            htmlStr += "</div>";
                            htmlStr += "</div>";
                            $("#addressdiv").html(htmlStr);                           
                            return false;
                            
                        }
                    });
                }

            } else {
                ShowMesaage(msg.resultMessage);
            }
            
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
        
    }
}
var orderConfirm = {
    api_target: "order_confirm",
    api_input: { "addressID": "", "productList": [] },
    Main: function () {
        var s_api_input = JSON.stringify(orderConfirm.api_input);
        var obj_data = { "api_input": s_api_input, "api_target": orderConfirm.api_target, "api_token": 1 };
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
                var htmlStr = "";
                var priceAll = 0;
                $.each(msg.productListConfirm, function (i, n) {
                    htmlStr += "<li>";
                    htmlStr += "<a class=\"clearfix\">";
                    htmlStr += "<div class=\"pic fl\"><img src=\"" + n.imgUrl + "\"></div>";
                    htmlStr += "<div class=\"con fl\">";
                    htmlStr += "<h4>" + n.productName + "</h4><p class=\"title02\"></p>";
                    htmlStr += "<div class=\"price02\">" + n.currentPrice + "碳币<span>" + n.currentPrice + "</span></div>";
                    htmlStr += "</div>";
                    htmlStr += "</a>";
                    htmlStr += "</li>";
                    stockNum = n.stockNum;
                    //给购买数量赋值，从商品详情页传参数过来
                    var num = parseInt(localStorage[g_const_localStorage.ProductDetail][0].buyNum);
                    if (stockNum < num) {
                        num = stockNum;
                    }
                    $("#nums").val(num);
                    //将实际的购买数量重置在商品列表里
                    orderConfirm.api_input.productList[i].buyNum = num;
                    priceAll+=n.currentPrice*num;
                });
                var dispatchingStr = "";
                if (msg.dispatching == 1) {
                    dispatchingStr = "包邮";
                }
                $("#dispatching").html(dispatchingStr);
                $("#productD").html(htmlStr);
             
                //判断用户碳币数和用户购买商品价格
                if (priceAll > msg.carbonMoney) {
                    htmlStr = "<div class=\"chongBtn\" id=\"chong\">您的余额不足，充值后可兑换此商品哦~<span>去充值</span></div>";
                    $("#tj").html(htmlStr);
                    $("#chong").click(function () {
                        PageUrlConfig.SetUrl();
                        window.location.href = g_const_PageURL.Recharge + "?t=" + Math.random();
                    });
                } else {
                    htmlStr = "<div class=\"totalPrice\">合计：<span class=\"price\">" + priceAll + "<i>炭币</i></span><span class=\"confirmBtn pre\" id=\"btnOrderCreate\">提交订单</span></div>";
                    $("#tj").html(htmlStr);
                    $("#btnOrderCreate").click(function () {
                        localStorage[g_const_localStorage.OrderAddress] = "";
                        orderSub.api_input.payMoney = priceAll;
                        orderSub.api_input.addressID = orderConfirm.api_input.addressID;
                        orderSub.api_input.productList = orderConfirm.api_input.productList;
                        orderSub.api_input.dispatching = msg.dispatching;
                        orderSub.Main();
                    });
                }               
            } else {
                ShowMesaage(msg.resultMessage);
            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    }
}

var orderSub = {
    api_target: "order_create",
    api_input: { "payMoney": "", "addressID": "", "productList": [], "dispatching": "" },
    Main: function () {
        orderSub.api_input.dispatching = "1";  //1表示包邮
        var s_api_input = JSON.stringify(orderSub.api_input);
        var obj_data = { "api_input": s_api_input, "api_target": orderSub.api_target, "api_token": 1 };
        var purl = g_APIUTL;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: obj_data,
            dataType: g_APIResponseDataType
        });

        request.done(function (msg) {
            if (msg.resultCode >= g_const_Success_Code) {
                //跳转到订单列表页，创建成功在哪里提示？？
                PageUrlConfig.SetUrl();
                window.location.href = g_const_PageURL.Order_List + "?t=" + Math.random();
            } else {
                ShowMesaage(msg.resultMessage);
            }
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

}