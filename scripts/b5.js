/*
  This file is full of functions/objects that are very widely useable across most every
  program I write. These functions are all used in this create task, in some way or another

  Everything in here has been writen by me.

	JQueary:
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
*/

function ran(min, max){
	if(max == undefined){
		max = min;
		max++;
		min = 0;
		return parseInt(Math.random()*(max-min) +min);
	}else {
		max++;
		return parseInt(Math.random()*(max-min) +min);
	}
}
function random(min,max){
  return (max == undefined) ? Math.random()*(min) : Math.random()*(max-min) +min;
}
function either(num, num2){
	if(ran(1,2) == 1)return num;
	else return num2;
}
function map(value, curLow, curHi, newLow, newHi){
	return ((value-curLow)/(curHi-curLow))*(newHi-newLow)+newLow;
}

//All of these are in degrees btw,
function sin(x){
	return Math.sin(x/180 * Math.PI);
}
function cos(x){
	return Math.cos(x/180 * Math.PI);
}
function tan(x){
	return Math.tan(x/180 * Math.PI);
}

function drawRotated(image, degrees){
    con.save();

    con.translate(cWidth/2,cHeight/2);
    con.rotate(degrees*Math.PI/180);

    con.drawImage(image,-image.width/2,-image.width/2);

    con.restore();
}

function stroke(color,width){
	if(width == undefined){
		con.strokeStyle = color;
		con.lineWidth = 1;
		con.stroke();
	} else{
		con.strokeStyle = color;
		con.lineWidth = width;
		con.stroke();
	}
}
function ranColor(){
	var select = "1234567890ABCDEF";
	var color = "#";
	for(var x = 0; x < 6; x++){
	   color += select.charAt(ran(0, 15));
	}
	return color;
}

function fill(color){
	con.fillStyle = color;
	con.fill();
}

function getCon(canvasId){
	if(canvasId == undefined){
		var canvas = document.getElementById('canvas');
		var con = canvas.getContext('2d');
	}else{
		var canvas = document.getElementById(canvasId);
		var con = canvas.getContext('2d');
	}
	return con;
}
function begin(context){
	if(context == undefined) con.beginPath();
	else context.openPath();
}
function end(context){
	if(context == undefined) con.closePath();
	else context.closePath();
}
function canvasText(text, pos,  font, size, color){
	con.font = size + "px " + font;
	con.fillStyle = color;
	con.fillText(text, pos.x, pos.y);
}
function circle(filled, x, y, radius, color, weight){
	if(x != undefined && y != undefined && radius != undefined && color != undefined && weight != undefined){
		begin();
			con.arc(x, y, radius, 0, Math.PI*2, true);
			stroke(color, weight);
			if(filled) fill(color);
		end();
	} else if(weight == undefined && color == undefined){
		begin();
			con.arc(x, y, radius, 0, Math.PI*2, true);
			stroke('white', 1);
			if(filled) fill('white');
		end();
	} else if(weight == undefined){
		begin();
			con.arc(x, y, radius, 0, Math.PI*2, true);
			stroke(color, 1);
			if(filled) fill(color);
		end();
	}
}

function rectangle(point, var1, var2){
	if(var2 != undefined){
			con.rect(point.x, point.y, var1, var2);
	}else{
		con.rect(point.x, point.y, point.x - var1.x, point.y - var1.y);
	}
}

function clear(width, height){
	if(width == undefined) con.clearRect(0,0,400,400);
	else if(height == undefined) con.clearRect(0,0,width, width);
	else con.clearRect(0,0,width, height);
}

function background(color, width, height){
	if(width == undefined){
		con.beginPath();
			con.rect(0,0,400,400);
			fill(color);
		con.closePath();
	} else if(height == undefined){
		con.rect(0,0,width,width);
		fill(color);
	} else{
		con.rect(0,0,width,height);
		fill(color);
	}
}

/////////////////////////////////////////
////////POINT.JS CODE///////////////////
/////////////////////////////////////////

function Point(x,y){
  this.x = x; this.y = y;
  this.bool = true;

  this.draw = function(){
    begin();
      circle(true, this.x,this.y,2,'white', 2);
    end();
  }
  this.lineTo = function(pt){
    begin();
      con.moveTo(this.x,this.y);
      con.lineTo(pt.x, pt.y);
      stroke('white',2);
    end();
  }

}

Point.prototype.dist = function(pt){
  var a = this.x - pt.x;
  var b = this.y - pt.y;
  var dist = Math.sqrt( a*a + b*b );

  return dist;
}

Point.prototype.getAngle = function(pt){
  var x = pt.x - this.x;
  var y = pt.y - this.y;
  var absval = Math.abs(y / x);

  return adjustAngle(Math.atan(absval) * 180 / Math.PI, getQuadrent(this, pt));
}

Point.prototype.getSlope = function(pt){
  var x1 = this.x;
  var x2 = pt.x;
  var y1 = this.y;
  var y2 = pt.y;

  var slope = (x1-x2) / (y1-y2);

  return slope;
}
Point.prototype.equals = function(pt){
  if(this.x == pt.x && this.y == pt.y) return true;
  else return false;
}

Point.prototype.xEquals = function(pt){
  if(this.x == pt.x) return true;
  else return false;
}

Point.prototype.yEquals = function(pt){
  if(this.y = pt.y) return true;
  else return false;
}

Point.prototype.add = function(pt){
  this.x += pt.x;
  this.y += pt.y;
	return this;
}
Point.prototype.addNum = function(num){
  this.x += num;
  this.y += num;
	return this;
}

Point.prototype.sub = function(pt){
  this.x -= pt.x;
  this.y -= pt.y;
	return this;
}
Point.prototype.subNum = function(num){
  this.x -= num;
  this.y -= num;
	return this;
}

Point.prototype.mult = function(pt){
  this.x *= pt.x;
  this.y *= pt.y;
	return this;
}
Point.prototype.multNum = function(num){
  this.x *= num;
  this.y *= num;
	return this;
}

Point.prototype.div = function(pt){
  this.x /= pt.x;
  this.y /= pt.y;
	return this;
}
Point.prototype.divNum = function(num){
  this.x /= num;
  this.y /= num;
	return this;
}
Point.prototype.addVect = function(vect){
	return vect.add2Pt(this);
}
Point.prototype.xOffset = function(offset){
	var temp = new Point(this.x, this.y);
	temp.x += offset;
	return temp;
}
Point.prototype.yOffset = function(offset){
	var temp = new Point(this.x, this.y);
	temp.y += offset;
	return temp;
}

function pointAvg(pts){
  var total = new Point(0, 0);
  for(var x = 0; x < pts.length; x++){
    total.add(pts[x]);
  }
  total.divNum(pts.length);
  return total;
}
function getQuadrent(origin, point){
	if(point.x > origin.x && point.y < origin.y)
		return 1;
	else if(point.x < origin.x && point.y < origin.y)
		return 2;
	else if(point.x < origin.x && point.y > origin.y)
		return 3;
	else if(point.x > origin.x && point.y > origin.y)
		return 4;
	else return 0; //if 0 is returned, the point is on an axis
}

//takes in a ref. angle and a quadrent
//returns the angle, coutner clockwise around the origin where (1,0) is 0 degrees
function adjustAngle(a, q){
	if(q == 2) return 180-a;
	else if(q == 3) return 180+a;
	else if(q == 4) return 360-a;
	else return a
}


/////////////////////////////////////////
/////END POINT.JS CODE//////////////////
/////////////////////////////////////////


/////////////////////////////////////////
//////ON TO VECTORS//////////////////////
/////////////////////////////////////////

function Vector(mag, theta, q){
	this.x = mag*cos(theta), this.y = mag*sin(theta);
	this.q = q;
	if(this.q == 2 || this.q == 3){
		this.x *= -1;
		this.y *= -1;
	}
	this.a = theta; this.theta = theta; this.angle = theta;

	this.draw = function(){
    begin();
      circle(true, this.x,this.y,2,'white', 2);
    end();
  }
}

Vector.prototype.add2Pt = function(pt){
	return pt.add(new Point(this.x, this.y));
}
Vector.prototype.add = function(vect){
	this.x += vect.x;
	this.y += vect.y;
	return this;
}
function getAngleDeg(p1, p2) {
  var angleRad = Math.atan((p1.y - p2.y) / (p1.x - p2.x));
  var angleDeg = angleRad * 180 / Math.PI;
  return(angleDeg);
}








//----------------------------------------------------//
//-------KEYCODES.JS CODE-----------------------------//
//----------------------------------------------------//

  $(document).ready(function(){
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
  });

	function Key(val, code, display, widthCo){
		this.val = val;
		this.pressed = false;
		this.code = code;
		if(display == undefined){
			this.display = this.val;
			this.widthCo = 1;
		}else {
			this.display = display;
			this.widthCo = widthCo;
		}
	}

	function Keyboard(){

		this.keys = [];
		var c = 0;
		this.keys[c] = new Key("a", 65);
		c++;
		this.keys[c] = new Key("b", 66);
		c++;
		this.keys[c] = new Key("c", 67);
		c++;
		this.keys[c] = new Key("d", 68);
		c++;
		this.keys[c] = new Key("e", 69);
		c++;
		this.keys[c] = new Key("f", 70);
		c++;
		this.keys[c] = new Key("g", 71);
		c++;
		this.keys[c] = new Key("h", 72);
		c++;
		this.keys[c] = new Key("i", 73);
		c++;
		this.keys[c] = new Key('j', 74);
		c++;
		this.keys[c] = new Key('k', 75);
		c++;
		this.keys[c] = new Key('l', 76);
		c++;
		this.keys[c] = new Key('m', 77);
		c++;
		this.keys[c] = new Key('n', 78);
		c++;
		this.keys[c] = new Key('o', 79);
		c++;
		this.keys[c] = new Key('p', 80);
		c++;
		this.keys[c] = new Key('q', 81);
		c++;
		this.keys[c] = new Key('r', 82);
		c++;
		this.keys[c] = new Key('s', 83);
		c++;
		this.keys[c] = new Key('t', 84);
		c++;
		this.keys[c] = new Key('u', 85);
		c++;
		this.keys[c] = new Key('v', 86);
		c++;
		this.keys[c] = new Key('w', 87);
		c++;
		this.keys[c] = new Key('x', 88);
		c++;
		this.keys[c] = new Key('y', 89);
		c++;
		this.keys[c] = new Key('z', 90);//[25]
		c++;


		this.keys[c] = new Key('%sft%', 16, "shift", 2.3);//[26]
		c++;
		this.keys[c] = new Key('%lok%', 20, "lock", 1.8);//[27]
		c++;
		this.keys[c] = new Key('%tab%', 9, "tab", 1.5);//[28]
		c++;
		this.keys[c] = new Key('%ntr%', 13, "return", 1.8);//[29]
		c++;
		this.keys[c] = new Key('%spc%', 32, "", 6.1);//[30]
		c++;
		this.keys[c] = new Key('[', 219);//[31]
		c++;
		this.keys[c] = new Key(']', 221);//[32]
		c++;
		this.keys[c] = new Key('\\', 220);//[33]
		c++;
		this.keys[c] = new Key(';', 186);//[34]
		c++;
		this.keys[c] = new Key('\'', 222);//[35]
		c++;
		this.keys[c] = new Key(',', 188);//[36]
		c++;
		this.keys[c] = new Key('.', 190);//[37]
		c++;
		this.keys[c] = new Key('/', 191);//[38]
		c++;
		this.keys[c] = new Key('%del%', 8, "delete", 1.65);//[39]
		c++;
		this.keys[c] = new Key('1', 49); //[40]
		c++;
		this.keys[c] = new Key('2', 50);
		c++;
		this.keys[c] = new Key('3', 51); //[42]
		c++;
		this.keys[c] = new Key('4', 52);
		c++;
		this.keys[c] = new Key('5', 53); //[44]
		c++;
		this.keys[c] = new Key('6', 54);
		c++;
		this.keys[c] = new Key('7', 55); //[46]
		c++;
		this.keys[c] = new Key('8', 56);
		c++;
		this.keys[c] = new Key('9', 57); //[48]
		c++;
		this.keys[c] = new Key('0', 48);//[49]









		this.a = false;
		this.b = false;
		this.c = false;
		this.d = false;
		this.e = false;
		this.f = false;
		this.g = false;
		this.h = false;
		this.i = false;
		this.j = false;
		this.k = false;
		this.l = false;
		this.m = false;
		this.n = false;
		this.o = false;
		this.p = false;
		this.q = false;
		this.r = false;
		this.s = false;
		this.t = false;
		this.u = false;
		this.v = false;
		this.w = false;
		this.x = false;
		this.y = false;
		this.z = false;

		this.up = false;
		this.down = false;
		this.left = false;
		this.right = false;

		this.space = false;

		this.one = false;
		this.two = false;
		this.three = false;
		this.four = false;
		this.five = false;
		this.six = false;
		this.seven = false;
		this.eight = false;
		this.nine = false;
		this.zero= false;

		this.lShift = false;
		this.rShift = false;

		this.enter = false;
	}

	var k = new Keyboard();
	function getKeyObj(key){
		for(var x = 0; x < k.keys.length; x++){
			if(k.keys[x].val == key){
				return k.keys[x];
			}
		}
		return k.keys[25];
	}


	function keyDownHandler(e){
    // console.log(e.keyCode);
		k.pressed = true;
    switch(e.keyCode){
			case 13: k.enter = true; k.keys[29].pressed = true; break;
			case 32: k.space = true; k.keys[30].pressed = true; e.preventDefault(); break;
			case 16: k.keys[26].pressed = true; break;
			case 20: k.keys[27].pressed = true; break;
			case 9: k.keys[28].pressed = true; e.preventDefault(); break;
			case 219: k.keys[31].pressed = true; break;
			case 221: k.keys[32].pressed = true; break;
			case 220: k.keys[33].pressed = true; break;
			case 186: k.keys[34].pressed = true; break;
			case 222: k.keys[35].pressed = true; break;
			case 188: k.keys[36].pressed = true; break;
			case 190: k.keys[37].pressed = true; break;
			case 191: k.keys[38].pressed = true; break;
			case 8: k.keys[39].pressed = true; break;

			case 48: k.zero = true; k.keys[49].pressed = true; break;
			case 49: k.one = true; k.keys[40].pressed = true; break;
			case 50: k.two = true; k.keys[41].pressed = true; break;
			case 51: k.three = true; k.keys[42].pressed = true; break;
			case 52: k.four = true; k.keys[43].pressed = true; break;
			case 53: k.five = true; k.keys[44].pressed = true; break;
			case 54: k.six = true; k.keys[45].pressed = true; break;
			case 55: k.seven = true; k.keys[46].pressed = true; break;
			case 56: k.eight = true; k.keys[47].pressed = true; break;
			case 57: k.nine = true; k.keys[48].pressed = true; break;

      case 65: k.a = true; k.keys[0].pressed = true; break;
			case 66: k.b = true; k.keys[1].pressed = true; break;
			case 67: k.c = true; k.keys[2].pressed = true; break;
			case 68: k.d = true; k.keys[3].pressed = true; break;
			case 69: k.e = true; k.keys[4].pressed = true; break;
			case 70: k.f = true; k.keys[5].pressed = true; break;
			case 71: k.g = true; k.keys[6].pressed = true; break;
			case 72: k.h = true; k.keys[7].pressed = true; break;
			case 73: k.i = true; k.keys[8].pressed = true; break;
			case 74: k.j = true; k.keys[9].pressed = true; break;
			case 75: k.k = true; k.keys[10].pressed = true; break;
			case 76: k.l = true; k.keys[11].pressed = true; break;
			case 77: k.m = true; k.keys[12].pressed = true; break;
			case 78: k.n = true; k.keys[13].pressed = true; break;
			case 79: k.o = true; k.keys[14].pressed = true; break;
			case 80: k.p = true; k.keys[15].pressed = true; break;
			case 81: k.q = true; k.keys[16].pressed = true; break;
			case 82: k.r = true; k.keys[17].pressed = true; break;
			case 83: k.s = true; k.keys[18].pressed = true; break;
			case 84: k.t = true; k.keys[19].pressed = true; break;
			case 85: k.u = true; k.keys[20].pressed = true; break;
			case 86: k.v = true; k.keys[21].pressed = true; break;
			case 87: k.w = true; k.keys[22].pressed = true; break;
			case 88: k.x = true; k.keys[23].pressed = true; break;
			case 89: k.y = true; k.keys[24].pressed = true; break;
			case 90: k.z = true; k.keys[25].pressed = true; break;
    }
  }

  function keyUpHandler(e){
		// alert(e.keyCode);
		k.pressed = false;
		switch(e.keyCode){

			case 13: k.enter = false; k.keys[29].pressed = false; break;
			case 32: k.space = false; k.keys[30].pressed = false; break;
			case 16: k.keys[26].pressed = false; break;
			case 20: k.keys[27].pressed = false; break;
			case 9: k.keys[28].pressed = false; break;
			case 219: k.keys[31].pressed = false; break;
			case 221: k.keys[32].pressed = false; break;
			case 220: k.keys[33].pressed = false; break;
			case 186: k.keys[34].pressed = false; break;
			case 222: k.keys[35].pressed = false; break;
			case 188: k.keys[36].pressed = false; break;
			case 190: k.keys[37].pressed = false; break;
			case 191: k.keys[38].pressed = false; break;
			case 8: k.keys[39].pressed = false; break;

			case 48: k.zero = false; k.keys[49].pressed = false; break;
			case 49: k.one = false; k.keys[40].pressed = false; break;
			case 50: k.two = false; k.keys[41].pressed = false; break;
			case 51: k.three = false; k.keys[42].pressed = false; break;
			case 52: k.four = false; k.keys[43].pressed = false; break;
			case 53: k.five = false; k.keys[44].pressed = false; break;
			case 54: k.six = false; k.keys[45].pressed = false; break;
			case 55: k.seven = false; k.keys[46].pressed = false; break;
			case 56: k.eight = false; k.keys[47].pressed = false; break;
			case 57: k.nine = false; k.keys[48].pressed = false; break;

			case 65: k.a = false; k.keys[0].pressed = false; break;
			case 66: k.b = false; k.keys[1].pressed = false; break;
			case 67: k.c = false; k.keys[2].pressed = false; break;
			case 68: k.d = false; k.keys[3].pressed = false; break;
			case 69: k.e = false; k.keys[4].pressed = false; break;
			case 70: k.f = false; k.keys[5].pressed = false; break;
			case 71: k.g = false; k.keys[6].pressed = false; break;
			case 72: k.h = false; k.keys[7].pressed = false; break;
			case 73: k.i = false; k.keys[8].pressed = false; break;
			case 74: k.j = false; k.keys[9].pressed = false; break;
			case 75: k.k = false; k.keys[10].pressed = false; break;
			case 76: k.l = false; k.keys[11].pressed = false; break;
			case 77: k.m = false; k.keys[12].pressed = false; break;
			case 78: k.n = false; k.keys[13].pressed = false; break;
			case 79: k.o = false; k.keys[14].pressed = false; break;
			case 80: k.p = false; k.keys[15].pressed = false; break;
			case 81: k.q = false; k.keys[16].pressed = false; break;
			case 82: k.r = false; k.keys[17].pressed = false; break;
			case 83: k.s = false; k.keys[18].pressed = false; break;
			case 84: k.t = false; k.keys[19].pressed = false; break;
			case 85: k.u = false; k.keys[20].pressed = false; break;
			case 86: k.v = false; k.keys[21].pressed = false; break;
			case 87: k.w = false; k.keys[22].pressed = false; break;
			case 88: k.x = false; k.keys[23].pressed = false; break;
			case 89: k.y = false; k.keys[24].pressed = false; break;
			case 90: k.z = false; k.keys[25].pressed = false; break;
    }
  }

//----------------------------------------------------//
//-------END KEYCODES.JS CODE-------------------------//
//----------------------------------------------------//











//////////////////////////////////////////////////////////
////////////// MOUSE.JS CODE /////////////////////////////
//////////////////////////////////////////////////////////
	function Mouse(x, y){
		this.pos = new Point(x,y);
		this.down = false;
		this.radius = 3;

		this.draw = function(){
			// circle(true, this.pos.x, this.pos.y, 2, 'white');
			this.pos.yOffset(5).lineTo(this.pos.yOffset(10));
			this.pos.yOffset(-5).lineTo(this.pos.yOffset(-10));
			this.pos.xOffset(5).lineTo(this.pos.xOffset(10));
			this.pos.xOffset(-5).lineTo(this.pos.xOffset(-10));
		}
	}



  var mouse = new Mouse(0,0);


  $(document).on('mousemove', '#canvas', function(e){
    var rect = this.getBoundingClientRect();
    mouse.pos.x = e.clientX - rect.left;
    mouse.pos.y = e.clientY - rect.top;
  });

	$(document).on('mousedown', '#canvas', function(){
		mouse.down = true;
	});

	$(document).on('mouseup', '#canvas', function(){
		mouse.down = false;
	});

  //////////////////////////////////////////////////////////
  ////////////// END MOUSE.JS CODE /////////////////////////
  //////////////////////////////////////////////////////////












/////////////////////////////////////////////////////////////
//////////THE BELOW FUNCTIONS REQUIRE JQUERY/////////////////
/////////////////////////////////////////////////////////////

/*
	JQueary:
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
*/

//this just creates a canvas from js so you don't have to type the tag out.

function createCanvas(x, y){
	$node = $('<canvas></canvas>');
	$node.attr('id', 'canvas');
	$node.attr('height', y + 'px');
	$node.attr('width', x + 'px');
	// $node.attr('style', 'cursor:none');
	$('body').prepend($node);
}
