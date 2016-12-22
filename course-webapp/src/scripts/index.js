//var str = require("./templates/index.string");
//var IScroll = require('./libs/iscroll-probe.js');

//var body = document.body;
//body.innerHTML = str + body.innerHTML;
	
window.onload = function(){
//	var myScroll = new IScroll('#main-scroll',{mouseWheel:true, hScrollbar:false, vScrollvar:false});
	var scan = document.getElementById("scan");
	scan.onclick = function(){
		wx.scanQRCode({
		    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
		    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
		    success: function (res) {
			    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
			}
		});
	}
}

//动态加载食物
function getFoods(id,url){
	$.get(url, function(msg){ 
		var goods = msg;
		for (var i in goods) {
			var aLink = $("<a data-id="+goods[i].id+" class='getId' href="+goods[i].href+"></a>");
			var aLi = $("<li></li>");
			aLink.append("<p class='p_img'><img src='"+goods[i].img+"' /></p>");
			aLink.append("<p class='p_name'>"+goods[i].name+"<span>"+goods[i].desc+"</span></p>");
			aLink.append("<p class='p_price'>"+goods[i].price+"</p>");
			aLi.append(aLink);
			$("#"+id).append(aLi);
     	}
		$(".getId").click(function(){
			var goods = $(this).attr("data-id");
			$.cookie("stores",JSON.stringify(goods),{expires:7,path:"/"});
	
		}) 
	}); 
} 
getFoods("foods","data/small_foods.json")

$("#dianCan").click(function(){
	$(this).siblings().removeClass("active");
	$(this).addClass("active")
	location.reload()
	$("#nav").html("<li class='active' id='foods-one'>家常菜</li> <li id='foods-two'>多人聚享</li><li id='foods-three'>特色糕点</li>")
	$("#foods").html("");
	getFoods("foods","data/small_foods.json")
	$("#foods-one").click(function(){
		$("#foods").html("");
		getFoods("foods","data/small_foods.json")
		tab($(this).index())
	})
	
	$("#foods-two").click(function(){
		$("#foods").html("");
		getFoods("foods","data/big_foods.json")
		tab($(this).index())
	})
	
	$("#foods-three").click(function(){
		$("#foods").html("");
		getFoods("foods","data/cookie_foods.json")
		tab($(this).index())
	})
})

//主页选项卡切换
$("#foods-one").click(function(){
	$("#foods").html("");
	getFoods("foods","data/small_foods.json");
	tab($(this).index())
	console.log($(this).index())
})

$("#foods-two").click(function(){
	$("#foods").html("");
	getFoods("foods","data/big_foods.json")
	tab($(this).index())
})

$("#foods-three").click(function(){
	$("#foods").html("");
	getFoods("foods","data/cookie_foods.json")
	tab($(this).index())
})

var oLi = $("#nav li")
console.log(oLi.length)
function tab(a){
	for(var i = 0;i<oLi.length;i++){
		oLi[i].className = "";
	}
	oLi[a].className = "active" 
}


//饮料

$("#yinLiao").click(function(){
	$(this).siblings().removeClass("active");
	$(this).addClass("active");
	$("#nav").html("<div>特色饮品<div/>")
	$("#foods").html("");
	getFoods("foods","data/drink.json")
})

//
$("#woDe").click(function(){
	location.href = "foodList.html";
})

//商品详情的动态加载
var goods = $.cookie("stores") ? JSON.parse($.cookie("stores")) : ""; 
function getStoreFoods(num){
	$.ajax({
		url:"data/allfoods.json",
		async:false,//实现同步，才可以实现由上往下加载
		success:function(msg){
			var akey = num; 
			var goods = msg[akey];
			var isName = true;
			$("#foodImg").append($("<img src="+goods["img"]+" style='width: 100%;height: 100%;'/>"))
			$("#foodName").html(goods["name"]);
			$("#foodDes").html(goods["desc"]);
			$("#foodPri").append($("<span price-key="+goods["price"]+" src-key="+goods["img"]+" data-key="+goods["id"]+" id='import-price'>￥"+goods["price"]+".00</span>"))
		}   
	})
} 
getStoreFoods(goods);

//加入菜单
$("#addFoods").click(function(){
//	console.log($("#foodPri").find("span").attr("data-key")); 
	var goodId = $("#foodPri").find("span").attr("data-key");
	var src = $("#foodPri").find("span").attr("src-key");
	var oNum =  1;
	var goods = $.cookie("cars") ? JSON.parse($.cookie("cars")) : {};
	//菜品的累加
	if(goodId in goods){
		goods[goodId].num = Number(oNum) + Number(goods[goodId].num);
	}else{ 
		var goodName = $("#foodName").html();
		var goodPrice = $("#foodPri").find("span").attr("price-key");
		goods[goodId] = {
			id : goodId,
			name : goodName,
			price : goodPrice,
			src: src,
			num : oNum
		}
	}
	$.cookie("cars",JSON.stringify(goods),{expires:7,path:"/"});
	console.log($.cookie("cars")) 
	$("#store-sum").val(1)
//飞入菜单效果
    var offset = $("#fei").offset();//end 为在结束元素加一个ID ，将结束元素设置为fixed；
    var addcar = $(this); 
    var img = addcar.parent().parent().parent().find('section').find('#details').find('#foodImg').find("img").eq(0).attr('src'); //定义图片地址
    //将图片地址赋值给飞入效果的图片
    var flyer = $('<img class="u-flyer" style="width:100px;height:100px;z-index:1000000;border-radius:50px" src="'+img+'">'); 
    flyer.fly({ 
        start: { 
            left: event.pageX, //开始位置（必填）#fly元素会被设置成position: fixed 
            top: event.pageY-$(document).scrollTop() //开始位置（必填） 可视窗口的距离
        }, 
        end: { 
            left: offset.left+100, //结束位置（必填） 
            top: offset.top-$(document).scrollTop()+10, //结束位置（必填） 
            width: 0, //结束时宽度 
            height: 0 //结束时高度 
        }, 
        onEnd: function(){ //结束回调 
        	//contCarNum();//数量++回调函数  自己注释掉
//              $("#msg").show().animate({width: '250px'}, 200).fadeOut(1000); //提示信息                
//              addcar.css("cursor","default").removeClass('orange').unbind('click'); 
            this.destory(); //移除dom 
        } 
    });
})


//食品清单
 
//从cookie中获取数据加载到购物车中
var sumPrice = null;
var foods = $.cookie("cars") ? JSON.parse($.cookie("cars")) : {};
for(var goodId in foods){
	var allStore = $("<ul data-price="+foods[goodId].price+" data-id='"+goodId+"' class='box-store'></ul>")
//	allStore.append($("<li class='thing-infor0'><input type='checkbox' checked='checked'/></li>"))
	console.log(foods[goodId].src)
	allStore.append($("<li class='thing-infor1'><img src="+foods[goodId].src+" />"+foods[goodId].name+"</li>"))
	allStore.append($("<li class='thing-infor2'>￥"+foods[goodId].price+".00</li>"))
	allStore.append($("<li class='thing-infor3'><a class='sum'>"+foods[goodId].num+"</a><a class='up'>+</a><a class='down'>-</a></li>"))
	allStore.append($("<li class='thing-infor4'>￥"+foods[goodId].price*foods[goodId].num+".00</li>"))
	allStore.append($("<li class='thing-infor5'><a class='del' href='###'>删除</a></li>"))
	$("#foods-list").append(allStore); 
	sumPrice += foods[goodId].price*foods[goodId].num;
}
//删除制定的商品
$(".del").click(function(){ 
	$(this).parent().parent().remove();
	var foods = JSON.parse($.cookie("cars")); 
	var goodId = $(this).parent().parent().attr("data-id"); 
	delete foods[goodId];
	$.cookie("cars",JSON.stringify(foods),{expires:7,path:"/"})
	location.reload()
	$(".jiesuan").html("￥"+sumPrice+".00");
})
//删除所有商品
$("#clearCar").click(function(){ 
	$(".get-store").remove();
	$.cookie("cars","",{expires:-1,path:"/"});
	$(".jiesuan").html("0");
})
$(".up").click(function(){
	var oldSum = $(this).parent().find(".sum").html();
	oldSum++;
	$(this).parent().find(".sum").html(oldSum);
	var oPrice = oldSum* $(this).parent().parent().attr("data-price")
	$(this).parent().parent().find(".thing-infor4").html("￥"+oPrice+".00")
	$(this).parent().find(".down").css("background","white")
	$(this).parent().find(".down").css("cursor","pointer") 
	sumPrice+=Number($(this).parent().parent().attr("data-price"));
	//重新改变当前的货物数量
	var foods = JSON.parse($.cookie("cars"));
	var goodId = $(this).parent().parent().attr("data-id"); 
	var foods = $.cookie("cars") ? JSON.parse($.cookie("cars")) : {};
	if(goodId in foods){
		foods[goodId].num = oldSum;
	}
	$.cookie("cars",JSON.stringify(foods),{expires:7,path:"/"});
	//总价格
	$(".jiesuan").html("￥"+sumPrice+".00");
	var foods = sumPrice;
	$.cookie("sum",JSON.stringify(foods),{expires:7,path:"/"});
})
$(".down").click(function(){
	var oldSum = $(this).parent().find(".sum").html();	
	if(oldSum <= 1){
		$(this).css("background","lightgrey")
		$(this).css("cursor","inherit")
	}else{
		oldSum--;
		$(this).css("background","white")
		$(this).css("cursor","pointer")
		$(this).parent().find(".sum").html(oldSum); 
		var oPrice = oldSum* $(this).parent().parent().attr("data-price")
		$(this).parent().parent().find(".thing-infor4").html("￥"+oPrice+".00")
		sumPrice-=Number($(this).parent().parent().attr("data-price"));
		//重新改变当前的货物数量
		var foods = JSON.parse($.cookie("cars"));
		var goodId = $(this).parent().parent().attr("data-id"); 
		var foods = $.cookie("cars") ? JSON.parse($.cookie("cars")) : {};
		if(goodId in foods){
			foods[goodId].num = oldSum;
		}
		$.cookie("cars",JSON.stringify(foods),{expires:7,path:"/"});
		$(".jiesuan").html(sumPrice);
		var foods = sumPrice;
		$.cookie("sum",JSON.stringify(foods),{expires:7,path:"/"});
	}
})
$(".jiesuan").html("￥"+sumPrice+".00");
var foods = sumPrice;   
$.cookie("sum",JSON.stringify(foods),{expires:7,path:"/"}); 

$('#foods-submit').click(function(){
	$(".tiShi").css('display','block')
	$("#tiShi-text").html( "您本次需要消费的金额为"+sumPrice+"元，请确认是否有误");
	$("#sure").click(function(){
		$(".tiShi").css('display','none');
		$.cookie("cars","",{expires:-1,path:"/"});
		location.href = "index.html";
	});
	$("#not-sure").click(function(){
		$(".tiShi").css('display','none');
		$(".jiesuan").html("0");
	})
}) 