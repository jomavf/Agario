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
        
        // this.rectangulos = [];
    }
    init(){
        push();
        // translate(-width*3,-height*3);
        translate(width/2,height/2);
        //Aqui se anade un nodo mas por la razon de 155 < 155.4 rows (ckekear en console yo del futuro)
        for (let i = 0; i < this.cols;i++) {
            for (let j = 0; j < this.rows;j++) {
                let x = (i * this.w);// -width*3;
                let y = (j * this.h);// -height*3;
                
                // let nodo = new Rectangle(x,y,this.w,this.h);
                
                // console.log(`i=${i} j=${j}`)
                this.grid[i][j] = new Node(x,y,this.w,this.h); 
                // this.rectangulos.push(nodo);
            }
        }
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                // console.log(`i=${i} j=${j}`)
                
                this.grid[i][j].addNeighbors(this.grid);
            }
            // this.rectangulos[i].show();
        }
        pop();
    }
    
    show(){
        push();
        translate(-width*3,-height*3);
        // stroke(121,128,129);
        // noFill();
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                this.grid[i][j].show();
            }
            // this.rectangulos[i].show();
        }
        
        // for (let i = 0; i < this.rectangulos.length; i++) {
            //     this.rectangulos[i].addNeighbors();
            // }
            pop();
        }
    checkPlayer(){
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                
                if(game.player[0].pos.x >= this.grid[i][j].x -width*3 &&
                    game.player[0].pos.x <= this.grid[i][j].x + this.grid[i][j].pw -width*3 &&
                    game.player[0].pos.y >= this.grid[i][j].y -height*3 &&
                    game.player[0].pos.y <= this.grid[i][j].y + this.grid[i][j].ph -height*3 ){
                        // console.log(`gridX = ${this.grid[i][j].x} gridY = ${this.grid[i][j].y} `)
                        this.grid[i][j].containPlayer=true;
                    }
                    else{
                        this.grid[i][j].containPlayer=false;
                        // this.target = this.grid[this.cols-1][this.rows-1];
                        // this.target = this.grid[i][j]
                    }
                }
            }   
    }
    checkEnemy(){
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
                
                if(game.enemy[0].pos.x >= this.grid[i][j].x -width*3 &&
                    game.enemy[0].pos.x <= this.grid[i][j].x + this.grid[i][j].pw -width*3 &&
                    game.enemy[0].pos.y >= this.grid[i][j].y -height*3 &&
                    game.enemy[0].pos.y <= this.grid[i][j].y + this.grid[i][j].ph -height*3 ){
                        // console.log(`gridX = ${this.grid[i][j].x} gridY = ${this.grid[i][j].y} `)
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
                if(this.grid[i][j].containPlayer==true){
                    this.target = this.grid[i][j]
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



// class Rectangle{
//     constructor(x,y,w,h){
//         this.x = x;
//         this.y = y;
//         this.w = w;
//         this.h = h;
//     }
//     show(){
//         rect(this.x,this.y,this.w,this.h);
//     }
// }