const timer = document.getElementById('timer')
const canv = document.getElementById('canvas')
ctx = canv.getContext('2d')

canv.width = window.innerWidth 
canv.height = window.innerHeight

let left = false,
right = false

// data obj ------------------------------------------
let colorRandom
const color = ['#ff2e4c','#2adb28','#f48322','#e52df4','#2feded']
const colorBg = ['#030001','#000200','#050300','#050005','#000407']

let ball = {
    x: 0, 
    y: canv.height/2,
    rad: 25,
    speed: 0,
    speedGR: 1,
    platform: true
}

let platform = [{
    x: 0, 
    y: canv.height/2 + 50,
    sizeX: 100,
    sizeY: 7
}]

let thorn = [{
    sizeX: 24,
    sizeY: 50,
    x: canv.width - 24, 
    y: 0 - 50,
}]
// data obj __________________________________________




//start <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function start(){
    let startCount = 10
    for(let i = 0; i < startCount;i++){
        let rY = Math.floor(Math.random() * (canv.height - 20 - 0) + 0)
        let rX = Math.floor(Math.random() * (canv.width - 100 - 0) + 0)
        objPlatform = {
            x: rX, 
            y: rY,
            sizeX: 100,
            sizeY: 7
        }
        platform.push(objPlatform)
    }
        //let alertRandom = Math.floor(Math.random() * (10 - 0) + 0)
        //if(alertRandom == 7){alert('На покушац (89188382438) :3')}

        colorRandom = Math.floor(Math.random() * (color.length - 0) + 0)
        timer.style.color = color[colorRandom]
}
start();
//start >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




// draw function -------------------------------------
function drawBall(){
    ctx.strokeStyle = color[colorRandom]
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(ball.x + ball.rad,ball.y + ball.rad, ball.rad, 0, 360)
    ctx.stroke()
}

function drawPlatform(){
    ctx.strokeStyle = color[colorRandom]
    ctx.lineWidth = 3
    ctx.beginPath()
    for(let i = 0; i< platform.length; i++){
		ctx.strokeRect(platform[i].x, platform[i].y, platform[i].sizeX, platform[i].sizeY)
    }
}

function drawThorn(){
    ctx.strokeStyle = color[colorRandom]
    ctx.lineWidth = 3
    for(let i = 0; i< thorn.length; i++){
        ctx.beginPath()
        ctx.moveTo(thorn[i].x,thorn[i].y)//thorn[i].x,thorn[i].y + thorn[i].sizeY
        ctx.lineTo(thorn[i].x + thorn[i].sizeX / 2,thorn[i].y + thorn[i].sizeY)//thorn[i].x + thorn[i].sizeX / 2,thorn[i].y
        ctx.lineTo(thorn[i].x + thorn[i].sizeX,thorn[i].y)//thorn[i].x + thorn[i].sizeX,thorn[i].y + thorn[i].sizeY
        ctx.closePath()
        ctx.stroke()
	}
}
// draw function _____________________________________




//draw all -------------------------------------------
setInterval(()=>{
    ctx.fillStyle = colorBg[colorRandom]

    ctx.fillRect(0, 0, canvas.width, canvas.height)

    drawPlatform()
    drawThorn()
    drawBall()
},10)
//draw all ___________________________________________





// control -------------------------------------------
if(window.DeviceOrientationEvent) {
	window.addEventListener("deviceorientation", function(event) {
		let corner = event.gamma
    	ball.speed = corner.toFixed(1) / 10 
	})
}
else if('ondeviceorientation' in window) { 
    window.ondeviceorientationabsolute = function(event) {
        //left -; right +
        let corner = event.gamma
        ball.speed = corner.toFixed(1) / 10     
    }
}
else if ('ondeviceorientationabsolute' in window) { 
    window.ondeviceorientationabsolute = function(event) {
        let corner = event.gamma
        ball.speed = corner.toFixed(1) / 10
    }
}
else{
        alert('Error device orientation');
    }

document.addEventListener('keydown', (e)=> {
    if (e.keyCode == 37){
       ball.speed = -2;
       left = true
    }
      if (e.keyCode == 39){
        ball.speed = 2;
        right = true
    }
})
document.addEventListener('keyup', (e)=> {
    if (e.keyCode == 37){
       left = false
    }
    if (e.keyCode == 39){
        right = false
    }
    if(!right && !left){
        ball.speed = 0
    }
})

// document.addEventListener('mousedown', (e)=> {
//     console.log(e.clientX +':'+ e.clientY)
//     if(e.clientX < canv.width/2){
//         ball.speed = -2;
//         right = true
//     }
//     if(e.clientX > canv.width/2){
//         ball.speed = 2;
//         left = true
//     }
// })
// document.addEventListener('mouseup', (e)=> {
//     if (e.clientX < canv.width/2){
//        left = false
//     }
//     if (e.clientX > canv.width/2){
//         right = false
//     }
//     if(!right && !left){
//         ball.speed = 0
//     }
// })
// control ___________________________________________




// physics <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function ballDirection(){
    if(ball.speed > 0){
        for(let i = 0; i<= ball.speed; i++){
            ball.x += 1;
        } 
    }
    else if(ball.speed < 0){
        for(let i = 0; i >= ball.speed; i--){
            ball.x -= 1;
        } 
    }     
}


function onPlatform(){
    for(let i = 0; i< platform.length; i++){
        if(Math.abs((platform[i].x + platform[i].sizeX / 2) - ball.x) < ball.rad* 1.5 
        && Math.abs((platform[i].y - ball.rad*2) - ball.y) < 3
        ||  Math.abs(platform[i].x - ball.x)< ball.rad*1.5 
        && Math.abs((platform[i].y - ball.rad*2) - ball.y) < 3){
            ball.platform = true
            ball.speedGR = 1
            break
        }
        else{
            ball.platform = false
        }
    }
    
}


let end = false;
function onThorn(){
    for(let i = 0; i< thorn.length; i++){
        if(Math.abs(thorn[i].x - ball.x) < ball.rad * 2
        && Math.abs(thorn[i].y - ball.y) < ball.rad * 2)
        {
            if(!end){
                end = true
                alert('ex: ' + ex)
                location.reload()
            }
        }
       
    }
}




function gravity(){
    j = 0; 
    if(!ball.platform){
        let gravityPlay  = setInterval(function(){
            if(!ball.platform){
                if(j < 20){
                    for(let i = 0; i< ball.speedGR;i++){
                        onPlatform()
                        if(!ball.platform){
                            ball.y += 1
                        }else{
                            clearInterval(gravityPlay)
                            gravityPlay = null
                            break
                        }
                    }
                    j++
                }else{
                    clearInterval(gravityPlay)
                    gravityPlay = null
                    if(ball.speedGR < 3){
                       ball.speedGR++
                    }
                    gravity()
                }
            }else{
                clearInterval(gravityPlay)
				gravityPlay = null
            }
        },50)
    }	
		
} 




function movementScreen(){
    for(let i = 0; i< platform.length; i++){
    	for(let j = 0; j<3; j++){
            platform[i].y -= 1
        } 
            
    }
    if(ball.platform){
    	for(let j = 0; j<3; j++){
            ball.y -= 1
        } 
    }

    for(let i = 0; i< thorn.length; i++){
        for(let j = 0; j<=3; j++){
            thorn[i].y += 1
        }
    }

    if(ball.x  < 0 - ball.rad * 2){
        ball.x = canv.width
    }
    if(ball.x > canv.width){
        ball.x = 0 - ball.rad * 2
    }
    if(ball.y < -50 || ball.y > canv.height){
       if(!end){
            end = true
            alert('ex: ' + ex)
            location.reload()
        }
    }
}

// physics >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




// new ----------------------------------------------------------------
function newPlatform(){
    for(let i = 0; i< platform.length; i++){
        let rX = Math.floor(Math.random() * (canv.width - platform[0].sizeX + 0) + 0)
        if(platform[i].y < 0){
           platform[i].y = canvas.height
           platform[i].x = rX
        }
    }
}


let thornCount = 30

function newThorn(){
    if(ex == thornCount){
        thornCount *= 2
        let objThorn =  {
            sizeX: 24,
            sizeY: 50,
            x: canv.width - 24, 
            y: 0 - 50,
        }
        thorn.push(objThorn)
    }
    for(let i = 0; i< thorn.length; i++){
        let rX = Math.floor(Math.random() * (canv.width - thorn[0].sizeX + 0) + 0)
        if(thorn[i].y > canv.height){
           thorn[i].y = 0 - thorn[0].sizeY
           thorn[i].x = rX
        }
    }
}
// new ________________________________________________________________


// interval --------------------------------------------------------------
setInterval(()=>{
    ballDirection()
    onPlatform()
    onThorn()
    gravity()
    movementScreen()
    newPlatform()
    newThorn()
}, 10)




let ex = 1
let m = 0, s = 0
const timerRun = setInterval(() => {
    ex++
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
// interval ______________________________________________________________