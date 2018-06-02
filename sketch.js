var game;
var confi;
var player;
var grid;
function setup() {
	createCanvas(windowWidth,windowHeight);
	game = new Game();	
	game.createPlayer(0,0,15);


	confi = new Configuration(game.player[0]);

	grid = new Grid(50,50);
	
	game.createFood(1000);	
	game.createEnemy(100);	

	game.createWall(80);
	
	
	
}

function draw() {
	
	if(game.gameOver){
		console.log('Perdiste por rata');
		noLoop();
		return;
	}

	confi.setBackground(100,0,0,100);
	confi.setScreen(width/2,height/2);
	confi.scl(64);
	confi.setScreen(-game.player[0].pos.x,-game.player[0].pos.y);

	//game.updateFood(500);
	game.checkPlayer();
	game.showFood();
	game.checkEnemy();
	game.checkWall();

	
	game.showEnemy();
	game.showPlayer(game.player[0]);
	game.showWall();

	
}



function windowResized() {
	resizeCanvas(windowWidth, windowHeight);


}
function keyPressed(){
	if(keyCode === ENTER){ 
		for (let i = 0; i < game.player.length; i++) {
			let x = game.player[i].pos.x;
			let y = game.player[i].pos.y;
			let r = game.player[i].r;
			game.player[i].split(x,y,r);	
		}
			
	}
	
}