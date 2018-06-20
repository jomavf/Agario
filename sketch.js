var game;
var confi;
var player;
var grid;

function setup() {
	angleMode(DEGREES);
	createCanvas(windowWidth,windowHeight);
	game = new Game();	
	confi = new Configuration();
	grid = new Grid(50,50);	

	//Vida infinita
	game.setInfinityMode(true);
	//Se crea entidades
	game.createPlayer(1);
	game.createFood(2000);	
	game.createEnemy(200);	
	//game.createWall(100);
	grid.init();
}

function draw() {
	
	//Si pierdes deja de loopear
	if(game.gameOver){
		console.log('Perdiste');
		noLoop();
	}
	//Configuracion
	background(255);
	confi.setScore();	
	
	confi.setScreen(width/2,height/2);
	confi.scl(64);
	confi.setScreen(-game.player[0].pos.x,-game.player[0].pos.y);
	grid.show();
	
	//Muestra las entidades
	game.updateFood(1000);
	game.updateEnemy(50);
	game.showFood();
	game.showEnemy();
	game.showPlayer();
	game.showWall();
	
	//Verifica colisiones
	game.checkWall();
	game.checkPlayer();
	game.checkEnemy();
	game.infinyLife();
	
}

function keyPressed(){
	if(keyCode === ENTER){
		game.player[0].r*=2;
	}	
}

function mousePressed(){
	game.player[0].r /=2;
}

//Responsive Screen
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

