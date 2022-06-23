
function Level(number, wallInfo){
  this.number = number;
  this.rend = wallInfo;
  this.render = [];
  this.walls = [];
  this.innerWalls = [];
  this.cornerIndexes = [];

  this.spawn;
  this.partNum = 0;

  this.parts = [];
  this.partsCollected = 0;
  this.enemies = [];

  this.winPos;
  this.done = false;

  this.door = new Image();
  this.door.src = "images/exit.png";

}

Level.prototype.draw = function(){
  for(var x = 0; x < this.walls.length; x++){
    this.walls[x].draw();
  }
  for(var x = 0; x < this.parts.length; x++){
    this.parts[x].draw();
  }
  if(this.parts.length == main.parts.length){
    con.drawImage(this.door, this.winPos.x, this.winPos.y, 45, 190/2);
  }
}

Level.prototype.loadLvl = function(){
  //KEY//
  /*
   0 - nothing
   1 - wall
   2 - main spawn;
   3 - enemy spawn;
   4 - win position
   5 - part location
  */
  for(var r = 0; r < this.rend.length; r++){
    this.render[r] = [];
    for(var c = 0; c < this.rend[r].length; c++){
      if(this.rend[r][c] == 0){
        this.render[r][c] = new Point(c*64 , r*64);
      }else if(this.rend[r][c] == 1){
        this.render[r][c] = new Wall(new Point(c*64, r*64), 64, 64);
        this.walls.push(new Wall(new Point(c * 64, r * 64), 64, 64));
        if((r == 0 && c == 0) || (r == 0 && c == this.rend[r].length-1) || (c == 0 && r == this.rend.length-1) || (r == this.rend.length-1 && c == this.rend[r].length-1)){
          this.cornerIndexes.push(this.walls.length-1);
        }
        if(r > 0 && r < this.rend.length -1 && c > 0 && c < this.rend[r].length -1){
          this.innerWalls.push(new Wall(new Point(c*64, r*64), 64, 64));
        }
      }else if(this.rend[r][c] == 2){
        this.spawn = new Point(c * 64, r * 64);
        main.pos = this.spawn;
      }else if(this.rend[r][c] == 3){
        this.enemies.push(new Skelly(c * 64, r * 64, 100));
      }else if(this.rend[r][c] == 4){
        this.winPos = new Point(c * 64, r * 64);
      }else if(this.rend[r][c] == 5){
        this.partNum ++;
        this.parts.push(new Part(c * 64, r * 64, this.partNum));
      }
    }
  }
  this.done = true;
}

Level.prototype.shift = function(pt, dx, dy){
  for(var x = 0; x < this.walls.length; x++){
    if(!dx) this.walls[x].pos.x += pt.x;
    if(!dy) this.walls[x].pos.y += pt.y;
  }
  for(var x = 0; x < this.innerWalls.length; x++){
    if(!dx) this.innerWalls[x].pos.x += pt.x;
    if(!dy) this.innerWalls[x].pos.y += pt.y;
  }
  for(var x = 0; x < this.parts.length; x++){
    this.parts[x].shift(pt, dx, dy);
  }
  for(var x = 0; x < this.enemies.length; x++){
    this.enemies[x].shift(pt, dx, dy); 
  }
  if(!dx) this.winPos.x += pt.x;
  if(!dy) this.winPos.y += pt.y;
}
