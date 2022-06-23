//Player's Green Fireball Projectile
function Bullet(x, y, color, damage){
  this.color = color;
  this.pos = new Point(x, y);
  this.target = mouse.pos;

  this.img = new Image();
  this.img.src = "images/greenFire.png";

  this.damage = damage;
  this.radius = 9;
  this.center = new Point(this.pos.x + this.radius, this.pos.y + this.radius);
  if(this.target.x == this.pos.x){
    if(this.target.y > this.pos.y) this.vel = new Vector(6, 90);
    else this.vel = new Vector(6, 270);
  }else if(this.target.y == this.pos.y){
    if(this.target.x > this.pos.x) this.vel = new Vector(6, 0);
    else this.vel = new Vector(6, 180);
  }else{
    this.vel = new Vector(6, this.center.getAngle(this.target));
    this.vel.y *= -1;
  }
}

Bullet.prototype.draw = function(){
  con.drawImage(this.img, this.pos.x, this.pos.y);
}

Bullet.prototype.update = function(){
  this.pos = this.pos.addVect(this.vel);
  this.center.addVect(this.vel);
}

Bullet.prototype.shift = function(shift, dx, dy){
  if(!dx){
    this.pos.x += shift.x;
    this.center.x += shift.x;
  }
  if(!dy){
    this.pos.y += shift.y;
    this.center.y += shift.y;
  }
}



//Skelleton Red Fireball attack;
function Fireball(x, y){
  this.pos = new Point(x, y);
  this.target = main.center;
  this.damage = 20;
  this.radius = 9;
  this.a;

  this.img = new Image();
  this.img.src = "images/redFire.png";

  this.center = new Point(this.pos.x + this.radius, this.pos.y + this.radius);

  this.velMagnitude = 7;
  if(this.target.x == this.pos.x){
    if(this.target.y > this.pos.y) this.a = 90;
    else this.a = 270;
  }else if(this.target.y == this.pos.y){
    if(this.target.x > this.pos.x) this.a = 0;
    else this.a = 180;
  }else{
    if(this.a === undefined)
        this.vel = new Vector(this.velMagnitude, this.pos.getAngle(this.target));
    else
        this.vel = new Vector(this.velMagnitude, this.pos.getAngle(this.target));
    this.vel.y *= -1;
  }
}

Fireball.prototype.draw = function(){
  con.drawImage(this.img, this.pos.x, this.pos.y);
}

Fireball.prototype.update = function(){
  this.pos.addVect(this.vel);
  this.center.addVect(this.vel);
}

Fireball.prototype.shift = function(shift, dx, dy){
  if(!dx){
    this.pos.x += shift.x;
    this.center.x += shift.x;
  }
  if(!dy){
    this.pos.y += shift.y;
    this.center.y += shift.y;
  }
}
