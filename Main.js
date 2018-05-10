/* Define Canvas */  
var canvas; 
var stage;


/* Background */
var bgImg = new Image(); 
var bg; 
var bg2Img = new Image(); 
var bg2;


/* Ship */
var sImg = new Image(); 
var ship;

/* Enemy */
var eImg = new Image();

/* Boss */
var bImg = new Image(); 
var boss;

/* Lives */
var lImg = new Image();

/* Bullets */
var bltImg = new Image();

var winImg = new Image(); 
var loseImg = new Image(); 
var win; 
var lose;

var lives = new Container(); //stores the lives gfx 
var bullets = new Container(); //stores the bullets gfx 
var enemies = new Container(); //stores the enemies gfx 
var bossHealth = 20; 
var score; 
var gfxLoaded = 0; //used as a preloader, counts the already loaded items 
var centerX = 160; 
var centerY = 240; 
var tkr = new Object(); //used as a Ticker listener 
var timerSource; //references a setInterval method

function Main() 
{ 
/* Link Canvas */
    canvas = document.getElementById('Shooter'); 
    stage = new Stage(canvas);
    stage.mouseEventsEnabled = true;

/* Sound */  
    SoundJS.addBatch([ 
            {name:'boss', src:'boss.mp3', instances:1}, 
            {name:'explo', src:'explo.mp3', instances:10}, 
            {name:'shot', src:'shot.mp3', instances:10}]);

/* Load GFX */
  
    bgImg.src = 'bg.png'; 
    bgImg.name = 'bg'; 
    bgImg.onload = loadGfx; 

    bg2Img.src = 'bg2.png'; 
    bg2Img.name = 'bg2'; 
    bg2Img.onload = loadGfx; 

    sImg.src = 'ship.png'; 
    sImg.name = 'ship'; 
    sImg.onload = loadGfx; 

    eImg.src = 'enemy1.png'; 
    eImg.name = 'enemy'; 
    eImg.onload = loadGfx; 

    bImg.src = 'boss.png'; 
    bImg.name = 'boss'; 
    bImg.onload = loadGfx; 

    lImg.src = 'live.png'; 
    lImg.name = 'live'; 
    lImg.onload = loadGfx; 

    bltImg.src = 'bullet.png'; 
    bltImg.name = 'bullet'; 
    bltImg.onload = loadGfx; 

    winImg.src = 'win.png'; 
    winImg.name = 'win'; 
    winImg.onload = loadGfx; 

    loseImg.src = 'lose.png'; 
    loseImg.name = 'lose'; 
    loseImg.onload = loadGfx;
    
/* Ticker */  
    Ticker.setFPS(30); 
    Ticker.addListener(stage);    
       
}

function loadGfx(e) 
{ 
    if(e.target.name = 'bg'){bg = new Bitmap(bgImg);} 
    if(e.target.name = 'bg2'){bg2 = new Bitmap(bg2Img);} 
    if(e.target.name = 'ship'){ship = new Bitmap(sImg);} 
      
    gfxLoaded++; 
      
    if(gfxLoaded == 9) 
    { 
        addGameView(); 
    } 
}

function addGameView() 
{ 
    ship.x = centerX - 18.5; 
    ship.y = 480 + 34; 
      
/* Add Lives */
    for(var i = 0; i < 3; i++) 
    { 
        var l = new Bitmap(lImg); 
          
        l.x = 248 + (25 * i); 
        l.y = 463; 
          
        lives.addChild(l); 
        stage.update(); 
    } 
      
/* Score Text */
    score = new Text('0', 'bold 14px Courier New', '#FFFFFF'); 
    score.maxWidth = 1000;  //fix for Chrome 17 
    score.x = 2; 
    score.y = 476; 
      
/* Second Background */
    bg2.y = -480; 
      
/* Add gfx to stage and Tween Ship */
    stage.addChild(bg, bg2, ship, enemies, bullets, lives, score); 
    Tween.get(ship).to({y:425}, 1000).call(startGame); 
}

