$(document).ready(function()
{

	SynInterface();
	$("#title").html("<img src=\"images/traylogo.png\" id=\"logoimg\">");
	$(".playcontrol>ul>li").mouseup(function(){
			var evalstr = this.className;			
			if(evalstr=='previous')
					PreviousMusic();

			if(evalstr=='play')
					PlayMusic();

			if(evalstr=='next')
					NextMusic();

			if(evalstr=='stop')
				    StopMusic();

		})

});
function SetPlayStatus(mtitle,pstatus)
{

	if(!pstatus)
	{
		$("#title").html("<img src=\"images/traylogo.png\" id=\"logoimg\">");
		$("#playbutton").removeClass();	
		$("#playbutton").addClass('play');
		$("#playbutton").attr('title', '播放');	
		return;
	}
	var titleobj = document.getElementById("title");

	if(checksum(mtitle)>16)
	{
		titleobj.innerText = "";
		var p = document.createElement("marquee");
		p.innerText=mtitle;
		p.setAttribute("scrollamount","3");
		p.setAttribute("onMouseOut","this.start()");
		p.setAttribute("onMouseOver","this.stop()");
		titleobj.appendChild(p);
	}
	else
	{
		titleobj.innerText = mtitle;
	}
	$("#playbutton").removeClass();	
	$("#playbutton").addClass('stop');
	$("#playbutton").attr('title', '停止');	
	//$("#volumerange").val()

}
function checksum(chars)
{
	var sum = 0; 
	for (var i=0; i<chars.length; i++)
	{ 
		var c = chars.charCodeAt(i); 
		if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f))
		    sum++; 
		else 
		    sum+=2; 
	}
	return sum;
}