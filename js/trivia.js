// Definir las preguntas y respuestas en un arreglo de objetos
const preguntas = [
    {
        pregunta: "¿Cuál es la capital de Francia?",
        respuestas: ["Londres", "París", "Madrid", "Berlín"],
        respuestaCorrecta: "París"
    },
    {
        pregunta: "¿Cuántos continentes hay en el mundo?",
        respuestas: ["5", "6", "7", "8"],
        respuestaCorrecta: "6"
    },

];

let preguntaActual = 0; // Índice de la pregunta actual

const preguntaTextoElement = document.getElementById("pregunta-texto");
const listaRespuestaElement = document.getElementById("lista-respuestas");
const respuestasBtns = document.getElementsByClassName("respuesta-btn");
const siguienteBtn = document.getElementById("siguiente-btn");

let preguntaActualData;
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

// Función para verificar la respuesta seleccionada
function verificarRespuesta(event) {
    const respuestaSeleccionada = event.target.textContent;

    if (respuestaSeleccionada === preguntaActualData.respuestaCorrecta) {
        alert("¡Respuesta correcta!");
    } else {
        alert("Respuesta incorrecta. Inténtalo de nuevo.");
    }

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
    cargarPregunta();
}

// Cargar la primera pregunta cuando la página se cargue
window.onload = function() {
    cargarPregunta();
    siguienteBtn.addEventListener("click", siguientePregunta);
};