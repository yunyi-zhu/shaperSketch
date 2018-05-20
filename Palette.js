function Palette(){
  this.colors = [ color(71,67,72),  color(255,192,45),  color (99, 183, 51),  color(66, 134, 244),  color(196,47,64)];
  this.len = this.colors.length;
  
  var w = 75;
  var h = 75;
  var x = displayWidth - w*this.len;
  var y = 0;
  var curr = 0;
  var temp = this.len;
  
  this.display = function(){
    noStroke();
    for (var i = 0; i < this.len; i++){
      fill(this.colors[i]);
      if (i == curr) ellipse(x+i*w +w/2,y+h/2,w,h);
      else if(i == temp) ellipse(x+i*w +w/2,y+h/2,w,h);
      else ellipse(x+i*w +w/2,y+h/2,w-5,h-5);
    }
  };
  
  this.detectMouse = function(){
    if (mouseY >= y && mouseY <= y+h && mouseX >= x && mouseX <= x + w*this.len){
      cursor(ARROW);
      temp = floor((mouseX - x)/w);
      return true;
    }
    temp = this.len;
    return false;
  };
  
  this.adjustColor = function(){
   if (this.detectMouse()){
     var index = floor((mouseX - x)/w);
     current_color = this.colors[index];
     curr = index;
   }
  };
  
  
  

}