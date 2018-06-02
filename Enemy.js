class Enemy extends Circle {
    constructor(x,y,r){
        super(x,y,r);
        this.color = "blue";
        this.type = "enemy"
    }
    update(n,x,y){
        let newvel = createVector(x-this.pos.x,y-this.pos.y);
        let mag = n;
        newvel.setMag(mag);
        this.vel.lerp(newvel,0.05);
        this.pos.add(this.vel);
    }
    eat(other){
        if (other === undefined){return} 
        let distance = p5.Vector.dist(this.pos,other.pos);
        let limit_distance = this.r + other.r;
        if(other.type === "enemy" || other.type === "player"){limit_distance-=(this.r/4 + other.r/4) }

        if(distance < limit_distance && this.r > other.r){
            var sum = PI * this.r * this.r + PI * other.r * other.r ;
            this.r = sqrt(sum/PI);
            return true;
        }
        else{
            return false;
        }
    }

}