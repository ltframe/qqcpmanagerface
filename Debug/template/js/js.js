var fangxiang=-1;
$(function(){
	$("#loginlink").bind('mousedown',function(){
		showloginbox();

	});
	$("#touxiangdivimg").bind('mousedown',function(){
		showloginbox();

	});
	$("#min").bind('mousedown',function() {
		MinWindow();
	});
	$(".subbox1").bind('mousedown',function(evt) {
		if(evt.srcElement.id!='yf' && evt.srcElement.id!='loginlink' && evt.srcElement.id!='touxiangdivimg' &&
			 evt.srcElement.id!='close' && evt.srcElement.id!='aset'){
			DragWindow();
		}
		if(evt.srcElement.id=='aset'){

			showsetting(evt.screenX ,evt.screenY,120,240);
		}
	});
	$('#yf').bind('click',function(evt){
		$(".skindiv").css('left',evt.pageX-200);
		$(".skindiv").css('top',evt.pageY+20);
		$(".skindiv").show();
	});
	$("#close").bind('click',function(){
		QuitApp();
	});
	$(document).bind('click',function(evt){
		if(evt.srcElement.id!='yf'){
			$(".skindiv").hide();
		}
	});

	$($(".subbox2ul")[0]).css({'margin-top':'-37px'});
	$(".subbox2ul>li").each(function(elementindex){
		$(this).bind("click",function() {					
			var value= 0;	
			if(parseInt($(this).parent().css('margin-top'))==-37)
			{
				return;
			}
			var f = $(this).parent().attr("index");
			for (var i =0; i<6; i++) {
				$("#titlepart"+i).hide();
			}

			if(f>fangxiang){
				$("#titlepart"+f).css("left","890px");
				$("#titlepart"+f).show();
				$("#titlepart"+f).animate({'left': '0px'}, "fast");
				
				fangxiang = f;
			}else{
				$("#titlepart"+f).css("left","-890px");
				$("#titlepart"+f).show();
				$("#titlepart"+f).animate({'left': '0px'}, "fast");
				fangxiang = f;
			}
			for(var i = 0; i <6; i++) {
				$(".subbox3_"+i).hide();
				if($(this).parent().attr("index")==i)
				{
					$(".subbox3_"+i).show();
				}
			}
			
			//$(".subbox3_"+elementindex).fadeIn("fast");

			if (parseInt($(this).parent().css("margin-top"))>0)
			{
				$(".subbox2ul>li").each(function(index,eledom){
					if(parseInt($(eledom).parent().css('margin-top'))==-37){
						$(eledom).parent().animate({'margin-top': '12px'}, "slow");
					}
				})
				$(this).parent().animate({'margin-top': '-37px'}, "slow");
				$(this).next().css("color","rgb(76, 138, 224)")
			}else{
				$(".subbox2ul>li").each(function(index,eledom){
					if(parseInt($(eledom).parent().css('margin-top'))==12){
						$(eledom).parent().animate({'margin-top': '-37px'}, "slow");
					}
				})
				$(this).parent().animate({'margin-top': '12px'}, "slow");
				$(this).next().css("color","black")
			}		
		});
	});
})

function setskin(src)
{
	$(".mainbox").css("backgroundImage","url("+src+")"); 
}
