$(document).ready(function () {
    
    $("#add_btn").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
    })
    if (localStorage[g_const_localStorage.Position] != undefined && localStorage[g_const_localStorage.Position] != "") {
        var po = new BMap.Point(localStorage[g_const_localStorage.Position].split(',')[1], localStorage[g_const_localStorage.Position].split(',')[0]);
        var geoc = new BMap.Geocoder();
        point_A = point_C = po;
        geoc.getLocation(po, function (rs) {
            var addComp = rs.addressComponents;
            SetMapData(addComp, po, "/img/lookArtHear.png", true);
        });
    }
    else {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {

            var geoc = new BMap.Geocoder();
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                po = r.point;
                // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
            }
            else {
                ShowMesaage('failed' + this.getStatus());
            }
            point_A = point_C = po;
            geoc.getLocation(po, function (rs) {
                var addComp = rs.addressComponents;
                //   alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);

                SetMapData(addComp, po, "/img/lookArtHear.png", true);
            });
        }, { enableHighAccuracy: true })
    }
    $("#span_core").click(function () {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var geoc = new BMap.Geocoder();
                var po = r.point;
                point_A = point_C = po;
                geoc.getLocation(po, function (rs) {
                    var addComp = rs.addressComponents;


                    SetMapData(addComp, po, "/img/lookArtHear.png", true);
                });
            }
        }, { enableHighAccuracy: true })
        //var geoc = new BMap.Geocoder();
        //geoc.getLocation(point_C, function (rs) {
        //    var addComp = rs.addressComponents;
        //    SetMapData(addComp, point_C, "/img/cuurPosition.png",true);
        //});
    });
    $("#span_update").click(function () {
        window.location.reload();
    });
    $("#btnaddressinsert").click(function () {
        UserInfo.Check(Address.UpLoad);
    });
    $("#btnaddressdelete").click(function () {
        UserInfo.Check(Address.Del);
    });
    $("#loupan").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.ProjectList1 + "?p=l&t=" + Math.random();
    });
    $("#btnSearch").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.Search + "?t=" + Math.random();
    });
    
    $("#div_position").click(function () {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.IndexDetail + "?t=" + Math.random();
    });
    map.addEventListener("click", function (e) {
        var center = e.point;
        var getData = true;
        //if (map.getDistance(point_A, center) < g_const_Map_Distance) {
        //    getData = false;
        //}

        var geoc = new BMap.Geocoder();
        geoc.getLocation(center, function (rs) {
            var addComp = rs.addressComponents;
            //  localStorage[g_const_localStorage.Position] = center.lat + "," + center.lng;
            SetMapData(addComp, center, "/img/lookArtHear.png", getData);
        });
    });
});

var map = new BMap.Map("allmap");
var point_A;
var point_C;

function SetMapData(addComp, center, icon_url, getdata) {
    $("#span_currname").html(addComp.city+" " + addComp.district + " " + addComp.street + " " + addComp.streetNumber);
    map.clearOverlays();
    var myIcon = new BMap.Icon(icon_url, new BMap.Size(22, 47));
    var marker = new BMap.Marker(center, { icon: myIcon });  // 创建标注
    map.addOverlay(marker);
    myIcon = new BMap.Icon("/img/lookArtHear.png", new BMap.Size(22, 47));
    marker = new BMap.Marker(point_C, { icon: myIcon });  // 创建标注
    map.addOverlay(marker);
    if (getdata) {
        point_A = center;
        map.centerAndZoom(center, 14);
        map.enableScrollWheelZoom();

    }
    var circle = new BMap.Circle(center, g_const_Map_Distance, { fillColor: "#10a5fe", strokeWeight: 1, fillOpacity: 0.25, strokeOpacity: 0.3 });//设置覆盖物的参数，中心坐标，半径，颜色
    map.addOverlay(circle);//在地图上显示圆形覆盖物
    Environment.api_input.position = center.lat + "," + center.lng;
    Environment.api_input.city = addComp.city;
    Environment.GetObj();
    Address.api_input.lat = center.lat;
    Address.api_input.lng = center.lng;
    Address.api_input.address = $("#span_currname").html();
    Address.api_input.province = addComp.province;
    Address.api_input.city = addComp.city;
    Address.api_input.district = addComp.district;
    localStorage[g_const_localStorage.City] = addComp.city;
    localStorage[g_const_localStorage.Position] = center.lat + "," + center.lng;
    UserInfo.Check(Address.Load);
}

var Environment = {
    api_target: "1032",
    api_input: { "position": "", "city": "", "radius": g_const_Map_Distance },
    SelectProjectCode: "",
    //加载多页
    GetObj: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(Environment.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "1032", "api_token": g_const_api_token.Wanted };
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

                Environment.Load_Info(msg);
            }
            else {

            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {

        });
    },

    Load_Info: function (result) {
        $("#h_projectname").html(result.name);
        $("#span_score").html(parseInt(result.score));
        $("#div_position_level").html(result.level);
        switch (result.level) {
            case "优":
                $("#div_position_level").attr("class", "posDialog_img_you");
                break;
            case "良":
                $("#div_position_level").attr("class", "posDialog_img_liang");
                break;
            case "差":
                $("#div_position_level").attr("class", "posDialog_img_cha");
                break;
        }
        //$("#div_project").attr("left",$(window).width()*0.5+"px");
        //$("#div_project").attr("top", $(window).height() * 0.5 + "px");
        Address.api_input.name = result.name;
        Address.api_input.level = result.level;
        $("#div_project").show();
    },
};
var projectAddressList = [];

var Address = {
    api_input: { "lat": "", "lng": "", "level": "", "address": "", "name": "", "province": "", "city": "", "district": "" },
    SelectProjectCode: "",
    //设置地址操作按钮
    SetAddressBotton:function () {
        var add = true;
        $.each(projectAddressList, function (i, n) {
            if (n.lat == Address.api_input.lat && n.lng == Address.api_input.lng) {
                add = false;
            }
        });
        if (!add) {
            $("#btnaddressdelete").show();
            $("#btnaddressinsert").hide();
        }
        else {
            $("#btnaddressinsert").show();
            $("#btnaddressdelete").hide();
        }
    },
    //加载收藏地址列表
    Load: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            if (localStorage[g_const_localStorage.ProjectAddress]) {
                projectAddressList = JSON.parse(localStorage[g_const_localStorage.ProjectAddress]);
                
            }
            Address.SetAddressBotton();
        }
        else {
            //组织提交参数
            var s_api_input = JSON.stringify({});
            //提交接口[api_token不为空，公用方法会从sission中获取]
            var obj_data = { "api_input": s_api_input, "api_target": "address_enshrine_list", "api_token": g_const_api_token.Wanted };
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
                    projectAddressList = msg.data;
                    Address.SetAddressBotton();
                }
            });
            //接口异常
            request.fail(function (jqXHR, textStatus) {

            });
        }
    },
    CheckAddress:function () {
        if (projectAddressList.length >= 10) {
            ShowMesaage("最多支持10个地址哦~");
            return false;
        }
        var add = true;
        $.each(projectAddressList, function (i, n) {
            if (n.lat == Address.api_input.lat && n.lng == Address.api_input.lng) {
                add = false;
            }
        });
        if (!add) {
            ShowMesaage("此地址已收藏");
            return false;
        }
        return true;
    },
    //添加地址
    UpLoad: function () {
        
        
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            if (localStorage[g_const_localStorage.ProjectAddress]) {
                projectAddressList = JSON.parse(localStorage[g_const_localStorage.ProjectAddress]);
            }
            if (!Address.CheckAddress()) {
                return;
            }
            projectAddressList.push(Address.api_input);
            localStorage[g_const_localStorage.ProjectAddress] = JSON.stringify(projectAddressList);
            Address.Load();
            ShowMesaage("收藏地址成功");
        }
        else {
            if (!Address.CheckAddress()) {
                return;
            }
            //组织提交参数
            var s_api_input = JSON.stringify(Address.api_input);
            //提交接口[api_token不为空，公用方法会从sission中获取]
            var obj_data = { "api_input": s_api_input, "api_target": "rsync_address_enshrine", "api_token": g_const_api_token.Wanted };
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
                    projectAddressList.push(Address.api_input);
                    localStorage[g_const_localStorage.ProjectAddress] = JSON.stringify(projectAddressList);
                    Address.Load();
                    ShowMesaage("添加收藏地址成功");
                }
                else {

                }
            });
            //接口异常
            request.fail(function (jqXHR, textStatus) {

            });
        }
    },
    api_input_del: { "lat": "", "lng": "" },
    Del: function () {
        Address.api_input_del.lat = Address.api_input.lat;
        Address.api_input_del.lng = Address.api_input.lng;
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            var projectAddressListNew = [];
            $.each(projectAddressList, function (i, n) {
                if (!(n.lat == Address.api_input_del.lat && n.lng == Address.api_input_del.lng)) {
                    projectAddressListNew.push(n);
                }
            });
            localStorage[g_const_localStorage.ProjectAddress] = JSON.stringify(projectAddressListNew);
            Address.Load();
            ShowMesaage("删除收藏地址成功");
        }
        else {

            var s_api_input = JSON.stringify(Address.api_input_del);
            //提交接口[api_token不为空，公用方法会从sission中获取]
            var obj_data = { "api_input": s_api_input, "api_target": "del_address_enshrine", "api_token": g_const_api_token.Wanted };
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
                    Address.Load();
                    ShowMesaage("删除收藏地址成功");
                }
            });
            //接口异常
            request.fail(function (jqXHR, textStatus) {

            });
        }
    }
};