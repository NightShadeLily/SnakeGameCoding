// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/AaGK-fj-BAM

var paused = false;
var s;
var scl = 20;

var food;

function setup() {
  createCanvas(600, 600);
  paused = false;
  everythingButCreateCanvas();
}
function everythingButCreateCanvas() {
s = new Snake();
  frameRate(15);
  pickLocation();
}
function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  if (paused){
    push();
    textStyle(ITALIC);
    textSize(100);
    fill(0,0,255)
    textAlign(CENTER, CENTER);
    const middleX = width/2;
    const middleY = height/2;
    text('PAUSED', middleX, middleY);
    fill(25,200,255)
    text('PAUSED', middleX + 6, middleY + 6);
    fill(255);
    text('PAUSED', middleX + 3, middleY + 3);

    fill(0,0,255);
    rect(185,350,200,75);
    fill(25,200,255);
    textSize(50);
    text(`RESET`, 280,385);
    fill(255);
    textSize(50);
    text(`RESET`, 285,387);
    pop();
  } else {
    background(51);
    
    if (s.eat(food)) {
      pickLocation();
    }
    s.death();
    s.update();
    s.show();
  
    fill(0, 0, 255);
    //fill(0, 255, 255);
    rect(food.x, food.y, scl, scl);
    }
}

function mouseMoved() {
  console.log(`${mouseX}, ${mouseY}`);  
  // prevent default
  return false;
}

function isMouseOverReset() {
  let isMouseOver = false;
  if (paused && mouseX > resetX && mouseX < (resetX + resetWidth) &&
     mouseY > resetY && mouseY < (resetY + resetHeight)) {
    isMouseOver = true;
  }
  return isMouseOver;
}

function mouseClicked() {
  if (isMouseOverReset()) {
    console.log('You clicked it!');
    everythingButCreateCanvas();
  } else {
    console.log(`Clicked: ${mouseX}, ${mouseY}`);
  }
    let row = mouseY / scl;
    let col = mouseX / scl;
    food = createVector(floor(col), floor(row));
    food.mult(scl);
  }
  
  return false;

  
function keyPressed() {
  if (key === 'p') {
    paused = !paused
  } else {
    if (keyCode === UP_ARROW) {
      s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
      s.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
      s.dir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
      s.dir(-1, 0);
    }
  }
}
