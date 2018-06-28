class Game{
    constructor(){
        this.food = [];
        this.enemy = [];
        this.wall = [];
        this.player = [];
        this.gameOver = false;
        this.infinyMode = false;
        this.createdEnemies = 0;
    }
    setInfinityMode(value){
        if (value === true || value === false){
            this.infinyMode = value;
        }
        else{
            console.log('Ingresa un valor de value valido');
            this.infinyMode=false;
            this.gameOver = true;
        }
    }
    infinyLife(player){
            if(this.player.length === 0){
                console.log('Perdiste');
                let x = random(-width*3,width*3);
                let y = random(-height*3,height*3);
                let newPlayer = new Player(x,y,15);
                this.player.push(newPlayer);
            }
        }
    createPlayer(n){
        for(let i = 0 ; i < n ; i++){
            this.player[i] = new Player(-10,-10,15);
        }
    }
    showPlayer(){
        for(let i = 0 ; i < this.player.length ; i++){
            this.player[i].update();
            
            let point = new Point(this.player[i].pos.x,this.player[i].pos.y,this.player[i]);
            qtreeM.insert(point);

            this.player[i].show(); 
        } 
    } 
    createFood(n){
        for (let i = 0; i < n; i++) {
            let x = random(-width*3,width*3);
            let y = random(-height*3,height*3);
            this.food[i] = new Food(x,y,5);


        }
    }
    updateFood(n){
        if (random(1) < 0.7){
            // for (let i = 0; i < n; i++) {
                //Crear un if para que las comidas no choquen a la hora de crearse
                let x = random(-width*3,width*3);
                let y = random(-height*3,height*3);
                let newFood = new Food(x,y,5);

                this.food.push(newFood);

                let point = new Point(x,y,newFood);
                qtreeM.insert(point);
            // }
        }
    }
    showFood(){
        for (let i = this.food.length - 1; i >= 0; i--) {
            this.food[i].show();
        }
    }
    
    createEnemy(n){
        this.createdEnemies += n;
        for (let i = 0; i < n; i++) {
            let x = random(-width*3,width*3);
            let y = random(-height*3,height*3);
            this.enemy[i] = new Enemy(x,y,random(15,40),'Bot '+ i);
        }
    }
    updateEnemy(n){
        if (this.enemy.length <= 30){
            this.createdEnemies += n;
            for (let i = 0; i < n; i++) {
                let name = this.createdEnemies + i
                let x = random(-width*3,height*3);
                let y = random(-width*3,height*3);
                let newEnemy = new Enemy(x,y,random(15,40),'Bot '+name);
                this.enemy.push(newEnemy);

                
                let point = new Point(this.enemy[i].pos.x,this.enemy[i].pos.y,this.enemy[i]);
                qtreeM.insert(point);

            }
        }
    }
    showEnemy(){
        for (let i = this.enemy.length-1; i >= 0; i--) {
            if(i === 0){
                this.enemy[i].elegido = true;
                this.enemy[i].update(algoritmo.vector);

                let point = new Point(this.enemy[i].pos.x,this.enemy[i].pos.y,this.enemy[i]);
                qtreeM.insert(point);
            }
            this.enemy[i].update();
            this.enemy[i].show();

            let point = new Point(this.enemy[i].pos.x,this.enemy[i].pos.y,this.enemy[i]);
                qtreeM.insert(point);
        }
    }
    createWall(n){
        for (let i = 0; i < n; i++) {
            push();
            let x = random(-width*3,width*3);
            let y = random(-height*3,height*3);
            this.wall[i] = new Wall(x,y,random(20,30));
            // let wx = this.wall[i].pos.x;
            // let wy = this.wall[i].pos.y;
            // console.log(`x=${wx} y=${wy}`)
            pop();
        }
    }
    updateWall(){
        for (let i = 0; i < this.wall.length; i++) {

            let point = new Point(this.wall[i].pos.x,this.wall[i].pos.y,this.wall[i]);
            qtreeM.insert(point);

        }
    }
    showWall(){
        for (let i = 0; i < this.wall.length; i++) {
            this.wall[i].show();
        }
    }
    checkPlayer(){ 
            for (let i = this.player.length - 1; i >= 0; i--) {
                
                // let range = new Circle()
                // let foodrange = qtreeM.query(range,found);
                for (let j = this.food.length-1; j >= 0; j--){
                    if (this.player[i].eat(this.food[j])){
                        this.food.splice(j,1);
                    }
                }
                for (let j = this.enemy.length-1; j >= 0; j--){
                    if(this.player[i].eat(this.enemy[j])){
                        this.enemy.splice(j,1);
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

            for (let j = this.player.length; j >= 0; j--) {
                if(this.enemy[i].eat(this.player[j])){
                    this.player.splice(j,1);
                    if (this.player.length === 0 && this.infinyMode ===false){
                        this.gameOver = true;
                        return;
                    }
                }
            }

            for (let j = this.enemy.length-1; j >= 0; j--) {
                if(this.enemy[i]===undefined){return;}
                if (this.enemy[i].eat(this.enemy[j]) && i!=j){
                    this.enemy.splice(j,1);
                }
            }
        }

    }
    
    checkWall(){
        for (let i = this.wall.length - 1; i >= 0; i--) {

            for (let j = this.player.length - 1; j >= 0 ; j--) {
                if(this.wall[i].eat(this.player[j])){
                    this.player.splice(j,1);
                    if(this.player.length === 0 && this.infinyMode === false){
                        console.log('No hay more players , Perdiste');
                        this.gameOver = true;
                    }    
                }
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
                grid[i][j] = new Node(i,j,grid.w,grid.h,grid.width,grid.height);
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