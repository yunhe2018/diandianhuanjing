$(document).ready(function () {
    var addressID = GetQueryString("addressID");
    //加载数据
    Address_Detail.api_input.addressID = addressID;
    Address_Detail.GetList();

    $("#provinceName,#cityName,#areaName").click(function () {
        Area.GetList("", "0", "0");  //默认加载省
    });
    $("#isDefault").click(function () {
        if ($("#isDefault").attr("class") == "act") {
            $("#isDefault").attr("class", "");
        } else {
            $("#isDefault").attr("class", "act");
        }
    });
    $("#closeDiv").click(function () {
        $("#areaS").hide();
    });
    $("#back_btn").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
    });
    $("#addressSub").click(function () {
        if ($("#txtUserName").val().length == 0) {
            ShowMesaage("收货人不能为空");
            return;
        }else if ($("#areaCode").val().length == 0) {
            ShowMesaage("所在地区不能为空");
            return;
        } else if ($("#txtAddressDetail").val().length == 0) {
            ShowMesaage("地址不能为空");
            return;
        } else if ($("#txtPhoneNo").val().length == 0) {
            ShowMesaage("手机号不能为空");
            return;
        } 
        Address.api_input.code = addressID;
        Address.GetList();
    });

});
var Area = {
    api_target: "area_select",
    api_input: { "areaId": "", "type": "" },
    //加载多页  
    GetList: function (areaId, type, selectId) {
        Area.api_input.areaId = areaId;
        Area.api_input.type = type;
        var s_api_input = JSON.stringify(Area.api_input);
        var obj_data = { "api_input": s_api_input, "api_target": Area.api_target, "api_token": 1 };
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
                Area.Load_Result(msg.data, selectId);
            } else {
                ShowMesaage(msg.resultMessage);
            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    Load_Result: function (areaList, selectId) {
        $("#areaS").show();
        var htmlStr = "";
        htmlStr += "<ul style=\"transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);\">";
        $.each(areaList, function (i, n) {
            if (i == 0) {
                htmlStr += "<li class=\"curr\">";
            } else {
                htmlStr += "<li>";
            }
            htmlStr += "<span onclick=\"Area.SelectArea('" + n.code + "','" + n.name + "','" + selectId + "')\">" + n.name + "</span>";
            htmlStr += "</li>";
        });
        htmlStr += "</ul>";
        $("#wrapper01").html(htmlStr);

    },
    SelectArea: function (areaId, areaName, selectId) {
        //选择省
        if (selectId == "0") {
            $("#provinceName").html(areaName);
            $("#provinceNameS").html(areaName);
            $("#cityName").html();
            $("#provinceNameli").attr("class", "");
            $("#cityNameli").attr("class", "curr");
            $("#areaName").html();
            $("#areaCode").val();
            $("#province").val();
            Area.GetList(areaId, "1", "1");  //加载市
        }
            //选择市
        else if (selectId == "1") {
            $("#cityName").html(areaName);
            $("#cityNameS").html(areaName);
            $("#areaName").html();
            $("#provinceNameli").attr("class", "");
            $("#cityNameli").attr("class", "");
            $("#areaNameli").attr("class", "curr");
            $("#areaCode").val();
            $("#province").val();
            Area.GetList(areaId, "2", "2");  //加载区域
        }
            //选择区域
        else if (selectId == "2") {
            $("#areaName").html(areaName);
            $("#areaNameS").html(areaName);
            $("#areaCode").val(areaId);
            $("#province").val($("#provinceName").html() + $("#cityName").html() + $("#areaName").html());
            $("#areaS").hide();
        }
    },
};
var Address = {
    api_target: "address_update",
    api_input: { "code": "", "phone": "", "areaCode": "", "street": "", "isDefault": "", "name": "", "provinces": "" },
    //加载多页  
    GetList: function () {
        Address.api_input.phone = $("#txtPhoneNo").val();
        Address.api_input.areaCode = $("#areaCode").val();
        Address.api_input.street = $("#txtAddressDetail").val();
        var isD = "0";
        if ($("#isDefault").attr("class") == "act") {
            isD = "1";
        }
        Address.api_input.isDefault = isD;
        Address.api_input.name = $("#txtUserName").val();
        Address.api_input.provinces = $("#province").val();
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
                ShowMesaage(msg.resultMessage);
                window.location.replace(PageUrlConfig.BackTo(1));
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
var Address_Detail = {
    api_target: "address_detail",
    api_input: { "addressID": "" },
    //加载多页  
    GetList: function () {
        var s_api_input = JSON.stringify(Address_Detail.api_input);
        var obj_data = { "api_input": s_api_input, "api_target": Address_Detail.api_target, "api_token": 1 };
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
                $("#txtPhoneNo").val(msg.phone);
                $("#areaCode").val(msg.areaCode);
                $("#txtAddressDetail").val(msg.street);
                if (msg.isDefault == "0") {
                    $("#isDefault").attr("class","");
                } else {
                    $("#isDefault").attr("class","act");
                }
                $("#txtUserName").val(msg.name);
                $("#province").val(msg.province);
                //写入隐藏域
                $("#provinceName").html(msg.province);
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