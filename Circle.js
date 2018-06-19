class Circle{
    constructor(x,y,r){
        //Pricipal properties
        this.pos = createVector(x,y);
        
        this.r = r;
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.area = rect(this.pos.x-this.r/2,this.pos.y-this.r/2,this.r*2,this.r*2)

        //Design Properties
        this.color = "white";
        this.textColor = 'black';
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
        let area =floor(this.r * this.r * PI );
        textSize(10*(this.r*0.08));
        textAlign(CENTER);
        text(area,this.pos.x,this.pos.y);
    }
    show(){
        noStroke();
        fill(this.color);
        ellipse(this.pos.x,this.pos.y, this.r*2,this.r*2);
        fill(this.textColor);
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
}