class Player extends Circle{
    constructor(x,y,r){
        super(x,y,r);
        this.type = "player";
        this.color = "white"
        this.minRangeMouse =200;
        this.textColor = "black"
        this.acc = createVector(0,0);
        this.sons = [];
    }
    applyForce(force){
        this.acc.add(force);
    }
    update(n=3){   
        let newvel = createVector(mouseX-width/2,mouseY-height/2);
        //if(!this.lider){newvel = createVector(mouseX-width/2,mouseY-height/2);}     
        let mag = n;
        
        if (newvel.mag() < (1.5*this.r)){
            mag = mag - 0.75*mag;
        }
        if(newvel.mag() < this.r/4){
            mag = 0;
        }
        newvel.setMag(mag);
        this.vel.lerp(newvel,0.05);
        this.pos.add(this.vel);
    }
    showText(){
        textSize(10*(this.r*0.08));
        textAlign(CENTER); 
        let mass =floor(this.r * this.r * PI );
        text(mass,this.pos.x,this.pos.y);
    }
    show(){
        if(this.gameover){
            return;
        }
        
        stroke(0,0,255);
        //fill(this.color);
        fill(0,0,255,100);
        ellipse(this.pos.x,this.pos.y, this.r*2,this.r*2);
        fill(this.textColor);
        //this.showText();

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
