$(document).ready(function () {
    var name = decodeURI(GetQueryString("name"));
    var htmlStr = "";
    switch (name) {     
        case "空气":
            htmlStr += "<p>空气质量指数（Air Quality Index，简称AQI）可以定量描述空气质量状况。空气质量按照空气质量指数大小分为六级，相对应空气质量的六个类别，指数越大、级别越高说明污染的情况越严重，对人体的健康危害也就越大。";
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
            htmlStr += "<p>凡是妨碍人们正常休息、学习和工作的声音，以及对人们要听的声音产生干扰的声音都属于噪音。按照普通人的听力水平，50分贝相当于正常交谈的声音，30-40分贝是比较安静的正常环境，60分贝以上就属于吵闹范围了。";
            htmlStr += "</p><div class='tb'><table  border='0' class='tb_02'>";
            htmlStr += "<thead><tr><th class='cel-33'>级别</th><th class='cel-33'>昼间分贝数</th><th class='cel-33'>夜间分贝数</th></tr></thead>";
            htmlStr += "<tbody><tr><td>I 类 优</td><td>55以下</td><td>45以下</td></tr>";
            htmlStr += "<tr><td>II类 良</td><td>60以下</td><td>50以下</td></tr>";
            htmlStr += "<tr><td>III类 中度污染</td><td>65以下</td><td>55以下</td></tr>";
            htmlStr += "<tr><td>IV类 严重污染</td><td>65以上</td><td>55以上</td></tr></tbody>";
            htmlStr += "</table></div>";
            break;
        case "危险品":
            htmlStr += "<p>危险品包括爆炸品、易燃物、氧化剂、毒害品、放射性物、腐蚀品等。根据《危险化学品经营企业开业条件和技术要求》，大中型危险化学品仓库应与周围公共建筑物、交通干线（公路、铁路、水路）、工矿企业等距离至少保持1000米。但是中国国内尚没有对危化品堆场与住宅、学校等人口密集区域、甚至饮用水源地的安全距离作出清晰的法律规定。</p>";
            break;
        case "水质":
            htmlStr += "<p>水质是水体的物理性质（如色度、浊度、臭味等）、化学组成（无机物和有机物的含量）、生物学特性（细菌、微生物、浮游生物、底栖生物）的总称。依照《地面水环境质量标准》（GB3838-2002）中规定，地面水使用目的和保护目标，我国地面水分五大类。";
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
            htmlStr += "<p>土壤是地球陆地的表面由矿物质、有机质、水、空气和生物组成的，具有肥力并能生长植物的疏松表层。根据土壤应用功能和保护目标，可将土壤划分为三类。";
            htmlStr += "</p><div class='tb'><table  border='0' class='tb_04'>";
            htmlStr += "<thead><tr><th class='cel-18'>级别</th><th class='cel-82'>说明</th></tr></thead>";
            htmlStr += "<tbody><tr><td>I类一级</td><td>适用于国家规定的自然保护区、集中式生活饮用水源地、茶园、牧场和其他保护地区的土壤，土壤质量基本上保持自然背景水平。</td></tr>";
            htmlStr += "<tr><td>II类二级</td><td>适用于一般农田、蔬菜地、茶园果园、牧场等土壤，土壤质量基本上对人体、植物和环境不造成危害和污染</td></tr>";
            htmlStr += "<tr><td>III类三级</td><td>适用于林地土壤及污染物容量较大的高背景值土壤和矿产附近等地的农田土壤。土壤质量对人体、植物和环境造成的危害和污染较小。</td></tr></tbody>";
            htmlStr += "</table></div>";
            break;
        case "污染源":
            htmlStr += "<p>目前可查询的污染源包括化工厂和垃圾处理中心。点点环境将会持续增加其它污染源信息。化工厂在生产、储运过程中如发生爆炸、泄露或非法排放，有可能对人体造成中毒、窒息、化学灼伤等伤害。垃圾处理中心则存在垃圾臭气、垃圾渗沥液、焚烧产生的二噁英等污染物的潜在风险。距离污染源越近，风险等级越高，对人造成危害的可能性越大。";
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
            htmlStr += "<p>目前可查询的辐射为高压线辐射。高压线产生的电磁场一般称为极低频电磁场或者叫工频电场。高压线、变电站会产生电磁辐射，它产生的工频电场是感应电场感应磁场，因为它的波长非常长，所以它不会像电磁辐射那样被人体直接吸收，但是会在人体里头感应出电流来，这个感应电流需要控制。工频电场会在人体中产生感应电流，为了防止对人体产生影响，需要将感应电流密度控制在一定的范围内。";
            htmlStr += "</p><div class='tb'><table  border='0' class='tb_01'>";
            htmlStr += "<thead><tr><th class='cel-50'>高压线级别</th><th class='cel-50'>安全距离</th></tr></thead>";
            htmlStr += "<tbody><tr><td>220千伏</td><td>100米外</td></tr>";
            htmlStr += "<tr><td>132千伏</td><td>20米外</td></tr>";
            htmlStr += "<tr><td>11-66千伏</td><td>10米外</td></tr>";
            htmlStr += "<tr><td>地埋高压线</td><td>5米外</td></tr></tbody>";
            htmlStr += "</table></div>";
            break;
        case "容积率":
            htmlStr += "<p>容积率又称建筑面积毛密度，指项目用地范围内地上总建筑面积与项目总用地面积的比值。容积率是衡量建设用地使用强度的一项重要指标。现行城市规划法规体系详细制定了各类居住用地容积率标准。住宅小区容积率小于1.0的，为非普通住宅。";
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
            htmlStr += "<p>居住区绿地率是描述居住区用地范围内各类绿地的总和与居住区用地的比率。绿地率所指的\"居住区用地范围内各类绿地\"主要包括公共绿地、宅旁绿地等。其中，公共绿地，又包括居住区公园、小游园、组团绿地及其他的一些块状、带状化公共绿地。绿地率=绿地面积/用地面积×100%。 根据《城市居住区规划设计规范》，绿地率的级别可分为三大类。";
            htmlStr += "</p><div class='tb'><table  border='0' class='tb_01'>";
            htmlStr += "<thead><tr><th class='cel-50'>绿地率</th><th class='cel-50'>说明</th></tr></thead>";
            htmlStr += "<tbody><tr><td>30%以上</td><td>绿化程度非常好的小区。</td></tr>";
            htmlStr += "<tr><td>25%-30%</td><td>绿地率一般。</td></tr>";
            htmlStr += "<tr><td>25%以下</td><td>绿地率较低。</td></tr></tbody>";
            htmlStr += "</table></div>";
            break;
    }
    $("#div_AQI").html(htmlStr);
})