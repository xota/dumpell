const grav = 0.5; //zwaartekracht
const xSize = 800;
const ySize = 400;
let caver;

let Bullet;
let Bullets = [];
let amountOfBullets = 0;
let maxBullets = 7;
let score;

let x = 100;
let y = 100;
let aantrekingKracht = 0.11;

let startGame = false
let initGame = false
let gameOver = false;
let controlMenu = false;
let startTime;

let easyClicked = false;
let mediumClicked = false;
let hardClicked = false;
let harderClicked = false;
let impossibleClicked = false;
let easyStroke = 0

let song;

function preload() {
//  song = loadSound('music')
  
  
}


function setup() {
  createCanvas(xSize, ySize);
//  song.loop();
}

function draw() {
  background(1, 100, );

  if (initGame == true) { 
    caver = new player();

    startTime = millis();
    
    Bullets = [];
    
    for (let i = 0; i < maxBullets; i++) {
      amountOfBullets += 1
    }
    for (let i = 0; i < maxBullets; i++) {
      x = random(50, 500);
      y = 50;
      radius = 6;
      xSpeed = random((-6, -3), (3, 6));
      ySpeed = random((-5, -4), (4, 5));
      r = random(200, 255)
      g = random(170, 20)
      b = random(0, 30)
      Bullet = new bullet(x, y, radius, xSpeed, ySpeed, r, g, b);
      Bullets.push(Bullet);
    }
    
    initGame = false;
    startGame = true;
    gameOver = false;

  }
  else if (startGame == false && controlMenu == false) { 	
    
		startButton = new buttonStart();
		startButton.display();
    
		controlButton = new buttonControl();
		controlButton.display();
    
		easyButton = new buttonEasy();
		easyButton.display();
    
		mediumButton = new buttonMedium();
		mediumButton.display();
     
		hardButton = new buttonHard();
		hardButton.display();
    
		harderButton = new buttonHarder();	
    harderButton.display();
    
		impossibleButton = new buttonImpossible();
		impossibleButton.display();
     
    
		 let targetX = mouseX;
   	 let dx = targetX - x;
   		 x += dx * aantrekingKracht;

   	 let targetY = mouseY;
     let dy = targetY - y;
   		 y += dy * aantrekingKracht;
		
    noStroke();
    fill('')
    ellipse(x,y,10,10);

      if (mouseIsPressed &&
        mouseX > startButton.xPos &&
        mouseX < startButton.xPos + startButton.width &&
        mouseY > startButton.yPos &&
        mouseY < startButton.yPos + startButton.height || keyIsDown(32)) {
        	if (mouseButton == LEFT) {
         		  initGame = true;
			}
		}
      
      if (mouseIsPressed &&
        mouseX > controlButton.xPos &&
        mouseX < controlButton.xPos + controlButton.width &&
        mouseY > controlButton.yPos &&
        mouseY < controlButton.yPos + controlButton.height) {
        	if (mouseButton == LEFT) {
         		  controlMenu = true;
			}
		}
    
    
          if (mouseIsPressed &&
        mouseX > easyButton.xPos &&
        mouseX < easyButton.xPos + easyButton.width &&
        mouseY > easyButton.yPos &&
        mouseY < easyButton.yPos + easyButton.height) {
        	if (mouseButton == LEFT) {
         		maxBullets = 7;
			}
		}   	else if (mouseIsPressed &&
        mouseX > mediumButton.xPos &&
        mouseX < mediumButton.xPos + mediumButton.width &&
        mouseY > mediumButton.yPos &&
        mouseY < mediumButton.yPos + mediumButton.height) {
        	if (mouseButton == LEFT) {
         		maxBullets = 12;
			}
		}   	else if (mouseIsPressed &&
        mouseX > hardButton.xPos &&
        mouseX < hardButton.xPos + hardButton.width &&
        mouseY > hardButton.yPos &&
        mouseY < hardButton.yPos + hardButton.height) {
        	if (mouseButton == LEFT) {
         		maxBullets = 17;
			}
		}   	else if (mouseIsPressed &&
        mouseX > harderButton.xPos &&
        mouseX < harderButton.xPos + harderButton.width &&
        mouseY > harderButton.yPos &&
        mouseY < harderButton.yPos + harderButton.height) {
        	if (mouseButton == LEFT) {
         		maxBullets = 21;
			}
		}   	else if (mouseIsPressed &&
        mouseX > impossibleButton.xPos &&
        mouseX < impossibleButton.xPos + impossibleButton.width &&
        mouseY > impossibleButton.yPos &&
        mouseY < impossibleButton.yPos + impossibleButton.height) {
        	if (mouseButton == LEFT) {
         		maxBullets = 25;
			}
		}
    


    
    
    textSize(80);
		text('DÜMPELL', 25, 125);    
    
    
	}
	else if (startGame == true && gameOver == false){
    if (startGame == true) { 

      for (let i = 0; i < Bullets.length; i++) {
        Bullet = Bullets[i];
        Bullet.display();
        Bullet.move();

       if (Bullet.xPos - caver.playerWidth < caver.xPos &&
          caver.xPos < Bullet.xPos + Bullet.radius &&
          Bullet.yPos - caver.playerHeight < caver.yPos &&
       	 	caver.yPos < Bullet.yPos + Bullet.radius) {
        		gameOver = true;
    }
  }

      caver.display();
      caver.move();
      caver.update();
      
      score = floor((millis() - startTime)*(maxBullets/10)/100);
      
      textSize(30);
      text(score, 15, 30);

    } 
  }
  else if (gameOver == true) {
    
    backButton = new buttonBack();
    
    backButton.display();
    
     if (mouseIsPressed &&
        mouseX > backButton.xPos &&
        mouseX < backButton.xPos + backButton.width &&
        mouseY > backButton.yPos &&
        mouseY < backButton.yPos + backButton.height) {
        	if (mouseButton == LEFT) {
         		  gameOver = false;
              startGame = false;      
			}
		}   
       
    noStroke();
    fill('white');
    textSize(130);   
    text('Game over',80 ,200 );
    
    textSize(30);
    text('your score was:', 265, 300);
    text(score, 485, 300)
       
  } 
  else if (controlMenu == true) {
    
    backButton = new buttonBack();
    
    backButton.display();
    
     if (mouseIsPressed &&
        mouseX > backButton.xPos &&
        mouseX < backButton.xPos + backButton.width &&
        mouseY > backButton.yPos &&
        mouseY < backButton.yPos + backButton.height) {
        	if (mouseButton == LEFT) {
         		  gameOver = false;
              startGame = false;
              controlMenu = false;
			}
		} 
    
    noStroke();
    fill('#3EDBDE');
    rect(0, 60, 380, 60);
    fill('#3EDE93');
    rect(0, 130, 440, 60);
    fill('#5BDE3E');    
    rect(0, 200, 500, 60);  
    fill('#B2DE3E');     
    rect(0, 270, 560, 60);     
    
    textSize(25);
    noStroke();
    fill('black');
    text('Press A/D to walk', 40, 100);
    text('Press W to jump', 40, 170);
    text('Press S to dash', 40, 240);
    text('Press spacebar in the air to get a jump boost', 40, 310);
    
    

    
	}
}



class player {
  constructor() {
    this.playerHeight = 40; //lengte 'player'
    this.playerWidth = 25; //breedte 'player'
    this.xPos = width / 2;
    this.yPos = height - 50;
    this.speed = 7; //snelheid 'player'
    this.onGround = false; //checkt of 'player' op de grond staat
    this.drag = 0.99;
    this.jumpForce = ySize / 150;
    this.boost = 0;
    this.r = 150;
    this.b = 150;
    this.g = 150;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b);
    rect(this.xPos, this.yPos, this.playerWidth, this.playerHeight);
    		//creërt 'player'
  }

  move() {   
    if (keyIsDown(65) && this.xPos > 1) {
     	  this.xPos -= this.speed;
    } //zorgt er voor dat 'player' naar links loopt met Arrow_Left

    if (keyIsDown(68) && this.xPos + 4 < width - this.playerWidth) {
      	this.xPos += this.speed;
    }
    //zorgt er voor dat 'player' naar rechts loopt met Arrow_Right

  }

  update() {
    this.jumpForce += grav;
    this.yPos += this.jumpForce;

    if (this.yPos > ySize - this.playerHeight - 1.7) {
      this.onGround = true;
      this.jumpForce = -grav;
      this.boost = 0;
    } else {
      this.onGround = false;
    }


      if (keyIsDown(87)&& this.onGround == true ) {
      this.jumpForce = -12;
    }

    if (keyIsDown(83) && this.onGround == false) {
      this.jumpForce = 12;
    }
    //zorgt er voor dat 'player' springt met Arrow_Up
    
    if (keyIsDown(32) && this.onGround == false) { 
      
			this.r = random(0, 0);
			this.g = random(80, 220);
			this.b = random(80, 220);
      
      if (this.boost < 1) {
      	this.jumpForce = -11;
        this.boost += 1;
      }
      
	} else if (keyIsDown(83) && this.onGround == false){
			this.r = random(0, 0);
			this.g = random(80, 220);
			this.b = random(80, 220);
    
      if (this.boost < 1) {
      	this.jumpForce = 16;
        this.boost += 1;
      }
  } else {
    	this.r = (150);
      this.g = (150);
      this.b = (150);
    }
  }

}

class bullet {
  constructor(x, y, radius, xSpeed, Clr) {
    this.xPos = x;
    this.yPos = y;
    this.radius = radius;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  display() {
    noStroke(0);
    fill(this.r, this.g, this.b);
    ellipse(this.xPos, this.yPos, 2 * this.radius, 2 * this.radius);
  }

  move() {
    if (this.xPos > width - this.radius || this.xPos < this.radius) {
      	this.xSpeed = -this.xSpeed;
    }
    if (this.yPos > height - this.radius || this.yPos < this.radius) {
      	this.ySpeed = -this.ySpeed;
    }
   		 	this.xPos += this.xSpeed;
    	  this.yPos += this.ySpeed;
  }
}

class buttonStart {
  constructor() {
    this.xPos = 0;
    this.yPos = 175;
    this.height = 100;
    this.width = 300;
		

  }

  display() {
    stroke('brown');
    fill('brown');
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(80);
    fill('black');
    textFont('Georgia');
    text('Start', this.xPos + 80, this.yPos + 75)
  }
}

class buttonBack {
	constructor(){
  	this.xPos = xSize - 100;
  	this.yPos = 15;
  	this.height = 40;
 	  this.width = 200;
	}

	display(){
  	stroke('gray');
    fill('gray');
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(32);
    fill('black');
    text('Back', this.xPos + 3, this.yPos + 30);
	}
}

class buttonControl {
	constructor(){
  	this.xPos = 0;
  	this.yPos = 300;
  	this.height = 50;
 	  this.width = 300;
	}

	display(){
  	stroke('gray');
    fill('gray');
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(25);
    fill('black');
    text('controls', this.xPos + 125, this.yPos + 35);
	}
}

class buttonEasy {
	constructor(){
  	this.xPos = 500;
  	this.yPos = 60;
  	this.height = 50;
 	  this.width = 500;
	}

	display(){
  	noStroke(this.stroke);
    fill(5, 99, 150);
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(25);
    noStroke();
    fill('black');
    text('Noob mode', this.xPos + 25, this.yPos + 35);
	}
}

class buttonMedium {
	constructor(){
  	this.xPos = 500;
  	this.yPos = 120;
  	this.height = 50;
 	  this.width = 500;
	}

	display(){
  	noStroke('');
    fill(0, 180, 70);
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(25);
    noStroke();
    fill('black');
    text('Easy mode', this.xPos + 25, this.yPos + 35);
	}
}

class buttonHard {
	constructor(){
  	this.xPos = 500;
  	this.yPos = 180;
  	this.height = 50;
 	  this.width = 500;
	}

	display(){
  	noStroke('');
    fill(25, 216, 0);
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(25);
    noStroke();
    fill('black');
    text('Regular mode', this.xPos + 25, this.yPos + 35);
	}
}

class buttonHarder {
	constructor(){
  	this.xPos = 500;
  	this.yPos = 240;
  	this.height = 50;
 	  this.width = 500;
	}

	display(){
  	noStroke('');
    fill(230, 125, 0);
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(25);
    noStroke();
    fill('black');
    text('Veteran mode', this.xPos + 25, this.yPos + 35);
	}
}

class buttonImpossible {
	constructor(){
  	this.xPos = 500;
  	this.yPos = 300;
  	this.height = 50;
 	  this.width = 500;
	}

	display(){
  	noStroke('');
    fill(218, 0, 0);
    rect(this.xPos, this.yPos, this.width, this.height);
    
    textSize(25);
    noStroke()
    fill('black');
    text('God mode', this.xPos + 25, this.yPos + 35);
	}
}
