var FooterMenu = {
    Set: function (currType) {
        var ul_html = "";
        ul_html += "<li id=\"menu_main\" onclick=\"FooterMenu.Goto('" + g_const_PageURL.Index + "','')\" class=\"" + (currType == 0 ? "curr" : "") + "\"><span>首页</span></li>";
        ul_html += "<li id=\"menu_project\" onclick=\"FooterMenu.Goto('" + g_const_PageURL.TradePrice + "','')\" class=\"" + (currType == 1 ? "curr" : "") + "\"><span>碳行情</span></li>";
        ul_html += "<li id=\"menu_project\" onclick=\"FooterMenu.Goto('" + g_const_PageURL.Energy + "','')\" class=\"" + (currType == 2 ? "curr" : "") + "\"><span>碳里程</span></li>";
        ul_html += "<li id=\"menu_project\" onclick=\"FooterMenu.Goto('" + g_const_PageURL.ProjectList1 + "','&p=m')\" class=\"" + (currType == 3 ? "curr" : "") + "\"><span>楼市</span></li>";
        ul_html += "<li id=\"menu_account\" onclick=\"FooterMenu.Goto('" + g_const_PageURL.MyAccount + "','')\" class=\"" + (currType == 4 ? "curr" : "") + "\"><span>我的</span></li>";
        $("#ul_footerMenu").html(ul_html);
    },
    Goto: function myfunction(url, param) {
        PageUrlConfig.SetUrl();
        window.location.href = url + "?t=" + Math.random() + param;
    }
};