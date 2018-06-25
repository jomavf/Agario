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
    this.setGradient(-width*3, -height*3, width*3, height*6, this.color1,this.color2, this.X_AXIS);
    this.setGradient(0, -height*3, width*3, height*6, this.color2, this.color1, this.X_AXIS);
            
    }
    setScreen(x,y){
        translate(x,y); 
    }
    scl(n){
        let newzoom = n/game.player[0].r;	
        this.zoom = lerp(this.zoom,newzoom,0.1);
        scale(this.zoom);
    }
    sortArray(arr){
        //Por arreglar y poner radio de mi player actual al iniciar
        let n = arr.length;
        let temp;    
        for (let i = 1; i < n; i++) {
            for (let j = n-1; j >= i; j--) {
                if(arr[j].score >= arr[j-1].score){
                    temp = arr[j];
                    arr[j] = arr[j-1];
                    arr[j-1]=  temp;
                }
            }
        }
    }

    setScore(){
        push();
        noStroke();
        translate(0,0);
        fill(0,50)
        rect(width-175,10,170,250);
        
        stroke(0);
        fill(255);
        textAlign(LEFT,TOP);
        
        
        //Ordenar el arreglo
        let testArray = [];
        for (let i = 0; i < game.enemy.length; i++) {
            testArray.push(game.enemy[i]);            
        }
        testArray.push(game.player[0]);
        this.sortArray(testArray);
        //Texto del score
        let texto = `         LeaderBoard

1. ${testArray[0].name}         ${testArray[0].score}
2. ${testArray[1].name}         ${testArray[1].score}
3. ${testArray[2].name}         ${testArray[2].score}
4. ${testArray[3].name}         ${testArray[3].score}
5. ${testArray[4].name}         ${testArray[4].score}
6. ${testArray[5].name}         ${testArray[5].score}
7. ${testArray[6].name}         ${testArray[6].score}
8. ${testArray[7].name}         ${testArray[7].score}
9. ${testArray[8].name}         ${testArray[8].score}
10. ${testArray[9].name}       ${testArray[9].score}`;

        textSize(15);
        text(texto,width-170,height-740)
        pop();
    }

}