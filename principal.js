	class Bola {
		constructor(radio, color, x, y, shoot, velX, velY){
			this.r = radio;
			this.color = color;
			this.x = x;
			this.y = y;
			this.velX = velX;
			this.velY = velY;
			this.shoot = shoot;

			//Crear su representacion
			console.log(this.shoot)
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

			this.velX = Math.round(Math.random()*(10-1)+1);
			this.velY = Math.round(Math.random()*(10-1)+1);
			document.getElementsByTagName("svg")[0].appendChild(this.circ);
	  }

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
	
	var bolas = [];
	var disparos = [];
	var jugador;
	var intervalID;
	var radio = 100;
	window.onload = () =>{
		
		jugador = new Jugador("skyblue");
		window.addEventListener("keypress", (tecla) => {
            jugador.mover(tecla)
			document.getElementById("audio").play();
			//document.getElementById("audio").loop;
        });
		var x=Math.random() * (100 - 50) + 100;
		
		for(let  i=0;i<2;i++){
			bolas.push(new Bola(radio,"red",x,150,0));
			x = document.getElementById("svg").getBoundingClientRect().width-300;
		}
		intervalID = setInterval(interval,30);
		
		//setInterval(disparar,30);
		//setInterval(comprobarGolpe,30);
		//setInterval(function(){comprobarGolpe(jugador)}, 30);
		

	}
	
	function interval(){
		animaTodasBolas();
		disparar();
		comprobarGolpe(jugador);
	}
	
	function disparar(){
		for(let i=0;i<disparos.length;i++){
			if(disparos[i].y < -20){
				disparos.splice(i, 1);
				i --;
			}
			if (typeof disparos[i] !== 'undefined'){
				disparos[i].y -= 10;
				disparos[i].circ.setAttribute("y",disparos[i].y);
			}
		}
		hit(disparos,bolas);
    }

	function animaTodasBolas(){
		if(bolas.length < 1){
			ganar();
		}
		for(let i=0;i<bolas.length;i++){
			bolas[i].dibuja();
		}
		colision(bolas);
    }
	
	function ganar(){
		document.getElementById("svg").style.visibility = "hidden";
		document.body.style.backgroundImage = "url('img/win.gif')";
		setTimeout(function(){ location.assign("index.html"); },5000);
	}
	
	function perder(){
		bolas = [];
		document.getElementById("svg").style.visibility = "hidden";
		document.body.style.backgroundImage = "url('img/lose.gif')";
		setTimeout(function(){ location.assign("index.html"); },5000);
		
	}
	function comprobarGolpe(player){
		for (let i = 0; i < bolas.length; i++) {
				//console.log("this.x: " + player.width);	
				/*
				if (Math.sqrt(((bolas[i].x - player.x) ** 2) + ((bolas[i].y - player.y) ** 2)) <= (player.width - 45) + bolas[i].r) {
					alert("Has perdido:  BOLA XY: " + bolas[i].x + " " + bolas[i].y + "    PLAYER XY: " + player.x + " " + player.y );
				}
				*/
				if(bolas[i].r > (radio/2)){
					if (((bolas[i].x - player.x ) < 190 ) && ((bolas[i].x - (player.x +40)) > -75)){
						if (((bolas[i].y - player.y) < 100 ) && ((bolas[i].y - player.y) > -75)){	
						//alert("PERDER: BOLA XY: " + bolas[i].x + " " + bolas[i].y + "    PLAYER XY: " + player.x + " " + player.y);
						//location.reload();
						clearInterval(intervalID);
						perder();
						}
					}
				}else if(bolas[i].r > radio/4){
					console.log("radio med");
						if (((bolas[i].x - player.x) < 160 ) && ((bolas[i].x - (player.x +40)) > -40)){
							if (((bolas[i].y - player.y -20) < 40 ) && ((bolas[i].y - player.y-20) > -35)){	
							alert("PERDER: BOLA XY: " + bolas[i].x + " " + bolas[i].y + "    PLAYER XY: " + player.x + " " + player.y);
							//location.reload();
							//clearInterval(intervalID);
							//perder();
							}
						}	
				}else{
					console.log("radio peque");
					if (((bolas[i].x - player.x) < 120 ) && ((bolas[i].x - (player.x +20)) > -5)){
						if (((bolas[i].y - player.y -20) < 90 ) && ((bolas[i].y - player.y-20) > -35)){
					
						alert("PERDER: BOLA XY: " + bolas[i].x + " " + bolas[i].y + "    PLAYER XY: " + player.x + " " + player.y);
						//location.reload();
						}
					}
				}
				
				
			}				
    }
	
	function hit(disparos){
		for(let i=0;i<disparos.length;i++){
			for(let j=0;j<bolas.length;j++){
					hitted(disparos[i],bolas[j]);					
			}
		}
    }
	
	function hitted(a,b){
			if (typeof a !== 'undefined'){
				if (Math.sqrt(((a.x-b.x)**2)+((a.y-b.y)**2)) <= a.r + b.r) {
				let indice = disparos.indexOf(a);
				a.circ.setAttribute("x",-100);
				disparos.splice(indice, 1);
				console.log("HITTED");
				//b.color = "white";
				//b.circ.setAttributeNS(null,"fill",b.color);	
				dividir(b);
				}
			}
		
	}

	function dividir(bola){
		let x = bola.x;
		//console.log(bola.r);
		if(bola.r > 25){
			var bola1 = new Bola(bola.r/2,"red",x - 30, bola.y, 0);
			var bola2 = new Bola(bola.r/2,"red",x + 30, bola.y, 0);
			bolas.push(bola1, bola2);
			//console.log(bola2.velX);
			//bola1.velX *=-1;
			//bola2.velX *=-1;
		}
		
		bola.circ.setAttribute("cx",-100);
		let indice = bolas.indexOf(bola);
		bolas.splice(indice, 1);
		
	}

    function colision(bolas){
		for(let i=0;i<bolas.length;i++){
			for(let j=0;j<bolas.length;j++){
				if(i!=j){
					chocarBolas(bolas[i],bolas[j]);
				}
			}
		}
    }

    function chocarBolas(a,b){
		  if (Math.sqrt(((a.x-b.x)**2)+((a.y-b.y)**2)) <= a.r + b.r) {

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
	
	
	class Jugador {
		constructor( color, x, y,velX, velY){
		//this.r = 90;
		this.color = color;
		this.x = document.getElementById("svg").getBoundingClientRect().height;
		this.y = document.getElementById("svg").getBoundingClientRect().height -150;
		this.velX = 20;
		this.width = 150;
		this.height = 150;
		this.velY = velY;
		
		//Crear su representacion
		
		//this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.rect = document.createElementNS('http://www.w3.org/2000/svg','image');
		this.rect.setAttributeNS(null,"x",this.x);
		this.rect.setAttributeNS(null,"y",this.y);
		this.rect.setAttributeNS(null,"rx",10);
		this.rect.setAttributeNS(null,"ry",10);
		this.rect.setAttributeNS(null, "width",  this.width);
        this.rect.setAttributeNS(null, "height", this.height);
		//this.rect.setAttributeNS(null,"fill",this.color);
		this.rect.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/normal.png');
		
		//this.velX = Math.round(Math.random()*(10-1)+1);
		//this.velY = Math.round(Math.random()*(10-1)+1);
		document.getElementsByTagName("svg")[0].appendChild(this.rect);
		}
	
		
		
		mover(tecla) {
			//this.rect.setAttributeNS('http://www.w3.org/1999/xlink','href', 'normal.png');
			if ((tecla.keyCode === 97 && this.x - this.velX >= 0) || (tecla.keyCode === 65 && this.x - this.velX >= 0)) {
				this.x = this.x - this.velX;
				this.rect.setAttribute("x", this.x);
				this.rect.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/santaizq.gif');
			}
			if ((tecla.keyCode === 100 && this.x + this.velX <= document.getElementById("svg").getBoundingClientRect().width - 50)) {
				this.x = this.x + this.velX;
				this.rect.setAttribute("x", this.x);
				this.rect.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/santader.gif');
			}
			if (tecla.keyCode === 32) {
				this.rect.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/shoot.png');
				var bolita = new Bola(10,"red",this.x +25, this.y, 1)
				document.getElementById("audio2").play();
				console.log(bolita.x);
				disparos.push(bolita);
				setTimeout(() => { this.rect.setAttributeNS('http://www.w3.org/1999/xlink','href', 'img/normal.png'); }, 200);
			}

		}
		
		comprobarGolpe(){
			for (let i = 0; i < bolas.length; i++) {
				//console.log("this.x: " + this.r);
				
				if (Math.sqrt(((bolas[i].x - this.x) ** 2) + ((bolas[i].y - this.y) ** 2)) <= this.r + bolas[i].r) {
					console.log("PERDER");
				}
			}
		}
	}	
