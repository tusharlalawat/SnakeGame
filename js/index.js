// Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('Music/food.mp3');
const gameoverSound = new Audio('Music/gameover.mp3');
const moveSound = new Audio('Music/move.mp3');
const musicSound = new Audio('Music/music.mp3');
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{x: 13, y: 15}];
food = {x: 6, y: 7};


// Game Functions
function main(currenttime) {
    window.requestAnimationFrame(main);
    if ((currenttime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currenttime;
    gameEngine();
}


//function for collapse/collide
function isCollide(snake) {
    // If snake bump into itself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // If snake bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {

    // Part1: Updating snake array and food
    // If snake collieds 
    if (isCollide(snakeArr)) {
        gameoverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over, Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;
    }

    // If snake has eaten the food, then increment the score and regnerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;

        if (score > maxscore) {
            maxscoreval = score;
            maxscore = localStorage.setItem("maxscore", JSON.stringify(maxscoreval));
            maxscoreBox.innerHTML = "Max score: " + maxscoreval;
        }

        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    // Part2: Display snake and food
    // Display snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //Display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}


// Main logic goes here
musicSound.play();
let maxscore = localStorage.getItem("maxscore");                             //To store highest score of the game
if (maxscore === null) {
    maxscoreval = 0;
    localStorage.setItem("maxscore", JSON.stringify(maxscoreval));
}

else {
    maxscoreval = JSON.parse(maxscore);
    maxscoreBox.innerHTML = "Max score: " + maxscore;
}

window.requestAnimationFrame(main);                                          //Can use setInterval function also
window.addEventListener('keydown', e => {                                    //Keyboard buttons navigation
    inputDir = { x: 0, y: 1 };
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});