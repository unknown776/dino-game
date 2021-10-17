let score = 0;
let cross = true;
let isgameover = false;
let overaudio = new Audio('gameover.mp3')
document.onkeydown = function(e){
    if(e.code=="ArrowUp"){
        dino = document.querySelector('.dino');
        dino.classList.add("animateDino")
        setTimeout(() => {
            dino.classList.remove("animateDino")
        }, 700);
    }
    else if(e.code=="ArrowRight"){
        dino = document.querySelector('.dino');
        dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinox+80+"px";
    }
    else if(e.code=="ArrowLeft"){
        dino = document.querySelector('.dino');
        dinox = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinox-80+"px";
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);
    if(offsetX<100 && offsetY<52){
        gameOver.style.visibility = "visible";
        obstacle.classList.remove("obstacleAni");
        overaudio.play()
        isgameover = true;
        //if (score>0){
        //    score = score - 1;
        //}
    } else if(offsetX<80 && cross){
        if(isgameover===false){
            score+=1;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
            setTimeout(() => {
                aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
                newDur = aniDur - 0.1
                if(newDur>1.9){
                    obstacle.style.animationDuration = newDur+'s';
                }
            }, 500);
        }
    }
}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: "+score;
}

setInterval(() => {
    curscore = "Your Score: "+score
    scoreCont.innerText = curscore
}, 5);
