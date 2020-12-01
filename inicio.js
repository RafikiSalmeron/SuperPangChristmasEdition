window.onload = () =>{
	cambiarcolor();
}
function cambiarcolor(){
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  document.getElementById("boton").style.backgroundColor = "#"+ randomColor;
  setTimeout(cambiarcolor,300);
}
function play(){
	//console.log("PLAY");
	document.getElementById("boton").style.visibility = "hidden";
	document.body.style.backgroundImage = "url('img/carga.gif')";
	setTimeout(function(){ location.assign("juego.html"); },8500);
}

