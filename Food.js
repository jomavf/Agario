class Food extends Circle {
    constructor(x,y,r){
        super(x,y,r);
        this.color = "orange";
        this.type = "food"
    }
    show(){
        noStroke();
        fill(this.color);
        ellipse(this.pos.x,this.pos.y, this.r*2,this.r*2);
    }

}