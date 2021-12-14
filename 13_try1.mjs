import {
    openFile
} from "./lib.mjs";

let width=0, height=0;

// https://stackoverflow.com/a/10475071/16251533
const split = (a,size)=>{
    let arr=[];
    for(let i=0;i<a.length;i+=size){
        arr.push(a.slice(i,i+size));
    }
    return arr;
}

function display(points,axis){
    let str = Array(width*height).fill(".");
    
    points.forEach(point=>{
        str[parseInt(point.y*width+point.x)]="#";
    })
    let a = split(str,width);
    //console.log(a);
    a.forEach((l,i)=>console.log(i!=axis.position ? l.join('') : '-'*width));
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

let [points, folds] = await openFile('./input13_test.txt', '\n\n');

points = points.split('\n').map(l => {
    let [x,y] = l.split(',').map(n=>parseInt(n,10));
    if (x+1>width) width = x+1;
    if (y+1>height) height = y+1;
    //console.log(width, height)
    return new Point(x,y);
});

folds = folds.split('\n').map(l => new Axis(...l.slice(11).split('=')));


let test = folds[0];
points.forEach(point=>{
    point.fold(test);
});
display(points,test);
if(test.axis == "x"){
    width = Math.floor(width/2);
} else {
    height = Math.floor(height/2);
}

