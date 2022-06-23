function Skelly(x, y, health){
    this.pos = new Point(x, y);
    this.health = health;

    this.frameWidth = 64;
    this.frameHeight = 64;

    this.center = new Point(this.pos.x + this.frameWidth / 2, this.pos.y + this.frameHeight/2);

    this.img = new Image();
    this.img.src = "images/skelly.png";

    this.animTimer = 0;
    this.frameX = 0;
    this.frameY = 0;

    this.walkTarget = null;
    this.walkDir = null;
    this.walking = false;

    this.stillTimer = -1;

    this.sTimer = 0;
    this.sTime = 91;
    this.angle = 0;

    this.shootDir;
    this.shootTime = 0;
}



Skelly.prototype.update = function(mainPos){
    if(this.walkTimer >= 0){
        this.walk();
    }
    else if(this.pos.dist(mainPos) <= 500 || this.sTimer > 0){
        this.shoot(mainPos);
    }
    else if(this.stillTimer > 0){
      this.frameX = 0;
      this.stillTimer--;
    }else {
        this.pathing(mainPos);
    }

}

Skelly.prototype.shift = function(shift, dx, dy){
  if(!dx){
    this.pos.x += shift.x;
    this.center.x += shift.x;
    if(this.walkingTarget != null) this.walkingTarget.x += shift.x;
  }
  if(!dy){
    this.pos.y += shift.y;
    this.center.y += shift.y;
    if(this.walkingTarget != null) this.walkingTarget.y += shift.y;
  }
}


Skelly.prototype.pathing = function(mp){
  var temp = random(0, 1);
  var mult;
  var num = ran(0, 64*6);
  if(temp > .5){
    mult = -1;
  }else mult = 1;
    //moving along the x-axis
    this.walkTarget = new Point(this.pos.x + num*mult, this.pos.y);
    this.walkTimer = num;
    if(this.walkTarget.x > this.pos.x) this.walkDir = "right";
    else this.walkDir = "left";
    this.walk();
}


Skelly.prototype.shoot = function(mp){
    this.walking = false;
    this.stillTimer = 0;
    if(this.shootDir == undefined){
      this.angle = this.pos.getAngle(mp);
      if((this.angle>=0 && this.angle<=45) || (this.angle>=315 && this.angle<=360)){
          this.frameY=19;
      }
      else if(this.angle>45 && this.angle<135){
          this.frameY=16;
      }
      else if(this.angle>=135 && this.angle<=225){
          this.frameY=17;
      }
      else if(this.angle>225 && this.angle<315){
          this.frameY=18;
      }
    }
    if(this.shootTime == this.sTime - 30){
        eBullets.push(new Fireball(this.pos.x+ this.frameWidth/2, this.pos.y+ this.frameHeight/2));
    }
    this.shootTime++;

    if(this.frameX<12){
        if(this.shootTime%7==0){
            this.frameX++;
        }
    }
    if(this.shootTime == this.sTime + 6){
        this.shootTime=0;
        this.pathing(main.pos);
    }

}

Skelly.prototype.walk = function(){
    this.walking = true;
    this.walkTimer--;
    this.animTimer++;
      if(this.walkDir == "left"){
        this.pos.x--;
        this.frameY=9;
        if(this.animTimer%7==0)
          this.frameX++
        if(this.frameX>8){
          this.frameX=0;
        }
      }
      if(this.walkDir == "right"){
        this.pos.x++;
        this.frameY=11;
        if(this.animTimer%7==0)
          this.frameX++
        if(this.frameX>8){
          this.frameX=0;
        }
      }
      if(this.walkTimer <= 0){
        this.walking = false;
        this.stillTimer = 60 * 2.5;
      }
      if(this.pos.x + this.frameWidth > rl.walls[rl.cornerIndexes[3]].pos.x) this.pos.x = rl.walls[rl.cornerIndexes[1]].pos.x - this.frameWidth;
      if(this.pos.x < rl.walls[rl.cornerIndexes[0]].pos.x + 64) this.pos.x = 64;
      if(this.pos.y < rl.walls[rl.cornerIndexes[0]].pos.y + 64) this.pos.y = 64;
      if(this.pos.y + this.frameHeight > rl.walls[rl.cornerIndexes[3]].pos.y) this.pos.y = rl.walls[rl.cornerIndexes[2]].pos.y - this.frameHeight;

      for(var x = 0; x < rl.innerWalls.length; x++){
        var w = rl.innerWalls[x];
        if (this.pos.x < w.pos.x + w.width &&
           this.pos.x + this.frameWidth > w.pos.x &&
           this.pos.y < w.pos.y + w.height &&
           this.pos.y + this.frameHeight > w.pos.y) {
          if(this.walkDir == "right") this.pos.x--;
          else if(this.walkDir == "left") this.pos.x++;
          else if(this.walkDir == "down") this.pos.y--;
          else this.pos.y++;
          break;
        }
      }
      this.center = new Point(this.pos.x + this.frameWidth / 2, this.pos.y + this.frameHeight/2);

}

Skelly.prototype.draw = function(){
    con.drawImage(this.img,this.frameX*this.frameWidth,this.frameY*this.frameHeight,this.frameWidth,this.frameHeight,this.pos.x,this.pos.y,this.frameWidth,this.frameHeight);
}
