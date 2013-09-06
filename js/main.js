$(function(){
	var myCar ={};
	 var beginsound = new Howl({
  	urls: ['music/gogogo.mp3'],
  	loop: true,

 	 });
	var addMyCar = function(){
		myCar = $("<div id='myCar'></div>"); 
		myCar.speed = 10;
		myCar.autoSpeed = 2;
		myCar.width("30px");
	myCar.height("60px");
	myCar.css("position","absolute");
	// myCar.css("background-color","#008800");
	myCar.css("background-image","url(images/feiji.jpg)")
	myCar.css("background-size","100% 100%")
	myCar.pleft = 200;
	myCar.pbottom = 50;
	 myCar.css("left",myCar.pleft+'px');
     myCar.css("bottom",myCar.pbottom +'px');
     makehuoyan();
	$("#moveThings").append(myCar);
	}
	var road = {};
	var initRoad = function(){
		road = $("#road");
	}
	var movement = function(obj,speed,drect){

		obj['p'+drect] = parseInt(obj.css(drect));
		// myCar.pleft = 30;
		obj['p'+drect] -= speed;
		 // myCar.css("left",myCar.pleft+'px');
    	 obj.css(drect,obj['p'+drect]+'px');
	};
	var backmovement = function(speed,drect){

		var ss =  parseInt(road.css(drect));
		ss -= speed;
		road.css(drect,ss+'px');
	};
	var makeRandomThings = function(height1,height2){
		var roadBottom = parseInt(road.css("bottom"));
		var abottom = Math.floor(Math.random()*(height2 - height1))+height1 -roadBottom;
		var aleft = Math.floor(Math.random()*400);
		var blockThing = $("<div id ='blockThing'></div>");
			blockThing.width("30px");
		blockThing.height("60px");
		blockThing.css("position","absolute");
		blockThing.css("background-color","red");
		 blockThing.css("left",aleft+'px');
    	 blockThing.css("bottom",abottom +'px');
		$("#road").append(blockThing);
		randomThings.push(blockThing);
	};
	var checkRandomThingsMiss = function(){
		var arandom;
		var roadBottom = parseInt(road.css("bottom"));
		var newRandom = [];
		for (var i = 0; i < randomThings.length; i++) {
			arandom = randomThings[i];
			var theBottom = parseInt(arandom.css("bottom"))+60;
			if (theBottom+roadBottom > 0) {
				newRandom.push(arandom);
			}else{
				arandom.remove();
			}
		};
		randomThings = newRandom;
	};
	var makehuoyan = function(){
		var huoyan = $("<div id='feijihuo'></div>");
			huoyan.width("30px");
			huoyan.height("60px");
				huoyan.css("position","absolute");
			// myCar.css("background-color","#008800");
			huoyan.css("background-image","url(images/gifhuo.gif)")
			huoyan.css("background-size","100% 100%")
			huoyan.pleft = 0;
			huoyan.Ptop = 60;
			 huoyan.css("left",huoyan.pleft+'px');
		     huoyan.css("top",huoyan.Ptop +'px');
		     myCar.append(huoyan);
		     myCar.huoyan = huoyan;
		     huoyan.hide()
	}
	var ishit = function(aRandomThing){
		var roadBottom = parseInt(road.css("bottom"));
		var Vleft = parseInt(aRandomThing.css("left"));
		var Vright = Vleft + 30;
		var Vbottom = parseInt(aRandomThing.css("bottom"))+roadBottom;
		var Vtop = Vbottom +60;
		var Cleft = parseInt(myCar.css("left"));
		var Cright = Cleft + 30;
		var Cbottom = parseInt(myCar.css("bottom"));
		var Ctop = Cbottom +60;
		  if( Vright>Cleft&& Vleft<Cright&&Vtop>Cbottom&&Vbottom<Ctop){
        return true;
      }
      return false;
	};
	var checkBang = function(){
		var newRandom = [];
		for (var i = 0; i < randomThings.length; i++) {
			arandom = randomThings[i];
			if (ishit(arandom)) {
				arandom.remove();
			}else{
				
				newRandom.push(arandom);
			}
		};
		randomThings = newRandom;
	};
	{
		var autoFlag = false;
		 var timer;
		 var randomThings =[];
	}
	var autoMove = function(){
		autoFlag = !autoFlag;
		if (autoFlag) {
			beginsound.play();
		}else{
			beginsound.pause();
		}
	}
	var updateByTime = function(){
		if (autoFlag) {
			backmovement(myCar.autoSpeed,"bottom");
			//anum = 1时刷新障碍
			var anum = Math.floor(Math.random()*40);
			if (anum == 1) {
				makeRandomThings(600,900);
			};
		};
		  checkBang();
		 checkRandomThingsMiss();
		timer=setTimeout(function(){
      	updateByTime();
    	},15);
	}
	addMyCar();
	initRoad();  
	makeRandomThings(0,600);
	updateByTime();
	$(document).keydown(function(key){
   
       switch(parseInt(key.which,10)){
         case 27:
               $(document).abort();
               break;
        case 32:
        		// beginsound.play();
          		autoMove();
              break;
        case 38:
               //up
           		myCar.autoSpeed = 4;
                myCar.huoyan.show();
                break;
            case 40:
               //down
                // backmovement(-myCar.speed,"bottom");
                
                break;
            case 37:
               //left
                 movement(myCar,myCar.speed,"left");
                
                break;
            case 39:
               //right
                movement(myCar,-myCar.speed,"left");
                
                break;
       }
    
  
   });
	$(document).keyup(function(key){
  	
       switch(parseInt(key.which,10)){
         case 27:
            
               break;
        case 32:
          		
              break;
        case 38:
               //up
           		myCar.autoSpeed = 2;
                myCar.huoyan.hide();
                break;
            case 40:
               //down
                // backmovement(-myCar.speed,"bottom");
                
                break;
            case 37:
               //left
              
                
                break;
            case 39:
               //right
               
                
                break;
       }
	});
});