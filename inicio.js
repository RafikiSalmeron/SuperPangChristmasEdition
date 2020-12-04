// Función que se ejecuta al cargar la página
window.onload = () =>{
	// Función para cambiar el color del botón jugar
	cambiarcolor();
}
// Función para cambiar el color del botón jugar
function cambiarcolor(){
	// Creo un color aleatorio
	var randomColor = Math.floor(Math.random()*16777215).toString(16);
	document.getElementById("boton").style.backgroundColor = "#"+ randomColor;
	// Cambio el color cada 300 milisegundos
	setTimeout(cambiarcolor,300);
}
// Función para reproducir el gif de jugar, y acceder al juego
function play(){
	// Oculto el botón
	document.getElementById("boton").style.visibility = "hidden";
	// Cambio el background por el gif
	document.body.style.backgroundImage = "url('img/carga.gif')";
	// A los 8,5 segundo (duración del gif), cargo la página del juego
	setTimeout(function(){ location.assign("juego.html"); },8500);
}

