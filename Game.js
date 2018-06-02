class Game{
    constructor(){
        this.food = [];
        this.enemy = [];
        this.wall = [];
        this.player = [];
        this.gameOver = false;
    }
    createPlayer(x,y,r){
        let newPlayer =  new Player(x,y,r);
        this.player.push(newPlayer);
    }
    showPlayer(){
        for (let i = 0; i < this.player.length; i++) {
            this.player[i].update(5);
            this.player[i].show(); 
        }
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
            if(this.player.length === 0){
                this.gameOver=true;
                return;
            }
            let x =this.player[0].pos.x ;
            let y =this.player[0].pos.y ;

            this.enemy[i].update(3,x,y);
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
        for (let i = this.player.length - 1; i >= 0; i--) {
                
            for (let j = this.food.length-1; j >= 0; j--) {
                if (this.player[i].eat(this.food[j])){
                    this.food.splice(j,1);
                }
            }
            for (let j = this.enemy.length-1; j >= 0; j--) {
                if(this.player[i].eat(this.enemy[j])){
                    this.enemy.splice(j,1);
                }
            } 
            for (let j = this.player.length-1; j >= 0; j--) {
                if(this.player[i].eat(this.player[j]) && i!=j){
                    this.player.splice(j,1);
                }
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
            //Aqui salta un error de vez en cuando
            for (let j = this.player.length-1; j >= 0; j--) {
                if(this.enemy[i].eat(this.player[j])){
                    this.player.splice(j,1);
                    console.log('Perdiste Rata por enemy');
                }
            }        
            for (let j = this.enemy.length-1; j >= 0; j--) {
                if(this.enemy[i]===undefined){return;}
                if (this.enemy[i].eat(this.enemy[j]) && i!=j){
                    this.enemy.splice(j,1);
                }
                //Esto se puso para que no saltara un error que pasaba de vez en cuando no se porque GH
            }
        }

    }
    checkWall(){
        for (let i = this.wall.length - 1; i >= 0; i--) {
        
            for (let j = this.food.length-1; j >= 0; j--) {
                if (this.wall[i].eat(this.food[j])){
                    this.food.splice(j,1);
                }
            } 
            //Aqui salta un error de vez en cuando
            for (let j = this.player.length-1; j >= 0; j--) {
                if(this.wall[i].eat(this.player[j])){
                    this.player.splice(j,1);
                    console.log('Te comiste a ti mismo');
                }
            }        
            for (let j = this.enemy.length-1; j >= 0; j--) {               
                if (this.wall[i].eat(this.enemy[j]) && i!=j){
                    this.enemy.splice(j,1);
                }
                //Esto se puso para que no saltara un error que pasaba de vez en cuando no se porque GH
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