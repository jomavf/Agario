class Circle{
    constructor(x,y,r,name){
        //Pricipal properties
        this.pos = createVector(x,y);
        this.r = r;
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.score = 0;

        //Design Properties
        //Design color
        this.c_r = random(255);
        this.c_g = random(255);
        this.c_b = random(255);
        this.c_alfa = 100;

        this.name = name || 'RataKevin';
        
    }
    applyFroce(force){
        this.acc.add(force);
    }
    update(){
        let fuerza_acc = createVector(mouseX-width/2,mouseY-height/2);
        this.acc.add(fuerza_acc);
        //let mag = n;
        //acc.setMag(mag/(this.r/0.1));
        this.vel.add(this.acc);
        //this.vel.lerp(this.acc,0.05);
        this.pos.add(this.vel);
        
    }
    showText(){
        let area = floor(this.r * this.r * PI);
        this.score = area;
        
        textFont('Helvetica');
        stroke(0);
        fill(255);
        textAlign(CENTER); 
        textSize(5*(this.r*0.08));
        text(this.name,this.pos.x,this.pos.y);
        text(area,this.pos.x,this.pos.y + 10 * (this.r*0.05) ) ;
    }
    show(){
        stroke(0);
        fill(this.c_r,this.c_g,this.c_b,this.c_alfa);

        beginShape();  
        let edge = 30;
        for (let i = 0; i < 360; i+=edge) {
            let x = sin(i) * this.r;
            let y = cos(i) * this.r;
            vertex(x + this.pos.x,y + this.pos.y);
        }
        endShape(CLOSE);

        this.showText();
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

    drawArrow() {
        push();
        let base = createVector(this.pos.x,this.pos.y);
        let mouse = createVector(mouseX,mouseY);
        let wh = createVector(width/2,height/2);
        let vec = p5.Vector.sub(mouse,wh);
        stroke(this.c_r,this.c_g,this.c_b);
        strokeWeight(3);
        fill(0);
        vec.setMag(this.r+20);
        translate(this.pos.x,this.pos.y)
        line(0,0, vec.x, vec.y);
        pop();
    }
}