$(document).ready(function () {

    Project.api_input.lpCode = GetQueryString("code");
    UserInfo.Check(Project.GetList);

    Environment.api_input.position = GetQueryString("lat")+","+GetQueryString("lng");
    Environment.api_input.city = decodeURIComponent(GetQueryString("city"));
    Environment.GetObj();

    Weather.api_input.position = GetQueryString("lat") + "," + GetQueryString("lng");
    Weather.api_input.city = decodeURIComponent(GetQueryString("city"));
    Weather.GetList();

    CommentAll.api_input.lpCode = GetQueryString("code");
    CommentAll.GetList();

    Collection.api_input.lpCode = GetQueryString("code");

    History.api_input.lpCode = GetQueryString("code");
    UserInfo.Check(History.Add);

    CommentSend.api_input.lpCode = GetQueryString("code");
    CommentSend.api_input.level = "1";

    $("#btnback").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
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
    $("em").on("click", function () {
        var grade = $(this).attr("grade");
        var parentFont = $(this).parent().parent();
        $(parentFont).attr("class", "f" +grade).attr("grade", grade);
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
});
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
            if (msg.resultCode >= g_const_Success_Code) {
                $("#span_report").html(msg.name);
                var imageList = JSON.parse(msg.image);
                var g_const_share_pic = "";
                if (imageList.length == 0) {
                    $("#img_report").attr("src", "/img/default_big_4.jpg");
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
    SetReportLevel: function (code, price, pic, detail, obj) {

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
var radarChartData = {
    labels: [],
    datasets: [
        {
            label: "",
            fillColor: "rgba(0,0,0,0)",
            strokeColor: "rgba(0,0,0,0)",
            pointColor: "rgba(0,0,0,0)",
            pointStrokeColor: "rgba(0,0,0,0)",
            pointHighlightFill: "rgba(0,0,0,0)",
            pointHighlightStroke: "rgba(0,0,0,0)",
            data: [5, 5, 5, 5, 5, 5, 5, 5, 5]
        },
        {
            label: "",
            fillColor: "rgba(105,145,92,0.9)", //rgba(255,239,229,0.6)面积颜色
            strokeColor: "rgba(250,250,250,0)", //rgba(227,211,201,0.6) 面积外框颜色
            pointColor: "rgba(250,250,250,0)", //rgba(255,95,1,1) 断点颜色
            pointStrokeColor: "transparent", //"#ff5f01"  transparent
            pointHighlightFill: "transparent", //"#ff5f01"
            pointHighlightStroke: "rgba(200,76,4,0)", //rgba(200,76,4,0.8)
            data: []
        }
    ]
};
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
                Environment.Load_Result(msg.detailList);
                Environment.Load_Info(msg);
                if (msg.AQIList) {
                    Environment.Load_AQI(msg.AQIList);
                }
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
    Load_AQIDialog: function (name) {
        var htmlStr = "";
        switch (name) {
            case "空气":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>空气质量指数（Air Quality Index，简称AQI）可以定量描述空气质量状况。空气质量按照空气质量指数大小分为六级，相对应空气质量的六个类别，指数越大、级别越高说明污染的情况越严重，对人体的健康危害也就越大。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_01'>";
                htmlStr += "<thead><tr><th class='cel-50'>级别</th><th class='cel-50'>空气质量指数</th></tr></thead>";
                htmlStr += "<tbody><tr><td>1级 优</td><td>0-50</td></tr>";
                htmlStr += "<tr><td>2级 良</td><td>51-100</td></tr>";
                htmlStr += "<tr><td>3级 轻度污染</td><td>101-200</td></tr>";
                htmlStr += "<tr><td>4级 中度污染</td><td>201-250</td></tr>";
                htmlStr += "<tr><td>5级 重度污染</td><td>251-300</td></tr>";
                htmlStr += "<tr><td>6级 严重污染</td><td>300以上</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "噪音":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>凡是妨碍人们正常休息、学习和工作的声音，以及对人们要听的声音产生干扰的声音都属于噪音。按照普通人的听力水平，50分贝相当于正常交谈的声音，30-40分贝是比较安静的正常环境，60分贝以上就属于吵闹范围了。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_02'>";
                htmlStr += "<thead><tr><th class='cel-33'>级别</th><th class='cel-33'>昼间分贝数</th><th class='cel-33'>夜间分贝数</th></tr></thead>";
                htmlStr += "<tbody><tr><td>I 类 优</td><td>55以下</td><td>45以下</td></tr>";
                htmlStr += "<tr><td>II类 良</td><td>60以下</td><td>50以下</td></tr>";
                htmlStr += "<tr><td>III类 中度污染</td><td>65以下</td><td>55以下</td></tr>";
                htmlStr += "<tr><td>IV类 严重污染</td><td>65以上</td><td>55以上</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "危险品":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>危险品包括爆炸品、易燃物、氧化剂、毒害品、放射性物、腐蚀品等。根据《危险化学品经营企业开业条件和技术要求》，大中型危险化学品仓库应与周围公共建筑物、交通干线（公路、铁路、水路）、工矿企业等距离至少保持1000米。但是中国国内尚没有对危化品堆场与住宅、学校等人口密集区域、甚至饮用水源地的安全距离作出清晰的法律规定。</p>";
                break;
            case "水质":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>水质是水体的物理性质（如色度、浊度、臭味等）、化学组成（无机物和有机物的含量）、生物学特性（细菌、微生物、浮游生物、底栖生物）的总称。依照《地面水环境质量标准》（GB3838-2002）中规定，地面水使用目的和保护目标，我国地面水分五大类。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_04'>";
                htmlStr += "<thead><tr><th class='cel-12'>级别</th><th class='cel-88'>说明</th></tr></thead>";
                htmlStr += "<tbody><tr><td>I 类</td><td>水质良好。地下水只需消毒处理，地表水经简易净化处理(如过滤)、消毒后即可供生活饮用者。</td></tr>";
                htmlStr += "<tr><td>II类</td><td>主要适用于集中式生活饮用水，经常规净化处理(如絮凝、沉淀、过滤、消毒等)，其水质即可供生活饮用者。</td></tr>";
                htmlStr += "<tr><td>III类</td><td>适用于集中式生活饮用水、但水质受轻度污染，一般是鱼类保护区及游泳区。</td></tr>";
                htmlStr += "<tr><td>IV类</td><td>存在比较严重污染，不能供生活应用者，主要适用于一般工业用水区及人体非直接接触的娱乐用水区。</td></tr>";
                htmlStr += "<tr><td>V类</td><td>主要适用于农业用水区及一般景观要求水域。</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "土壤":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>土壤是地球陆地的表面由矿物质、有机质、水、空气和生物组成的，具有肥力并能生长植物的疏松表层。根据土壤应用功能和保护目标，可将土壤划分为三类。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_04'>";
                htmlStr += "<thead><tr><th class='cel-18'>级别</th><th class='cel-82'>说明</th></tr></thead>";
                htmlStr += "<tbody><tr><td>I类一级</td><td>适用于国家规定的自然保护区、集中式生活饮用水源地、茶园、牧场和其他保护地区的土壤，土壤质量基本上保持自然背景水平。</td></tr>";
                htmlStr += "<tr><td>II类二级</td><td>适用于一般农田、蔬菜地、茶园果园、牧场等土壤，土壤质量基本上对人体、植物和环境不造成危害和污染</td></tr>";
                htmlStr += "<tr><td>III类三级</td><td>适用于林地土壤及污染物容量较大的高背景值土壤和矿产附近等地的农田土壤。土壤质量对人体、植物和环境造成的危害和污染较小。</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "污染源":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>目前可查询的污染源包括化工厂和垃圾处理中心。点点环境将会持续增加其它污染源信息。化工厂在生产、储运过程中如发生爆炸、泄露或非法排放，有可能对人体造成中毒、窒息、化学灼伤等伤害。垃圾处理中心则存在垃圾臭气、垃圾渗沥液、焚烧产生的二噁英等污染物的潜在风险。距离污染源越近，风险等级越高，对人造成危害的可能性越大。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_03'>";
                htmlStr += "<thead><tr><th rowspan='2' class='cel-20'>污染源类型</th><th colspan='3' class='botb'>所在地与污染源之间距离</th></tr>";
                htmlStr += "<tr><th class='cel-25'>安全(米)</th><th class='cel-30'>存在一定潜在风险(米)</th><th class='cel-25'>潜在风险高(米)</th></tr></thead>";
                htmlStr += "<tbody><tr><td>化工厂</td><td>&lt;2000</td><td>1000&lt;<i>☺</i>&lt;2000</td><td>&lt;1000</td></tr>";
                htmlStr += "<tr><td>垃圾转运站</td><td>&lt;1000</td><td>300&lt;<i>☺</i>&lt;1000</td><td>&lt;300</td></tr>";
                htmlStr += "<tr><td>垃圾填埋场</td><td>&lt;1000</td><td>300&lt;<i>☺</i>&lt;1000</td><td>&lt;300</td></tr>";
                htmlStr += "<tr><td>垃圾焚烧场</td><td>&lt;3000</td><td>1000&lt;<i>☺</i>&lt;3000</td><td>&lt;1000</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "辐射":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>目前可查询的辐射为高压线辐射。高压线产生的电磁场一般称为极低频电磁场或者叫工频电场。高压线、变电站会产生电磁辐射，它产生的工频电场是感应电场感应磁场，因为它的波长非常长，所以它不会像电磁辐射那样被人体直接吸收，但是会在人体里头感应出电流来，这个感应电流需要控制。工频电场会在人体中产生感应电流，为了防止对人体产生影响，需要将感应电流密度控制在一定的范围内。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_01'>";
                htmlStr += "<thead><tr><th class='cel-50'>高压线级别</th><th class='cel-50'>安全距离</th></tr></thead>";
                htmlStr += "<tbody><tr><td>220千伏</td><td>100米外</td></tr>";
                htmlStr += "<tr><td>132千伏</td><td>20米外</td></tr>";
                htmlStr += "<tr><td>11-66千伏</td><td>10米外</td></tr>";
                htmlStr += "<tr><td>地埋高压线</td><td>5米外</td></tr></tbody>";

                htmlStr += "</table></div>";
                break;
            case "容积率":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>容积率又称建筑面积毛密度，指项目用地范围内地上总建筑面积与项目总用地面积的比值。容积率是衡量建设用地使用强度的一项重要指标。现行城市规划法规体系详细制定了各类居住用地容积率标准。住宅小区容积率小于1.0的，为非普通住宅。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_01'>";
                htmlStr += "<thead><tr><th class='cel-50'>居住用地种类</th><th class='cel-50'>容积率标准</th></tr></thead>";
                htmlStr += "<tbody><tr><td>独立别墅</td><td>0.2-0.5</td></tr>";
                htmlStr += "<tr><td>联排别墅</td><td>0.4-0.7</td></tr>";
                htmlStr += "<tr><td>6层以下住宅</td><td>0.8-1.2</td></tr>";
                htmlStr += "<tr><td>11层以下小高层住宅</td><td>1.5-2</td></tr>";
                htmlStr += "<tr><td>18层高层住宅</td><td>1.8-2.5</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
            case "绿化率":
                htmlStr += "<img class=\"APIdialogImg\" src=\"img/numa.png\" ><span class=\"close\" onclick=\"Project.Close_AQIDialog()\"></span><p>居住区绿地率是描述居住区用地范围内各类绿地的总和与居住区用地的比率。绿地率所指的\"居住区用地范围内各类绿地\"主要包括公共绿地、宅旁绿地等。其中，公共绿地，又包括居住区公园、小游园、组团绿地及其他的一些块状、带状化公共绿地。绿地率=绿地面积/用地面积×100%。 根据《城市居住区规划设计规范》，绿地率的级别可分为三大类。";
                htmlStr += "</p><div class='tb'><table  border='0' class='tb_01'>";
                htmlStr += "<thead><tr><th class='cel-50'>绿地率</th><th class='cel-50'>说明</th></tr></thead>";
                htmlStr += "<tbody><tr><td>30%以上</td><td>绿化程度非常好的小区。</td></tr>";
                htmlStr += "<tr><td>25%-30%</td><td>绿地率一般。</td></tr>";
                htmlStr += "<tr><td>25%以下</td><td>绿地率较低。</td></tr></tbody>";
                htmlStr += "</table></div>";
                break;
        }
        $("#div_AQI").html(htmlStr);
        $("#div_AQI").show();
    },
    Close_AQIDialog: function () {
        $("#div_AQI").hide();
    },
    //加载单页
    //接口返回成功后的处理
    Load_Result: function (resultlist) {
        //var list = [{ "name": "空气", "level": "良", "memo": "67" }
        //          , { "name": "噪音", "level": "III类", "memo": "55/65" }
        //          , { "name": "危险品", "level": "安全", "memo": "无" }
        //          , { "name": "水质", "level": "优良", "memo": "色度低" } 
        //          , { "name": "土壤", "level": "优", "memo": "无污染" }
        //          , { "name": "污染源", "level": "垃圾站/化工厂", "memo": "5Km以外" }
        //          , { "name": "辐射", "level": "优", "memo": "无" }
        //          , { "name": "容积率", "level": "1.2", "memo": "最近楼盘名称" }
        //          , { "name": "绿化率", "level": "25%", "memo": "最近楼盘名称" }]
        var htmlStr = "";
        var radarVal = 0;
        var radarKey = [];
        $.each(resultlist, function (i, n) {

            htmlStr += "<li class=\"fl\" onclick=\"Project.Load_AQIDialog('" + n.name + "')\">";
            htmlStr += "<p>" + (n.name != null ? n.name.replace(/绿化率/g, "绿地率") : "") + "<span class=\"t_state ";
            switch (n.level) {
                case "优":
                case "较远":
                case "较少":
                case "优良":
                case "I类":
                case "I":
                case "l类":
                case "高":
                case "无":
                case "安全":
                    if (n.name == "容积率") {
                        htmlStr += "bad ";
                        radarVal = 1;
                    }
                    else {
                        htmlStr += "verygood ";
                        radarVal = 5;
                    }
                    break;
                case "良":
                case "II类":
                case "II":
                case "ll类":
                case "中":
                    htmlStr += "good ";
                    radarVal = 4;
                    break;
                case "III类":
                case "III":
                case "lll类":
                    htmlStr += "yiban ";
                    radarVal = 3;
                    break;
                case "IV类":
                case "IV":
                case "lV类":
                case "低":
                case "轻度污染":
                case "中度污染":
                case "垃圾站":
                case "化工厂":
                case "高压电":
                    if (n.name == "容积率") {
                        htmlStr += "verygood ";
                        radarVal = 4;
                    }
                    else {
                        htmlStr += "bad ";
                        radarVal = 2;
                    }
                    break;
                case "IIV":
                case "IIV类":
                case "llV类":
                case "重度污染":
                case "严重污染":
                    htmlStr += "verybad ";
                    radarVal = 1;
                    break;
                default:
                    if (n.level.indexOf('%') > -1) {
                        radarVal = parseInt(n.level.replace(/%/g, "")) / 10;
                    }
                    else {

                        radarVal = parseFloat(n.level) / 0.5;
                    }
                    htmlStr += "verygood ";
                    break;
            }
            htmlStr += "\">";
            switch (n.level) {
                case "轻度污染":
                    htmlStr += "轻污";
                    break;
                case "中度污染":
                    htmlStr += "中污";
                    break;
                case "重度污染":
                    htmlStr += "重污";
                    break;
                case "严重污染":
                    htmlStr += "严污";
                    break;
                default:
                    if (n.level != null) {
                        if (n.level.indexOf('/') > -1) {
                            htmlStr += n.level.split('/')[0] + n.level.split('/')[1].substr(0, 1);
                        }
                        else {
                            htmlStr += (n.level != null ? n.level : "");
                        }
                    }
                    else {
                        htmlStr += "";
                    }
                    break;
            }
            htmlStr += "</span></p>";
            htmlStr += "<b>" + (n.memo != null ? n.memo : "") + "</b>";
            htmlStr += "</li>";
            radarKey.push((n.name != null ? n.name.replace(/绿化率/g, "绿地率") : ""));
            //  radarChartData.labels.push((n.name != null ? n.name.replace(/绿化率/g, "绿地率"): ""));
            //radarChartData.labels=["空气", "噪音", "污染源", "水质", "土壤", "危险品", "辐射", "容积率", "绿化率"];
            radarChartData.datasets[1].data.push(radarVal);

        });
        radarChartData.labels = radarKey;
        $("#ul_DetailList").html(htmlStr);
        window.myRadar = new Chart(document.getElementById("myChart").getContext("2d")).Radar(radarChartData, {
            responsive: true,
            //Number - Point label font size in pixels  
            pointLabelFontSize: 8,
            //String - Colour of the scale line 
            scaleLineColor: "rgba(255,255,255,.7)",
            //Number - Scale label font size in pixels  
            scaleFontSize: 1,
            //String - Scale label font colour  
            scaleFontColor: "#fff",
            //String - The colour of the label backdrop 
            scaleBackdropColor: "rgba(255,255,255,0.75)",
            //String - Colour of the angle line
            angleLineColor: "rgba(255,255,255,0.75)",
            //String - Point label font colour  
            pointLabelFontColor: "#fff"
        });
    },
    Load_AQI: function (resultlist) {

        var htmlStr = "";
        $.each(resultlist, function (i, n) {
            htmlStr += "<li class=\"fl\">";
            htmlStr += "<span class=\"week\">" + n.week + "</span>";
            htmlStr += "<span class=\"date\">" + n.date + "</span>";
            htmlStr += "<span class=\"pollute ";
            switch (n.level) {
                case "优":
                    htmlStr += "verygood ";
                    break;
                case "良":
                    htmlStr += "good ";
                    break;
                case "轻度污染":
                    htmlStr += "bad ";
                    break;
                case "中度污染":
                    htmlStr += "verybad ";
                    break;
                case "重度污染":
                    htmlStr += "veryverybad ";
                    break;
                case "严重污染":
                    htmlStr += "veryverybadandbad ";
                    break;
            }
            htmlStr += "\">";
            switch (n.level) {
                case "轻度污染":
                    htmlStr += "轻污";
                    break;
                case "中度污染":
                    htmlStr += "中污";
                    break;
                case "重度污染":
                    htmlStr += "重污";
                    break;
                case "严重污染":
                    htmlStr += "严污";
                    break;
                default:
                    htmlStr += n.level;
                    break;
            }
            htmlStr += "</span>";
            htmlStr += "</li>";
        });
        $("#ul_week").html(htmlStr);
    },
    Load_Info: function (result) {

        $("#div_score").html("<p>环境质量评分：</p>" + parseInt(result.score) + "<span>分</span>");
        $("#div_score_general").html("<span>环境质量评分：</span>" + parseInt(result.score));
        if (result.score < 60) {
            //$("#div_score").removeClass("pm fl");
            $("#div_pmwrap").attr("class", "pmWrap pmWrap-bad no clearfix");
            $("#div_score").attr("class", "pm bad fl");
            $("#div_level").html("<img src=\"img/bad.png\"> ");
            $("#div_level_general").html("<img src=\"img/bad.png\"> ");
            $("#div_upper").html("糟糕的环境质量就是我们一起赖床，一起蜗居的最好理由。");
            $("#div_chart_info").html("周边一项或多项环境数据严重不达标，可能会在一定程度上影响您的生活、健康与安全，了解更多请 <a onclick=\"Project.Load_Detail('" + Environment.SelectProjectCode + "')\" style=\"cursor:pointer;color:white\">购买该楼盘环境质量报告</a>");
        }
        else if (result.score > 80) {
            //$("#div_score").removeClass("pm fl");
            $("#div_pmwrap").attr("class", "pmWrap pmWrap-good no clearfix");
            $("#div_score").attr("class", "pm bad fl");
            $("#div_level").html("<img src=\"img/good.png\"> ");
            $("#div_level_general").html("<img src=\"img/good.png\"> ");
            $("#div_upper").html("不能辜负的好时节，让我们一起畅快的运动，尽情的吸氧吧。");
            $("#div_chart_info").html("周边空气清新，噪音干扰较平时更少，其它环境指标均符合国家相关标准，与各种污染源、辐射源存在一定的安全距离，潜在风险较低，了解更多请 <a onclick=\"Project.Load_Detail('" + Environment.SelectProjectCode + "')\" style=\"cursor:pointer;color:white\">购买该楼盘环境质量报告</a>");
        }
        else {
            //$("#div_score").removeClass("pm fl");
            $("#div_pmwrap").attr("class", "pmWrap pmWrap-liang no clearfix");
            $("#div_score").attr("class", "pm bad fl");
            $("#div_level").html("<img src=\"img/yiban.png\"> ");
            $("#div_level_general").html("<img src=\"img/yiban.png\"> ");
            $("#div_upper").html("周边的环境就像我们当下的生活，不好，但也不差。");
            $("#div_chart_info").html("周边一项或多项环境指标存在轻度或中度污染，与各种污染源、辐射源存在一定的安全距离，潜在风险可控，了解更多请 <a onclick=\"Project.Load_Detail('" + Environment.SelectProjectCode + "')\" style=\"cursor:pointer;color:white\">购买该楼盘环境质量报告</a>");
        }
        //if (result.tiptitle.length > 40) {
        //    $("#div_upper").html(result.tiptitle.substring(0, 40) + "...");
        //}
        //else {
        //    $("#div_upper").html(result.tiptitle);
        //}

    },

};
var Weather = {
    api_input: { "position": "", "city": "", "radius": g_const_Map_Distance },
    show_position: "",
    //加载多页
    GetList: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(Weather.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "1025", "api_token": "" };
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
                Weather.Load_Result(msg);
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
    Load_Result: function (msg) {
        var weathericon = "";
        var oDate = new Date();
        var daytype = "";
        if (oDate.getHours() >= 7 && oDate.getHours() < 19) {
            daytype = "day/";
        }
        else {
            daytype = "night/";
        }
        //if (msg.weatherId.fa == msg.weatherId.fb) {
        //    weathericon = "<i><img src=\"img/weather/" + daytype + msg.weatherId.fa + ".png\" /></i>";
        //}
        //else {
        //    weathericon = "<i class=\"two\"><img src=\"img/weather/" + daytype + msg.weatherId.fa + ".png\" /><img src=\"img/weather/" + daytype + msg.weatherId.fb + ".png\" /></i>";

        //}
        if (msg.weatherId.fa == msg.weatherId.fb) {
            $("#span_weather_icon_2").attr("style", "background:url(\"/img/weather/" + daytype + msg.weatherId.fa + ".png\") no-repeat;width: .14rem;height: .14rem;background-size: 100%;margin-right: .05rem;");
            $("#span_weather_icon_2").show();
        }
        else {
            $("#span_weather_icon_1").attr("style", "background:url(\"/img/weather/" + daytype + msg.weatherId.fa + ".png\") no-repeat;width: .14rem;height: .14rem;background-size: 100%;margin-right: .05rem;");
            $("#span_weather_icon_1").show();
            $("#span_weather_icon_2").attr("style", "background:url(\"/img/weather/" + daytype + msg.weatherId.fb + ".png\") no-repeat;width: .14rem;height: .14rem;background-size: 100%;margin-right: .05rem;");
            $("#span_weather_icon_2").show();
        }
        $("#span_general").html(msg.tempmin + "/" + msg.tempmax);

    },
    api_input_del: { "idList": "" },
    Delete: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(Weather.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": JSON.stringify(Weather.api_input_del), "api_target": "lp_visit_del", "api_token": g_const_api_token.Wanted };
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
                Weather.GetList()
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
    GetDate: function () {
        //组织提交参数
        var s_api_input = JSON.stringify({});
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": "2051", "api_token": "" };
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
            if (msg.flag == false) {
                $("#span_date").html(msg.date.replace(/-/g, ".") + msg.weekday);
            }
            else {
                if (msg.date == msg.holidayFestival) {
                    $("#span_date").html(msg.date.replace(/-/g, ".") + msg.weekday + " " + msg.holidayName + "<i>" + msg.lunarYear + msg.lunar + "</i>");
                }
                else {
                    $("#span_date").html(msg.date.replace(/-/g, ".") + msg.weekday + "<i>" + msg.lunarYear + msg.lunar + "</i>");
                }
            }
        });
        //接口异常
        request.fail(function (jqXHR, textStatus) {
            ShowMesaage(g_const_API_Message["7001"]);
        });
        //}

    },
};
var CommentAll = {

    api_target: "lpc_data",
    api_input: { "lpCode": "", "pageSize": 10, "pageIndex": 0, "level": "" },
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
                if (msg.total > 0) {
                    $("#lbl_good").html("好评(" + parseInt(msg.goodTotal * 100 / msg.total) + "%)");
                    $("#lbl_ok").html("中评(" + parseInt(msg.mediumTotal * 100 / msg.total) + "%)");
                    $("#lbl_bad").html("差评(" + parseInt(msg.badTotal * 100 / msg.total) + "%)");
                    $("#span_good").width(parseInt(msg.goodTotal * 100 / msg.total) + "%");
                    $("#span_ok").width(parseInt(msg.mediumTotal * 100 / msg.total) + "%");
                    $("#span_bad").width(parseInt(msg.badTotal * 100 / msg.total) + "%");
                    $("#p_good").html(parseInt(msg.goodTotal * 100 / msg.total) + "%");
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
            if (n.orderCode != "") {
                htmlStr += "<strong>" + n.orderTime.split(' ')[0] +"</strong>";
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
    Status: 0,
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