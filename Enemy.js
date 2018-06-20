class Enemy extends Circle {
    constructor(x,y,r,name){
        super(x,y,r,name);
        this.type = "enemy";
        this.direction = createVector(1,0);
        this.anguloRotacion = random(0,2*PI);

    }
    applyForce(force){
        this.acc.add(force);
    }
    update(){
        let  newvel = createVector(0,0);        
        let mag = 5;
        
        this.pos.x = constrain(this.pos.x ,-windowWidth*3,windowWidth*3)
        this.pos.y = constrain(this.pos.y ,-windowHeight*3,windowHeight*3)
        
        if ( this.r >= game.player[0].r){
            newvel = createVector(game.player[0].pos.x-this.pos.x,
                game.player[0].pos.y-this.pos.y);
        }else{
            newvel = p5.Vector.random2D();
        }
        newvel.setMag(mag/(this.r*0.1));   

        this.vel.lerp(newvel,0.05);
        this.pos.add(this.vel);
    }
    show(){

        

        strokeWeight(2.5);
        stroke(this.c_r,this.c_g,this.c_b);
        fill(this.c_r,this.c_g,this.c_b,this.c_alfa);
        fill(this.c_r,this.c_g+50,this.c_b+50);

        beginShape();  
        let edge = random(10,25);        
        for (let i = 0; i < 360; i+=edge) {
            let x = sin(i) * this.r;
            let y = cos(i) * this.r;
            vertex(x + this.pos.x,y + this.pos.y);
        }
        endShape(CLOSE);

        this.showText();
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