class Rectangle{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

class Grid {
    constructor(cols,rows){
        this.width = windowWidth;
        this.height = windowHeight;
        this.x = -windowWidth;
        this.y = -windowHeight;
        this.w = this.width / cols;
        this.h = this.height / rows;
        this.cols = cols;
        this.rows = rows;
        this.rectan = []
    }
    init(){

    }
    show(){
        stroke('green');
        noFill();
        for (let i = this.x; i < this.w;i++) {
            for (let j = this.y; j < this.h;j++) {
         //rect(i*this.w,j*this.h,this.w,this.h)
            }
        }
    }
}