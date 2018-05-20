var GRAMMAR;
var CREATION;
var LEFT_WIDTH;

var HIGHLIGHT;
var FIRST_COLOR;
var SECOND_COLOR;
var OTHER_COLOR;
var PATH_COLOR;
var ICON_COLOR;
var PALETTE; 
var current_color;

var CROSS_X = 0;
var CROSS_Y = 0;

var K_R = 0.05; // rotation
var K_T = 0.5; // translation

var iter = 5;
var rotation = 0;
var translation_x = 0;
var translation_y = 0;
var label = 0;
var mode = 0;
var cursor_draw;

var display_help = false;
var help_image;

var prev_x;
var prev_y;

var path;
var highlight = iter;

function preload(){
help_image = loadImage('images/help_display.png');
}


function setup() {
LEFT_WIDTH = 2*displayWidth/5;
createCanvas(displayWidth, displayHeight);
angleMode(DEGREES);
setColors();

GRAMMAR = createGraphics(LEFT_WIDTH, displayHeight);
CREATION = createGraphics(displayWidth - LEFT_WIDTH, displayHeight);
GRAMMAR.noFill();
GRAMMAR.strokeWeight(5);
path = new Path(CREATION);
PALETTE = new Palette();
}




function draw() {
GRAMMAR.background(255);
CREATION.background(235);

drawBackground();
var rects = new RectangleSet(GRAMMAR, translation_x, translation_y, rotation, iter, label, highlight);
rects.display();
rects.imitate(path);
image(GRAMMAR, 0, 0);
image(CREATION, LEFT_WIDTH, 0);

if (mode == 0) PALETTE.display();
drawCursor();
if (display_help) image(help_image, 150, 100, 900,500);
prev_x = mouseX;
prev_y = mouseY;


}

function drawBackground(){
drawTitle();
drawHelpIcon();
if (mode == 0) {
  drawCross(GRAMMAR.width/2+CROSS_X, GRAMMAR.height/2+CROSS_Y, 10, GRAMMAR);
  drawCross(CREATION.width/2+CROSS_X, CREATION.height/2+CROSS_Y, 10, CREATION);
}
}


function mouseDragged(){
  if (keyIsDown(32)) {
      CROSS_X += mouseX - prev_x;
      CROSS_Y += mouseY - prev_y;
  } else if (mode == 2){
    rotation -= (mouseX - prev_x)*K_R;
  } else if (mode == 1){
    translation_x += (mouseX - prev_x)*K_T;
    translation_y += (mouseY - prev_y)*K_T;
  } else if (mode == 0){
      path.add(prev_x - LEFT_WIDTH,prev_y,mouseX - LEFT_WIDTH,mouseY,current_color);
  }
}

function keyPressed(){
  console.log(keyCode);
  console.log(key);
  
  if (display_help){
    display_help = false;
    return;  
  }
  
  switch(keyCode){
    case(LEFT_ARROW):
      highlight = (highlight-1 + iter+1)%(iter+1);
      break;
    case(RIGHT_ARROW):
      highlight = (highlight+1)%(iter+1);
      break;
    case(ENTER):
      switchMode();
  }
  
  switch(key){
    case('X'):
    case('x'):
      path = new Path(CREATION);
      break;
    case('l'):
    case('L'):
      label = (label+1)%4;
      break;
    case('h'):
    case('H'):
      display_help = true;
      break;     
  }
  
  //change iter according to number typed
  if (keyCode < 58 && keyCode > 48){
    iter = parseInt(key);
    highlight = iter;
  }
}

function mousePressed(){
  if (display_help) {
    display_help = false;
    return;
  }
  if (checkClickHelp() == true){
    display_help = true;
    return;
  }
  PALETTE.adjustColor();
}

function switchMode(){
  mode = (mode + 1)%3;
}