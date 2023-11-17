const canvas = document.querySelector(".myCanvas");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
const ctx = canvas.getContext("2d");
const canvasColor="rgb(0, 0, 0)"
ctx.fillStyle = canvasColor;
ctx.fillRect(0, 0, width, height);

/*
ctx.fillStyle = "rgb(255, 0, 0)";
ctx.fillRect(50, 50, 100, 150);

ctx.fillStyle = "rgb(0, 255, 0)";
ctx.fillRect(75, 75, 100, 100);
ctx.fillStyle = "rgba(255, 0, 255, 0.75)";
ctx.fillRect(25, 100, 175, 50);

ctx.strokeStyle = "rgb(255, 255, 255)";
ctx.lineWidth = 5;
ctx.strokeRect(25, 25, 175, 200);

ctx.fillStyle = "rgb(255, 0, 0)";
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(150, 50);
const triHeight = 50 * Math.tan(degToRad(60));
ctx.lineTo(100, 50 + triHeight);
ctx.lineTo(50, 50);
ctx.fill();

ctx.fillStyle = "rgb(0, 0, 255)";
ctx.beginPath();
ctx.arc(150, 106, 50, degToRad(0), degToRad(360), false);
ctx.fill();

ctx.fillStyle = "yellow";
ctx.beginPath();
ctx.arc(200, 106, 50, degToRad(-45), degToRad(45), true);
ctx.lineTo(200, 106);
ctx.fill();

ctx.strokeStyle = "white";
ctx.lineWidth = 1;
ctx.font = "36px arial";
ctx.strokeText("Canvas text", 50, 50);

ctx.fillStyle = "red";
ctx.font = "48px georgia";
ctx.fillText("Canvas text", 50, 150);
canvas.setAttribute("aria-label", "Canvas text");

const image = new Image();
image.src = "Retropie2s.png";
image.addEventListener("load", () => ctx.drawImage(image, 20, 20));
*/

function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*ctx.translate(width / 2, height / 2);

let length = 250;
let moveOffset = 20;

for (let i = 0; i < length; i++) {
	ctx.fillStyle = `rgba(${255 - length},0,${255 - length},0.9)`;
	ctx.beginPath();
	ctx.moveTo(moveOffset, moveOffset);
	ctx.lineTo(moveOffset + length, moveOffset);
	const triHeight = (length / 2) * Math.tan(degToRad(60));
	ctx.lineTo(moveOffset + length / 2, moveOffset + triHeight);
	ctx.lineTo(moveOffset, moveOffset);
	ctx.fill();

	length--;
	moveOffset += 0.7;
	ctx.rotate(degToRad(5));
}*/

const numberOfBits=16;
const numberOfRegisters=8;
const onColor1="rgba(255, 0, 0, 0.25)";
const onColor2="rgba(255, 0, 0, 0.50)";
const onColor3="rgba(255, 0, 0, 0.75)";
const onColorFull="rgb(255, 0, 0)";
const offColor3=onColor3
const offColor2=onColor2;
const offColor1=onColor1;
const offColorFull="rgb(0, 0, 0)";

var timer = setInterval(() => {
	r=rand(0,15);
	b=rand(0,15);
	if (rand(1,99)%2==0) turnOn(r, b);
	else turnOff(r,b);
}, 20);

/*b=0;
r=0;
turnOn(r, b);
var timer = setInterval(() => {
	turnOff(r, b);
	b++;
	if (b==numberOfBits) {
		b=0;
		r++;
	}
	
	if (r==numberOfRegisters) {
		clearInterval(timer);
		return;
	}
	
	turnOn(r, b);
}, 250);
*/

/*
for (let j=0; j<256; j++) {
	if (j>0 && j%16==0) {
		r++;
		b=0;
	}
	
	turnOn(r, b);
	setTimeout(() => {
		turnOff(r, b);
		b++;
	}, 200);
}
*/

/*function turnOn(register, bit) {
	turn(register, bit, canvasColor);
	turn (register,bit, onColor1);
	setTimeout(() => {
		turn(register,bit, canvasColor);
		turn (register,bit, onColor2);
		setTimeout(() => {
			turn(register, bit, canvasColor);
			turn(register,bit, onColor3);
			setTimeout(() => {
				turn(register, bit,canvasColor);
				turn(register, bit, onColorFull);
			},20);
		},20);
	},20);
}

function turnOff(register, bit) {
	turn(register, bit, canvasColor);
	turn (register,bit, offColor3);
	setTimeout(() => {
		turn(register,bit, canvasColor);
		turn (register,bit, offColor2);
		setTimeout(() => {
			turn(register, bit, canvasColor);
			turn(register,bit, offColor1);
			setTimeout(() => {
				turn(register, bit,canvasColor);
				turn(register, bit, offColorFull);
			},20);
		},20);
	},20);
}*/
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
