import {
    openFile, Performance
} from "./lib.mjs";


const p = new Performance();

let width=0;
let height=0;

// https://stackoverflow.com/a/10475071/16251533
const split = (a,size)=>{
    let arr=[];
    for(let i=0;i<a.length;i+=size){
        arr.push(a.slice(i,i+size));
    }
    return arr;
}

function display(points){
    let str = Array(width*height).fill(".");
    
    points.forEach(point=>{
        str[parseInt(point.y*width+point.x)]="█";
    })
    let a = split(str,width);
    a.forEach((l,i)=>console.log(l.join('')));
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
        if(axis.axis == "x" && this.x > axis.position){
            this.x -= 2*(this.x - axis.position);
        } else if (axis.axis == "y" && this.y > axis.position){
            this.y -= 2*(this.y - axis.position);
        }
    }
}

class Axis {
    axis="";
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
    return new Point(x,y);
});

folds = folds.split('\n').map(l => new Axis(...l.slice(11).split('=')));

let nbFolds = 0;
let nbPointsFirst = 0;
folds.forEach(fold=>{
    
    points.forEach(point=>{
        point.fold(fold);
    });
    if(fold.axis == "x"){
        width = fold.position;
    } else {
        height = fold.position;
    }
    
    //only keep unique points
    let unique = new Set();
    points = points.filter(p=>{
        let coords=p.y*10000+p.x;
        if(unique.has(coords)){
            return false;
        } else {
            unique.add(coords);
            return true;
        }
    });

    if (nbFolds === 0) nbPointsFirst = points.length;
    nbFolds++;
});

//console.table(points.sort((a,b)=>a.x-b.x))
console.log("part 1: ", nbPointsFirst)
display(points)

p.end();