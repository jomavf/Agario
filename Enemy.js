class Enemy extends Circle {
    constructor(x,y,r,name){
        super(x,y,r,name);
        this.type = "enemy";
        this.direction = createVector(1,0);
        this.anguloRotacion = random(0,2*PI);
        this.v = createVector(0,0);
        this.elegido = false;
    }
    applyForce(force){
        this.acc.add(force);
    }
    update(vector=createVector(game.player[0].pos.x-this.pos.x,
        game.player[0].pos.y-this.pos.y)){
        let  newvel = createVector(0,0);        
        let mag = 5;
        
        this.pos.x = constrain(this.pos.x ,-width*3,width*3)
        this.pos.y = constrain(this.pos.y ,-height*3,height*3)
        
        if ( this.r >= game.player[0].r){
            // newvel = createVector(game.player[0].pos.x-this.pos.x,
            // game.player[0].pos.y-this.pos.y);

            // newvel = algoritmo.vector;
            newvel = vector;
            this.v = newvel;

        }else{
            if(this.elegido === false){
                
                newvel = p5.Vector.random2D();
                this.v = newvel;
            }else{
                newvel = algoritmo.vector;
                this.v = newvel;
            }
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

        this.drawArrow(this.v);
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
    drawArrow(vector) {
        push();
        let playerxy;
        let xy;
        if ( this.r >= game.player[0].r){
            playerxy = createVector(game.player[0].pos.x,game.player[0].pos.y);
            xy = createVector(this.pos.x,this.pos.y);
        }else{
            playerxy = p5.Vector.random2D();
            xy = createVector(this.pos.x,this.pos.y);
        }
        // let vec = p5.Vector.sub(playerxy,xy);
        let vec = vector;
        stroke(this.c_r,this.c_g,this.c_b);
        strokeWeight(3);
        fill(0);
        vec.setMag(this.r+20);
        translate(this.pos.x,this.pos.y)
        line(0,0, vec.x, vec.y);
        pop();
    }

}