class Rectangle{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    show(){
        rect(this.x,this.y,this.w,this.h);
    }
}

class Grid {
    constructor(cols = 5,rows = 5){
        this.width = windowWidth*6;
        this.height = windowHeight*6;
        this.x = -windowWidth*3;
        this.y = -windowHeight*3;
        this.cols = cols;
        this.rows = rows;
        this.w = this.width / this.cols;
        this.h = this.height / this.rows;
        this.rectangulos = []
    }
    init(){
        push();
        translate(-windowWidth*3,-windowHeight*3);
        for (let i = 0; i < this.w;i++) {
            for (let j = 0; j < this.h;j++) {
                let x = i * this.cols;
                let y = j * this.rows;

                let nodo = new Rectangle(x,y,this.cols,this.rows);  
                this.rectangulos.push(nodo);
            }
        }
        pop();
    }
    show(){
        push();

        translate(-windowWidth*3,-windowHeight*3);
        stroke(121,128,129);
        fill(255);
        for (let i = 0; i < this.rectangulos.length; i++) {
            this.rectangulos[i].show();
        }
        // rect (-windowWidth*3,-windowHeight*3,windowWidth*6,windowHeight*6)
        pop();
    }
}