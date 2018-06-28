class Node {
    constructor(x,y,pw,ph){
        this.x = x;
        this.y = y;

        //Ancho y largo de cada nodo
        this.pw = pw;
        this.ph = ph;

        this.width =  width*6;
        this.height =  height*6;

        this.cols = this.width/this.pw;
        this.rows = this.height/this.ph;
        
        this.f=0;
        this.g=0;
        this.h=0;
        this.neighbors = [];
        this.previous = undefined;
        this.wall = false;

        this.red = 255;
        this.green = 255;
        this.blue = 255;
        
        this.isThisWallinMe();
        
        this.containPlayer = false;
        this.containEnemy = false;
        
        //Atributo para saber si esta en algun arreglo
        this.in = false;

        this.diagonal = false;
    }

    
    isThisWallinMe(){
        for (let i = 0; i < game.wall.length; i++) {
            if(game.wall[i].pos.x >= this.x -width*3 &&
                game.wall[i].pos.x <= this.x + this.pw -width*3&&
                game.wall[i].pos.y >= this.y -height*3 &&
                game.wall[i].pos.y <= this.y + this.ph -height*3 ){
                // console.log(`Matchea x=${this.x} y=${this.y}`)
                // console.log(`Matchea x=${game.wall[i].pos.x} y=${game.wall[i].pos.y}`)
                this.wall = true;
            }
        }
    }
    showText(){

        stroke(0);
        fill(255);

        textAlign(CENTER); 
        textSize(5);
        text(this.x,this.x,this.y);
        text(this.y,this.x,this.y + 10) ;
    }
    show(){
        // var w = this.width / this.cols;
        // var h = this.height / this.rows;
        if(this.red === 255 && this.green === 255 && this.blue === 255){
            noFill();
        }
        //Este else si sirve yo del futuro
        else {
            fill(this.red,this.green,this.blue);
        }
        //fill(this.red,this.green,this.blue);
        if(this.wall){
            fill(0);
        }
        if(this.containPlayer){
            fill(0,100,0,50);
        }
        if(this.containEnemy){
            fill(100,100,0,50);
        }
        if(!this.in && !this.containPlayer && !this.containEnemy && !this.wall){
            noFill();
        }
        // if (this.containPlayer.length>0){
        //     fill(0,0,255);
        // }
        strokeWeight(0.5);
        stroke(121,128,129);
        rect(this.x,this.y,this.pw,this.ph);
        //this.showText();
        
    }
    addNeighbors(grid){
		// let i=(this.x + width*3) / this.pw;
		let i=(this.x ) / this.pw; // 0 50 100 150
		let j =(this.y )/this.ph; // 0 50 100 150 200
		// let j =(this.y + height*3) / this.ph;
        let cols = this.cols;// / 2; //150
        let rows = this.rows;// / 2;  //90
        
		if( i < cols -1){
            // console.log(`Primer if => i = ${i}, j = ${j} col=${cols} row=${rows}`);            
            this.neighbors.push(grid[i+1][j]);//derecha
		}
		// if(i>0){
		if(i>0){
		// if(i>this.x / this.pw){
            // console.log(`Segundo if => i = ${i}, j = ${j} col=${cols} row=${rows}`);            
            this.neighbors.push(grid[i-1][j]);//Izqui
		}
		if(j<rows -1 ){
            //console.log(`Tercer if => i = ${i}, j = ${j} col=${cols} row=${rows}`);            
            // this.neighbors.push(grid[i + cols][j+1 + rows]);
            this.neighbors.push(grid[i][j+1]);//Abajo
		}
		if (j>0){
		// if (j>this.y / this.ph){
            //console.log(`Cuarto if => i = ${i}, j = ${j} col=${cols} row=${rows}`);            
            // this.neighbors.push(grid[i + cols][j-1 + rows]);
            this.neighbors.push(grid[i][j-1]);//Arriba
        }
        if (j>0 && i>0){
            // if (j>this.y / this.ph){
                // console.log(`Cuarto if => i = ${i}, j = ${j} col=${cols} row=${rows}`); 
                grid[i-1][j-1].diagonal = true;           
                this.neighbors.push(grid[i-1][j-1]);//Arriba izq
        }
        if (j>0 && i<cols-1){
            // if (j>this.y / this.ph){
                //console.log(`Cuarto if => i = ${i}, j = ${j} col=${cols} row=${rows}`);            
                // this.neighbors.push(grid[i + cols][j-1 + rows]);
                grid[i+1][j-1].diagonal = true;
                this.neighbors.push(grid[i+1][j-1]);//Arriba dere
        }
        if (i  >0 && j<rows-1){
            // if (j>this.y / this.ph){
                //console.log(`Cuarto if => i = ${i}, j = ${j} col=${cols} row=${rows}`);            
                // this.neighbors.push(grid[i + cols][j-1 + rows]);
                grid[i-1][j+1].diagonal = true;
                this.neighbors.push(grid[i-1][j+1]);//Abajo izq
        }
        if (j<rows-1 && i<cols-1){
            // if (j>this.y / this.ph){
                //console.log(`Cuarto if => i = ${i}, j = ${j} col=${cols} row=${rows}`);            
                // this.neighbors.push(grid[i + cols][j-1 + rows]);
                grid[i+1][j+1].diagonal = true;
                this.neighbors.push(grid[i+1][j+1]);//Abajo Der
        }
	}
}
        



