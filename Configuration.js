class Configuration {
    constructor(player){
        this.player = player;
        this.zoom = 1;
        this.color1 = color(255);
        this.color2 = color(0);
        this.Y_AXIS = 1
        this.X_AXIS = 2

    }
    //Copied Function
    setGradient(x, y, w, h, c1, c2, axis) {
        noFill();
        if (axis == this.Y_AXIS) {  // Top to bottom gradient
        for (var i = y; i <= y+h; i++) {
            var inter = map(i, y, y+h, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x+w, i);
            }
        }  
        else if (axis == this.X_AXIS) {  // Left to right gradient
        for (var i = x; i <= x+w; i++) {
            var inter = map(i, x, x+w, 0, 1);
            var c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y+h);
            }
        }
    }
    setBackground(){
        
    // Background
    this.setGradient(-windowWidth*3, -windowHeight*3, windowWidth*3, windowHeight*6, this.color1,this.color2, this.X_AXIS);
    this.setGradient(0, -windowHeight*3, windowWidth*3, windowHeight*6, this.color2, this.color1, this.X_AXIS);
            
    }
    setScreen(x,y){
        translate(x,y); 
    }
    scl(n){
        let newzoom = n/game.player[0].r;	
        this.zoom = lerp(this.zoom,newzoom,0.1);
        scale(this.zoom);
    }

}