function Path(buffer){
  this.b = buffer;
  this.path = [];
  
  
  this.add = function(x1,y1,x2,y2,c){
    this.path.push([x1 - this.b.width/2 - CROSS_X,y1 - this.b.height/2-CROSS_Y, x2 - this.b.width/2-CROSS_X, y2 - this.b.height/2-CROSS_Y,c]);
  };
  
  this.drawPath = function(highlight){
    this.b.stroke(HIGH_LIGHT);
    for (var i = 0; i < this.path.length; i ++){
      var point = this.path[i];
      var x1 = point[0]
      var y1 = point[1]
      var x2 = point[2]
      var y2 = point[3]
      var c = point[4]
      if(!highlight) this.b.stroke(c)
      this.b.line(x1,y1,x2,y2);
    }
  };

  this.drawHorizontalFlipped = function(highlight){
    this.b.stroke(HIGH_LIGHT);
    for (var i = 0; i < this.path.length; i ++){
      var point = this.path[i];
      var x1 = -point[0]
      var y1 = point[1]
      var x2 = -point[2]
      var y2 = point[3]
      var c = point[4]
      if (!highlight) this.b.stroke(c);
      this.b.line(x1,y1,x2,y2);
    }
  };

  this.drawVerticalFlipped = function(highlight){
    this.b.stroke(HIGH_LIGHT);
    for (var i = 0; i < this.path.length; i ++){
      var point = this.path[i];
      var x1 = point[0]
      var y1 = -point[1]
      var x2 = point[2]
      var y2 = -point[3]
      var c = point[4]
      if (!highlight) this.b.stroke(c);
      this.b.line(x1,y1,x2,y2);
    }
  }

}