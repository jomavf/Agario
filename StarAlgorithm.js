class Astar {
    constructor(start,end){
        this.start = start;
        this.end = end;

        this.copyStart = this.start;
        this.copyEnd = this.end;
        
        this.open = [];
        this.close = [];

        this.path = [];

        this.success = false;
        this.noSolution = false;

        this.open.push(this.start);

        this.vector = createVector(0,0);
    }
    
    FindLowestCost(arr){
        let lowestCost = 0
        for (let i = 0 ; i < arr.length ; i++){
            if(arr[i].f < arr[lowestCost].f){
                lowestCost=i;
            }
        }
        return lowestCost;
    }
    removeFromArray(arr , elt){
        for ( var i = arr.length ; i >= 0 ; i--){
            if (arr[i] == elt){
                arr.splice(i,1);
            }
        }
    }
    gFunction(start,current){
        let d = dist(start.x,start.y,current.x,current.y)
        return d;
    }
    heuristic(current , end){
        let d = dist(current.x,current.y,end.x,end.y);
        return d;
    }

    //function para comprobar si 2 nodos han cambiado
    isDifferent(start,end){
        //Si son diferentes es porque han cambiado
        if(start !== this.copyStart || end !== this.copyEnd){
            return true;
        }else{
            return false;
        }
          
    }

    run(){ 
        
        // if(this.start !== this.copyStart || this.end !== this.copyEnd){
            
        //     // console.log(`ENEMIGO X=${this.end.x} y=${this.end.y}`);
        //     this.open = [];
        //     this.open.push(this.start);
        //     this.close = [];
        //     this.path = [];
        //     this.copyStart=this.start;
        //     this.copyEnd = this.end;
        //     console.log('Set');
        // }

        if(this.success === true){
            if(this.isDifferent(this.start,this.end)){
                this.success=false;
            }
        }else{

            if(this.isDifferent(this.start,this.end)){


                for (let i = 0; i < this.open.length; i++) {
                    this.open[i].in = false;
                }

                for (let i = 0; i < this.close.length; i++) {
                    this.close[i].in = false;
                }

                this.open = [];

                // this.start.in = true;

                this.open.push(this.start);
                this.close = [];
                this.path = [];
                this.copyStart=this.start;
                this.copyEnd = this.end;
                console.log('Set');
            }
            
            
            if (this.open.length>0 ){
                
                let lowestCost = this.FindLowestCost(this.open);
                let current = this.open[lowestCost];
                this.removeFromArray(this.open,current);
                current.in = false;
                this.close.push(current);
                current.in = true;
    
                if(current === this.end){
                    this.success = true;
                    console.log('Success Were Done!! ByZetaGHost')
                   
                    var temp = current;
                    //No se porque se cae esta parte pero ... esto imprime en azul el camino mas corto que hace
                    // this.path.push(temp);
                    // //console.log(this.path);
                    // while(temp.previous){
                    //     this.path.push(temp.previous); 
                    //     temp = temp.previous;
                    // }  
                               
                    //  noLoop();
                }
    
                current.neighbors.forEach(element => {
                    if (this.close.includes(element) === false && !element.wall){
                        //element.f = gFunction(this.start,current)+heuristic(current,this.end);
                        let costo = 50

                        if(element.diagonal === true){
                            costo = sqrt(2)*50;
                        }

                        var tempG = current.g + costo;//50;//element.g
    
                        var newPath = 1;
    
                        if (this.open.includes(element)){
                            if(tempG < element.g){
                                element.g = tempG;
                                newPath=true;
                            }
                        }
                        else{
                            element.g = tempG;
                            newPath = true;
                            element.in = true;
                            this.open.push(element);
                        }
    
                        if(newPath){
                            element.h = this.heuristic(element,this.end);
                            element.f = element.g + element.h;
                            element.previous = current;
                        }
                    }
                });
            }
            else{
                //Aqui tendria que terminar de analizar todo el mapa para deicr que no hay solucion
                this.noSolution = false;
                console.log('No hay solucion');
                noLoop();
            }
            
            for ( let i = 0 ; i < this.open.length;i++){
                this.open[i].red=0;
                this.open[i].green=255;
                this.open[i].blue=0;
            }
        
            for ( let i = 0 ; i < this.close.length;i++){
                this.close[i].red=255;
                this.close[i].green=0;
                this.close[i].blue=0;
            }
            for (var i = 0 ; i < this.path.length;i++){
                this.path[i].red = 0;
                this.path[i].green = 0;
                this.path[i].blue = 255;
            }
            // for (let i = 0; i < grid.grid.length; i++) {
            //     for (let j = 0; j < grid.grid[0].length; j++) {
            //         if()
            //     }                
            // }

    
            
            // stroke(0,255,0);
            // beginShape();
            //     for (var i = 0 ; i < this.path.length;i++){
            //         vertex(this.path[i].i * 50 , this.path[i].j * 50)
            //     }
            // endShape();
            if(this.close.length>=4){
                let x = game.enemy[0].pos.x;
                let y = game.enemy[0].pos.y;
                var vector_direccion = createVector((this.close[3].x-width*3) - x,(this.close[3].y-height*3) - y);
                this.vector = vector_direccion;
                // console.log(this.vector);
            }
        }
    }
}     
        