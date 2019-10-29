const canv = document.getElementById('canvas')
ctx = canv.getContext('2d')

canv.width = window.innerWidth - 15
canv.height = window.innerHeight - 15

const p = document.getElementById('p');

// data obj ------------------------------------------
let ball = {
    src: 'img/ball.png',
    x: 0, 
    y:0,
    sizeX: 50,
    sizeY: 50
}

let platform = [{
    src: 'img/platform.png',
    x: 0, 
    y:50,
    sizeX: 100,
    sizeY: 7
}]

let thorn = [{
    src: 'img/thorn.png',
    x: 300, 
    y:0,
    sizeX: 24,
    sizeY: 50
}]
// data obj __________________________________________




// new Img -------------------------------------------
const ballImg = new Image()
ballImg.src = ball.src

const platformImg = new Image()
platformImg.src = platform[0].src

const thornImg = new Image()
thornImg.src = thorn[0].src
// new Img ___________________________________________




// draw function -------------------------------------
function drawBall(){
    ctx.drawImage(ballImg, ball.x,ball.y, ball.sizeX, ball.sizeY)
}

function drawPlatform(){
    for(let i = 0; i< platform.length; i++){	
		ctx.drawImage(platformImg, platform[i].x, platform[i].y, platform[i].sizeX, platform[i].sizeY)
    }
}

function drawThorn(){
    for(let i = 0; i< thorn.length; i++){	
		ctx.drawImage(thornImg, thorn[i].x, thorn[i].y, thorn[i].sizeX, thorn[i].sizeY)
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
if ('ondeviceorientationabsolute' in window) { 	
    window.ondeviceorientationabsolute = function(event) {
        let rotete = event.gamma
        p.textContent = rotete

    }
} 
else if ('ondeviceorientation' in window) { 
    window.ondeviceorientationabsolute = function(event) {

            let rotete = event.gamma
            p.textContent = rotete
            
    }
}
else{
        alert('Error device orientation');
}
// control ___________________________________________




// physics <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// physics >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>