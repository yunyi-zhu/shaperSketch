var RECT_WIDTH = 50;
var RECT_HEIGHT = 100;
var DELTA_LABEL = 10;
var RADIUS_LABEL = 5;

function RectangleSet(buffer, translation_x, translation_y, rotation, iter, label, highlight){
  this.w = RECT_WIDTH;
  this.h = RECT_HEIGHT;
  this.x = translation_x;
  this.y = translation_y;
  this.r = rotation;
  this.b = buffer;
  this.label = label; // 0,1,2,3
  this.iter = iter;
  this.highlight = highlight // 0 - iter
  
  
    this.display = function(){
      this.b.push();
      this.b.translate(LEFT_WIDTH/2+CROSS_X, displayHeight/2+CROSS_Y);
      this.b.strokeWeight(4);
      this.b.noFill();
      for(var i = 0; i < this.iter; i ++){
        if (i==this.highlight) {
          this.b.stroke(HIGH_LIGHT);
          this.b.strokeWeight(5);
        } else if (i==0) this.b.stroke(FIRST_COLOR);
        else if (i==1) this.b.stroke(SECOND_COLOR);
        else this.b.stroke(OTHER_COLOR);

        switch(this.label){
          case(0):
            this.b.ellipse(-this.w/2 + DELTA_LABEL, -this.h/2 + DELTA_LABEL, RADIUS_LABEL); // label
            this.b.rect(-this.w/2, -this.h/2, this.w, this.h);
            this.b.translate(this.x, this.y);
            this.b.rotate(this.r);
            break;
          case(1):
            if (i%2 == 0){
              this.b.ellipse(-this.w/2 + DELTA_LABEL, -this.h/2 + DELTA_LABEL, RADIUS_LABEL); // label
              this.b.rect(-this.w/2, -this.h/2, this.w, this.h);
              this.b.translate(this.x, this.y);
              this.b.rotate(this.r);
            } else {
              this.b.ellipse(this.w/2 - DELTA_LABEL, -this.h/2 + DELTA_LABEL, RADIUS_LABEL);// label
              this.b.rect(-this.w/2, -this.h/2, this.w, this.h);
              this.b.translate(-this.x, this.y);
              this.b.rotate(-this.r);
            }
            break;
          case(2):
            this.b.ellipse(this.w/2 - DELTA_LABEL, this.h/2 - DELTA_LABEL, RADIUS_LABEL); // label
            this.b.rect(-this.w/2, -this.h/2, this.w, this.h);
            this.b.translate(this.x, this.y);
            this.b.rotate(this.r + 180);
            break;
          case(3):
            if (i%2 == 0){
              this.b.ellipse(-this.w/2 + DELTA_LABEL, -this.h/2 + DELTA_LABEL, RADIUS_LABEL); // label
              this.b.rect(-this.w/2, -this.h/2, this.w, this.h);
              this.b.translate(this.x, this.y);
              this.b.rotate(this.r);
            } else {
              this.b.ellipse(-this.w/2 + DELTA_LABEL, this.h/2 - DELTA_LABEL, RADIUS_LABEL); //label
              this.b.rect(-this.w/2, -this.h/2, this.w, this.h);
              this.b.translate(this.x, -this.y);
              this.b.rotate(-this.r);
            }
            break;
        }

        this.b.strokeWeight(4);

      }

      
      this.b.pop();
    }
    
    
    this.imitate = function(path){
      var buffer = path.b;
      buffer.push();

      buffer.translate(buffer.width/2+CROSS_X, buffer.height/2+CROSS_Y);
      var highlight;
      for(var i = 0; i < this.iter; i ++){
        if (i == this.highlight) {
          highlight = true;
          buffer.strokeWeight(3);
        }
        else highlight = false;

        switch(this.label){
          case(0):
            path.drawPath(highlight);
            buffer.translate(this.x, this.y);
            buffer.rotate(this.r);
            break;
          case(1):
            if (i%2 == 0){
              path.drawPath(highlight);
              buffer.translate(this.x, this.y);
              buffer.rotate(this.r);
            } else {
              path.drawHorizontalFlipped(highlight);
              buffer.translate(-this.x, this.y);
              buffer.rotate(-this.r);
            }
            break;
          case(2):
            path.drawPath(highlight);
            buffer.translate(this.x, this.y);
            buffer.rotate(this.r + 180);
            break;
          case(3):
            if (i%2 == 0){
              path.drawPath(highlight);
              buffer.translate(this.x, this.y);
              buffer.rotate(this.r);
            } else {
              path.drawVerticalFlipped(highlight);
              buffer.translate(this.x, -this.y);
              buffer.rotate(-this.r);
            }
            break;
          };

          buffer.strokeWeight(2);
      } 
      

      buffer.pop();
    }
    
    
}