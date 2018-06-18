var game;
var confi;
var player;
var grid;
function setup() {
	createCanvas(windowWidth,windowHeight);

	game = new Game();	
	confi = new Configuration();
	grid = new Grid(50,50);	

	//Se crea entidades
	game.createPlayer(1);
	//game.createFood(1000);	
	game.createEnemy(200);	
	game.createWall(80);	
}

function draw() {
	
	//Si pierdes deja de loopear
	if(game.gameOver){
		console.log('Perdiste');
		noLoop();
	}

	//Configuracion
	confi.setBackground();
	confi.setScreen(width/2,height/2);
	confi.scl(64);
	confi.setScreen(-game.player[0].pos.x,-game.player[0].pos.y);

	//Muestra las entidades
	//game.updateFood(500);
	game.updateEnemy(30);
	// game.showFood();
	game.showEnemy();
	game.showPlayer();
	game.showWall();
	
	//Verifica colisiones
	game.checkWall();
	game.checkPlayer();
	game.checkEnemy();
	

	
}

function keyPressed(){
	if(keyCode === ENTER){
		game.player[0].r*=2;
	}	
}

function mousePressed(){
	//player.split();
}

//Responsive Screen
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

