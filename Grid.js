class Grid {
    constructor(w=50 ,h =50){
        this.w = w;
        this.h = h;
        this.width = width*6;
        this.height = height*6;
        this.x = -width*3;
        this.y = -height*3;
        this.cols = this.width/this.w;
        this.rows = this.height/this.h;
        
        this.grid = new Array(this.cols);
        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Array(this.rows);
        }
        
        this.target = this.grid[this.cols-1][this.rows-1];
        this.start = this.grid[0][0];
        
    }
    init(){
        push();
        translate(width/2,height/2);
        
        for (let i = 0; i < this.cols;i++){
            for (let j = 0; j < this.rows;j++){

                let x = (i * this.w);
                let y = (j * this.h);
                                
                this.grid[i][j] = new Node(x,y,this.w,this.h); 
            }
        }

        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                
                this.grid[i][j].addNeighbors(this.grid);

            }
        }

        pop();
    }
    
    show(){

        push();
        translate(-width*3,-height*3);

        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {

                this.grid[i][j].show();

            }
        }        
        pop();
    }

    checkPlayer(){
    
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                
                    //Si el player esta dentro del nodo[i][j]
                    if(game.player[0].pos.x >= this.grid[i][j].x -width*3 &&
                    game.player[0].pos.x <= this.grid[i][j].x + this.grid[i][j].pw -width*3 &&
                    game.player[0].pos.y >= this.grid[i][j].y -height*3 &&
                    game.player[0].pos.y <= this.grid[i][j].y + this.grid[i][j].ph -height*3 ){

                        this.grid[i][j].containPlayer=true;

                    }
                    else{
                        this.grid[i][j].containPlayer=false;
                    }
            }
        }

    }
    checkEnemy(){

        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                
                    if(game.enemy[0].pos.x >= this.grid[i][j].x -width*3 &&
                    game.enemy[0].pos.x <= this.grid[i][j].x + this.grid[i  ][j].pw -width*3 &&
                    game.enemy[0].pos.y >= this.grid[i][j].y -height*3 &&
                    game.enemy[0].pos.y <= this.grid[i][j].y + this.grid[i][j].ph -height*3 ){

                        this.grid[i][j].containEnemy=true;

                    }
                    else{

                        this.grid[i][j].containEnemy=false;

                    }
            }
        }   
    }

    assignTarget(){
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                
                if(this.grid[i][j].containPlayer === true){

                    this.target = this.grid[i][j];
                }
            }
        }
    }
    assignStart(){
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {

                if(this.grid[i][j].containEnemy==true){

                    this.start = this.grid[i][j]
                }
            }
        }
    }
}