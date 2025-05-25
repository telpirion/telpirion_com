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
sqrt
*/


let backgroundColor, playerSnake, currentApple, score

function setup() {
  // Canvas & color settings
  createCanvas(400, 400)
  colorMode(HSB, 360, 100, 100)
  backgroundColor = 95
  frameRate(12)
  playerSnake = new Snake()
  currentApple = new Apple()
  score = 0
}

function draw() {
  background(backgroundColor)
  // The snake performs the following four methods:
  playerSnake.moveSelf()
  playerSnake.showSelf()
  playerSnake.checkCollisions()
  playerSnake.checkApples()
  // The apple needs fewer methods to show up on screen.
  currentApple.showSelf()
  // We put the score in its own function for readability.
  displayScore()
}

function displayScore() {
  fill(0)
  text(`Score: ${score}`, 20, 20)
}

class Snake {
  constructor() {
    this.size = 10
    this.x = width/2
    this.y = height - 10
    this.direction = 'N'
    this.speed = 12
    this.tail = [new TailSegment(this.x, this.y)]
  }

  moveSelf() {
    if (this.direction === "N") {
      this.y -= this.speed
    } else if (this.direction === "S") {
      this.y += this.speed
    } else if (this.direction === "E") {
      this.x += this.speed
    } else if (this.direction === "W") {
      this.x -= this.speed
    } else {
      console.log("Error: invalid direction")
    }
    this.tail.unshift(new TailSegment(this.x, this.y))
    this.tail.pop()
  }

  showSelf() {
    stroke(240, 100, 100)
    noFill()
    rect(this.x, this.y, this.size, this.size)
    noStroke()
    for (let i = 0; i < this.tail.length; i++) {
      this.tail[i].showSelf()
    }
  }

  checkApples() {
    if (collideRectRect(this.x,
                   this.y, 
                   this.size,
                   this.size,
                   currentApple.x,
                   currentApple.y,
                   currentApple.size,
                   currentApple.size)) {
      score +=1
      currentApple = new Apple()
      this.extendTail()
    }
  }

  checkCollisions() {
    for (let i = 1; i < this.tail.length; i++) {
      if (collideRectRect(this.x,
                         this.y,
                         this.size,
                         this.size,
                         this.tail[i].x,
                         this.tail[i].y,
                         this.tail[i].size,
                         this.tail[i].size)) {
        gameOver()
      }
    }
  }

  extendTail() {
    let lastTailSegment = this.tail[this.tail.length - 1]
    this.tail.push(new TailSegment(lastTailSegment.x, lastTailSegment.y))
  }
}

class Apple {
  constructor() {
    this.x = random(width - 10)
    this.y = random(height - 10)
    this.size = 10
  }

  showSelf() {
    fill(0, 80, 80)
    rect(this.x, this.y, this.size, this.size)
  }
}

class TailSegment {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.size = 10
  }
  
  showSelf() {
    fill(240, 100, 100)
    rect(this.x, this.y, this.size, this.size)
  }
}

function keyPressed() {
  console.log("key pressed: ", keyCode)
  if (keyCode === UP_ARROW && playerSnake.direction != 'S') {
    playerSnake.direction = "N"
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != 'N') {
    playerSnake.direction = "S"
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != 'W') {
    playerSnake.direction = "E"
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != 'E') {
    playerSnake.direction = "W"
  } else if (keyCode === 32  ) {
    restartGame()
  } else {
    console.log("wrong key")
  }
}

function restartGame() {
  score = 0;
  playerSnake = new Snake()
  currentApple = new Apple()
  loop()
}

function gameOver() {
  stroke(0)
  text("GAME OVER", 50, 50)
  noLoop()
}