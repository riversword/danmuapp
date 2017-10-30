/*create by riversword*/
$(document).ready(function(){
	var ref=new Wilddog("https://wd4369133961ampsgk.wilddogio.com"),
		colors=['#000000','#EA0000','#FF0080','#D200D2','#0000E3','#00FFFF','#00DB00','#F9F900','#FF8000','#808040'],
		j=0,  //need to perfect, used to limit the number of elements in danmuBox
		_top=0,
		topLimit=450;
	var colNum=Math.floor(Math.random()*10);

	if(document.body.clientWidth < 640){
   		topLimit=390;
 	}

	$('input[name="launch"]').click(function(){
		if($('input:text').val() !==''){
			ref.child('content').push($('input:text').val());
			$('input:text').val('');
		}
	});

	ref.child('content').limitToLast(1).on("child_added",function(snap){
					//every time the web page refreshed, "child_added" will happen in wilddog touched by the last child

		if(_top < topLimit){
			var objContent=$('<p></p>');
			var objNode=objContent.text(snap.val());
			$('.danmuBox').append(objNode);
			setStyle(objNode);
			_top+=30;
			colNum=Math.floor(Math.random()*10);
		}else{
			_top=0;
			var addContent=$('<p></p>');
			var addNode=addContent.text(snap.val());
			$('.danmuBox').append(addNode);
			setStyle(addNode);
			_top+=30;
		}
		j++;
	});

	$('input:text').keypress(function(event){
		if(event.keyCode =='13'){
			$('input[name="launch"]').click();
		}
	});

	$('input[name="clear"]').click(function(){
		$('.danmuBox').empty();
		ref.child('content').set(null);
		_top=0;
		j=0
	});

	function setStyle(obj){
		var deviceWid=document.body.clientWidth; 
		var _right= obj.offset().left - deviceWid*0.9; //the position begin
		var _rightEnd=obj.offset().left + Number(obj.css('width').slice(0,-2)); //the position end
		obj.css({
			color:colors[colNum],
			right:_right,
			top:_top
		});
		startAnimation();
		function startAnimation(){
			obj.css({right:_right});
			obj.animate({right:_rightEnd},8000,"linear",startAnimation);
		}
		
	}

	//every time the web page refreshed, "child_added" will happen in wilddog touched by the last child
	//so when the page refresh or close, the data in wilddog will be cleared 
	window.onbeforeunload = function(){
    $('input[name="clear"]').click();
	};
});