function Square(x, y, x2, y2){
  this.pos = new Point(x, y); this.x = x; this.y = y;
  this.width = Math.abs(x - x2);
  this.height = Math.abs(y - y2);
}

//takes in a Square s, and a Bullet b.

function bulletWallCollision(b, w){
  return (b.center.dist(new Point(w.pos.x + w.width / 2, w.pos.y + w.height / 2)) <= b.radius + 38);
}
