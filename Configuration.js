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
        let newzoom = n/this.player.r;	
        this.zoom = lerp(this.zoom,newzoom,0.1);
        scale(this.zoom);
    }
}