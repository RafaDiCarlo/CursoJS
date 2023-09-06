import preguntas from '../json/preguntas.json' assert { type: 'json' };
// Definir las preguntas y respuestas en un arreglo de objetos

let preguntaActual = 0; // Índice de la pregunta actual

const preguntaTextoElement = document.getElementById("pregunta-texto");
const listaRespuestaElement = document.getElementById("lista-respuestas");
const respuestasBtns = document.getElementsByClassName("respuesta-btn");
const siguienteBtn = document.getElementById("siguiente-btn");

let preguntaActualData;

let Score;

// Función para cargar la pregunta actual y sus respuestas
function cargarPregunta() {
    preguntaActualData = preguntas[preguntaActual];
    preguntaTextoElement.textContent = preguntaActualData.pregunta;

    for (let i = 0; i < respuestasBtns.length; i++) {
        respuestasBtns[i].textContent = preguntaActualData.respuestas[i];
        respuestasBtns[i].addEventListener("click", verificarRespuesta);
    }
    preguntaActual++;
}

// Definir una función para cargar las preguntas desde el archivo JSON
/*function cargarPreguntas() {
    fetch('../json/preguntas.json') 
        .then(response => response.json())
        .then(data => {
            
            data.forEach(pregunta => {
                // Accede a los campos de la pregunta y realiza acciones
                const preguntaTexto = pregunta.pregunta;
                const respuestas = pregunta.respuestas;
                const respuestaCorrecta = pregunta.respuesta_correcta;

                // Aquí puedes crear objetos de pregunta o realizar cualquier otra acción
                // por ejemplo, agregarlos a un arreglo de preguntas
                const nuevaPregunta = {
                    pregunta: preguntaTexto,
                    respuestas: respuestas,
                    respuesta_correcta: respuestaCorrecta
                };
                this.preguntas.push(nuevaPregunta);
        })
        .catch(error => {
            console.error('Error al cargar las preguntas:', error);
        });
})
}*/

// Función para verificar la respuesta seleccionada
function verificarRespuesta(event) {
    const respuestaSeleccionada = event.target.textContent;

    if (respuestaSeleccionada === preguntaActualData.respuesta_correcta) {
        Score.triviaScore += 10;
      alert("¡Respuesta correcta!");
    } else {
        alert("Respuesta incorrecta");
        Score.triviaScore -= 5;
    }

    localStorage.setItem("Score", JSON.stringify(Score));
    mostrarScore();


    // Desactivar los botones de respuesta después de haber respondido
    for (let i = 0; i < respuestasBtns.length; i++) {
        respuestasBtns[i].removeEventListener("click", verificarRespuesta);
    }

    // Mostrar el botón "Siguiente" después de responder
    siguienteBtn.style.display = "block";
}

// Función para cargar la siguiente pregunta o finalizar el juego si no hay más preguntas
function siguientePregunta() {
    if (preguntaActual < preguntas.length) {
        cargarPregunta();
        siguienteBtn.style.display = "none";
    } else {
        alert("¡Has completado todas las preguntas!");
        reiniciarJuego();
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    preguntaActual = 0;
}

// Cargar la primera pregunta cuando la página se cargue
window.onload = function() {
    cargarPregunta();
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
    
    siguienteBtn.addEventListener("click", siguientePregunta);
};

function mostrarScore(){
    document.getElementById("puntajeGlobal")
    .textContent = Score.pongScore + Score.tatetiScore + Score.triviaScore ;
    document.getElementById("puntajeTrivia")
        .textContent = Score.triviaScore;
}