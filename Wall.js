class Wall extends Circle{
    constructor(x,y,r){
        super(x,y,r);
        this.type = "wall"
    }
    showText(){

        stroke(0);
        fill(255);

        textAlign(CENTER); 
        textSize(5);
        text(this.pos.x,this.pos.x,this.pos.y);
        text(this.pos.y,this.pos.x,this.pos.y + 10) ;
    }
    show(){
        strokeWeight(2.5);
        stroke(255,0,0);
        fill(255,80,80);
        
        push();
        // translate(-width*3,-height*3)
        beginShape();  
        let edge = random(20,40);        
        for (let i = 0; i < 360; i+=edge) {
            let x = sin(i) * this.r ;
            let y = cos(i) * this.r ;
            vertex(x+ this.pos.x,y+ this.pos.y);
        }
        endShape(CLOSE);
        // this.showText();
        pop();

    }
    eat(other){
        if (other === undefined){return;}
        let distance = p5.Vector.dist(this.pos,other.pos);
        let limit_distance = this.r + other.r;
        if(other.type === "enemy" || other.type === "player"){limit_distance-=(this.r/4 + other.r/4) }
        
        if(distance < limit_distance && this.r < other.r){
            return true;
        }
        else{
            return false;
        }
    }
}