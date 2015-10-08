var C1 = document.getElementById("C1"); var ctx1 = C1.getContext("2d"); var Cw = C1.width, Ch = C1.height;
var mouse = {x:0,y:0,cx:0,cy:0,lckick:false,mclick:false,rclick:false};
var fps = 60;
var gc = 1000, sc = 100;
var font = "arno";

window.onload=function(){
	res();
}

function res(){
	C1.width = $(window).width(); C1.height = $(window).height(); ctx1.imageSmoothingEnabled = false;
	Cw = C1.width; Ch = C1.height; mouse.cx = 0; mouse.cy = 0;
}

window.setInterval(function(){
	
	draw();
	
	if( C1.width != $(window).width() || C1.height != $(window).height() ){ res(); }
	
},1000/fps)

var P = {

	x:300,y:300,hp:100,hpm:200,hpc:0,hps:60

}

var shop = {
	m:0,
	y:[
		{y:0, scr:0,mx:0},
		{y:0, scr:0,mx:0},
		{y:0, scr:0,mx:0},
		{y:0, scr:0,mx:0},
		{y:0, scr:0,mx:0}
	],
	b:[
		{a:0,n:"Weapons"},
		{a:0,n:"Armor"},
		{a:0,n:"Materials"},
		{a:0,n:"Consumables"},
		{a:0,n:"Workers"}
	],
	i:[
		[
			{vis:true,val:0,n:"Iron Sword",s:IWSwordIron1,p:250},{vis:true,val:1,n:"Steel Sword",s:IWSwordSteel1,p:1550},
			{vis:true,val:0,n:"Longbow",s:IWLongbow1,p:2050},{vis:false},{vis:false},{vis:false},{vis:false},{vis:false},{vis:false},
			{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
			{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
		],
		[
			{vis:false},
			{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
			{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
		],
		[
			{vis:true,val:0,n:"Tungsten",s:ITung,p:1700},{vis:true,val:0,n:"Copper",s:ICopr,p:23},{vis:true,val:0,n:"Platinum",s:IPlat,p:2300},
			{vis:true,val:0,n:"Olivine",s:IOlvn,p:4500},{vis:true,val:0,n:"Sapphire",s:ISaph,p:5200},{vis:true,val:0,n:"Ruby",s:IRuby,p:300},
			{vis:true,val:0,n:"Iron",s:IIron,p:120},{vis:true,val:0,n:"Silver",s:ISilv,p:4820},
			{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
			{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
			{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
			{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
		],
		[
		
		],
		[
		
		]
		
	],
	slt:{
		name:"",val:0,p:0,s:null_s,y:0,show:false
	}
}

var Inv = {
	
	c:0,
	i:[
		
	]

}

var G = {

	v:2,
	map:{
		x:0,y:0
	}
	
}








function draw(){

	ctx1.clearRect(0,0,C1.width,C1.height);
	
	if( G.v == 0 ){ drawMaze() }
	if( G.v == 1 ){ drawMap() }
	if( G.v == 2 ){ drawShop() }
	
	drawMouse();
	
}

function drawShop(){

	lcrn = 200;

	fs("#080300");
	fr(0,0,Cw,Ch);
	
	for (i = 0; i < shop.b.length; i++){ b = shop.b[i];
		if( shop.m == i ){ fs("#331100"); }else{ fs("#170600"); }
		fr(Cw-lcrn,100+(80*i),lcrn,70);
			ctx1.globalAlpha = b.a;
		fs("#250800");
		fr(Cw-lcrn,100+(80*i),lcrn,70);
			ctx1.globalAlpha = 1;
		if( shop.m != i && mouse.x > Cw-lcrn && mouse.y > 100+(80*i) && mouse.y < 100+(80*(i+1)) ){
			b.a += (1-b.a)/4;
		}else{ b.a += (0-b.a)/4 }
		if( mouse.cx > Cw-lcrn && mouse.cy > 100+(80*i) && mouse.cy < 100+(80*(i+1)) ){ shop.m = i; mouse.cx = 0; mouse.cy = 0; }

		stxt(25,"#fff"); ctx1.textAlign = "right";
		ctx1.fillText(b.n,Cw-30,100+(80*i)+40);
		ctx1.textAlign = "left";
		
	}
	
	fs("#331100");
	fr(0,0,Cw-lcrn,Ch);
	
	fs("#170600");
	fr(20,100,Cw-lcrn-40,Ch);
	
	drawItems(20,100,Cw-lcrn-40,Ch-140,shop.i[shop.m]);
	
	drawShoptip();
	
	fs("#331100");
	fr(0,0,Cw-lcrn,100);
	drw(Gc,30,10,3);
	stxt(25,"#e6d24a",true);
	ctx1.fillText(abr(Inv.c,2),70,30);

}

function drawShoptip(){
	l = shop.slt;
	x = 20; y = Ch-l.y;
	fs("#210500");
	ctx1.fillRect(x,y,Cw-200-40,l.y);
	
	x+= 20;
	
	drw(frmN,x,y,3);
	if( typeof l.s == "object" ){ drw(l.s,x,y,3); }
	switch ( l.val ){
		case 1: drw(frmE,x,y,3); break;
		case 2: drw(frmG,x,y,3); break;
		case 3: drw(frmC,x,y,3); break;
		case 4: drw(frmA,x,y,3); break;
		default: drw(frmI,x,y,3); break;
	}
	
	if( l.p > 0 ){
		stxt(25,"#be7846",true);
		drw(Gc,x+160,y+60,2);
		if( l.p > Inv.c ){ fs("#ea1700"); }
		else{ fs("#e6d24a"); }
		ctx1.textAlign = "left";
		if( l.p != undefined ){ ctx1.fillText(abr(l.p,2),x+190,y+70); }
	}
	
	stxt(25,"#fff",true);
	if( l.name != undefined ){ ctx1.fillText(l.name,x+170,y+30); }
	
	if( l.show == true ){ shop.slt.y += (200-shop.slt.y)/3 }else{ shop.slt.y += (0-shop.slt.y)/3 }
	
}

function drawItems(sx,sy,sw,sh,a){

	r2 = 0;
	r = -shop.y[shop.m].y; c = -1; w = 102;
	for( i = 0; i < a.length; i++ ){ I = a[i];
		if( w*(c+2) > sw ){ r++; r2++; c=0 }else{ c++ };
		x = sx+(w*c)+1; y = sy+(w*r)+1;
		if( y > 0 && y+w < Ch+w ){
			if( bounds(mouse.x,x,x+w) && bounds(mouse.y,y,y+w) && mouse.y < Ch-shop.slt.y ){ drw(frmN1,x,y,2) }else{ drw(frmN,x,y,2) };
			if( I.vis == true ){
			
			if( I.s != undefined ){ drw(I.s,x,y,2); }
			switch ( I.val ){
				case 1: drw(frmE,x,y,2); break;
				case 2: drw(frmG,x,y,2); break;
				case 3: drw(frmC,x,y,2); break;
				case 4: drw(frmA,x,y,2); break;
				default: drw(frmI,x,y,2); break;
				}
			
			}
			if( I.p > 0 ){
				stxt(20,"#e6d24a",true);
				drw(Gc,x+10,y+w-20,2);
				if( I.p > Inv.c ){ fs("#ea1700"); }
				else{ fs("#e6d24a"); }
				ctx1.textAlign = "left";
				ctx1.fillText(abr(I.p,0),x+35,y+w-5);
			}
			if( bounds(mouse.cx,x,x+w) && bounds(mouse.cy,y,y+w) && mouse.cy < Ch-shop.slt.y ){
				shop.slt.show = I.vis; shop.slt.val = I.val;
				shop.slt.s = I.s; shop.slt.p = I.p; shop.slt.name = I.n;
				if( r2-1 < shop.y[shop.m].mx && r2 > shop.y[shop.m].scr+1 ){ shop.y[shop.m].scr = r2-1 }else if( r2 > shop.y[shop.m].scr+1 ){ shop.y[shop.m].scr = shop.y[shop.m].mx };
				Rmouc();
			}
		}
		
	}
	shop.y[shop.m].y += (shop.y[shop.m].scr-shop.y[shop.m].y)/6;
	shop.y[shop.m].mx = Math.floor(r2-2); if( shop.y[shop.m].scr > shop.y[shop.m].mx ){ shop.y[shop.m].scr = (shop.y[shop.m].mx) }else if( shop.y[shop.m].scr<0 ){ shop.y[shop.m].scr = 0 }

}

function drawMaze(){
	
	drawPlayer(P.x,P.y);
	
}

function drawPlayer(x,y){
	s = 2;
	
	drw(player_s,x-player_s.width,y-player_s.height,s);
	drw(hp_s,x-54,y-player_s.height-40,s);
	fs("#f20");
	
	if( (P.hp/P.hpm) > 1 ){ P.hp = P.hpm }
	else if( (P.hp/P.hpm) < 0 ){ P.hp = 0 }
	
	ctx1.fillRect(x-(hp_s.width*(s/2))+(4*(s/2)),y-player_s.height-(hp_s.height*(s/2))-(25/(s/2)),(100*(s/2))*(P.hp/P.hpm),(6*(s/2)));
	
	stxt(15,"#f20"); ctx1.fillText(P.hp+"/"+P.hpm,x-50,y-player_s.height-39);
	if( P.hp < P.hpm ){ if( P.hpc < 1 ){ P.hp++ ; P.hpc = P.hps }else{ P.hpc-- } };
	
	fs("#777"); ctx1.globalAlpha = 0.5;
	ctx1.fillRect(x+70,y+50,60,2);
	ctx1.fillRect(x+70,y+0,60,2);
	ctx1.fillRect(x+70,y-50,60,2);
	if( bounds(mouse.x,x+70,x+70+60) ){
		if( mouse.y < y+75 && mouse.y > y+25 ){
			ctx1.fillRect(mouse.x,y+40,2,20);
		}else if( mouse.y <= y+25 && mouse.y >= y-25 ){
			ctx1.fillRect(mouse.x,y-10,2,20);
		}else if( mouse.y < y-25 && mouse.y > y-75 ){
			ctx1.fillRect(mouse.x,y-60,2,20);
		}
	}
	ctx1.globalAlpha = 1;
	
}

function drawMap(){
	
	drw(l1_s,G.map.x+400,G.map.y+200,2);
	
}

function drawMouse(){

	drw(cur_s,mouse.x,mouse.y,2);

}















function click(m,p){
	if( p == true ){
		mouse.cx = mouse.x; mouse.cy = mouse.y;
		if( m == "l" ){
			
		}else if( m == "m" ){
			
		}else if( m == "r" ){
			
		}
	}else if( p == false ){
		if( m == "l" ){
			
		}else if( m == "m" ){
			
		}else if( m == "r" ){
			
		}
	}

}


$('#C1').mousedown(function(e) {
	switch (e.which) {
		case 1: //Left mouse button
			mouse.lclick = true; click("l",true);
			break;
		case 2: //Middle mouse button
			mouse.mclick = true; click("m",true);
			break;
		case 3: //Right mouse button
			mouse.rclick = true; click("r",true);
			break;
	}
});
$('#C1').mouseup(function(e) {
	switch (e.which) {
		case 1: //Left mouse button
			mouse.lclick = false; click("l",false);
			break;
		case 2: //Middle mouse button
			mouse.mclick = false; click("m",false);
			break;
		case 3: //Right mouse button
			mouse.rclick = false; click("r",false);
			break;
	}
});

window.onkeydown = function (e){
	key = e.keyCode ? e.keyCode : e.which;
		switch(key){
			default: console.log(key); break;
		};
}
window.onkeyup = function (e){
	key = e.keyCode ? e.keyCode : e.which;
		switch(key){
		}
}
window.oncontextmenu = function(){
	return false;
};
C1.addEventListener('mousemove', function(evt) {
		//When the mouse is moved
		var rekt = C1.getBoundingClientRect();
		mouse.x = evt.clientX - rekt.left;
		mouse.y = evt.clientY - rekt.top;
}, false);

 $('#C1').bind('DOMMouseScroll', function(e){
     scroll(e.originalEvent.detail);

     //prevent page fom scrolling
     return false;
 });

 //IE, Opera, Safari
 $('#C1').bind('mousewheel', function(e){
     scroll(e.originalEvent.wheelDelta);
	 
     //prevent page fom scrolling
     return false;
 });
 
 function scroll( e ){
	if( G.v = 2 ){
		if(e < 0) {
			 //scroll down
			if( shop.y[shop.m].scr<shop.y[shop.m].mx ){ shop.y[shop.m].scr++ }
		}else {
			 //scroll up
			if( shop.y[shop.m].scr>0 ){ shop.y[shop.m].scr-- }
		}
	}
 }
 
 function bounds(x1,x2,x3){
	if( x1 > x2 && x1 <= x3 ){ return true }else{ return false };
 }
 
 function abr(n,d){
	n2 = n; a = "";
	if( n2 >= pw(10,24) ){ n2 /= pw(10,24); a = "Y" }
	else if( n2 >= pw(10,21) ){ n2 /= pw(10,21); a = "Z" }
	else if( n2 >= pw(10,18) ){ n2 /= pw(10,18); a = "E" }
	else if( n2 >= pw(10,15) ){ n2 /= pw(10,15); a = "P" }
	else if( n2 >= pw(10,12) ){ n2 /= pw(10,12); a = "T" }
	else if( n2 >= pw(10,9) ){ n2 /= pw(10,9); a = "G" }
	else if( n2 >= pw(10,6) ){ n2 /= pw(10,6); a = "M" }
	else if( n2 >= pw(10,3) ){ n2 /= pw(10,3); a = "k" }
	else{ d = 0 }
	return n2.toFixed(d)+" "+a;
 }
 
 function pw(n,p){
	return Math.pow(n,p);
 }
 
 function Rmouc(){
	//reset mouse click pos
	mouse.cx = 0;
	mouse.cy = 0;
}

function dp(v,n,d){
	//Depletion principle
	return (  v/(n/d+1)  );
}
 
 
 
 
 
 //context functions
 
 function drw(spr,x,y,s){
	ctx1.drawImage(spr,x,y,spr.width*s,spr.height*s);
	
 }
 
 function stxt(s,c,b){
	bold = "";
	if( b == true ){ bold = "bold " }
	ctx1.fillStyle = c; ctx1.font = bold+s+"px "+font;
	
 }
 
 function fs(c){
 
	ctx1.fillStyle = c;
	
 }
 
 function fr(x,y,w,h){
 
	ctx1.fillRect(x,y,w,h);
	
 }
 
 function hit(cha,dmg){
 
	cha.hp -= dmg;
	stxt(20,"#ff0"); ctx1.fillText(dmg,cha.x,cha.y);
 
 }