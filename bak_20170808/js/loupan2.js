$(document).ready(function () {
    FooterMenu.Set(2);
    try {
        if (localStorage[g_const_localStorage.City] != undefined && localStorage[g_const_localStorage.City] != "") {
            Project.api_input.city = localStorage[g_const_localStorage.City];
            $("#btnSearch").show();
        }
        else {
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var geoc = new BMap.Geocoder();
                    var po = r.point;
                    geoc.getLocation(po, function (rs) {
                        var addComp = rs.addressComponents;
                        Project.api_input.city = addComp.city.replace(/市/g, "");
                        $("#btnSearch").show();
                    });
                }
            }, { enableHighAccuracy: true })
        }

    } catch (e) {
        alert(e.toString());
    }
    $("#btnback").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
    });
    $("#btnSearch").click(function () {
        //Project.api_input.type = $("#selType").val();
        //if (Project.api_input.type=="") {
        //    ShowMesaage("请选择排行类型");
        //    return;
        //}
        //if ($("#txtYear").val()=="") {
        //    ShowMesaage("请输入年份");
        //    return;
        //}
        switch (Project.api_input.type) {
            case "year":
                if (parseInt($("#txtYear").val()) < 2000 || parseInt($("#txtYear").val()) > 3000) {
                    ShowMesaage("请输入正确的年份");
                    return;
                }
                Project.api_input.date = $("#txtYear").val();
                Project.api_input.year = "";

                break;
            case "quarter":
                if (parseInt($("#txtYear").val()) < 2000 || parseInt($("#txtYear").val()) > 3000) {
                    ShowMesaage("请输入正确的年份");
                    return;
                }
                switch ($("#selMonth").val()) {
                    case "01":
                    case "02":
                    case "03":
                        Project.api_input.date = "1";
                        break;
                    case "04":
                    case "05":
                    case "06":
                        Project.api_input.date = "2";
                        break;
                    case "07":
                    case "08":
                    case "09":
                        Project.api_input.date = "3";
                        break;
                    case "10":
                    case "11":
                    case "12":
                        Project.api_input.date = "4";
                        break;
                }
                Project.api_input.year = $("#txtYear").val();
                break;
            case "month":
                if (parseInt($("#txtYear").val()) < 2000 || parseInt($("#txtYear").val()) > 3000) {
                    ShowMesaage("请输入正确的年份");
                    return;
                }
                Project.api_input.date = $("#txtYear").val() + "-" + $("#selMonth").val();
                Project.api_input.year = "";
                break;
        }
        Project.api_input.pageSize = 20;
        Project.GetList();

    });
    $(window).on("scroll", function () {
        var oDeH = $("#ul_footerMenu").offset().top;
        var scrollT = $(document).scrollTop();
        var clientH = $(window).height();
        var scrollB = scrollT + clientH;
        console.log(oDeH + "," + scrollT + "," + clientH);
        if (oDeH <= scrollB) {
            Project.api_input.pageSize += 20;
            Project.GetList();
        }
    })
    Project.SetType('year', $("#ul_type li:eq(0)"));
});


//我的订单列表
var Project = {
    pageSize:20,
    api_target: "2052",
    api_input: { "city": "", "type": "", "date": "", "year": "", "pageSize": "20", "pageIndex": "0" },
    showType: "",
    RetList: [],
    //加载多页
    GetList: function () {
        //组织提交参数
        var s_api_input = JSON.stringify(Project.api_input);
        //提交接口[api_token不为空，公用方法会从sission中获取]
        var obj_data = { "api_input": s_api_input, "api_target": Project.api_target, "api_token": g_const_api_token.Wanted };
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
           
            //msg = {"code":0,"data":[{"scoreavg":"75","code":"LP161004101473","title":"富力又一城","addressFull":"鲁店北路","total":"5340户","propertyCompany":"北京恒富物业管理公司","propertyType":"普通住宅","bus":"豆各庄乡政府(411路)<br />郎各庄西(348路/457区间)<br />水牛房(457区间)","lat":"39.8533838","lng":"116.57101","images":"[]","overview":"富力又一城占地面积约36公顷，总建筑面积115万多平方米，其中住宅面积为76万多平方米，配套商业2.6万平方米，综合商业及办公8.6万平方米。总体规划以低建筑密度、高绿化率为特色，绿化率达到35%。整个用地由城市规划道路分成四大块，最北侧规划为九年或十二年一贯制学校、公交总站、相关配套及绿化带，其他部分由东至西分别为A区、B区、C区，项目规划有两所幼儿园，B区规划有运动主题会所，C区西侧规划有综合商业和写字楼，其他各项配套设施一应俱全。周边环境：项目所处地势平坦开阔，远山近水，再加设计师师法自然，改造风水，形成“结庐在人径，而无车马喧”的居所环境。项目三面环水，南侧萧太后河是古永定河故道，河面开阔，夕阳下，长河落日，对岸鸡鸣犬吠，一派千年流淌的沧桑。萧太后河与项目之间为北京罕见的森林滨河公园，绵延千米的水滨走廊，30年原生树木环抱的森林慢跑径，多功能运动主题公园。园林设计：社区内园林由国际知名园林设计事务所ACLA担纲，北京首个真正东南亚主题风情园林，北半球温热的阳光洒在白色的滨水沙滩，高大的棕榈树、椰子林，满目青翠，绿叶婆娑，所有的植物在阳光下肆虐的生长，苍翠林荫间散落着茅草顶的凉亭，坐在凉亭下，满饮一杯浓浓的椰汁或与家人美美的共进一顿泰餐。恍兮惚兮，仿佛置身芭堤雅。完备配套：百万平米超大社区，完备的综合配套让您真正可以远离人流嘈杂的都市而安静的生活，幼稚园到中学的一条龙式教育配套，2000平米社区卫生站，30万平米超大商业面积，三条公交线路，两条小区班车线路，1万平米运动主题会所。一切都只为城中的您齐备。建筑设计：项目整体建筑设计，白色外墙立面，褐色坡屋尖顶，色调明快鲜亮，褐色屋顶既凸显了东南亚建筑风格同时恰到好处的与白色的明快风格形成呼应。在北方开创性运用东南亚主题进行建筑选型、立面包装，告别城市建筑复制时代，是建筑中具有先锋意义的作品。富力又一城3期“蝴蝶湄”，凝聚了诗意的美、绚丽的美、斑斓的美、风情的美、水逸的美，令人沉醉的唯美生活，富力又一城3期惊艳揭幕。东南亚风情的建筑、园林规划让精睿生活体现出风情万种，姿态万千。进入项目主入口，具有强烈视觉冲击力的东南亚建筑群直您的眼帘，婀娜多姿的植物群落，形态丰富，趣味盎然。透过高低错落的植物组群，星星点点的映射出中心湖区的粼粼波光，享受惬意的同时不禁有了曲径探幽的冲动，栈道蜿蜒，渐闻水声潺潺， 4500平米的中心湖面，香花，碧草，叠石，无不透露出东南亚园林的自"},{"scoreavg":"65","code":"LP161004101472","title":"沿海赛洛城","addressFull":"百子湾路5号广渠东路33号","total":"4983户","propertyCompany":"美佳物业管理公司","propertyType":"公寓、普通住宅、别墅","bus":"百子湾家园西站(摆站495路)<br />水南庄东(摆站495路)<br />陈家林(运通121线/475路/312/468路/312区间/312路/628)","lat":"39.9030952453613","lng":"116.509201049805","images":"[]","overview":"沿海赛洛城(丽江新城)位于朝阳区CBD区域东四环外，距CBD核心区域约1300米，位于广渠路与石门东路交汇十字路口东北角。沿海赛洛城具有相对良好的交通体系。四环路、百子湾路与改造后的广渠路构成了快捷的交通系统，可以方便地进出市中心或远郊区县；改造后的石门东路与规划中的建筑木材厂西路、东郊仓库一路、金海湾花苑中街共同形成社区周边的交通系统，可以从社区快速的进入城市主干路，很好地与城市融为一体。沿海赛洛城(丽江新城)的规划体现了大体量、配套完善、特色明晰的产品特质。其产品形态丰富，有住宅、酒店式公寓及商铺；配套有运动会所、医院、学校、幼儿园、地下车库。在低总价，高品质、差异化的市场策略前提下，住宅以板式南北高层、小高层为主，结合部分类板式高层，配备精装、主力户型为80-90平方米，成为添补这一区域需求空白的综合物业。以满足青年人不断提升的居住需求为核心，呈现出一个时尚、便利、充满活力、都市感强烈、休闲氛围浓厚的街区，一个鼓励交流与互动的高品位健康社区；86万平方米的超大社区，将居住区、园林、广场、学校、办公、购物中心等多项功能复合化，从而营造都市氛围，塑造先进的都市生活方式。园林及绿化近10万平方米，绿化率30％以上，车位数3517个，总户数为4983户，车户比约1：1.5。沿海赛洛城(丽江新城)定位是25-35岁的都市青年，该项目所有户型全部采用只有高档公寓才有的3米层高；所有产品提供精装修。沿海赛洛城(丽江新城)设计最大的特点就是开放式社区，将整个地块拆成23个组团，而将中间的可开发用地用做道路建设。设计师认为，如果将一大块土地规划设计得适宜城市人居住，就应该用规划城市的理念来规划，要将地块打散分割成若干街区，要添加棋盘形的道路和绿地，并在街两边安排餐厅、酒吧、咖啡屋、服饰店、便利店等商业设施。有了这些城市元素可让整个社区活起来。在做开放式社区的同时又注意在组团内部营造适宜居住的安静环境。户型设计合理化：沿海赛洛城的主力户型面积适中经济，户型格局紧凑务实。在有限的面积中尽量保证功能的齐全及合理的布局，且在局部又有丰富的变化及个性表现，非常符合现代生活的需要。沿海赛洛城(丽江新城)力图将产品做成南北通透的板楼。但与之矛盾的是中小户型不容易南北通透，所以这就要求设计师必须在不增大每户面积的前提下削薄板楼，创造一些“南厅北卧”或“南卧北厅”的户型。此外还尽量减小公摊损耗，将大部分户型的使用率控制在80%以上。赛洛城生活"},{"scoreavg":"34.06","code":"LP161009105001","title":"潼关里","addressFull":"临潼路与黄河道交口","total":"暂无数据","propertyCompany":"暂无数据","propertyType":"普通住宅","bus":null,"lat":"39.1455154418945","lng":"117.151359558105","images":"[]","overview":"小区房龄偏大，一梯3户，六层到顶，周边生活设施齐全&nbsp;"}]}
            if (msg.code == g_const_Success_Code) {
                Project.Load_Result(msg.data);
            }
            else {
                ShowMesaage("未查到相关数据");
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
    Load_Result: function (resultlist) {
      //  var colorlist = ["fb8b29", "ffd61a", "7e0123", "c93268", "83ca40"];
        var htmlStr = "";
      //  Project.RetList = resultlist;
        $.each(resultlist, function (i, n) {

            //htmlStr += "<li class=\"building-item\" onclick=\"Project.Load_Detail('" + n.number + "')\">";
            //htmlStr += "<span class=\"building-name\">" + n.name + "</span>";
            //htmlStr += "<span class=\"building-envi-level\">" + n.level + "</span>";
            //htmlStr += "<span class=\"building-envi-score\">" + n.score + "</span>";
            //htmlStr += "</li>";

            htmlStr += "<li><a class=\"clearfix\" onclick=\"Project.Load_Detail('" + n.code + "','" + n.lat + "','" + n.lng + "','" + n.title + "')\">";
            htmlStr += "<div class=\"pic fl\"><img src=\"";
            if (JSON.parse(n.images).length == 0) {
                htmlStr += "/img/default_small_4.jpg";
            }
            else {
                htmlStr += JSON.parse(n.images)[0];
            }
            htmlStr += "\"></div>";
            htmlStr += "<div class=\"con fl\">";
            htmlStr += "<h4>" + n.title + "</h4>";
            htmlStr += "<p class=\"title02\"> " + n.addressFull + "</p>";
            htmlStr += "<div class=\"price02\">平均分：" + parseFloat(n.scoreavg).toFixed(1) + "</div>";
            htmlStr += "</div></a></li>";

            //var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(n.position.split(',')[1], n.position.split(',')[0]), n.name, colorlist[i % 5], n.number);
            //map.addOverlay(myCompOverlay);
            //Baidu.LoadData(new BMap.Point(n.position.split(',')[1], n.position.split(',')[0]), n.name, n.score, (n.img == "" ? "/img/default_small_4.jpg" : n.img), n.number, i + 1, n.updateTime);

        });
        $("#ul_list").html(htmlStr);

    },
    Load_Detail: function (number, lat, lng, project) {
        PageUrlConfig.SetUrl();
        //window.location.href = g_const_PageURL.ProjectDetail + "?code=" + code + "&t=" + Math.random();
        window.location.href = g_const_PageURL.ProjectList1 + "?p=m&showtype=1&lat=" + lat + "&lng=" + lng + "&project=" + encodeURIComponent(project) + "&number=" + number + "&city=" + Project.api_input.city + "&t=" + Math.random();// g_const_PageURL.ProjectDetail + "?code=" + code + "&t=" + Math.random();
    },
    SetType: function (type,obj) {
        Project.api_input.type = type;
        $("#ul_type").find('li').each(function () {
            $(this).attr("class", "");
        });
        $(obj).attr("class", "curr");
    }
};