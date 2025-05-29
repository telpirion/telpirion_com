// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global
width,
height,
createCanvas, 
random, 
background, 
fill, 
color, 
rect, 
ellipse, 
stroke,
noStroke,
noFill,
strokeWeight,
beginShape,
vertex,
endShape,
CLOSE,
triangle,
loadImage,
image,
dvdImage,
colorMode,
HSB,
text,
line,
mouseX,
mouseY,
mouseIsPressed,
text,
round,
sqrt,
keyCode,
loop,
noLoop,
WEBGL,
RIGHT_ARROW,
LEFT_ARROW,
frameRate,
collideRectRect,
*/


let backgroundColor, 
    starShip, 
    score, 
    bullets,
    alienBitSize,
    alienHorde,
    numberOfStarships,
    level,
    alienHordeStartX,
    alienHordeStartY,
    isPaused;

function setup() {
  isPaused = false;
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 5;
  frameRate(12);
  alienBitSize = 3;
  starShip = new Starship();
  alienHordeStartX = 100;
  alienHordeStartY = 50;
  alienHorde = new AlienHorde(alienHordeStartX, alienHordeStartY);
  numberOfStarships = 3;
  score = 0;
  bullets = [];
  level = 1;
}

function draw() {
  background(backgroundColor);
  starShip.moveSelf();
  starShip.showSelf();
  starShip.checkCollisions(alienHorde);
  
  for (const bullet of bullets) {
    bullet.moveSelf();
    bullet.showSelf();
  }
  
  // Arrow functions may be complicated for students...
  bullets = bullets.filter(b => b.isActive);
  
  alienHorde.move();
  alienHorde.show();
  alienHorde.checkCollisions();
  alienHorde.removeDead();
  
  displayScore();
}

function displayScore() {
  fill(95);
  text(`Score: ${score}`, 20, 20);
  text(`Ships remaining: ${numberOfStarships}`, 20, 35);
  text(`Level: ${level}`, 20, 50);
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    starShip.direction = "E";
  } else if (keyCode === LEFT_ARROW) {
    starShip.direction = "W";
  } else if (keyCode === 71 /* 'g' */ ) {
    restartGame();
  } else if (keyCode === 32 /* space bar */) {
    bullets.push(new Bullet(starShip.x + 15, starShip.y));
  } else if (keyCode === 80 /* 'p' */) {
    if (!isPaused) {
      isPaused = true;
      noLoop();
    } else {
      isPaused = false;
      loop();
    }
  }
}

function restartGame() {
  score = 0;
  starShip = new Starship();
  alienHorde = new AlienHorde(100, 50);
  bullets = [];
  loop();
}

function gameOver() {
  if (numberOfStarships == 0) {
    background(backgroundColor);
    starShip.showSelf();
    displayScore();

    stroke(0);
    text("GAME OVER", width / 2 - 50, height / 2 - 20);
    noLoop();
  } else {
    if ((alienHordeStartY + alienHorde.height) < starShip.y) {
      alienHordeStartY += 20;
    }
    alienHorde = new AlienHorde(alienHordeStartX, alienHordeStartY);
    bullets = [];
    level++;
  }
}

class Starship {
  constructor() {
    this.size = 20;
    this.x = width / 2;
    this.y = height - 35;
    this.direction = '';
    this.speed = 12;
    this.width = this.size * 3;
    this.height = this.size * 3;
  }

  moveSelf() {
    if (this.direction === "E" && (this.x + 40) <= width) {
      this.x += this.speed;
    } else if (this.direction === "W" && (this.x  - 10) >= 0) {
      this.x -= this.speed;
    }
  }

  showSelf() {
    fill(color(200, 90, 90));
    noStroke();
    rect(this.x, this.y + 10, this.size / 2, this.size);
    rect(this.x + 10, this.y, this.size / 2, this.size);
    rect(this.x + 20, this.y + 10, this.size / 2, this.size);
  }

  checkCollisions(alienHorde) {
    for (const alien of alienHorde.aliens) {
      if (collideRectRect(alien.x,
                         alien.y,
                         alien.width,
                         alien.height,
                         this.x,
                         this.y,
                         this.width,
                         this.height)) {
        console.log('starship ouchie!');
        numberOfStarships--;
        
        if (numberOfStarships == 0) {
          gameOver();
        }
      }
    } 
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = 10;
    this.width = 2;
    this.speed = 20;
    this.isActive = true;
  }
  
  moveSelf() {
    if (this.y >= (0 - this.length)) {
      this.y -= 20;
    } else {
      this.isActive = false;
    }
  }
  
  showSelf() {
    fill(95);
    noStroke();
    rect(this.x, this.y, this.width, this.length);
  }
}

class Alien {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.bitSize = alienBitSize;
    this.width = 10 * this.bitSize;
    this.height = 7 * this.bitSize;
    this.isAlive = true;
    this.isBleep = true; 
  }
  
  showSelf() {
    fill(color(120, 90, 90));
    noStroke();
    
    if (this.isBleep) {
      rect(this.x,
           this.y + (this.bitSize * 4),
           this.bitSize,
           this.bitSize * 3);
      rect(this.x + (this.bitSize * 10),
           this.y + (this.bitSize * 4),
           this.bitSize,
          this.bitSize * 3)
      rect(this.x + (this.bitSize * 3),
           this.y + (this.bitSize * 7),
           this.bitSize * 2,
           this.bitSize);
      rect(this.x + (this.bitSize * 6),
           this.y + (this.bitSize * 7),
           this.bitSize * 2,
           this.bitSize);
      this.isBleep = false;

    } else {
      rect(this.x,
           this.y + (2 * this.bitSize),
           this.bitSize,
           this.bitSize * 3);
      rect(this.x + (this.bitSize * 10),
           this.y + (this.bitSize * 2),
           this.bitSize,
           this.bitSize * 3)
      rect(this.x + (this.bitSize * 1),
           this.y + (this.bitSize * 7),
           this.bitSize,
           this.bitSize);
      rect(this.x + (this.bitSize * 9),
           this.y + (this.bitSize * 7),
           this.bitSize,
           this.bitSize);
      this.isBleep = true;
    }
    

    rect(this.x + this.bitSize,
         this.y + (3 * this.bitSize),
         this.bitSize,
         this.bitSize * 2);
    rect(this.x + (this.bitSize * 2),
         this.y,
         this.bitSize,
         this.bitSize);
    rect(this.x + (this.bitSize * 2),
         this.y + (2 * this.bitSize),
         this.bitSize,
         this.bitSize * 5);
    rect(this.x + (this.bitSize * 3),
         this.y + (1 * this.bitSize),
         this.bitSize,
         this.bitSize * 2)
    rect(this.x + (this.bitSize * 3),
         this.y + (4 * this.bitSize),
         this.bitSize,
         this.bitSize * 2);
    rect(this.x + (this.bitSize * 4),
         this.y + (this.bitSize * 2),
         this.bitSize * 3,
         this.bitSize * 4);
    rect(this.x + (this.bitSize * 7),
         this.y + (this.bitSize * 1),
         this.bitSize,
         this.bitSize * 2);
    rect(this.x + (this.bitSize * 7),
         this.y + (this.bitSize * 4),
         this.bitSize,
         this.bitSize * 2);
    rect(this.x + (this.bitSize * 8),
         this.y + (this.bitSize * 2),
         this.bitSize,
         this.bitSize * 5);
    rect(this.x + (this.bitSize * 8),
         this.y,
         this.bitSize,
         this.bitSize);
    rect(this.x + (this.bitSize * 9),
         this.y + (this.bitSize * 3),
         this.bitSize,
         this.bitSize * 2);
  }
  
  moveSelf(deltaX, deltaY) {
    this.x -= deltaX;
    this.y += deltaY;
  }
  
  checkCollisions() {
    for (let bullet of bullets) {
      if (collideRectRect(this.x,
                          this.y,
                          this.width,
                          this.height,
                          bullet.x,
                          bullet.y,
                          bullet.width,
                          bullet.length
      )) {
        console.log('hit');
        this.isAlive = false;
        bullet.isActive = false;
        bullet.y = 0;
        score += 1;
      }
    }
  }
}

class AlienHorde {
  constructor(x, y) {
    this.aliens = [];
    this.x = x;
    this.y = y;
    this.width = (4 * 10 * alienBitSize) + 20;
    this.height = 0;
    this.deltaX = 10;
    this.deltaY = 0;
    this.createAliens();
  }
  
  // Create 3 rows of 5 aliens each
  createAliens() {
    for (let i = 0; i < 3; i++) {
      for (let h = 0; h < 5; h++) {
        let ax = this.x + (h * 13 * alienBitSize);
        let ay = this.y + (i * 10 * alienBitSize);
        this.aliens.push(new Alien(ax, ay));
      }
      this.height += (alienBitSize * 10);
    }
  }
  
  removeDead() {
    this.aliens = this.aliens.filter(a => a.isAlive)
    if (this.aliens.length == 0) {
      this.show();
      gameOver();
    }
  }
  
  move() {
    this.x -= this.deltaX;
    this.y += this.deltaY;
    if (this.x <= 20) {
      this.deltaX = -10;
      this.deltaY = 10;
    } else if ((this.x + this.width) >= (width - 70)) {
      this.deltaX = 10;
      this.deltaY = 10;
    } else {
      this.deltaY = 0;
    }
    
    for (const alien of this.aliens) {
      alien.moveSelf(this.deltaX, this.deltaY);
    }
  }
  
  show() {
    for (const alien of this.aliens) {
      alien.showSelf();
    }
  }
  
  checkCollisions() {
    for (const alien of this.aliens) {
      alien.checkCollisions();
    }
  }
}
