$(document).ready(function () {
    UseAppFangFa.CaoZuo("refresh", "", "false");
    var lp_code = GetQueryString("code");
    $("#span_good").width("0%");
    $("#span_ok").width("0%");
    $("#span_bad").width("0%");
    Project.api_input.lpCode = lp_code;
    UserInfo.Check(Project.GetList);
    //CommentTop.api_input.lpCode = lp_code;
    //CommentTop.GetList();
    //CommentAll.api_input.lpCode = lp_code;
    //CommentAll.GetList();

    Collection.api_input.lpCode = lp_code;
    //Collection.Add();

    History.api_input.lpCode = lp_code;
    UserInfo.Check(History.Add);
    $("#a_type_all").addClass("curr");
    CommentSend.api_input.lpCode = lp_code;
    CommentSend.api_input.level = "1";
    $("#shouye").click(function () {
        window.location.href = g_const_PageURL.Index + "?t=" + Math.random();
    });
    $("#b_AddIndex").click(function () {
        window.location.href = g_const_PageURL.Index + "?t=" + Math.random();
    });
    $("#wode").click(function () {
        window.location.href = g_const_PageURL.MyAccount + "?t=" + Math.random();
    });
    $("#btnback").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
    });
    $("#span_report").click(function () {
        if (Project.ReportShow == 0) {
            ShowMesaage("报告未生成，请稍后再试！");
            return;
        }
        Project.SetTab("report");
    });
    $("#span_detail").click(function () {
        Project.SetTab("detail");
    });
    $("#span_comment").click(function () {
        Project.SetTab("comment");
    });
    $("#b_comment").click(function () {
        Project.SetTab("comment");
    });
    $("#a_type_all").click(function () {
        CommentAll.api_input.level = "";
        CommentAll.GetList();
        $("#a_type_all").addClass("curr");
    });
    $("#a_type_good").click(function () {
        CommentAll.api_input.level = "0";
        CommentAll.GetList();
        $("#a_type_good").addClass("curr");
    });
    $("#a_type_ok").click(function () {
        CommentAll.api_input.level = "1";
        CommentAll.GetList();
        $("#a_type_ok").addClass("curr");
    });
    $("#a_type_bad").click(function () {
        CommentAll.api_input.level = "2";
        CommentAll.GetList();
        $("#a_type_bad").addClass("curr");
    });

    Project.SetTab("report");
    $("em").on("click", function () {
        var grade = $(this).attr("grade");
        var parentFont = $(this).parent().parent();
        $(parentFont).attr("class", "f" + grade).attr("grade", grade);
        $(parentFont).find("span").text(reviewGrade[grade]);
        switch (grade) {
            case "3":
                CommentSend.api_input.level = "0";
                break;
            case "2":
                CommentSend.api_input.level = "1";
                break;
            case "1":
                CommentSend.api_input.level = "2";
                break;
        }

    });
    var clientType = GetClientType();
    switch (clientType) {
        case 1:
            break;
        case 2:
        case 3:
            $("#btnShare").show();
            break;
        case 4:
            break;
    }
});
var reviewRelease = {};
var reviewGrade = {
    "1": "差评",
    "2": "中评",
    "3": "好评",
    //"4": "比较满意",
    //"5": "非常满意"
};
//var map = new BMap.Map("div_map");
var pageSize = 10;
var pageTime = 1;
var pageIndex = 0;
var orderStatus = 0;
var showType = 0;
//我的订单列表
var Project = {
    api_target: "report_lp",
    api_input: { "lpCode": "" },
    ReportCount: 0,
    ReportSelect: "",
    SetTab: function (divName) {
        $("#div_report").hide();
        $("#div_detail").hide();
        $("#div_comment").hide();
        $("#span_report").attr("class", "");
        $("#span_detail").attr("class", "");
        $("#span_comment").attr("class", "");
        $("#div_" + divName).show();
       // $("#span_" + divName).attr("class", "curr");
    },
    //加载多页
    GetList: function () {
        var needToken = "";
        if (UserInfo.LoginStatus != g_const_YesOrNo.NO) {
            needToken = "1";
        }
        //组织提交参数
        var s_api_input = JSON.stringify(Project.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]{"detail":"。友谊社区位于中国的硅谷中关村高科技园区的核心圈内，座拥西北三环，与人民大学、北京大学、清华大学、北京理工大学等传统名校比邻，面对当代商城，双安大超市，与北京电视台隔街相望，北京市工商局和海淀工商局近在咫尺，地理位置得天独厚，不可替代。友谊社区为大型成熟社区，配套设施齐全，小区内的房子分为三种，五十年代的为外专局的宿舍，九十年代和2000盖的都是中国科学院的宿舍。房子单价低，总价优，是广大投资类居家类客户的蓝天乐地。回报率超高！小区没有物业费和停车费，但是有24小时保安，管理措施较完善；派位小学是西颐小学，孩子以后可以在中关村中学和北京市十九中学上学，也是不错的选择！小区紧邻三环主路，交通极其便利，地铁4号线人民大学站，10号线苏州街站，未来地铁16号线苏州桥站都在小区附近，18条公交线路途径小区门前，出行自由随心","address":"北三环西路47号院","name":"友谊社区","resultCode":0,"levelList":[{"detail":"友谊社区-环境报告说明-普通","levelName":"普通","levelCode":"RL161006100001","code":"R161009103784"},{"detail":"友谊社区-环境报告说明-高级","levelName":"高级","levelCode":"RL161006100002","code":"R161009103785"},{"detail":"友谊社区-环境报告说明-专业","levelName":"专业","levelCode":"RL161006100003","code":"R161009103786"}],"image":"[]","pic":"[]","resultMessage":"查询报告成功"}
        var obj_data = { "api_input": s_api_input, "api_target": Project.api_target, "api_token": needToken };
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
                $("#h_projectname").html(msg.name);
                //$("#div_price").html("￥"+msg.price);
                //if (msg.pic == "") {
                //    $("#div_img").html("<img src=\"/img/defalt.jpg\">");
                //}
                //else {
                //    $("#div_img").html("<img src=\"" + msg.pic + "\">");
                //}
                //$("#p_detail").html(msg.detail);
                var imageList = JSON.parse(msg.image);
                var g_const_share_pic = "";
                if (imageList.length == 0) {
                    $("#img_report").attr("src", "/img/default_big_4.jpg");
                    //  g_const_share_pic = "/img/defalt.jpg";
                }
                else {
                    $("#img_report").attr("src", msg.image[0]);
                    //   g_const_share_pic = msg.image[0];
                }
                $("#img_report").html();
                $("#p_detail").html(msg.detail);
                if (msg.isFollow == 1) {
                    Collection.Status = 1;
                    $("#b_AddCol").attr("class", "collect on");
                }
                else {
                    $("#b_AddCol").attr("class", "collect");
                }
                Project.ReportCount = msg.levelList.length;
                Project.Load_Level(msg.levelList);
                $("#btnShare").click(function () {
                    SetWXShare(g_const_share_productdetail_title, msg.name, g_const_share_pic);
                });
            }
            else {
                ShowMesaage(msg.resultMessage);
            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
        //}

    },
    //加载单页
    //接口返回成功后的处理
    Load_Level: function (resultlist) {

        var htmlStr = "";
        $.each(resultlist, function (i, n) {
            if (i == 0) {
                htmlStr += "<li class=\"curr\" onclick=\"Project.SetReportLevel('" + n.code + "','" + n.price + "','" + n.pic + "','" + n.detail + "',this)\">" + n.levelName + "</li>";
                Project.ReportSelect = n.code;
                $("#div_price").html("￥" + n.price);
                $("#p_detail_report").html(n.detail);
                if (n.pic == "") {
                    $("#div_img").html("<img src=\"/img/default_small_4.jpg\">");
                }
                else {
                    $("#div_img").html("<img src=\"" + n.pic + "\">");
                }
            }
            else {
                htmlStr += "<li onclick=\"Project.SetReportLevel('" + n.code + "','" + n.price + "','" + n.pic + "','" + n.detail + "',this)\">" + n.levelName + "</li>";
            }
            //     Project.AddMarker(new BMap.Point(n.position.split(',')[0], n.position.split(',')[1]));
        });
        $("#ul_level").html(htmlStr);

    },
    Buy_Report: function () {
        if (Project.ReportShow == 0) {
            ShowMesaage("报告未生成，请稍后再试！");
            return;
        }
        localStorage[g_const_localStorage.OrderConfirm] = Project.ReportSelect;
        PageUrlConfig.SetUrl();
        window.location.href = g_const_PageURL.OrderConfirm + "?t=" + Math.random();
    },
    SetReportLevel: function (code, price, pic,detail, obj) {

        Project.ReportSelect = code;
        
        $("#div_price").html("￥" + price);
        if (pic == "") {
            $("#div_img").html("<img src=\"/img/defalt.jpg\">");
        }
        else {
            $("#div_img").html("<img src=\"" + pic + "\">");
        }
        $("#ul_level").find('li').each(function () {
            $(this).attr("class", "");
        });
        $("#p_detail_report").html(detail);
        $(obj).attr("class", "curr");
    }
};
//var ProjectList = {
//    ReportShow:0,
//    api_target: "report_data",
//    api_input: { "code": "", "pageSize": 10, "pageIndex": 0 },
//    //加载多页
//    GetList: function () {
//        //组织提交参数
//        var s_api_input = JSON.stringify(ProjectList.api_input);
//        //提交接口[api_token不为空，公用方法会从sission中获取]
//        var obj_data = { "api_input": s_api_input, "api_target": ProjectList.api_target, "api_token": "" };
//        var purl = g_APIUTL;
//        var request = $.ajax({
//            url: purl,
//            cache: false,
//            method: g_APIMethod,
//            data: obj_data,
//            dataType: g_APIResponseDataType
//        });
//        //正常返回
//        request.done(function (msg) {
//            if (msg.resultCode == g_const_Success_Code) {
//                if (msg.repCount > 0) {
//                    $.each(msg.repList, function (i, n) {
//                        if (n.housesCode == ProjectList.api_input.code) {
//                            Project.api_input.code = n.code;
//                            Project.GetList();
//                            Project.ReportShow++;
//                            return false;
//                        }
//                    });
//                    if (Project.ReportShow == 0) {
//                        ShowMesaage("报告未生成，请稍后再试！");
//                    }
//                    $("#p_detail").html(msg.detail);
//                }
//            }
//            else {
//                ShowMesaage(msg.resultMessage);
//            }
//        });
//        //接口异常
//        request.fail(function (jqXHR, textStatus) {
//            ShowMesaage(g_const_API_Message["7001"]);
//        });
//        //}

//    },
//};


//评论添加接口?apiTarget=lpc_add&apiInput={'lpCode':'LP161004101471','content':'测试楼盘评价','level':'0'}&userToken=6a397b4cd42f4d62b3c5c43143d94714
//最新评论接口，获取最新5条评论?apiTarget=lpc_top&apiInput={'lpCode':'LP161004101471'}
//评论列表接口# level 评价等级 0 好评 1 中评 2 差评 ，可以不传level ，如果不传默认为全部?apiTarget=lpc_top&apiInput={'lpCode':'LP161004101471','pageIndex':'0','pageSize':'10','level':'0'}
//{"resultCode":0,"list":[{"content":"测试楼盘评价","phone":"18600577281","rlName":"普通","orderCode":"D1610101001","rCode":"R161009100010","orderTime":"2016-10-10 00:00:00.0","rlCode":"RL161006100001"}],"resultMessage":"获取楼盘最新5条数据成功","goodPercent":100}
//{"total":9,"badTotal":0,"resultCode":0,"list":[{"content":"测试楼盘评价","phone":"18600577281","rlName":"普通","orderCode":"D1610101001","rCode":"R161009100010","orderTime":"2016-10-10 00:00:00.0","rlCode":"RL161006100001"},{"content":"测试楼盘评价","phone":"18600577281","rlName":"普通","orderCode":"D1610101002","rCode":"R161009100010","orderTime":"2016-10-10 00:00:00.0","rlCode":"RL161006100001"},{"content":"测试楼盘评价","phone":"18600577281","rlName":"普通","orderCode":"D1610101002","rCode":"R161009100010","orderTime":"2016-10-10 00:00:00.0","rlCode":"RL161006100001"},{"content":"测试楼盘评价","phone":"18600577281","rlName":"普通","orderCode":"D1610101002","rCode":"R161009100010","orderTime":"2016-10-10 00:00:00.0","rlCode":"RL161006100001"},{"content":"测试楼盘评价","phone":"18600577281","rlName":"普通","orderCode":"D1610101002","rCode":"R161009100010","orderTime":"2016-10-10 00:00:00.0","rlCode":"RL161006100001"},{"content":"被很多很多","phone":"18600577281","rlName":"普通","orderCode":"D1610101002","rCode":"R161009100010","orderTime":"2016-10-10 00:00:00.0","rlCode":"RL161006100001"},{"content":"测试楼盘评价","phone":"18600577281","rlName":"普通","orderCode":"D1610101005","rCode":"R161009100010","orderTime":"2016-10-10 00:00:00.0","rlCode":"RL161006100001"},{"content":"测试楼盘评价","phone":"18600577281","rlName":"普通","orderCode":"D1610101005","rCode":"R161009100010","orderTime":"2016-10-10 00:00:00.0","rlCode":"RL161006100001"},{"content":"还行","phone":"15810000001","rlName":"普通","orderCode":"D1610101003","rCode":"R161009100010","orderTime":"2016-10-10 00:00:00.0","rlCode":"RL161006100001"}],"mediumTotal":2,"resultMessage":"查询评论成功","goodTotal":7}
var CommentTop = {
    api_target: "lpc_top",
    api_input: { "lpCode": "" },
    //加载多页
    GetList: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(CommentTop.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": CommentTop.api_target, "api_token": "" };
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
                
                    $("#reviewNo").hide();
                    $("#div_comment_no").hide();
                    $("#reviewList").show();
                    $("#div_commodity_review").show();
                    CommentTop.Load_List(msg.list);
                    $("#p_goodrate").html("好评度<i>" +msg.goodPercent + "%</i>" +msg.total + "人评论");
                    $("#p_good").html(msg.goodPercent + "<span>%</span>");
            }
            else {
                if (msg.total==0) {
                        $("#reviewNo").show();
                        $("#div_comment_no").show();
                        $("#reviewList").hide();
                        $("#div_commodity_review").hide();
                }
              //  ShowMesaage(msg.resultMessage);
            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
          //  ShowMesaage(g_const_API_Message["7001"]);
        });
        //}

    },
    Load_List: function (resultlist) {

        var htmlStr = "";
        $.each(resultlist, function (i, n) {
        
            htmlStr += "<li num=\"202044-li-1\">";
            htmlStr += "<img src=\"/img/lnologin@2x.png\" class=\"pic\">";
            htmlStr += "<h3><font class=\"f";
            switch (n.level) {
                case 0:
                    htmlStr += "3";
                break;
                case 1:
                    htmlStr += "2";
                break;
                case 2:
                    htmlStr += "1";
                break;
            }
            htmlStr += "\"></font>" +n.phone.substr(0, 3) +"****"+n.phone.substr(7, 4) + "</h3>";
            htmlStr += "<b>" + n.content + "</b>";
            if (n.orderCode!="") {
                htmlStr += "<strong>" +n.orderTime.split(' ')[0]+ " 等级： " +n.rlName + "</strong>";
            }
            
            htmlStr += "</li>";
        });
        $("#ul_comment_top").html(htmlStr);

    },
};

var CommentAll = {
    
    api_target: "lpc_data",
    api_input: { "lpCode": "", "pageSize": 10, "pageIndex": 0,"level":"" },
    //加载多页
    GetList: function () {
        $("#a_type_all").removeClass("curr");
        $("#a_type_good").removeClass("curr");
        $("#a_type_ok").removeClass("curr");
        $("#a_type_bad").removeClass("curr");
        //组织提交参数
        var s_api_input = JSON.stringify(CommentAll.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": CommentAll.api_target, "api_token": "" };
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
                CommentAll.Load_List(msg.list);
                $("#a_type_all").html("全部(" + msg.total + ")");
                $("#a_type_good").html("好评(" + msg.goodTotal + ")");
                $("#a_type_ok").html("中评(" + msg.mediumTotal + ")");
                $("#a_type_bad").html("差评(" + msg.badTotal + ")");
                if (msg.total>0) {
                    $("#lbl_good").html("好评(" + parseInt(msg.goodTotal * 100 / msg.total) + "%)");
                    $("#lbl_ok").html("中评(" + parseInt(msg.mediumTotal * 100 / msg.total) + "%)");
                    $("#lbl_bad").html("差评(" + parseInt(msg.badTotal * 100 / msg.total) + "%)");
                    $("#span_good").width(parseInt(msg.goodTotal * 100 / msg.total) + "%");
                    $("#span_ok").width(parseInt(msg.mediumTotal * 100 / msg.total) + "%");
                    $("#span_bad").width(parseInt(msg.badTotal * 100 / msg.total) + "%");
                }

            }
            else {
                $("#reviewList").html("");
              //  ShowMesaage(msg.resultMessage);
            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
          //  ShowMesaage(g_const_API_Message["7001"]);
        });
        //}

    },
    Load_List: function (resultlist) {

        var htmlStr = "";
        $.each(resultlist, function (i, n) {

            htmlStr += "<li><img src=\"/img/lnologin@2x.png\" alt=\"\" class=\"pic\">";
            htmlStr += "<h2><font class=\"f";
            switch (n.level) {
                case 0:
                    htmlStr += "3";
                    break;
                case 1:
                    htmlStr += "2";
                    break;
                case 2:
                    htmlStr += "1";
                    break;
            }
            htmlStr += "\"></font>" + n.phone.substr(0, 3) + "****" + n.phone.substr(7, 4) + "</h2>";
            htmlStr += "<b>" + n.content + "</b>";
            if (n.orderCode!="") {
                htmlStr += "<strong>" + n.orderTime.split(' ')[0] + " 等级：" + n.rlName + "</strong>";
                }
            htmlStr += "<div class=\"reply\"> <p></p><span> </span></div></li>";
        });
        $("#reviewList").html(htmlStr);

    },
    OpenComment: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO && document.referrer.toLowerCase().indexOf("login") == -1) {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
            return;
        }
        $("#div_Follow").show();
    },
    CloseComment: function () {
        $("#div_Follow").hide();
    },
};

var CommentSend = {
    api_target: "lpc_add",
    api_input: { "lpCode": "", "content": "", "level": "0" },
    //加载多页
    GetList: function () {
        CommentSend.api_input.content = $("#txtComment").val();
        
        //组织提交参数
        var s_api_input = JSON.stringify(CommentSend.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": CommentSend.api_target, "api_token": "1" };
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
                CommentTop.GetList();
                CommentAll.GetList();
                $("#div_Follow").hide();
            }
            else {
                ShowMesaage(msg.resultMessage);
            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
        //}

    },
};

var Collection = {
    api_target: "lp_follow_add",
    api_input: { "lpCode": "" },
    Status:0,
    //加载多页
    Add: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            PageUrlConfig.SetUrl();
            window.location.href = g_const_PageURL.Login + "?t=" + Math.random();
            return;
        }
        if (Collection.Status == 1) {
            return;
        }
        //组织提交参数
        var s_api_input = JSON.stringify(Collection.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": Collection.api_target, "api_token": "1" };
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
                ShowMesaage("添加关注成功");
                Collection.Status = 1;
                $("#b_AddCol").attr("class", "collect on");
            }
            else {
                ShowMesaage(msg.resultMessage);
            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
        //}

    },
};

var History = {
    api_target: "lp_visit_add",
    api_input: { "lpCode": "" },
    //加载多页
    Add: function () {
        if (UserInfo.LoginStatus == g_const_YesOrNo.NO) {
            return;
        }
        //组织提交参数
        var s_api_input = JSON.stringify(History.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": History.api_target, "api_token": "1" };
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
              //  ShowMesaage("添加浏览成功");
            }
            else {
             //   ShowMesaage(msg.resultMessage);
            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
        //}

    },
};