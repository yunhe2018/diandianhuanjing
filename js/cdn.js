var cdn_path = "";
//输出静态文件 [[css列表],[js列表]]
function WriteStatic(staticlist) {
    for (var i = 0; i < staticlist[0].length; i++) {
        document.write('<link rel="stylesheet" type="text/css" href="' + cdn_path + staticlist[0][i] + '?v=' + new Date().getTime() + '">');
    }
    for (var i = 0; i < staticlist[1].length; i++) {
        document.write('<script type="text/javascript" src="' + cdn_path + staticlist[1][i] + '?v=' + new Date().getTime() + '"></scr' + 'ipt>');
    }   
}