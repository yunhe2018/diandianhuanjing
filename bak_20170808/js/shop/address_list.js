$(document).ready(function () {
    $("#newAddress").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.Address_New + "?t=" + Math.random();
    });
    Address.GetList();
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
//地址列表
var Address = {
    api_target: "address_list",
    api_input: { "pageSize": "", "pageIndex": "" },
    //加载多页  
    GetList: function () {
        //组织提交参数
        Address.api_input.pageSize = pageSize;
        Address.api_input.pageIndex = pageIndex;
        var s_api_input = JSON.stringify(Address.api_input);
        var obj_data = { "api_input": s_api_input, "api_target": Address.api_target, "api_token": 1 };
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
                Address.Load_Result(msg.addressList);
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
            htmlStr += "<div class=\"addressWrap\">";
            htmlStr += "<div class=\"address\" style=\"\" id=\"divAddressLogin\">";
            htmlStr += "<div onclick=\"Address.Address_S('" + n.addressID + "')\">";
            htmlStr += "<p class=\"address-t\"><span class=\"name\"><span id=\"spaddressuser\">" + n.name + "</span></span><span class=\"phone\"><span id=\"spaddressphone\">" + n.phone + "</span></span></p>";
            htmlStr += "<p><span id=\"spaddressdetail\">" + n.street + "</span></p>";
            htmlStr += "</div>";
            htmlStr += "</div>";

            htmlStr += "<div class=\"setDefaultAddress addressManage\">";
            htmlStr += "<span class=\"act\"></span>";
            //htmlStr += "<label onclick=\"onclick=\"Address.Address_Default('" + n.addressID + "')\">设置为默认地址</label>";
            htmlStr += "<b class=\"delete\" onclick=\"Address.Address_D('" + n.addressID + "')>删除</b>";
            htmlStr += "<b class=\"edit\" onclick=\"Address.Address_E('" + n.addressID + "')\">编辑</b>";
            htmlStr += "</div>";
            htmlStr += "</div>";
        });
        $("#addresslist").html(htmlStr);

    },
    api_targetD: "address_del",
    api_inputD: { "addressID": ""},
    Address_D: function (addressID) {
        Address.api_inputD.addressID = addressID;
        var s_api_input = JSON.stringify(Address.api_inputD);
        var obj_data = { "api_input": s_api_input, "api_target": Address.api_targetD, "api_token": 1 };
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
                ShowMesaage(msg.resultMessage);
                //页面刷新

            } else {
                ShowMesaage(msg.resultMessage);
            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    Address_E: function (addressID) {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.Address_Edit + "?addressID=" + addressID + "&t=" + Math.random();
    },

    Address_S: function (addressID) {
        localStorage[g_const_localStorage.OrderAddress] = addressID;
        window.location.replace(PageUrlConfig.BackTo(1));
    },
    
};