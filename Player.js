class Player extends Circle{
    constructor(x,y,r){
        super(x,y,r);
        this.type = "player";
        this.minRangeMouse =200;    
        this.score = 0; 
    }
    update(){   
        let  newvel = createVector(mouseX-width/2,mouseY-height/2);
        let mag = 5;

        this.pos.x = constrain(this.pos.x ,-width*3,width*3)
        this.pos.y = constrain(this.pos.y ,-height*3,height*3)
    
        newvel.setMag(mag)//(this.r*0.06));

        this.vel.lerp(newvel,0.1);
        this.pos.add(this.vel);  
    }
    showText(){
        let area = floor(this.r * this.r * PI);
        this.score = area;

        stroke(0);
        fill(255);

        textAlign(CENTER); 
        textSize(5*(this.r*0.08));
        text(this.name,this.pos.x,this.pos.y);
        text(area,this.pos.x,this.pos.y + 10 * (this.r*0.05) ) ;
    }
    show(){
        strokeWeight(0.5);
        stroke(0);
        fill(0,0,255,100);


        beginShape();  
        let edge = random(15,25);
        for (let i = 0; i < 360; i+=edge) {
            let x = sin(i) * this.r;
            let y = cos(i) * this.r;
            vertex(x + this.pos.x,y + this.pos.y);
        }
        this.drawArrow();
        endShape(CLOSE);


        //  ellipse(this.pos.x,this.pos.y, this.r*2,this.r*2);

        this.showText();
    }
    eat(other){
        let distance = p5.Vector.dist(this.pos,other.pos);
        let limit_distance = this.r + other.r;
        if(other.type === "enemy" || other.type === "player"){limit_distance-=(this.r/4 + other.r/4) }

        if(distance < limit_distance && this.r > other.r){
            var sum = PI * this.r * this.r + PI * other.r * other.r ;
            //let futureRadio = sqrt(sum/PI);
            this.r = sqrt(sum/PI);
            return true;
        }
        else{
            return false;
        }
    }   
    split(){
            let nPlayer = new Player((this.x+100),(this.y),(this.r/2));
            this.sons.push(nPlayer);
            this.r/=2;
    }
}
