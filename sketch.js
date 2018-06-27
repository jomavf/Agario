var game;
var confi;
var player;
var grid;
var algoritmo;
var inicio;
var final;
//Hay que cambiar la pantalla a un valor mas standar sino dara problemas
var my_windowWidth = 1250;
var my_windowHeight = 750;


function setup() {
	angleMode(DEGREES);
	createCanvas(my_windowWidth,my_windowHeight);
	game = new Game();	
	confi = new Configuration();
	grid = new Grid(50,50);	
	
	//Vida infinita
	game.setInfinityMode(true);
	//Se crea entidades
	game.createPlayer(1);
	game.createFood(500);	
	game.createEnemy(100);
	
	game.createWall(300);
	grid.init();

	inicio =  grid.grid[0][0];
	// final = grid.grid[grid.cols-1][grid.rows-1]
	grid.check();
	grid.assignTarget();
	final = grid.target;
	algoritmo = new Astar(inicio,final);
	console.log(`Target = ${grid.target.x} == ${grid.target.y}`)
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
	grid.check();

	// final = grid.check();
	// final = grid.grid[grid.cols-1][grid.rows-1]
	// grid.assignTarget();
	// algoritmo = new Astar(grid.inicio,grid.target);
	grid.show();
	
	
	
	
	//Muestra las entidades
	game.updateFood(1000);
	game.updateEnemy(50);
	game.showFood();
	game.showEnemy();
	game.showPlayer();
	game.showWall();
	
	// console.log(game.player[0].pos.x,game.player[0].pos.y)


	//Verifica colisiones
	//game.checkWall();
	game.checkPlayer();
	game.checkEnemy();
	game.infinyLife();

	//checkear las posiciones del jugador por ahora

	algoritmo.run();
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
// function windowResized() {
// 	resizeCanvas(width, height);
// }

