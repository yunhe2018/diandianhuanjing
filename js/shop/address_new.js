$(document).ready(function () {   
    UseAppFangFa.CaoZuo("refresh", "", "false");
    
    $("#provinceName,#cityName,#areaName,#li_address").click(function () {
        Area.GetList("0", "0","0");  //默认加载省
    });
    $("#isDefault").click(function () {       
        if ($("#isDefault").attr("class") == "act") {
            $("#isDefault").attr("class","");
        } else {
            $("#isDefault").attr("class","act");
        }
    });
    $("#back_btn").click(function () {      
        window.location.replace(PageUrlConfig.BackTo(1));
    });
    $("#closeDiv").click(function () {
        $("#areaS").hide();
    });
    $("#addressSub").click(function () {
        if ($("#txtUserName").val().length == 0) {
            ShowMesaage("收货人不能为空");
            return;
        }
        else if ($("#txtPhoneNo").val().length == 0) {
            ShowMesaage("手机号不能为空");
            return;
        } else if ($("#areaCode").val().length == 0) {
            ShowMesaage("所在地区不能为空");
            return;
        } else if ($("#txtAddressDetail").val().length == 0) {
            ShowMesaage("地址不能为空");
            return;
        } 
        UserInfo.Check(Address.GetList);
    });
});
var citylist = ["北京市", "天津市", "上海市", "重庆市"]
var Area = {
    api_target: "area_select",
    api_input: { "areaId": "", "type": "" },
    //加载多页  
    GetList: function (areaId, type, selectId) {
        Area.api_input.areaId = areaId;
        Area.api_input.type = type;
        
        var s_api_input = JSON.stringify(Area.api_input);
        var obj_data = { "api_input": s_api_input, "api_target": Area.api_target, "api_token": 0 };
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
        //var msg = { "resultCode": 1, "data": [{ "name": "北京市", "code": "10" }, { "name": "天津市", "code": "11" }, { "name": "河北省", "code": "12" }, { "name": "内蒙古", "code": "13" }, { "name": "山西省", "code": "14" }, { "name": "辽宁省", "code": "20" }, { "name": "吉林省", "code": "21" }, { "name": "黑龙江省", "code": "22" }, { "name": "上海市", "code": "30" }, { "name": "江苏省", "code": "31" }, { "name": "山东省", "code": "32" }, { "name": "安徽省", "code": "33" }, { "name": "福建省", "code": "34" }, { "name": "浙江省", "code": "35" }, { "name": "江西省", "code": "36" }, { "name": "广东省", "code": "40" }, { "name": "广西", "code": "41" }, { "name": "海南省", "code": "42" }, { "name": "重庆市", "code": "60" }, { "name": "四川省", "code": "61" }, { "name": "云南省", "code": "62" }, { "name": "贵州省", "code": "63" }, { "name": "西藏", "code": "64" }, { "name": "河南省", "code": "70" }, { "name": "湖北省", "code": "71" }, { "name": "湖南省", "code": "72" }, { "name": "陕西省", "code": "80" }, { "name": "青海省", "code": "81" }, { "name": "宁夏", "code": "82" }, { "name": "新疆", "code": "83" }, { "name": "甘肃省", "code": "84" }, { "name": "香港", "code": "90" }, { "name": "澳门", "code": "91" }, { "name": "台湾", "code": "92" }, { "name": "国外", "code": "93" }], "resultMessage": "获取城市列表成功" };
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
            //if(i==0){
               // htmlStr += "<li class=\"curr\">";
            //}else{
                htmlStr += "<li>";
            //}
            htmlStr += "<span onclick=\"Area.SelectArea('" + n.code + "','" + n.name + "','" + selectId + "')\">" + n.name + "</span>";
            htmlStr += "</li>";
        });
        htmlStr += "</ul>";
        $("#wrapper01").html(htmlStr);
    },
    SelectArea: function (areaId, areaName, selectId) {
        //选择省
        if (selectId == "0") {
            //$("#provinceName").html();
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
            //$("#cityName").html();
            $("#cityNameS").html(areaName);
            $("#areaName").html();
            $("#provinceNameli").attr("class", "");
            $("#cityNameli").attr("class", "");
            $("#areaNameli").attr("class", "curr");
            $("#areaCode").val();
            $("#province").val();
            if ($.inArray($("#provinceNameS").html(), citylist) > -1) {
                $("#provinceName").html($("#provinceNameS").html());
                $("#cityName").html($("#cityNameS").html());
                $("#areaName").html("");
                $("#areaCode").val(areaId);
                $("#province").val($("#provinceNameS").html() + $("#cityNameS").html());
                $("#areaS").hide();
            }
            else {
                Area.GetList(areaId, "2", "2");  //加载区域
            }

        }
            //选择区域
        else if (selectId == "2") {
            $("#areaNameS").html(areaName);
            $("#areaName").html($("#areaNameS").html());
            $("#provinceName").html($("#provinceNameS").html());
            $("#cityName").html($("#cityNameS").html());
            $("#areaCode").val(areaId);
            $("#province").val($("#provinceNameS").html() + $("#cityNameS").html() + $("#areaNameS").html());
            $("#areaS").hide();
        }
    },
};
var Address = {
    api_target: "address_add",
    api_input: { "phone": "", "areaCode": "", "street": "", "isDefault": "", "name": "", "provinces": "" },
    //加载多页  
    GetList: function () {
        //判断是否登录
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
        }
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
            if (msg.resultCode == g_const_Success_Code) {
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