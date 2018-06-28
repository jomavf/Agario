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

var manager;

function setup() {
	angleMode(DEGREES);
	createCanvas(my_windowWidth, my_windowHeight);
	frameRate(30);
	manager = new SceneManager();
	manager.addScene(landingPage);
	manager.addScene(mainGame);
	manager.showNextScene();
}

function draw() {
	manager.draw();
}

function mousePressed() {
	manager.handleEvent("mousePressed");
}

function keyPressed() {
	manager.handleEvent("keyPressed");
}

function landingPage() {

}

landingPage.prototype.setup = function () {

	this.circlesBounce = [];
	for (let index = 0; index < random(5, 20); index++) {
		let _r = random(20, 100);
		let _x = random(_r + 1, width - _r - 1);
		let _y = random(_r + 1, height - _r - 1);
		this.circlesBounce.push(new Bounce(_x, _y, _r, 'a'));
	}
}
landingPage.prototype.draw = function () {
	background(255);
	this.circlesBounce.forEach(e => {
		e.show();
		e.update();
	});

	textAlign(CENTER);
	stroke(0);
	fill(255)
	textSize(40);
	text("Upcr.io", width / 2, height / 2 - 40);

	textAlign(CENTER);
	stroke(0);
	fill(255)
	textSize(15);
	fill("black");
	text("Presiona la pantalla para empezar el juego.", width / 2, height / 2);
}

landingPage.prototype.mousePressed = function () {
	manager.showNextScene();
}

function mainGame() {

}
//---------------------------------------------------------//
mainGame.prototype.setup = function () {
	game = new Game();
	confi = new Configuration();
	grid = new Grid(100,100);


	//Vida infinitas
	game.setInfinityMode(true);
	//Se crea entidades
	game.createWall(300);
	game.createPlayer(1);
	game.createFood(500);
	game.createEnemy(100);

	
	
	grid.init();
	
	grid.checkPlayer();
	grid.checkEnemy();
	grid.assignStart();
	grid.assignTarget();
	
	
	inicio = grid.start;
	final = grid.target;
	
	
	algoritmo = new Astar(inicio, final);
	// console.log(`Target = ${inicio.x} && ${final.x}`)
}

let qtreeM;
//---------------------------------------------------------//
mainGame.prototype.draw = function () {
	
	
	push();
	translate(0,0);
	let boundary = new RectangleQT(-width*3,-height*3,width*3,height*3);
	pop();
	
	qtreeM = new QuadTree(boundary,10);

	game.updateWall();

	//Si pierdes deja de loopear
	if (game.gameOver) {
		console.log('Perdiste');
		noLoop();
	}
	//Configuracion

	background(255);
	confi.setScore();

	confi.setScreen(width / 2, height / 2);

	confi.scl(64);
	confi.setScreen(-game.player[0].pos.x, -game.player[0].pos.y);



	grid.checkPlayer();
	grid.checkEnemy();
	grid.assignTarget();
	grid.assignStart();

	algoritmo.end = grid.target;
	algoritmo.start = grid.start;

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

	// game.checkWall();

	game.checkPlayer();
	game.checkEnemy();
	game.infinyLife();

	//checkear las posiciones del jugador por ahora

	algoritmo.run();
}


//---------------------------------------------------------//
mainGame.prototype.keyPressed = function () {
	if (keyCode === ENTER) {
		game.player[0].r *= 2;
	}
}
//---------------------------------------------------------//
mainGame.prototype.mousePressed = function () {
	game.player[0].r /= 2;
}

//Responsive Screen
// function windowResized() {
// 	resizeCanvas(width, height);
// }