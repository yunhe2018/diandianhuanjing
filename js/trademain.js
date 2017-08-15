$(document).ready(function () {
    //上导航横滑
    var oULWidth = 0;
    var oLength = $(".switch_nav li").length;
    for (var i = 0; i < oLength; i++) {
        oULWidth += $(".switch_nav li").eq(i).outerWidth() + 22;
    }
    $(".switch_nav ul").width(oULWidth);
    $("#btnback").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
    });
    //..........
    var myscroll = new IScroll("#switch_nav", {
        scrollX: true, scrollY: false, mouseWheel: true, preventDefault: false
    });
    FooterMenu.Set(3);
    $("#li_TradePrice").click(function () {
        PageUrlConfig.SetUrl();
        window.location.replace(g_const_PageURL.TradePrice + "?t=" + Math.random());
    });
    $("#li_TradeChart").click(function () {
        PageUrlConfig.SetUrl();
        window.location.replace(g_const_PageURL.TradeChart + "?t=" + Math.random());
    });
    $("#li_TradeBuy").click(function () {
        PageUrlConfig.SetUrl();
        window.location.replace(g_const_PageURL.TradeBuy + "?t=" + Math.random());
    });
    $("#li_TradeSell").click(function () {
        PageUrlConfig.SetUrl();
        window.location.replace(g_const_PageURL.TradeSell + "?t=" + Math.random());
    });
    $("#li_TradeToday").click(function () {
        PageUrlConfig.SetUrl();
        window.location.replace(g_const_PageURL.TradeToday + "?t=" + Math.random());
    });
    $("#li_TradeHistory").click(function () {
        PageUrlConfig.SetUrl();
        window.location.replace(g_const_PageURL.TradeHistory + "?t=" + Math.random());
    });
});