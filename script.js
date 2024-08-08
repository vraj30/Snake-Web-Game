let direction = {x:0, y:0};
const moveSound = new Audio("move2.wav");
const eatSound = new Audio("eat.wav");
const gameOverSound = new Audio("gameover.wav");
let speed = 8;
let lastPaintTime = 0;
let snakeArr = [{x:13,y:15}];
let food= {x:6, y:7};
let score = 0;

//game function


function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime) / 1000 < 1/speed)
    {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function collde(snake) {
    //collide with yourself

    for(let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[i].y)
            return true;
    } 

    //collide with wall
    if(snake[0].x >= 18 || snake[0].x <= 0  || snake[0].y >= 18 || snake[0].y <= 0)
        return true;
    
    return false;
}

function gameEngine() {

    //updating snake and food

    if(collide(snakeArray))
    {
        gameOverSound.play();
        direction = {x:0, y:0};
        alert("Game Over! Ctrl+r to restart the game");
        snakeArray = [{x:13,y:15}];
        score = 0;
    }

    //if food is eaten then regenerate food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
    {
        eatSound.play();
        score++;
        if(score > highscoreVal)
        {
            highscoreVal = score;
            localStorage.setItem("highscore",JSON.stringify(highscoreVal));
            highscorebox.innerHTML = "Highscore: " + highscoreVal;
        }

        scorebox.innerHTML = "Score: " + score;

        snakeArr.unshift({x: snakeArr[0].x + direction.x , y: snakeArr[0].y + direction.y});
        let a = 2, b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};

    }

    //move snake
    for(let i = snakeArr.length - 2; i >= 0; i--)
    {
        snakeArr[i+1] = {...snakeArr[i]};
         
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;


    //display snake
    playarea.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

    if(index === 0)
    {
        snakeElement.classList.add('snakeHead');
    }
    else
    {
        snakeElement.classList.add('snake');
    }
    playarea.appendChild(snakeElement);
});

    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    playarea.appendChild(foodElement);


}

//main logic
let highscore = localStorage.getItem("highscore");

if(highscore === NULL)
{
    highscoreVal = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreVal));

}
else
{
    highscoreVal = JSON.parse(highscore);
    highscorebox.innerHTML = "Highscore: " + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    direction = {x:0, y:1};
    switch (e.key)
    {
        case "ArrowUp":
            console.log("Up Arrow");
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            console.log("Down Arrow");
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            console.log("Left Arrow");
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            console.log("Right Arrow");
            direction.x = 1;
            direction.y = 0;
            break;
    
    }
})