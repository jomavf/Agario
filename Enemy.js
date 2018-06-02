class Enemy extends Circle {
    constructor(x,y,r){
        super(x,y,r);
        this.color = "blue";
        this.type = "enemy"
        this.acc = createVector(0,0);
        this.chance = random(1);
    }
    applyForce(force){
        this.acc.add(force);
    }
    update(n){
        let randomAcc = p5.Vector.random2D();
        this.applyForce(randomAcc);
        //let calcularFuerzaMag = sqrt((this.acc.x*this.acc.x)+(this.acc.y*this.acc.y))
        this.acc.setMag(0.3);
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