function Wall(pos, width, height){
  this.pos = pos; this.x = pos.x, this.y = pos.y;
  this.width = width;
  this.height = height;

  this.img = new Image();
  this.img.src = "images/wall.jpg";
}

Wall.prototype.draw = function(){
  begin();
    con.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
  end();
}



function Staff(name, rof){
  this.name = name;
  this.rof = rof;
  this.fireTimer = 0;
}

Staff.prototype.shoot = function(){
  if(this.fireTimer <= 0 && (k.space || mouse.down)){
    bullets.push(new Bullet(main.pos.x + main.width/2, main.pos.y + main.height/2, "pink", 35));
    this.fireTimer = this.rof;
  }
  this.fireTimer --;
}



function UI(x, y){
  this.pos = new Point(x, y);
}

UI.prototype.draw = function(){
  begin();
    con.rect(this.pos.x, this.pos.y, 300, 45);
    stroke("black", 5);
  end();
  begin();
    con.rect(this.pos.x, this.pos.y, map(main.health, 0, main.maxHealth, 0, 300), 45);
    fill('red');
  end();
  begin();
    con.drawImage(new Part(-100,-100, -1).img, this.pos.x + 325, this.pos.y + 7, 30, 30);
    //canvasText(text, pos,  font, size, color){
    canvasText(main.parts.length + " / "+rl.parts.length, new Point(this.pos.x + 357, this.pos.y + 29), "Times New Roman", 19, "white");
  end();
}




function Part(x, y, num){
   this.pos = new Point(x, y);
   this.num = num;
   this.center = new Point(this.pos.x + 75/2, this.pos.y + 75/2)
   this.collected = false;

   this.img = new Image();
   this.img.src="images/part.png";
}

Part.prototype.draw = function(){
  if(!this.collected)
    con.drawImage(this.img,this.pos.x,this.pos.y, 75, 75);
}

Part.prototype.update = function(mainPos){
  if(main.center.dist(this.center) < 35 && this.collected == false){
    main.parts.push(this);
    this.collected = true;
  }
}

Part.prototype.shift = function(shift, dx, dy){
  if(!dx) {
    this.pos.x += shift.x;
    this.center.x += shift.x;
  }
  if(!dy) {
    this.pos.y += shift.y;
    this.center.y += shift.y;
  }
}
