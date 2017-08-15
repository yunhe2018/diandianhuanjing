(function () { 

//实现选择首页、楼盘和我的三个页面的切换
 var shouye=$("#shouye");
 var loupan=$("#loupan");
 var wode=$("#wode");
 var tabs=[shouye,loupan,wode];

for(var i=0;i<tabs.length;i++){
	tabs[i].click(function(event) {
		tablook_active(event);
		tab_control(event);
	});
}

//3、首页页面的切换
//（1）实现选择城市的页面切换
  $("#add_btn").click(function(){
  	$("#choose_city").removeClass("hide-page").addClass("show-page");
  	$("#city_data").removeClass("show-page").addClass("hide-page");
  });
//（2）实现下拉箭头弹出附近建筑的页面
$("#xiala_arrow").click(function() {
   var nearby_area=$("#nearby_area");
   var x=nearby_area.hasClass('hide-page');
   if(x){
      nearby_area.removeClass('hide-page').addClass('show-page');
   }
   else{
     nearby_area.removeClass('show-page').addClass('hide-page');
   }
});
//（3）实现城市按钮的返回功能
$("#choose_city_goback").click(function(){
    $("#choose_city").removeClass("show-page").addClass("hide-page");
    $("#city_data").removeClass("hide-page").addClass("show-page");
})

//tab选项样式变化函数
function tablook_active(event){
	var targetObj=event.target.parentNode;
	var targetObj=$(targetObj);
	for(var i=0;i<tabs.length;i++){
		if(tabs[i].hasClass('tab-active')){
         var flag=i;
         break;
		}	
	}
		tabs[flag].removeClass('tab-active');
		targetObj.addClass('tab-active');
	
}

//tab选项控制页面函数
function tab_control(event){
	var targetObj=event.target.parentNode;
	var targetObjId=$(targetObj).attr('id');
    var zhuyeBoxIn=$("#zhuye_box_in");
    for(var i=0;i<tabs.length;i++){ 	
    	if(targetObjId==tabs[i].attr('id')){
    		var x=i;
        break;
    	}
    }
    var left_line=-x+"00%";
    zhuyeBoxIn.css({"left":left_line});
   }



} ());