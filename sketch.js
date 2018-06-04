var game;
var confi;
var player;
var grid;
function setup() {
	createCanvas(windowWidth,windowHeight);
	game = new Game();	
	player = game.createPlayer(0,0,35);


	confi = new Configuration(player);

	grid = new Grid(50,50);
	
	//game.createFood(1000);	
	game.createEnemy(200);	

	game.createWall(80);
	
	
	
}

function draw() {
	
	if(game.gameOver){
		console.log('Perdiste');
		noLoop();
	}

	confi.setBackground();
	confi.setScreen(width/2,height/2);
	confi.scl(64);
	confi.setScreen(-player.pos.x,-player.pos.y);

	//game.updateFood(500);
	game.checkPlayer();
	game.showFood();
	game.checkEnemy();
	game.checkWall();

	
	game.showEnemy();
	game.showPlayer(game.player[0]);
	game.showWall();

	
}

function keyPressed(){
	if(keyCode === ENTER){
		player.r*=2;
	}	
}

function mousePressed(){
	player.split();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

