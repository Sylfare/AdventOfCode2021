import {
    openFile,
    split,
    unique
} from "./lib.mjs";

let width=0, height=0;

function display(points,axis){
    let str = Array(width*height).fill(".");
    
    points.forEach(point=>{
        str[parseInt(point.y*width+point.x)]="#";
    })
    let a = split(str,width);
    //console.log(a);
    a.forEach((l,i)=>console.log(i!=axis.position ? l.join('') : '-'*width));
}

function foldPoint(point,axis){
    if(axis[0] = "x" && point[0] > axis[1]){
        point[0] = axis[1] - (point[0] - axis[1]);
    } else if (axis[0] = "y" && point[1] > axis[1]){
        point[1] =  axis[1] - (point[1] - axis[1]);
    }
    return point;
}

class Point {
    x;
    y;

    constructor(x, y) {
        this.x = parseInt(x,10);
        this.y = parseInt(y,10);
    }

    /**
     * @param {Axis} axis 
     */
    fold(axis) {
        //console.log({x:this.x,y:this.y})
        if(axis.axis = "x" && this.x > axis.position){
            this.x = axis.position - (this.x - axis.position);
        } else if (axis.axis = "y" && this.y > axis.position){
            this.y =  axis.position - (this.y - axis.position);
        }
        //console.log("=>",{x:this.x,y:this.y})
    }
}

class Axis {
    axis;
    position;
    constructor(axis, position) {
        if (axis === "x" || axis === "y") {
            this.axis = axis;
            this.position = parseInt(position,10);
        } else {
            throw new Error("axis not correct " + axis);
        }
    }
}

let [points, folds] = await openFile('./input13.txt', '\n\n');

points = points.split('\n').map(l => {
    let [x,y] = l.split(',').map(n=>parseInt(n,10));
    if (x+1>width) width = x+1;
    if (y+1>height) height = y+1;
    //console.log(width, height)
    //return new Point(x,y);
    return [x,y];
});

//folds = folds.split('\n').map(l => new Axis(...l.slice(11).split('=')));
folds = folds.split('\n').map(l => l.slice(11).split('=').map(n=>parseInt(n,10)));


let test = folds[0];
points.forEach(point=>{
    point=foldPoint(point,test);
});


let flags = [];
    points = points.filter(point => {
        let coords =[point.x,point.y];
        if (flags.some(l=>(l.x===coords.x)&&(l.y===coords.y))) return false;
        flags.push(coords);
        return true;
    })
//points = [...new Map(points.map(l=>[l,0])).keys()];

//points = unique(points);



console.table(points)
//display(points,test);
/*if(test.axis == "x"){
    width = Math.floor(width/2);
} else {
    height = Math.floor(height/2);
}*/

