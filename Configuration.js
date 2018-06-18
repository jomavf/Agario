class Configuration {
    constructor(player){
        this.player = player;
        this.zoom = 1;
    }
    setBackground(){
        background(105);
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