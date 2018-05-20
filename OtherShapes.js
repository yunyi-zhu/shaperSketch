function drawCross(x, y, w, buffer){
  buffer.stroke('RED');
  buffer.strokeWeight(2);
  buffer.line(x+w, y, x-w, y);
  buffer.line(x, y+w, x,  y-w);
}

function drawTitle(){
  GRAMMAR.textSize(40);
  GRAMMAR.stroke(255, 171, 5)
  GRAMMAR.textAlign(LEFT, BOTTOM)
  GRAMMAR.noFill();
  GRAMMAR.text("ShaperSketch", 25, 50);
}

function setColors(){
  HIGH_LIGHT = color(252, 67, 50);
  FIRST_COLOR = color(10);
  SECOND_COLOR = color(255,130,35);
  OTHER_COLOR = color(80,70,65);
  PATH_COLOR = color(51,44,39);
  ICON_COLOR = color(100);
  current_color = PATH_COLOR;
}

function drawHelpIcon(){
  var x = 300;
  var y = 25;
  GRAMMAR.stroke(100);
  GRAMMAR.strokeWeight(2);
  GRAMMAR.noFill();
  GRAMMAR.ellipse(x,y,20,20);

  GRAMMAR.noStroke();
  GRAMMAR.fill(100);
  GRAMMAR.textAlign(CENTER,CENTER);
  GRAMMAR.textSize(18);
  GRAMMAR.text('i',x,y);  
}

function checkClickHelp(){
  var x = 300;
  var y = 25;
  if (sq(mouseX - x) + sq(mouseY - y) <= 144) return true;
  return false;

}

function drawCursor(){
  if (checkClickHelp() == true) {
    cursor(HAND);
    return;
  }
  else if (keyIsDown(32)) {
    cursor(MOVE);
    return;
  }

  switch(mode){
  case(0):
    if (PALETTE.detectMouse()) cursor(HAND);
    else if (mouseX<LEFT_WIDTH) cursor(ARROW);
    else{
      noCursor();
      stroke(current_color);
      fill(current_color);
      ellipse(mouseX,mouseY,3.5);
      noFill();
    }
    break;
  case(1):
    cursor(ARROW);
    break;
  case(2):
    noCursor();
    noFill();
    stroke(ICON_COLOR);
    strokeWeight(3);
    arc(mouseX-5, mouseY, 20, 20, -60, 60);
    triangle(mouseX-1,mouseY-7, mouseX-1, mouseY-10, mouseX+2, mouseY-10);
    triangle(mouseX-1,mouseY+7, mouseX-1, mouseY+10, mouseX+2, mouseY+10);
  } 
}

