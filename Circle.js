class Circle{
    constructor(x,y,r){
        this.pos = createVector(x,y);
        this.r = r;
        this.color = "white";
        this.vel = createVector(0,0);
        this.area = rect(this.pos.x-this.r/2,this.pos.y-this.r/2,this.r*2,this.r*2)
        this.textColor = 'white';
        this.acc = createVector(0,0);
    }
    applyFroce(force){
        this.acc.add(force);
    }
    update(n=3){
        let acc = createVector(mouseX-width/2,mouseY-height/2);
        let mag = n;
        acc.setMag(mag/(this.r/0.1));
        this.vel.lerp(acc,0.05);
        this.pos.add(this.vel);
    }
    show(){
        noStroke();
        fill(this.color);
        ellipse(this.pos.x,this.pos.y, this.r*2,this.r*2);
        fill(this.textColor);
        
        let mass =floor(this.r * this.r * PI );
        textSize(10*(this.r*0.08));
        textAlign(CENTER);
        text(mass,this.pos.x,this.pos.y);
    }
    eat(other){      
        let distance = p5.Vector.dist(this.pos,other.pos);
        let distance_limit = this.r + other.r;
            
        if(distance < distance_limit && this.r < other.r){
            var sum = PI * this.r * this.r + PI * other.r * other.r ;
            this.r = sqrt(sum/PI);
            return true;
        }
        else{
            return false;
        }
    }
}