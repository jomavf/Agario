class Wall extends Circle{
    constructor(x,y,r){
        super(x,y,r);
    }
    show(){
        strokeWeight(2);
        stroke(255,0,0);
        fill(255,0,0);
        ellipse(this.pos.x,this.pos.y, this.r*2,this.r*2);
    }
    eat(other){
        if (other === undefined){return;}

        let distance = p5.Vector.dist(this.pos,other.pos);
        let limit_distance = this.r + other.r;
        if(other.type === "enemy" || other.type === "player"){limit_distance-=(this.r/4 + other.r/4) }

        if(distance < limit_distance && this.r < other.r){
            return true;
        }
        else{
            return false;
        }
    }
}