function Player(x, y, width, height, speed, weapon){
    this.height = height;
    this.width = width;
    this.pos = new Point(x, y);
    this.speed = speed;

    this.img = new Image();
    this.img.src = "images/sprite.png";

    this.weapon = weapon;

    this.health = 60;
    this.maxHealth = 60;

    this.parts = [];

    this.spriteFrameWidth = 64;
    this.spriteFrameHeight = 64;
    this.spriteFrameX = 0;
    this.spriteFrameY = 9;

    this.move = new Point(0,0);
    this.b = false;

    this.animTime = 0;
    this.center = new Point(this.pos.x + this.frameWidth/2,this.pos.y + this.frameHeight/2);
    this.angle;

    this.disableYShift = false;
    this.disableXShift = false;
}

Player.prototype.draw = function(){
  begin();
    con.drawImage(this.img, this.spriteFrameX*this.spriteFrameWidth,this.spriteFrameY*this.spriteFrameHeight,this.spriteFrameWidth,this.spriteFrameHeight,this.pos.x,this.pos.y,this.spriteFrameWidth,this.spriteFrameHeight);
  end();
}

Player.prototype.shoot = function(){
  this.weapon.shoot();
}

Player.prototype.shift = function(shift){
  if(!this.disableYShift){
    this.pos.y += shift.y;
  }
  if(!this.disableXShift){
    this.pos.x += shift.x;
  }
}

Player.prototype.update = function(){
  this.move.x = 0; this.move.y = 0;
  this.animTime++;
  this.center = new Point(this.pos.x + this.spriteFrameWidth/2, this.pos.y + this.spriteFrameHeight/2);
  this.disableYShift = false;
  this.disableXShift = false;

  this.angle = this.center.getAngle(mouse.pos);

  if(k.a || (k.a && k.w) || (k.a && k.s)){
    this.move.x -= this.speed;
    this.spriteFrameY = 9;
    if(this.animTime % 7 == 0){
        this.spriteFrameX++;
    }
    if(this.spriteFrameX>8){
        this.spriteFrameX=0;
    }
  }
  if(k.d || (k.d && k.w) || (k.d && k.s)){
    this.move.x += this.speed;
        if(this.animTime%7==0){
        this.spriteFrameX++;
    }
    this.spriteFrameY=11;
    if(this.spriteFrameX>8){
        this.spriteFrameX=0;
    }

    }
    if(k.s){
      this.move.y += this.speed;
      if(this.animTime%7==0){
        this.spriteFrameX++;
      }
      this.spriteFrameY=10;
      if(this.spriteFrameX>8){
          this.spriteFrameX=0;
      }

    }
  if(k.w){
    this.move.y -= this.speed;
    if(this.animTime%7==0){
      this.spriteFrameX++;
    }
    this.spriteFrameY=8;
    if(this.spriteFrameX>8){
      this.spriteFrameX=0;
    }

  }
    if(!k.a && !k.s && !k.d && !k.w){
      this.spriteFrameX=0;
    }
    if(!k.w && !k.s && !k.d && !k.a){
      if((this.angle>=0 && this.angle<=45) || (this.angle>=315 && this.angle<=360)){
          this.spriteFrameY=11;
      }
      else if(this.angle>=45 && this.angle<=135){
          this.spriteFrameY=8;
      }
      else if(this.angle>=135 && this.angle<=225){
          this.spriteFrameY=9;
      }
      else if(this.angle>=225 && this.angle<=315){
          this.spriteFrameY=10;
      }
    }

  //INNER WALL COLLISIONS//
  //X portion
  this.pos.x += this.move.x;
  for(var x = 0; x < rl.innerWalls.length; x++){
    var w = rl.innerWalls[x];
    if (this.pos.x + 15 < w.pos.x + w.width &&
      this.pos.x + this.width > w.pos.x &&
      this.pos.y + 15 < w.pos.y + w.height &&
      this.pos.y + this.height > w.pos.y) {
        this.pos.x -= this.move.x;
        this.disableXShift = true;
        break;
    }
  }
  //Y Portion
  this.pos.y += this.move.y;
  for(var x = 0; x < rl.innerWalls.length; x++){
    var w = rl.innerWalls[x];
    if (this.pos.x + 15 < w.pos.x + w.width &&
      this.pos.x + this.width > w.pos.x &&
      this.pos.y + 15 < w.pos.y + w.height &&
      this.pos.y + this.height > w.pos.y) {
        this.pos.y -= this.move.y;
        this.disableYShift = true;
        break;
    }
  }

  //collisions with the perimeter walls (works perfectly fine).
  if(this.pos.x + this.spriteFrameWidth > rl.walls[rl.cornerIndexes[3]].pos.x) this.pos.x = rl.walls[rl.cornerIndexes[1]].pos.x - this.spriteFrameWidth;
  if(this.pos.x < rl.walls[rl.cornerIndexes[0]].pos.x + 64) this.pos.x = 64;
  if(this.pos.y < rl.walls[rl.cornerIndexes[0]].pos.y + 64) this.pos.y = 64;
  if(this.pos.y + this.spriteFrameHeight > rl.walls[rl.cornerIndexes[3]].pos.y) this.pos.y = rl.walls[rl.cornerIndexes[2]].pos.y - this.spriteFrameHeight;



}
