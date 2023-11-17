const numberOfBits=16;
const numberOfRegisters=8;
const onColorFull="rgb(255, 0, 0)";
const offColorFull="rgb(0, 0, 0)";
const canvas = document.querySelector(".myCanvas");
const canvasColor="rgb(0, 0, 0)"
ctx = canvas.getContext("2d");	
timeoutHandle=null;
timer=null;
selftestPhase1Started=false;
selftestPhase1Finished=false;
selftestPhase2Started=false;
selftestPhase2Finished=false;
selftestPhase3Started=false;
selftestPhase3Finished=false;
useAinimation=false;
width = (canvas.width = window.innerWidth);
height = (canvas.height = window.innerHeight);

reset();
window.addEventListener('resize', reset);
canvas.addEventListener('click', reset, false);

function reset(){
	clearInterval(scheduler);
	clearInterval(timer);
	clearTimeout(timeoutHandle);
	selftestPhase1Started=false;
	selftestPhase1Finished=false;
	selftestPhase2Started=false;
	selftestPhase2Finished=false;
	selftestPhase3Started=false;
	selftestPhase3Finished=false;
	width = (canvas.width = window.innerWidth);
	height = (canvas.height = window.innerHeight);
	ctx.fillStyle = canvasColor;
	ctx.fillRect(0, 0, width, height);
	var scheduler = setInterval(() => {
		if (!selftestPhase1Started) {
			selfTestPhase1();
		}
		if (!selftestPhase2Started && selftestPhase1Finished) {
			selfTestPhase2();
		}
		if (!selftestPhase3Started && selftestPhase2Finished) {
			selfTestPhase3();
		}
		if (selftestPhase3Finished){			
			clearInterval(scheduler);
			operate();
		}
	},1000);
}

function selfTestPhase1(){
	selftestPhase1Started=true;
	testCount=0;
	turnOnAll();
	timeoutHandle=setTimeout(()=>{
		turnOffAll();
		selftestPhase1Finished=true;
	},50);
}

function selfTestPhase2(){
	selftestPhase2Started=true;
	bitIncrement=1;
	registerIncrement=1;
	counter=0;
	r=0;
	b=0;
	timer = setInterval(() => {
		turnOn(r,b);
		timeoutHandle=setTimeout(() => {
			turnOff(r,b);
			counter++;
			b=b+bitIncrement;
			if (counter>=numberOfBits*numberOfRegisters) {
				clearInterval(timer);
				selftestPhase2Finished=true;
			}
		
			if (counter>0 && counter%numberOfBits==0) {
				r=r+registerIncrement;
				bitIncrement=bitIncrement*-1;
				b=b+bitIncrement;
			}
	
		}, 20);
	},80);
}

function selfTestPhase3(){
	selftestPhase3Started=true;
	testCount=0;
	timer = setInterval(() => {
		turnOnAll();
		testCount++;
		if (testCount > 4) {
			clearInterval(timer);
			testCount=10;
		}

		timeoutHandle=setTimeout(()=>{
			turnOffAll();
			if (testCount >4){
				selftestPhase3Finished=true;
			}
		},50*testCount);
	}, 300);
}

function operate(){
	timer = setInterval(() => {
		r=rand(0,numberOfRegisters);
		b=rand(0,numberOfBits);
		if (rand(1,99)%2==0) turnOn(r, b);
		else turnOff(r,b);
	}, 20);
}

function arithmetic(){

}

function degToRad(degrees) {
	return (degrees * Math.PI) / 180;
  }
  
  function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

  const onColor1="rgba(255, 0, 0, 0.25)";
  const onColor2="rgba(255, 0, 0, 0.50)";
  const onColor3="rgba(255, 0, 0, 0.75)";
  const offColor3=onColor3
  const offColor2=onColor2;
  const offColor1=onColor1;
function turnOn(register, bit) {
	if (useAinimation) turnWithAnimation(register, bit, onColor1,onColor2,onColor3,onColorFull);
	else turn(register, bit, onColorFull);
}

function turnOff(register, bit) {
	if (useAinimation) turnWithAnimation(register, bit, offColor3,offColor2,offColor1,offColorFull);
	else turn(register, bit, offColorFull);
}

function turnOnAll() {
	turnAll(onColorFull);
}

function turnOffAll() {
	turnAll(offColorFull);
}

function turnAll(fillStyle)
{
	for(b=0; b<numberOfBits; b++) {
		for(r=0; r<numberOfRegisters; r++){
			turn(r,b,fillStyle);
		}
	}
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

function turnWithAnimation(register, bit, fillStyle1, fillStyle2, fillStyle3, fillStyle4) {
	turn(register, bit, canvasColor);
	turn (register,bit, fillStyle1);
	setTimeout(() => {
		turn(register,bit, canvasColor);
		turn (register,bit, fillStyle2);
		setTimeout(() => {
			turn(register, bit, canvasColor);
			turn(register,bit, fillStyle3);
			setTimeout(() => {
				turn(register, bit,canvasColor);
				turn(register, bit, fillStyle4);
			},3);
		},3);
	},3);
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
