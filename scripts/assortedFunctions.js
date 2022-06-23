function bulletWallCollision(b, w){
  return (b.center.dist(new Point(w.pos.x + w.width / 2, w.pos.y + w.height / 2)) <= b.radius + 38);
}

function shiftThatJawn(dX, dY){
  rl.shift(shift, dX, dY);
  main.shift(shift);
  for(var x = 0; x < bullets.length; x++){
    bullets[x].shift(shift, dX, dY);
  }

  for(var x = 0; x < eBullets.length; x++){
    eBullets[x].shift(shift, dX, dY);
  }
  if(!dX) floorPos.x += shift.x;
  if(!dY) floorPos.y += shift.y;
}
