<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LoginOauth.aspx.cs" Inherits="Web_DDHJ.LoginOauth" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="keywords" content=""/>
    <meta name="description" content=""/>
    <meta content="yes" name="apple-mobile-web-app-capable"/>
    <meta content="telephone=no" name="format-detection"/>
    <meta content="email=no" name="format-detection" />
    <meta name="author" content=""/>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <title>点点环境-账户绑定</title>
        <script src="/js/cdn.js"></script>
    <script type="text/javascript">
        var staticlist = [["/css/base.css", "/css/style.css"], ["/js/jquery-2.1.4-min.js", "/js/g_Const.js", "/js/g_header.js", "/js/ShortURL.js"]];
        WriteStatic(staticlist);
    </script>

<%--    <script src="/js/jquery-2.1.4.js"></script>
    <script src="/js/g_header.js"></script>
    <script src="/js/functions/g_Const.js"></script>
    <script src="/js/tost.js"></script>
    <script src="/js/JValidator.js"></script>
    <script src="/js/pages/ValidCodeBase.js"></script>
        <script src="../js/ShortURL.js"></script>
    <link rel="stylesheet" type="text/css" href="/css/base.css" />
    <link rel="stylesheet" type="text/css" href="/css/d_style.css" />--%>

</head>
    <body style="background:#f8f8f8;">
        <form id="form_login" name="form_login" method="post">
            <input type="hidden" id="opreate" name="opreate" value="login" />
        <%
            if (!string.IsNullOrEmpty(this.Values["hide_postdata"]))
            {
        %>
            <input type="hidden" id="hide_postdata" name="hide_postdata" value="<%=this.Values["hide_postdata"] %>" />
            <%
            }
        %>
 <div class="headerSpace"></div>
    <div class="header02">
        <b class="back" id="div_back"></b>
        <span class="txt nopic">用户绑定</span>
    </div>
    <div class="logReg">
        <div class="head"><img src="/img/lnologin@2x.png"></div>
        <div class="in">
            <div id="li_Verify" style="display:none">
                <input style="background:#f8f8f8" id="txtPicCode" type="text" value="" placeholder="图片验证码" />
                <img src="" id="Verify_codeImag" alt="点击切换验证码"
                     title="点击切换验证码" style="cursor: pointer;float:right;width:80px;margin-top:-50px"
                     onclick="ToggleCode(this.id, '/Ajax/LoginHandler.ashx'); return false;" />
            </div>
            <input style="background:#f8f8f8" type="tel" placeholder="手机号" id="text_mobile" name="text_mobile" value="<%=this.Values["text_mobile"]%>" />
            <input style="background:#f8f8f8" type="text" placeholder="验证码" id="text_captcha_mobile" name="text_captcha_mobile" value="<%=this.Values["text_captcha_mobile"]%>" />
            <b class="codeBtn" id="btnCode">获取验证码</b>
            <span class="loginBtn" id="btn_login">立即绑定</span>
        </div>
    </div>

<%--    <div class="header">
        用户绑定
        <div class="back" id="div_back"></div>
    </div>
    <div class="loginMain">
            <ul class="login">
                <li id="li_Verify" style="display:none">
                <input id="txtPicCode" type="text" value="" placeholder="请输入图片验证码" />
                <img src="" id="Verify_codeImag" alt="点击切换验证码"
                     title="点击切换验证码" style="cursor: pointer;width:7rem;float:right;margin-top:.4rem"
                     onclick="ToggleCode(this.id, '/LoginHandler.ashx'); return false;" />
                </li>
                <li><input id="text_mobile" type="tel" name="text_mobile" value="<%=this.Values["text_mobile"]%>" placeholder="请输入11位有效手机号"/><b id="d_close_tel" class="d_close_tel" style="display:none;"></b><a style="z-index:999" id="btnCode" class="sendCode">获取验证码</a></li>
                <li><input id="text_captcha_mobile" type="tel" name="text_captcha_mobile" value="<%=this.Values["text_captcha_mobile"]%>" placeholder="请输入验证码"/><b id="d_close" class="d_close" style="display:none;"></b></li>
            </ul>
            <div class="loginBtn" id ="btn_login" >立即绑定</div>
    </div>--%>
            </form>
        <input type="hidden" id="hidWxOpenID" value="" runat="server" />
        <input type="hidden" id="hidshow" value="" runat="server" />
 <%--       <script src="/js/functions/g_Type.js"></script>
        <script src="../js/pages/LoginOauth.js"></script>--%>

         <script type="text/javascript">
             var staticlist = [[], ["/js/tost.js", "/js/JValidator.js", "/js/ValidCodeBase.js", "/js/g_app.js", "/js/LoginOauth.js"]];
        WriteStatic(staticlist);
    </script>
        <%=base.RenderScriptMessage("login_error") %>
        <script>            
            var str_loginjs = '<%=str_loginjs%>';
            g_type_loginjs.Execute(str_loginjs);
        </script>
</body>
</html>
