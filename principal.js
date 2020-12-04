	// Objeto Bola
	class Bola {
		// Constructor de la bola
		constructor(radio, color, x, y, shoot, velX, velY){
			// Declaración de variables
			this.r = radio;
			this.color = color;
			this.x = x;
			this.y = y;
			this.velX = velX;
			this.velY = velY;
			this.shoot = shoot;

			// Crear su representacion
			// Compruebo si la bola a crear es un disparo o no. En el caso de que sea un disparo, la creo con una imagen
			if(this.shoot == 1){
				this.circ = document.createElementNS('http://www.w3.org/2000/svg','image');
				this.circ.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/snowball.png');
				this.circ.setAttributeNS(null,"x",this.x);
				this.circ.setAttributeNS(null,"y",this.y);
				this.circ.setAttributeNS(null,"r",this.r);	
			}else{
				this.circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
				this.circ.setAttributeNS(null,"cx",this.x);
				this.circ.setAttributeNS(null,"cy",this.y);
				this.circ.setAttributeNS(null,"r",this.r);	
				this.circ.setAttributeNS(null,"fill",this.color);
			}
			
			// Establezco la velocidad de la X y de la Y a aleatoria
			this.velX = Math.round(Math.random()*(10-1)+1);
			this.velY = Math.round(Math.random()*(10-1)+1);
			
			// Añado al svg las bolas creadas
			document.getElementsByTagName("svg")[0].appendChild(this.circ);
	  }

		// Función para representar el movimiento de las bolas en la pantalla
		dibuja(){

			let radio = parseInt(this.circ.getAttribute("r"));
			let posXact = parseInt(this.circ.getAttribute("cx"))+ parseInt(this.velX);
			let posYact = parseInt(this.circ.getAttribute("cy"))+ parseInt(this.velY);
			let tamanoSvg = document.getElementById("svg").getBoundingClientRect();

			this.circ.setAttribute("cx",posXact);
			this.circ.setAttribute("cy",posYact);

			this.x += this.velX;
			this.y += this.velY;

			if(posXact<=0+this.r ||posXact >= tamanoSvg.width-this.r){
				this.velX *=-1;
			}

			if(posYact<=0+this.r || posYact >= tamanoSvg.height-this.r){
				this.velY*=-1;
			}
		}  
	}
	
	// Objeto Jugador
	class Jugador {
		// Constructor del jugador
		constructor( color, x, y,velX, velY){
			// Declaración de variables
			this.color = color;
			this.x = document.getElementById("svg").getBoundingClientRect().height;
			this.y = document.getElementById("svg").getBoundingClientRect().height -150;
			this.velX = 20;
			this.width = 150;
			this.height = 150;
			this.velY = velY;
			
			// Crear su representacion
			this.rect = document.createElementNS('http://www.w3.org/2000/svg','image');
			this.rect.setAttributeNS(null,"x",this.x);
			this.rect.setAttributeNS(null,"y",this.y);
			this.rect.setAttributeNS(null,"rx",10);
			this.rect.setAttributeNS(null,"ry",10);
			this.rect.setAttributeNS(null, "width",  this.width);
			this.rect.setAttributeNS(null, "height", this.height);
			this.rect.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/normal.png');
			
			// Añado al svg el jugador
			document.getElementsByTagName("svg")[0].appendChild(this.rect);
		}
	
		// Función para el movimiento del jugador, según la tecla pulsada
		mover(tecla) {
			// Tecla "A/a". Movimiento hacia la izquierda
			if ((tecla.keyCode === 97 && this.x - this.velX >= 0) || (tecla.keyCode === 65 && this.x - this.velX >= 0)) {
				this.x = this.x - this.velX;
				this.rect.setAttribute("x", this.x);
				// Asigno la imagen de santa bailando a la izquierda
				this.rect.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/santaizq.gif');
			}
			// Tecla "D/d". Movimiento hacia la derecha
			if ((tecla.keyCode === 100 && this.x + this.velX <= document.getElementById("svg").getBoundingClientRect().width - 50)) {
				this.x = this.x + this.velX;
				this.rect.setAttribute("x", this.x);
				// Asigno la imagen de santa bailando a la derecha
				this.rect.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/santader.gif');
			}
			// Tecla "Espacio". Disparo
			if (tecla.keyCode === 32) {
				// Asigno la imagen de santa saltando
				this.rect.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/shoot.png');
				// Creo la bola, que será el disparo
				var bolita = new Bola(10,"red",this.x +25, this.y, 1)
				// Reproduzco el sonido de disparo
				document.getElementById("audio2").play();
				// Añado el disparo al array de disparos
				disparos.push(bolita);
				// A los 200 milisegundos de disparar, cambio la imagen a la de santa normal.
				setTimeout(() => { this.rect.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/normal.png'); }, 200);
			}
		}
	}	

		
	// Declaración de variables	
	var bolas = [];
	var disparos = [];
	var jugador;
	var intervalID;
	var radio = 100;
	
	// Función que se ejecuta al cargar la página
	window.onload = () =>{
		// Declaro al jugador
		jugador = new Jugador("skyblue");
		
		// Le asigno al jugador el movimiento con las teclas del teclado
		window.addEventListener("keypress", (tecla) => {
            jugador.mover(tecla)
			// Arranca la música de fondo
			document.getElementById("audio").play();
        });
		
		// Declaro la posición x, donde estará la primera bola
		var x=150;
		
		// Bucle para crear bolas (Funcional para 2 bolas. Para más bolas cambiar la x al final del bucle a un valor distinto)
		for(let  i=0;i<2;i++){
			// Añado cada bola al array
			bolas.push(new Bola(radio,"red",x,150,0));
			
			// Asigno un valor a x distinto al anterior para la siguiente bola
			x = document.getElementById("svg").getBoundingClientRect().width-300;
		}
		
		// Creo un intervalo de ejecución de funciones en 30 milisegundos, asignandolo a una variable que almacenará su ID
		intervalID = setInterval(interval,30);
	}
	
	// Función del intervalo donde ejecuto las distintas 
	function interval(){
		// Función que controla la victoria y efectua el movimiento y la colisión de las bolas
		animaTodasBolas();
		
		// Función que controla los disparos efectuados
		disparar();
		
		// Función que controla la colisión entre el jugador y las bolas
		comprobarGolpe(jugador);
	}
	
	// Función que controla la victoria y efectua el movimiento y la colisión de las bolas
	function animaTodasBolas(){
		// Comprobación de victoria
		if(bolas.length < 1){
			// Función de victoria
			ganar();
		}
		// Bucle para el movimiento de la bola
		for(let i=0;i<bolas.length;i++){
			// Dibujar las bolas en pantalla, y movimiento
			bolas[i].dibuja();
		}
		
		// Función que controla la colisión entre las bolas
		colision(bolas);
    }
	
	// Función que controla los disparos efectuados
	function disparar(){
		// Bucle que recorre todos los disparos, hace el movimiento de estos y los borra cuando llegan a la parte de arriba
		for(let i=0;i<disparos.length;i++){
			// Comprobación de la altura de los disparos, y su posterior eliminaciónn
			if(disparos[i].y < -20){
				disparos.splice(i, 1);
				i --;
			}
			// Comprobación del disparo para ver si está definido y no borrado, y se encarga del movimiento del mismo
			if (typeof disparos[i] !== 'undefined'){
				disparos[i].y -= 10;
				disparos[i].circ.setAttribute("y",disparos[i].y);
			}
		}
		// Función para la colisión del disparo con la bola
		hit(disparos,bolas);
    }

	// Función de la victoria
	function ganar(){
		// Oculto el svg
		document.getElementById("svg").style.visibility = "hidden";
		// Cambio la imagen del background
		document.body.style.backgroundImage = "url('img/win.gif')";
		// A los 5 seg, redirijo la página a la página de inicio
		setTimeout(function(){ location.assign("index.html"); },5000);
	}
	
	// Función de la derrota
	function perder(){
		// Elimino todas las bolas
		bolas = [];
		// Oculto el svg
		document.getElementById("svg").style.visibility = "hidden";
		// Cambio la imagen del background
		document.body.style.backgroundImage = "url('img/lose.gif')";
		// A los 5 seg, redirijo la página a la página de inicio
		setTimeout(function(){ location.assign("index.html"); },5000);
		
	}
	
	// Función que controla la colisión entre el jugador y las bolas
	function comprobarGolpe(player){
		// Bucle que recorre todas las bolas
		for (let i = 0; i < bolas.length; i++) {	
				// Comprobaciones de la posición del jugador con la bola, teniendo en cuenta el radio de la bola y el tamaño del jugador
				if(bolas[i].r > (radio/2)){
					if (((bolas[i].x - player.x ) < 190 ) && ((bolas[i].x - (player.x +40)) > -75)){
						if (((bolas[i].y - player.y) < 100 ) && ((bolas[i].y - player.y) > -75)){	
							// Paro el intervalo de tiempo para que no se efectúen mas movimientos de bolas, colisiones, etc
							clearInterval(intervalID);
							// Función de la derrota
							perder();
							}
					}
				}else if(bolas[i].r > radio/4){				
					if (((bolas[i].x - player.x) < 160 ) && ((bolas[i].x - (player.x +40)) > -40)){
						if (((bolas[i].y - player.y -20) < 40 ) && ((bolas[i].y - player.y-20) > -35)){	
							// Paro el intervalo de tiempo para que no se efectúen mas movimientos de bolas, colisiones, etc
							clearInterval(intervalID);
							// Función de la derrota
							perder();
						}
					}	
				}else{
					if (((bolas[i].x - player.x) < 120 ) && ((bolas[i].x - (player.x +20)) > -5)){
						if (((bolas[i].y - player.y -20) < 90 ) && ((bolas[i].y - player.y-20) > -35)){
							// Paro el intervalo de tiempo para que no se efectúen mas movimientos de bolas, colisiones, etc
							clearInterval(intervalID);
							// Función de la derrota
							perder();
						}
					}
				}
				
				
			}				
    }
	
	// Función que recorre todos los disparos y todas las bolas, para comprobar la colisión entre ellos.
	function hit(disparos){
		for(let i=0;i<disparos.length;i++){
			for(let j=0;j<bolas.length;j++){
					// Función para comprobar la colisión entre bolas y disparos
					hitted(disparos[i],bolas[j]);					
			}
		}
    }
	
	// Función para comprobar la colisión entre bolas y disparos
	function hitted(a,b){
			// Comprobación del disparo, para comprobar si está definido
			if (typeof a !== 'undefined'){
				// Comprobación de la colisión entre bola y disparo
				if (Math.sqrt(((a.x-b.x)**2)+((a.y-b.y)**2)) <= a.r + b.r) {
					// Obtengo la posición del disparo a borrar
					let indice = disparos.indexOf(a);
					// Elimino del campo de visión el disparo 
					a.circ.setAttribute("x",-100);
					// Elimino el disparo del array de disparos
					disparos.splice(indice, 1);
					// Función para dividir la bola en 2, si se puede
					dividir(b);
				}
			}
	}
	
	// Función	para dividir la bola en 2, si se puede
	function dividir(bola){
		// Almaceno la posición x de la bola en una variable
		let x = bola.x;
		// Compruebo si tengo que dividir la bola en 2, o simplemente eliminarla si su radio es inferior a 25
		if(bola.r > 25){
			// Creo las 2 nuevas bolas
			var bola1 = new Bola(bola.r/2,"red",x - 30, bola.y, 0);
			var bola2 = new Bola(bola.r/2,"red",x + 30, bola.y, 0);
			// Introduzco en el array las 2 nuevas bolas
			bolas.push(bola1, bola2);
		}
		// Elimino del campo de visión la bola
		bola.circ.setAttribute("cx",-100);
		// Obtengo la posición de la bola a borrar
		let indice = bolas.indexOf(bola);
		// Elimino la bola del array de bolas
		bolas.splice(indice, 1);
	}

	// Función que comprueba la colisión entre las bolas
    function colision(bolas){
		for(let i=0;i<bolas.length;i++){
			for(let j=0;j<bolas.length;j++){
				if(i!=j){
					// Función para la colisión entre las bolas
					chocarBolas(bolas[i],bolas[j]);
				}
			}
		}
    }

	// Función que controla la colisión entre las bolas
    function chocarBolas(a,b){
		  // Comprobación del choque entre las bolas
		  if (Math.sqrt(((a.x-b.x)**2)+((a.y-b.y)**2)) <= a.r + b.r) {
			  // Hago los cambios necesarios a la velocidad y posición de x e y, y dibujo las bolas actualizando asi su nueva dirección
			  let cambiox = 0;
			  let cambioy = 0;

			  cambiox = a.velX;
			  a.velX = b.velX;
			  b.velX = cambiox;
			  cambioy = a.velY;
			  a.velY = b.velY;
			  b.velY = cambioy;

			  a.dibuja();
			  b.dibuja();
			
		}	
	}
	
	
	
