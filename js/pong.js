const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Tamaño del canvas
canvas.width = 800;
canvas.height = 400;

// Raquetas
const paddleWidth = 10;
const paddleHeight = 80;
let playerY = canvas.height / 2 - paddleHeight / 2;
let opponentY = canvas.height / 2 - paddleHeight / 2;

// Pelota
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 3;

const opponentSpeed = 3;
const opponentErrorMargin = 100;

let Score;

function draw() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar raquetas
    ctx.fillStyle = "white";
    ctx.fillRect(0, playerY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, opponentY, paddleWidth, paddleHeight);

    // Dibujar pelota
    ctx.fillRect(ballX - ballSize / 2, ballY - ballSize / 2, ballSize, ballSize);

    // Mover la pelota
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Colisión con los bordes verticales
    if (ballY + ballSize / 2 > canvas.height || ballY - ballSize / 2 < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Colisión con las raquetas
    if (
        (ballX - ballSize / 2 < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) ||
        (ballX + ballSize / 2 > canvas.width - paddleWidth && ballY > opponentY && ballY < opponentY + paddleHeight)
    ) {
        ballSpeedX = -ballSpeedX;
    }

    //Anotar punto
    if (ballX < 0) {
        Score.pongScore -= 10;
        localStorage.setItem("Score", JSON.stringify(Score));
        mostrarScore();
        reiniciarPelota();
    } else if (ballX > canvas.width) {
        Score.pongScore += 15;
        localStorage.setItem("Score", JSON.stringify(Score));
        mostrarScore();
        reiniciarPelota();
    }

    const targetY = ballY - paddleHeight / 2 + Math.random() * opponentErrorMargin - opponentErrorMargin / 2;
     // Mover la raqueta del oponente (IA simple)
     if (opponentY < targetY) {
        opponentY += opponentSpeed;
    } else if (opponentY > targetY) {
        opponentY -= opponentSpeed;
    }



    // Dibujar en cada frame
    requestAnimationFrame(draw);
}

function reiniciarPelota() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

// Controlar la raqueta del jugador con el mouse
canvas.addEventListener("mousemove", (event) => {
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;
    
    // Ajustar la posición de la paleta de acuerdo a la posición del mouse
    playerY = mouseY - paddleHeight / 2;
    
    // Evitar que la paleta se salga del canvas
    if (playerY < 0) {
        playerY = 0;
    } else if (playerY > canvas.height - paddleHeight) {
        playerY = canvas.height - paddleHeight;
    }
});

// Iniciar el juego
draw();

window.onload = function() {
    Score = JSON.parse(localStorage.getItem("Score"));  
    if(Score === null){
        const defaultScore = {
            triviaScore: 0,
            pongScore: 0,
            tatetiScore: 0
        };
        Score = defaultScore
    }
    else{
        const parsedScore = Score
        Score = parsedScore;
    }
    mostrarScore();
};

function mostrarScore(){
    document.getElementById("puntajeGlobal")
    .textContent = Score.pongScore + Score.tatetiScore + Score.triviaScore ;
    document.getElementById("puntajeTrivia")
        .textContent = Score.triviaScore;
}