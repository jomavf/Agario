class Node {
    constructor(x,y,cols,rows,width,height){
        this.x = x;
        this.y = y;
        this.cols = cols;
        this.rows = rows;
        this.width =  width;
        this.height =  height;
        
        this.f=0;
        this.g=0;
        this.h=0;
        this.neighbors = [];
        this.previous = undefined;
        this.wall = false;
        this.red = 255;
        this.green = 255;
        this.blue = 255;
        this.wall = false;

        if (random(1)<0.1){
            this.wall = true;
        }

    }
    show(){
        
        var w = this.width / this.cols;
        var h = this.height / this.rows;
        fill(this.red,this.green,this.blue);
        if(this.wall){
            fill(0);
        }
        noStroke()
        rect(this.x*w,this.y*h,w-1,h-1);
        
    }
    addNeighbors(grid){
		var i=this.x;
		var j =this.y;
        var cols = this.cols;
        var rows = this.rows;
        
		if( i < cols -1){
            //console.log(`Primer if => i = ${i}, j = ${j} col=${cols} row=${rows}`);            
            this.neighbors.push(grid[i+1][j]);//derecha
		}
		if(i>0){
            //console.log(`Segundo if => i = ${i}, j = ${j} col=${cols} row=${rows}`);            
            this.neighbors.push(grid[i-1][j]);//Izqui
		}
		if(j<rows -1 ){
            //console.log(`Tercer if => i = ${i}, j = ${j} col=${cols} row=${rows}`);            
            this.neighbors.push(grid[i][j+1]);//Abajo
		}
		if (j>0){
            //console.log(`Cuarto if => i = ${i}, j = ${j} col=${cols} row=${rows}`);            
            this.neighbors.push(grid[i][j-1]);//Arriba
		}
	}
}
        



