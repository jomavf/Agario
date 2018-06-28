// class Point{
//     constructor(x,y){
//         this.x = x;
//         this.y = y;
//     }
// }

// class Rectangle {
//     constructor(x,y,w,h){
//         this.x = x;
//         this.y = y;
//         this.w = w;
//         this.h = h;
//     }    
//     contains(circle){
//         return(circle.pos.x >= this.x - this.w &&
//         circle.pos.x <= this.x + this.w &&
//         circle.pos.y >= this.y - this.h &&
//         circle.pos.y <= this.y + this.h );
//     }
// }
// class QuadTree {
//     constructor(boundary, n){
//         this.boundary = boundary;
//         this.capacity = n;
//         this.circles = [];
//         this.divided = false;

//     }
//     subdivide(){
//         let x = this.boundary.x;
//         let y = this.boundary.y;
//         let w = this.boundary.w;
//         let h = this.boundary.h;

//         let ne = new Rectangle(x + w/2 , y - h / 2 , w / 2 , h / 2 ) 
//         this.northeast =  new QuadTree(ne,this.capacity);
//         let nw = new Rectangle(x - w/2 , y - h / 2 , w / 2 , h / 2 )
//         this.northwest =  new QuadTree(nw,this.capacity);
//         let se = new Rectangle(x + w/2 , y + h / 2 , w / 2 , h / 2 )
//         this.southeast =  new QuadTree(se,this.capacity);
//         let sw = new Rectangle(x - w/2 , y + h / 2 , w / 2 , h / 2 )
//         this.southwest =  new QuadTree(sw,this.capacity);
        
//         this.divided = true;
//     }
//     insert(circle){

//         if(!this.boundary.contains(circle)){
             
//             return false;
//         }

//         if(this.circles.length < this.capacity){
//             this.circles.push(circle);
//             return true;
//         }
//         else{
//             if (!this.divided){
//                 this.subdivide();
//             }
//             if (this.northeast.insert(circle)){
//                 return true;
//             }
//             else if(this.northwest.insert(circle)){
//                 return true;
//             }
//             else if(this.southeast.insert(circle)){
//                 return true;
//             }
//             else if(this.southwest.insert(circle)){
//                 return true;
//             }
//         }
//     }

//     show(){
//         stroke(0,255,0);
//         strokeWeight(1);
//         noFill();
//         rectMode(CENTER);
//         rect(this.bounsdary.x,this.boundary.y , this.boundary.w * 2 , this.boundary.h * 2 );
//         if(this.divided){
//             this.northeast.show();
//             this.northwest.show();
//             this.southeast.show();
//             this.southwest.show();
//         }
//         // for (let c of this.circles) {
//         //     strokeWeight(4);
//         //     point(c.x,c.y)
            
            
//         // }
//     }
// }