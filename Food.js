class Food extends Circle {
    constructor(x,y,r){
        super(x,y,r);
        this.type = "food"
    }
    show(){
        noStroke();
        fill(this.c_r,this.c_g,this.c_b);
        ellipse(this.pos.x,this.pos.y, this.r*2,this.r*2);
    }

}