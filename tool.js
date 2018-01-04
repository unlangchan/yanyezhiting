/*/禁止右键菜单  
   if (window.Event) 
    document.captureEvents(Event.MOUSEUP); 
    function nocontextmenu(){ 
     event.cancelBubble = true 
     event.returnValue = false; 
     return false; 
    } 
    function norightclick(e){ 
     if (window.Event){ 
      if (e.which == 2 || e.which == 3) 
      return false; 
     } 
     else 
      if (event.button == 2 || event.button == 3){ 
       event.cancelBubble = true 
       event.returnValue = false; 
       return false; 
      } 
    } 
    document.oncontextmenu = nocontextmenu; // for IE5+ 
    document.onmousedown = norightclick;*/
function start(){
	 var n=0;
	 var on_click=!1;
function requestFullScreen() {
     var de = document.documentElement;
      if (de.requestFullscreen) {
         de.requestFullscreen();
      } else if (de.mozRequestFullScreen) {
         de.mozRequestFullScreen();
      } else if (de.webkitRequestFullScreen) {
         de.webkitRequestFullScreen();
      }
	  n=1;
  }
 //退出全屏
function exitFullscreen() {
     var de = document;
      if (de.exitFullscreen) {
         de.exitFullscreen();
     } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
     } else if (de.webkitCancelFullScreen) {
         de.webkitCancelFullScreen();
     }
	 n=0;
 }
$("#set_window_box li").each(function(i){
	 $(this).click(function(){
	$("#set_window_box  .select").removeClass();
	$(this).find('label').addClass("select");
	if(i==0){	
			$("#main_window").removeClass();
			requestFullScreen();
		}else{
			$("#main_window").addClass("window_960X540px");
			exitFullscreen();
			}
	 })
	})
$("#set_select li").each(function(i){ 
                             function set_box_show(i){	 
							       box_id=i.getAttribute("id");                            
								  set_box=box_id+"_box";
								  $("#set_box .on_set").removeClass()								  
								  on_click==!0&&$("#"+set_box).addClass("on_set")
								  	}
							  $(this).click(function(){								  
								  on_click==!1?$("#headerbox").addClass("on_click"):$("#headerbox").removeClass()
								  on_click==!0?on_click=!1:on_click=!0;
								  this_id=this.getAttribute("id");
                                  this_id=="Version_information"?($("#headerbox").removeClass(),alert(Version_information_text)):this_id=="set_automatic"?set_automatic():set_box_show(this);
								    function ck(){$("body").one("click",function(){											
									   on_click=!1;	
									   $("#headerbox").removeClass();
									   $("#set_box .on_set").removeClass();
									  });	}	
								  on_click==!0&&setTimeout(ck,20)
																						  						  
								  })
							  .mouseenter(function(){								  
								set_box_show(this);	
								  })													 
							    }) 
	$("#set_font_box li").each(function(i){
		 $(this).click(function(){
		var index=this.childNodes[3].innerHTML;
		text_box.style.cssText='font-family:"'+index;+'"'})
		})
	$("#set_form_box li").each(function(i){
          $(this).click(function(){i==0?page=!1:page=!0})	
                                          })
function set_automatic(){
	//自动：auto 否!1 是!0
    on_click==!0&&(on_click=!1)
	$("#headerbox").removeClass()
	g_st==!0&&auto==!0?auto=!1:auto=!0;
	g_st==!0&&auto==!0?setTimeout(__,500):clearInterval(auto_time);
	//auto==!0?__():$("#hidden_menu").css('display','none')
	//auto==!0&&next_main()
}
function __(){
	$('#click_box').unbind(); 
	auto_time=setTimeout(auto_main,2000)
	}

	document.getElementById("start_game").addEventListener("click",eventOne);	
	document.getElementById("close_game").addEventListener("click",close_game);		
	document.getElementById("tostart").addEventListener("click",reset_game);	
	document.getElementById("end").addEventListener("click",close_game);
	$("#right_menu div").each(function(i){
		$(this).click(function(){
			right_menu.style.display='none',$('#text_box').addClass('show_box');
			})
		})
	function eventOne(){	
	  $("#start_menu").css('display','none');
	  a=0,
	  g_st=!0;
		main_start();																											
	}
function close_game(){
	on_click==!0?on_click=!1:on_click=!0;
    if(confirm("是否退出游戏")){window.close();}else{};
  }	
function reset_game(){
	 $("#start_menu").css('display','block');
	 cg_matrix.innerHTML='';
	 cg_matrix.style.cssText='display:none;';
	 img_0.src=SE.src=VOICE.src='';
	 BGM.src='source/login.ogg';
	}								
															
}  
function ready_rm(){ 
			document.getElementById('show_box').onmousedown = function(e){ 
					var e = e || window.event  
					if(e.button == "2"){  
					right_menu.style.display='block',$('#text_box').removeClass();
					}
				  }
				  
					document.getElementById('right_menu').onmousedown=function(e){
						if(e.button == "2"){ 
						right_menu.style.display='none',$('#text_box').addClass('show_box');
					}
				 }

 }
 function change(i) {
 var value = document.getElementById(i).value ;
 var V_id=i+'_value'
document.getElementById(V_id).innerHTML = value*10+'%';
   var sound_id = i.split('_')[0]; 
  var x= document.getElementById(sound_id);
  x.volume=value*0.1;
}
 function open_volume(){
	 VOICE.muted=SE.muted=BGM.muted=false;
     VOICE.defaultMuted=SE.defaultMuted=BGM.defaultMuted=false;
	 }
 function close_volume(){
	 VOICE.muted=SE.muted=BGM.muted=true;
     VOICE.defaultMuted=SE.defaultMuted=BGM.defaultMuted=true;
	 }
 function open_volume_box(){
	 volume.style.cssText='display:block;';
	 }
 function close_volume_box(){
	 volume.style.cssText='display:none;';
	 }   
function slow(){
	$("#set__box  .select").removeClass();
	$(this).find('label').addClass("select");
	show_interval=90;}
function uniform(){show_interval=50;}
function fast(){show_interval=10;}          
show_interval=50;
var auto=!1;
g_st=!1;
page=!1;
//版本信息
Version_information_text="此为非兼容性版本0.0";
start();



	
	