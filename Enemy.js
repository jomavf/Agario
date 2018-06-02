class Enemy extends Circle {
    constructor(x,y,r){
        super(x,y,r);
        this.color = "blue";
        this.type = "enemy"
        this.acc = createVector(0,0);
        this.chance = random(1);
    }
    applyFroce(force){
        this.acc.add(force);
    }
    update(n,x,y){
        let randomAcc = p5.Vector.random2D();
        this.applyFroce(randomAcc);
        let mapped = map(this.r,0,this.r,0,1);
        this.acc.div(mapped);
        // if (this.chance < 0.3){
        //     acc = createVector(x-this.pos.x,y-this.pos.y);
        // }
        //let mag = n;
        this.acc.limit(0.5);
        //this.acc.setMag(1.5);
        //this.vel.lerp(newvel,0.05);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
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