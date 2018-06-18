class Enemy extends Circle {
    constructor(x,y,r){
        super(x,y,r);
        this.color = "blue";
        this.type = "enemy";
        this.direction = createVector(1,0);
        this.anguloRotacion = random(0,2*PI);
    }
    applyForce(force){
        this.acc.add(force);
    }
    update(n){
        // let randomAcc = p5.Vector.random2D();
        let cambiarAngulo = random(10);
        if(cambiarAngulo>=7){this.anguloRotacion = random(0,2*PI);}
        this.direction.rotate(this.anguloRotacion);
        this.applyForce(this.direction);
        // this.applyForce(randomAcc);
        this.acc.setMag(0.5);        
        
        //Halla el vector unitario (1) y lo multiplica *0.25
        this.vel.add(this.acc);
        
        //Restringe las posiciones del enemigo
        this.pos.x = constrain(this.pos.x ,-windowWidth*3,windowWidth*3)
        this.pos.y = constrain(this.pos.y ,-windowHeight*3,windowHeight*3)

        this.pos.add(this.vel);
    }
    show(){
        strokeWeight(0.5);
        stroke(0);
        fill(255,255,20,100);
        ellipse(this.pos.x,this.pos.y, this.r*2,this.r*2);
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