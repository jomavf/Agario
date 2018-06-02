class Configuration {
    constructor(player){
        this.player = player;
        this.zoom = 1;
    }
    setBackground(n){
        background(n);
    }
    setScreen(x,y){
        translate(x,y); 
    }
    scl(n){
        let newzoom = n/this.player.r;	
        this.zoom = lerp(this.zoom,newzoom,0.1);
        scale(this.zoom);
    }
}