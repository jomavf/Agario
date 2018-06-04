class Game{
    constructor(){
        this.food = [];
        this.enemy = [];
        this.wall = [];
        this.player = undefined;
        this.gameOver = false;
    }
    createPlayer(x,y,r){
        this.player = new Player(x,y,r);
        return this.player;
    }
    showPlayer(){
            this.player.update(5);
            this.player.show(); 
    }  
    createFood(n){
        for (let i = 0; i < n; i++) {
            let x = random(-windowWidth*3,windowHeight*3);
            let y = random(-windowWidth*3,windowHeight*3);
            this.food[i] = new Food(x,y,10);
        }
    }
    updateFood(n){
        if (this.food.length <= 500){
            for (let i = 0; i < n; i++) {
                let x = random(-windowWidth*3,windowHeight*3);
                let y = random(-windowWidth*3,windowHeight*3);
                let newFood = new Food(x,y,10);
                this.food.push(newFood);
            }
        }
    }
    showFood(){
        for (let i = this.food.length - 1; i >= 0; i--) {
            this.food[i].show();
        }
    }
    
    createEnemy(n){
        for (let i = 0; i < n; i++) {
            let x = random(-windowWidth*3,windowHeight*3);
            let y = random(-windowWidth*3,windowHeight*3);
            this.enemy[i] = new Enemy(x,y,random(13,40));
        }
    }
    showEnemy(){
        for (let i = this.enemy.length-1; i >= 0; i--) {
            this.enemy[i].update();
            this.enemy[i].show();
        }
    }
    createWall(n){
        for (let i = 0; i < n; i++) {
            let x = random(-windowWidth*3,windowHeight*3);
            let y = random(-windowWidth*3,windowHeight*3);
            this.wall[i] = new Wall(x,y,random(20,30));
        }
    }
    showWall(){
        for (let i = 0; i < this.wall.length; i++) {
            this.wall[i].show()
        }
    }
    checkPlayer(){ 
            for (let j = this.food.length-1; j >= 0; j--) {
                if (this.player.eat(this.food[j])){
                    this.food.splice(j,1);
                }
            }
            for (let j = this.enemy.length-1; j >= 0; j--) {
                if(this.player.eat(this.enemy[j])){
                    this.enemy.splice(j,1);
                }
            } 
            for (let j = this.player.sons-1; j >= 0; j--) {
                if(this.player.eat(this.player.sons[j])){
                    this.player.splice(j,1);
                }
            }        
    }        
    checkEnemy(){
        for (let i = this.enemy.length - 1; i >= 0; i--) {
        
            for (let j = this.food.length-1; j >= 0; j--) {
                if (this.enemy[i].eat(this.food[j])){
                    this.food.splice(j,1);
                }
            }

            for (let j = this.player.sons-1; j >= 0; j--) {
                if(this.enemy[i].eat(this.player.sons[j])){
                    this.player.sons.splice(j,1);
                }
            }

            for (let j = this.enemy.length-1; j >= 0; j--) {
                if(this.enemy[i]===undefined){return;}
                if (this.enemy[i].eat(this.enemy[j]) && i!=j){
                    this.enemy.splice(j,1);
                }
            }

            if(this.enemy[i].eat(this.player) && this.player.sons.length !== 0){
                //this.player = this.player.sons[0];
            }

            if(this.enemy[i].eat(this.player) && this.player.sons.length ===0){
                this.gameOver = true;
            }

        }

    }
    
    checkWall(){
        for (let i = this.wall.length - 1; i >= 0; i--) {

            if(this.wall[i].eat(this.player)&&this.player.sons.length === 0){
                console.log('Wall comio Player principal')
                this.gameOver = true;
            }
            else if(this.wall[i].eat(this.player)&&this.player.sons.length !== 0){
                console.log('Adios main player')
                this.player = this.player.sons[0];    
            }
                    
            for (let j = this.enemy.length-1; j >= 0; j--) {               
                if (this.wall[i].eat(this.enemy[j])){
                    this.enemy.splice(j,1);
                }
            }
        }
    }
    //----------------------Algoritmo--------------------------
    InicializarNodos(){
		for(var i = 0 ; i < cols ; i++){
			for(var j = 0; j < rows ; j++){
				this.grid[i][j] = new Node(i,j,cols,rows,width,height);
			}
		}
	}
    AsignarNeighbors(){
        for(var i = 0 ; i < cols ; i++){
            for(var j = 0; j < rows ; j++){
                this.grid[i][j].addNeighbors(this.grid);
            }
        }
    }
	MostrarNodos(){
		for(var i = 0 ; i < cols ; i++){
			for(var j = 0; j < rows ; j++){
				this.grid[i][j].show()
			}
		}
    }
    //----------------------END Algoritmo--------------------------


}