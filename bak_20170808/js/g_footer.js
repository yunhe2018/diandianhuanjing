var FooterMenu = {
    Set: function (currType) {
        var ul_html = "";
        ul_html += "<li id=\"menu_main\" onclick=\"FooterMenu.Goto('" + g_const_PageURL.Index + "','')\"><span class=\"" + (currType == 0 ? "curr" : "") + "\">首页</span></li>";
        ul_html += "<li id=\"menu_project\" class=\"trade\" onclick=\"FooterMenu.Goto('" + g_const_PageURL.TradePrice + "','')\"><span class=\"" + (currType == 3 ? "curr" : "") + "\">碳行情</span></li>";
        ul_html += "<li id=\"menu_project\" onclick=\"FooterMenu.Goto('" + g_const_PageURL.LPIndex + "','')\"><span class=\"" + (currType == 2 ? "curr" : "") + "\">碳里程</span></li>";
        ul_html += "<li id=\"menu_project\" onclick=\"FooterMenu.Goto('" + g_const_PageURL.ProjectList1 + "','&p=m')\"><span class=\"" + (currType == 1 ? "curr" : "") + "\">楼市</span></li>";
        ul_html += "<li id=\"menu_account\" onclick=\"FooterMenu.Goto('" + g_const_PageURL.MyAccount + "','')\"><span class=\"" + (currType == 4 ? "curr" : "") + "\">我的</span></li>";
        $("#ul_footerMenu").html(ul_html);
    },
    Goto: function myfunction(url, param) {
        PageUrlConfig.SetUrl();
        window.location.href = url + "?t=" + Math.random() + param;
    }
};