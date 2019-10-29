const canv = document.getElementById('canvas')
ctx = canv.getContext('2d')

canv.width = window.innerWidth - 15
canv.height = window.innerHeight - 15


// data obj ------------------------------------------
let ball = {
    x: 0, 
    y: 0,
    rad: 25,
    speed: 0,
    speedGR: 1,
    platform: true
}

let platform = [{
    x: 0, 
    y: 50,
    sizeX: 100,
    sizeY: 7
},{
    x: 200, 
    y: 200,
    sizeX: 100,
    sizeY: 7
},{
    x: 100, 
    y: 400,
    sizeX: 100,
    sizeY: 7
}]

let thorn = [{
    x: 300, 
    y: 0,
    sizeX: 24,
    sizeY: 50
}]
// data obj __________________________________________



// draw function -------------------------------------
function drawBall(){
    ctx.strokeStyle = '#2feded'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(ball.x + ball.rad,ball.y + ball.rad, ball.rad, 0, 360)
    ctx.stroke()
}

function drawPlatform(){
    ctx.strokeStyle = '#2feded'
    ctx.lineWidth = 3
    ctx.beginPath()
    for(let i = 0; i< platform.length; i++){
		ctx.strokeRect(platform[i].x, platform[i].y, platform[i].sizeX, platform[i].sizeY)
    }
}

function drawThorn(){
    ctx.strokeStyle = '#2feded'
    ctx.lineWidth = 3
    for(let i = 0; i< thorn.length; i++){
        ctx.beginPath()
        ctx.moveTo(thorn[i].x,thorn[i].y + thorn[i].sizeY)
        ctx.lineTo(thorn[i].x + thorn[i].sizeX / 2,thorn[i].y)
        ctx.lineTo(thorn[i].x + thorn[i].sizeX,thorn[i].y + thorn[i].sizeY)
        ctx.closePath()
        ctx.stroke()
	}
}
// draw function _____________________________________




//draw all -------------------------------------------
setInterval(()=>{
    ctx.fillStyle = '#06141f'

    ctx.fillRect(0, 0, canvas.width, canvas.height)

    drawPlatform()
    drawThorn()
    drawBall()
},10)
//draw all ___________________________________________




// control -------------------------------------------
if ('ondeviceorientation' in window) { 
    window.ondeviceorientationabsolute = function(event) {
            //left -; right +
            let corner = event.gamma
            //ball.speed = corner.toFixed(1) / 10     
    }
}
else{
        alert('Error device orientation');
}
// control ___________________________________________




// physics <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function ballDirection(){
    if(ball.speed > 0){
        for(let i = 0; i<= ball.speed + 1; i++){
            ball.x += 1;
        } 
    }
    else if(ball.speed < 0){
        for(let i = 0; i >= ball.speed - 1; i--){
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


function gravity(){
    j = 0; 
    if(!ball.platform){
        gravityPlay  = setInterval(function(){
            if(!ball.platform){
                if(j < 10){
                    for(let i = 0; i< ball.speedGR;i++){
                        if(!ball.platform){
                            ball.y += 1
                        }else{
                            clearInterval(gravityPlay)
                            gravityPlay = null
                            break
                        }
                    }
                }else{
                    clearInterval(gravityPlay)
                    gravityPlay = null
                    if(ball.speedGR < 4){
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



setInterval(()=>{
    ballDirection()
    onPlatform()
    gravity()
}, 10)
// physics >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
