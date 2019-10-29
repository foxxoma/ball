const hp = document.getElementById('hp')
const canv = document.getElementById('canvas')
const timer = document.getElementById('timer')
ctx = canv.getContext('2d')

alert('Покормите разраба :333 (89188382438)')
alert('На смартфонах двойной прыжок!!! может все таки покормите?')
alert('-.- я запомнил -- а всем остальным блаааааааагодарю')

let smartfon = false;
let jumpSmartfon = 1



let speedStepC = 0;

let direction = 1;

let foxStepSrc = [{
	src: "img/fox/fox1.png",
	active: true
	}, {
	src: "img/fox/fox2.png",
	active: false
}]

let foxPoint = 100;

let  foxXoba = ["img/foxxoba/foxxobaRight1.png","img/foxxoba/foxxobaRight2.png","img/foxxoba/foxxobaRight3.png"]

let candySrc = []
let candyCount = 1;
let eatCount = 0;

let airplaneSpeed = 2;
let airplaneBreak = false; 
let airplaneSrc = []
airplaneCount = 2
setInterval(()=>{
	
	if(airplaneCount > 0){
		let r = Math.floor(Math.random() * (370 - 10) + 10)
		let obgAirplane = {src:'img/airplane.png', x: 800, y:r}
		airplaneSrc.push(obgAirplane)
		airplaneCount--
	}
	for(let i = 0; i< airplaneSrc.length; i++){	
			//airplane.src = airplaneSrc[i].src
			airplaneSrc[i].x -= 2 * airplaneSpeed
			if(airplaneSrc[i].x < -50){
				airplaneSrc.splice(0)
				airplaneCount = 2
				break
			}	
	}

	if(candyCount > 0){
		let rY = Math.floor(Math.random() * (370 - 10) + 10)
		let rX = Math.floor(Math.random() * (1600 - 800) + 800)
		let obgCandy = {src:'img/candy.png', x: rX, y:rY}
		candySrc.push(obgCandy)
		candyCount--
	}
	for(let i = 0; i< candySrc.length; i++){	
			//candy.src = candySrc[i].src
			if(candySrc[candySrc.length - 1].x < -50){
				candyCount = 1
			}
			if( Math.abs(candySrc[i].y - yFox)<50 && Math.abs(candySrc[i].x - xFox)<30 ){
				candySrc.splice(i,1)
				candyCount = 1
				if(foxPoint < 100){
					foxPoint +=5
					eatCount++
					hp.textContent	= "HP: " + foxPoint	
				}
			}
	}

					
					

					airplaneTouch()

},10) 



function airplaneDraw(){
	for(let i = 0; i< airplaneSrc.length; i++){	
		//airplane.src = airplaneSrc[i].src
		ctx.drawImage(airplane, airplaneSrc[i].x,airplaneSrc[i].y, 50, 30)	
	}
}

function candyDraw(){
	for(let i = 0; i< candySrc.length; i++){	
		//candy.src = candySrc[i].src
		ctx.drawImage(candy, candySrc[i].x,candySrc[i].y, 30, 38)	
	}
}

function airplaneTouch(){
	for(let i = 0; i< airplaneSrc.length; i++){	
		if(Math.abs((airplaneSrc[i].y + 15) - (yFox + 25) )<40 && Math.abs(airplaneSrc[i].x - xFox )<40 && !airplaneBreak)
		{
			fox.src = foxXoba[0]
			foxPoint -= 20
			hp.textContent	= "HP: " + foxPoint;		
			if(foxPoint <= 0){
				alert(eatCount);
				location.reload();
			}
			airplaneBreak = true
			setTimeout(()=>airplaneBreak = false,1000)
			break
		}

	}

}




let platformSrc = [
	{src:'img/platform.png', x: 100, y:300},
	{src:'img/platform.png', x: 300, y:200},
	{src:'img/platform.png', x: 400, y:100}
	] 
	
function platformDraw(){
	for(let i = 0; i< platformSrc.length; i++){
		if(platformSrc[i].x > -50  && platformSrc[i].x < 800){
		//platform.src = platformSrc[i].src
		
		ctx.drawImage(platform, platformSrc[i].x, platformSrc[i].y, 50, 50)
		}
	}
}

canv.width =  800
canv.height = 400

let foxizeX, foxizeY


foxizeX = 52,5
foxizeY = 50

let xFox = 30,
yFox = canv.height - 50




const bg = new Image()
bg.src = "img/bg.jpg"




const candy = new Image()
candy.src = 'img/candy.png'


const fox = new Image()
fox.src = foxStepSrc[0].src





const platform = new Image()
platform.src = 'img/platform.png'



const airplane = new Image()
airplane.src = 'img/airplane.png'



function foxStep(){
	//speed cader
	speedStepC++;
	//clear
	
	//step

if(foxJumpCheck){
if (speedStepC % 20 == 0){
	if(foxStepSrc[0].active){
		fox.src = foxStepSrc[1].src
		foxStepSrc[1].active = true
		foxStepSrc[0].active = false
	}else{
		fox.src = foxStepSrc[0].src
		foxStepSrc[0].active = true
		foxStepSrc[1].active = false
	}
}
}
	//background


	//platform
if(xFox >= canv.width/2 - 40){
	for(let i = 0; i< platformSrc.length; i++){
		if(platformSrc[i].x > -50  && platformSrc[i].x < 800){
		//platform.src = platformSrc[i].src
		platformSrc[i].x -= 2 * direction
	}else{
		platformSrc[i].x -= 2 * direction;
	}
			
	}
}

if(platformSrc[platformSrc.length-1].x < canv.width - 100){
				let r = Math.floor(Math.random() * (300 - 50) + 50)
				let obgPlatform = {src:'img/platform.png', x: 800, y:r}
				platformSrc.push(obgPlatform)
}

	


	//fox
	if(xFox < canv.width/2 -40 ){
	xFox+= 2 * direction
	}
	if(xFox >= canv.width/2 - 40){
	for(let i = 0; i< candySrc.length; i++){	
		//candy.src = candySrc[i].src
		candySrc[i].x -=2 * direction
	}
}

	
	
}
	






let foxStepPlay = null
let foxStepLeft = false
let foxStepRight = false
let foxJumpPlay = null
let gravityPlay = null

let speedJump = 0 ;
let speedGravity = 0;

let fallRate = 1;

let gravityCheck = setInterval(()=> {

	if(!ground && !gravityPlay){
		
		speedGravity = 0;
		gravity()
		fox.src = foxXoba[2]
	}else{
		foxJumpCheck = true;
	}

},8)

function gravity(){

	let j = 10
		
			gravityPlay  = setInterval(function(){
				if(!ground){
				if(j-- > 0){
					
					yFox += speedGravity
					
				}else{
					clearInterval(gravityPlay)
					gravityPlay = null
					if(speedGravity < 5){
					speedGravity++
					}
					gravity()
				}
			}else{
				clearInterval(gravityPlay)
				gravityPlay = null
				foxJumpCheck = true
				fox.src = foxXoba[0]
			}	
			},8)
		
		
} 


































let foxJumpCheck = true;

function foxJump(){
	foxJumpCheck = false;
	
	
	let j = 10
		if(speedJump > 0){
	 		foxJumpPlay = setInterval(function(){
				if(j-- > 0){
					
					yFox -= speedJump

				}else{
					clearInterval(foxJumpPlay)
					speedJump--
					foxJump()
				}
			},8)
		}
		else{
			 gravityCheck = setInterval(()=> {
				if(!ground && !gravityPlay){
					speedGravity = 0;
					gravity()
					fox.src = foxXoba[2]
				}
				
			},10)
		}
	
}


let ground = true
setInterval(()=> {
	ground = false
	
	ground = platformSrc.some((e)=>{
	return Math.abs(e.y - 50 - yFox)<3 && Math.abs(e.x - xFox)<40 || Math.abs(canvas.height - 50 - yFox)<4
	})
  	if(ground && jumpSmartfon){
  		jumpSmartfon = 1
  	}

	if (!foxStepRight && !foxStepLeft && !smartfon){
		airplaneSpeed = 1.5
	}

},6)

















document.addEventListener('keydown', function(e) {
	if (e.keyCode == 37 && !foxStepLeft && !foxStepRight){
		direction = -1;
		foxStepLeft = true
	
		foxStepPlay = setInterval(foxStep,10);
		foxXoba = ["img/foxxoba/foxxobaLeft1.png","img/foxxoba/foxxobaLeft2.png","img/foxxoba/foxxobaLeft3.png"]
		foxStepSrc[0].src = 'img/fox/foxLeft1.png'
		foxStepSrc[1].src = 'img/fox/foxLeft2.png'
		

		airplaneSpeed = 1
	}
	if (e.keyCode == 39 && !foxStepRight && !foxStepLeft) {
		direction = 1;
		foxStepRight = true 
		foxStepPlay = setInterval(foxStep,10);
		foxXoba = ["img/foxxoba/foxxobaRight1.png","img/foxxoba/foxxobaRight2.png","img/foxxoba/foxxobaRight3.png"]
		foxStepSrc[0].src = 'img/fox/foxRight1.png'
		foxStepSrc[1].src = 'img/fox/foxRight2.png'

		airplaneSpeed = 2
	}
	if(e.keyCode == 39 && !foxStepRight && foxStepLeft){
		direction = 1
		foxStepRight = true
		foxStepLeft = false
		foxXoba = ["img/foxxoba/foxxobaRight1.png","img/foxxoba/foxxobaRight2.png","img/foxxoba/foxxobaRight3.png"]
		foxStepSrc[0].src = 'img/fox/foxRight1.png'
		foxStepSrc[1].src = 'img/fox/foxRight2.png'

		airplaneSpeed = 2
	}
	if(e.keyCode == 37 && foxStepRight && !foxStepLeft){
		direction = -1
		foxStepLeft = true
		foxStepRight = false
		foxXoba = ["img/foxxoba/foxxobaLeft1.png","img/foxxoba/foxxobaLeft2.png","img/foxxoba/foxxobaLeft3.png"]
		foxStepSrc[0].src = 'img/fox/foxLeft1.png'
		foxStepSrc[1].src = 'img/fox/foxLeft2.png'

		airplaneSpeed = 1
	}
	if (e.keyCode == 32 && foxJumpCheck && ground){

		speedJump = 5
		foxJump()
		clearInterval(gravityCheck);
		fox.src = foxXoba[1]
		
	}
});

document.addEventListener('keyup', function(e) {
	if (e.keyCode == 39 && foxStepRight) {
		clearInterval(foxStepPlay);
		foxStepPlay = null
		foxStepRight = false
	}
	if (e.keyCode == 37 && foxStepLeft) {
		clearInterval(foxStepPlay);
		foxStepPlay = null
		foxStepLeft = false
	}
	
});



let m = 0, s = 0;

const timerRun = setInterval(() => {
	s++
	if(s == 60){
		s=0
		m++
	}
	if(s<10 && m<10){
	timer.textContent = '0'+ m +':'+'0'+ s
	}else if(s<10 && m>10){
		timer.textContent =  m +':'+'0'+ s
	}else if(s>10 && m<10){
		timer.textContent =  '0'+ m +':'+ s
	}else{
		timer.textContent =  m +':'+ s
	}
}, 1000);


jumpTd.addEventListener('click',async ()=>{
		if (jumpSmartfon == 1 && smartfon){
			speedJump = 5
			foxJump()
		
		setTimeout(()=>{jumpSmartfon++}, 10);
		
		 clearInterval(gravityPlay);
		 gravityPlay = null
		 clearInterval(gravityCheck);
		 gravityCheck = null
		 fox.src = foxXoba[1]
		 
	}
	else if (jumpSmartfon == 2 && smartfon && gravityPlay){
		jumpSmartfon++
		speedJump = 5
		 foxJump()
		clearInterval(gravityPlay);
		 gravityPlay = null
		clearInterval(gravityCheck);
		 gravityCheck = null
		 fox.src = foxXoba[1]
		 
	}

})



rightTd.addEventListener('click', ()=>{
	if(smartfon){
		clearInterval(foxStepPlay)
		foxStepPlay = null
		foxStepPlay = setInterval(foxStep,10)
		direction = 1;
		foxXoba = ["img/foxxoba/foxxobaRight1.png","img/foxxoba/foxxobaRight2.png","img/foxxoba/foxxobaRight3.png"]
		foxStepSrc[0].src = 'img/fox/foxRight1.png'
		foxStepSrc[1].src = 'img/fox/foxRight2.png'
		airplaneSpeed = 2 

	}
})

leftTd.addEventListener('click',()=>{
	if(smartfon){
		clearInterval(foxStepPlay)
		foxStepPlay = null
		foxStepPlay = setInterval(foxStep,10)
		direction = -1;
		foxXoba = ["img/foxxoba/foxxobaLeft1.png","img/foxxoba/foxxobaLeft2.png","img/foxxoba/foxxobaLeft3.png"]
		foxStepSrc[0].src = 'img/fox/foxLeft1.png'
		foxStepSrc[1].src = 'img/fox/foxLeft2.png'
		airplaneSpeed = 1
	}
})


setInterval(function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	ctx.drawImage(bg, 0, 0, canv.width , canv.height)
	platformDraw()
	ctx.drawImage(fox, xFox, yFox, foxizeX, foxizeY )
	candyDraw()
	airplaneDraw()
},10)

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	// код для мобильных устройств
	smartfon = true
	airplaneCount = 3
} 
	
