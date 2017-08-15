$(document).ready(function () {
    FooterMenu.Set(-1);
    if (localStorage[g_const_localStorage.City] != undefined && localStorage[g_const_localStorage.City] != "") {
        Project.City = localStorage[g_const_localStorage.City];
    }
    else {
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var geoc = new BMap.Geocoder();
                var po = r.point;
                point_A = point_C = po;
                geoc.getLocation(po, function (rs) {
                    var addComp = rs.addressComponents;
                    Project.City = addComp.city.replace(/市/g, "");
                });
            }
        }, { enableHighAccuracy: true })
    }
    $("#loupan").click(function () {
        window.location.href = g_const_PageURL.ProjectList1 + "?p=m&t=" + Math.random();
    });
    $("#buy").click(function () {
        window.location.href = g_const_PageURL.ProjectList1 + "?p=l&t=" + Math.random();
    });
    $("#wode").click(function () {
        window.location.href = g_const_PageURL.MyAccount + "?t=" + Math.random();
    });
    $("#zhuye").click(function () {
        window.location.href = g_const_PageURL.Index + "?t=" + Math.random();
    });
    $("#btnClose").click(function () {
        $("#txtSearch").val("");
    });
    $("#btnSearch").click(function () {
        Project.Search();
    });
    $("#btnback").click(function () {
        window.location.replace(PageUrlConfig.BackTo());
    });
    $(".columnList li").each(function () {
        if ($(this).text().length > 3) {
            $(this).css("fontSize", ".13rem")
        }
    });
    $("#btnClear").click(function () {
        localStorage[g_const_localStorage.SearchHistory] = "";
        Project.History();
    });
    Project.History();
    if (GetQueryString("k")!="") {
        $("#txtSearch").val(decodeURIComponent(GetQueryString("k")));
        Project.Search();
    }
});

var Project = {
    historyList:[],
    History: function () {
        if (localStorage[g_const_localStorage.SearchHistory] && localStorage[g_const_localStorage.SearchHistory]!="") {
            Project.historyList = JSON.parse(localStorage[g_const_localStorage.SearchHistory]);
        }
        else {
            Project.historyList = [];
        }
        var strhtml = "";
        $.each(Project.historyList, function (i, n) {
            strhtml += "<li onclick=\"Project.SetKeyWord('" + n + "')\">" + n + "</li>";
        });
        if (strhtml.length>0) {
            $("#ul_history").html(strhtml);
            $("#ul_history").show();
            $("#btnClear").show();
        }
        else {
            $("#ul_history").html(strhtml);
            $("#ul_history").hide();
            $("#btnClear").hide();
        }
    },
    SetKeyWord: function (keyword) {
        $("#txtSearch").val(keyword);
        Project.Search();
    },
    City:"",
    Search: function () {
        var purl = g_APIUTL_In;
        var request = $.ajax({
            url: purl,
            cache: false,
            method: g_APIMethod,
            data: "t=" + Math.random() + "&action=search&keyword=" + $("#txtSearch").val() + "&city=" + Project.City,
            dataType: g_APIResponseDataType
        });

        request.done(function (msg) {

            if (msg.resultcode) {
                if (msg.resultcode == g_const_Success_Code) {
                    if (Project.historyList.indexOf($("#txtSearch").val().substr(0, 4))==-1) {
                        Project.historyList.splice(0, 0, $("#txtSearch").val().substr(0, 4));
                    }
                    var productData = JSON.parse(msg.resultmessage);
                    var strhtml = "";
                    $.each(productData, function (i, n) {
                        strhtml += "<li onclick=\"Project.Load_Detail('" + n.lat + "','" + n.lng + "','" + n.name + "','" + n.code + "')\"><p>" + n.name + "</p><span>" + n.city + "市 " + n.address + "</span></li>";
                    });
                    $("#ul_projectlist").html(strhtml);
                    localStorage[g_const_localStorage.SearchHistory] = JSON.stringify(Project.historyList);
                    Project.History();
                }
            }
        });

        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
    },
    Load_Detail: function (lat, lng, project, number) {
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.ProjectList1 + "?p=m&showtype=1&lat=" + lat + "&lng=" + lng + "&project=" + encodeURIComponent(project) + "&number=" + number + "&city=" + Project.City + "&t=" + Math.random();// g_const_PageURL.ProjectDetail + "?code=" + code + "&t=" + Math.random();
    },
}