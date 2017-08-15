$(document).ready(function () {
    $("#back_btn").click(function () {
        window.location.replace(PageUrlConfig.BackTo(1));
    });
    if (localStorage[g_const_localStorage.Report]) {
       // PDFObject.embed(localStorage[g_const_localStorage.Report], "#div_report");
       $("#ifr").attr("src", localStorage[g_const_localStorage.Report]);
    }
});