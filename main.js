function main_start(){  
	 s=data,next_to=!0,text_P.innerHTML='',img='source/login.jpg',cg='cg_0';	
	 ready_rm(),a==0?main():next_main()
	}
	function main(){
	// 翻页模式:Page_mode ;逐行:0;整页:1; 
	a==s.length&&alert('感谢您的欣赏')
   s.charAt(a)=='#'?img_main():s.charAt(a)=='$'?bgm_main():write_start();

	}
function next_main(){
	//alert(s.charAt(a))
	 a++;
	 cg_matrix.innerHTML='';
	 cg_matrix.style.cssText='display:none;';
     main();
	}
 //剧情函数
function plot_main(){
	//设置音源
    s.source=='bgm'&&bgm_main();
	//设置画面
	s.source=='img'&&img_main();
	//设置字幕
	s.source=='text'&&write_main()
}
//CG函数
 function cg_main(){}
//动画函数
 function mv_main(){}
cg1_arry=['cg_2','cg_3','cg_4','cg_5','cg_7','cg_8','cg_9','cg_10']

 //画面函数
 function img_main(){
	a=a+2;
	for(var i=0;i<cg1_arry.length;i++){
        if(cg1_arry[i]==cg){
       cg_matrix.innerHTML='<div class="'+cg+'" style="height:100%;"></div>'
       _p='url('+img+')';
       init(_p);
       cg_matrix.style.cssText='display:block;';
        break;}
        if(i==cg1_arry.length&&cg1_arry[cg1_arry.length]!=cg){
     cg_matrix_main();
     break;
     }


};
	 img='source/';
	for(var i=0;s.charAt(a)!='"';i++)
	  {	 img+=s.charAt(a);
		   a++;
	   }
	 cg='cg_';
	a=a+2;
	cg+=s.charAt(a);	
	img_0.src=img;
	setTimeout(next_main,1500);
	 }
function cg_matrix_main(){
	for(var i=0;i<20;i++){
		  var str=''+i+''
		  y=i*5;
		  y+=5/19*i
		 sty='style="background-position-y:'+y+'%;"'
		cg_matrix.innerHTML+='<div class="'+cg+'"'+sty+'></div>';	
		}	                                         
	_p='url('+img+')'
	init(_p)
		cg_matrix.style.cssText='display:block;'
	}
	function init(index){  
        var ocssRules=document.styleSheets[1].cssRules || document.styleSheets[2].rules || window.CSSRule.STYLE_RULE;      
        ocssRules[0].style.background=index;  
		ocssRules[0].style.backgroundSize='100%';
		ocssRules[1].style.height='100%';
		ocssRules[1].style.width='100%';
   }  


 //显示字幕
 function write_main(){
	 $('#text_box').addClass('show_box');
	 write_start()
	 }
 //隐藏字幕
 function hidden_main(){
	 $('#text_box').removeClass();
	 }
 //改变对白
 function voice_main(){VOICE.src=s.voice;
	next_main();}
 //改变音效
 function se_main(){SE.src=s.se;
	next_main();}
 //改变背景音乐
 function bgm_main(){
	 a=a+2; 
	var bgm='source/';
	for(var i=0;s.charAt(a)!='"';i++)
	  {	 bgm+=s.charAt(a);
		   a++;
	   }
     BGM.src=bgm;
	next_main();}
 //开始write系列函数定义
//写字函数
function write_word(){
	if((s.charAt(a)!='/')){
	  if(s.charAt(a)!='#'){
		if(s.charAt(a)!='@'){
			text_P.innerHTML+=s.charAt(a)
			if(s.charAt(a)=='】'){text_P.innerHTML+='<br>';}	
			}else{				
				page==!1&&clearInterval(Timer_S);
				text_P.innerHTML+='<br>';
				auto==!1?(add_clickbox()):(page==!1&&TimerS_main()); 
				
		   }
            a++;}else{
				clearInterval(Timer_S)
				next_to=!1;
				img_main();					   
			 }
   }else{   clearInterval(Timer_S);          
           auto==!1?add_next():setTimeout(onclick_next,2000);
		 }
 }
function add_next(){
	$('#click_box').one('click',function(){
                 onclick_next() 
				 });}
function onclick_next(){
	$('#text_box').removeClass();
		  text_P.innerHTML='';
		  next_main();
}
//next函数 继续下一行
	//start函数 开始写字
	function write_start(){
		$('#text_box').addClass('show_box');
		//next_to==!0&&$("#next_img").addClass("show_box")&&(text_P.innerHTML='');
        TimerS_main()
	}
	//整页输出文字

	//增加点击窗口
	function add_clickbox(){
		$('#click_box').one('click',function(){
                page==!1&&TimerS_main()
				 });
		}
    /*$('#click_box').click(function(){
		$('#click_box').removeClass();
		TimerS_main()
		})*/
   function TimerS_main(){
	   Timer_S=setInterval(write_word,show_interval);}	
	   
 function auto_main(){
        s.charAt(a-1)!='@'?onclick_next():TimerS_main();} 
//write系列函数定义完毕
function save_main(){
	var i=a;
	var num=[];
	num[0]={"id":"","bgm":"","img":""}
	for(var j=0;j<100;j++){if(s.charAt(i-j)=='/'){num[0].id=i-j;break}}	
	nu=JSON.stringify(num) 
	alert(nu)
	localStorage.setItem('msg',nu);
	}
function loadsave_main(){
	var dat=localStorage.getItem('msg');
	csk=JSON.parse(dat)
	alert(csk[0].id)
	a=csk[0].id
    $("#click_box").unbind()
	$("#start_menu").css('display','none');
      main_start()
   }
