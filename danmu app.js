$(document).ready(function(){
	var ref = new Wilddog("https://wd4369133961ampsgk.wilddogio.com"),
	colors = ['#000000','#EA0000','#FF0080','#D200D2','#0000E3','#00FFFF','#00DB00','#F9F900','#FF8000','#808040'],
	//topMax=$('.danmuBox').css('height'),
	j = 0,  //待完善，用于控制，danmuBox中元素的数量
	_top = 0,
	topLimit = 450;
	var colNum = Math.floor(Math.random() * 10);
	//console.log("网页宽度是"+document.body.clientWidth);
	//console.log("打印的数据类型是"+typeof(document.body.clientWidth));
	if(document.body.clientWidth < 640){
   		topLimit = 390;
 	}
	//console.log('屏幕宽为'+window.screen.availWidth);
	//console.log('屏幕高为'+window.screen.availHeight);
	//var deviceWid=window.screen.availWidth;
	$('input[name="launch"]').click(function () {
		if($('input:text').val() !== ''){
			ref.child('content').push($('input:text').val());
			$('input:text').val('');
		}
	});

	ref.child('content').limitToLast(1).on("child_added", function (snap) {
		//为何刷新和打开网页时，会执行一次。
		if (_top < topLimit) {
			var objContent=$('<p></p>');
			var objNode=objContent.text(snap.val());
			$('.danmuBox').append(objNode);
			setStyle(objNode);
			/*$('.danmuBox').append("<p style=\'top:"+_top+"px;color:"+colors[colNum]+"\'>"+snap.val()+"</p>");*/
			
			_top += 30;
			colNum = Math.floor(Math.random() * 10);
		} else {
			_top = 0;
			var addContent = $('<p></p>');
			var addNode = addContent.text(snap.val());
			$('.danmuBox').append(addNode);
			setStyle(addNode);
			/*$('.danmuBox').append("<p style=\'top:"+_top+"px;color:"+colors[colNum]+"\'>"+snap.val()+"</p>");*/
			_top += 30;
		}
		j++;
	});

	$('input:text').keypress(function (event) {
		if(event.keyCode == '13'){
			$('input[name="launch"]').click();
		}
	});

	$('input[name="clear"]').click(function () {
		$('.danmuBox').empty();
		ref.child('content').set(null);
		_top = 0;
		j = 0
	});

	//浏览器窗口改变时，需要重新调整、展示所有数据(待完善)

	function setStyle(obj){
		//获取屏幕尺寸，_right= obj.offset().left -屏幕宽*90%
		//var deviceWid=window.screen.availWidth;
		// 注意：元素默认添加至左侧（最初的位置），如下的right设置，都是相对于元素初始位置来设置。
		var deviceWid = document.body.clientWidth;
		var _right = obj.offset().left - deviceWid*0.9; // 设置元素向右偏移的距离，初始位置
		console.log('obj.offset().left =', obj.offset().left);
		console.log('_right =', _right);
		var _rightEnd = obj.offset().left + Number(obj.css('width').slice(0, -2)); // 设置元素向右偏移的距离，结束位置
		console.log('_rightEnd=', _rightEnd);
		obj.css({
			color: colors[colNum],
			right: _right,
			top: _top
		});
		startAnimation();
		function startAnimation(){
			obj.css({right: _right});
			obj.animate({right: _rightEnd}, 8000, "linear", startAnimation);
		}
		
	}
	//页面关闭或刷新时清空数据库
	window.onbeforeunload = function () {
    	$('input[name="clear"]').click();
	};
});