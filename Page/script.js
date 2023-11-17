const canvas = document.querySelector(".myCanvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");
const canvasColor="rgb(0, 0, 0)"
ctx.fillStyle = canvasColor;
ctx.fillRect(0, 0, width, height);
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
function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const numberOfBits=16;
const numberOfRegisters=8;
const onColorFull="rgb(255, 0, 0)";
const offColorFull="rgb(0, 0, 0)";

var timer = setInterval(() => {
	r=rand(0,15);
	b=rand(0,15);
	if (rand(1,99)%2==0) turnOn(r, b);
	else turnOff(r,b);
}, 20);

function turnOn(register, bit) {
	turn(register, bit, onColorFull);
}

function turnOff(register, bit) {
	turn(register, bit, offColorFull);
}

function turn(register, bit, fillStyle)
{
	if (register >= numberOfRegisters || bit >= numberOfBits) return;
	
	ctx.fillStyle = fillStyle;
	loc = getLocation(register, bit);
	ctx.beginPath();
	ctx.arc(loc.cX, loc.cY, loc.r, degToRad(0), degToRad(360), false);
	ctx.fill();
}

function getLocation(register, bit)
{	
	if (register > numberOfRegisters || bit> numberOfBits) return;
	
	dFromWidth=width/(1.5*numberOfBits);
	dFromHeight=height/(1.5*numberOfRegisters);
	if (dFromHeight < dFromWidth) {
		d = dFromHeight;
	}
	else {
		d = dFromWidth
	}
	
	horizontalGap=(width-numberOfBits*d)/(numberOfBits+1);
	cX=horizontalGap+bit*(d+horizontalGap)+d/2;
	verticalGap=(height-numberOfRegisters*d)/(numberOfRegisters+1);
	cY=verticalGap+register*(d+verticalGap)+d/2;
	
	var location={
		r: d/2,
		cX: cX,
		cY: cY
	};
	
	return location;
}
