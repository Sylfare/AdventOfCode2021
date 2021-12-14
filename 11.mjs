import { openFile, Performance } from './lib.mjs';

const p = new Performance();

function validCells(i){
    const y = Math.trunc(i/width);
    const x = i%width;
    let t=y>0, b=y<height-1, l=x>0, r=x<width-1;
    let cells=[
        [t,i-width],
        [b,i+width],
        [l,i-1],
        [r,i+1],
        [t&&l,i-width-1],
        [t&&r,i-width+1],
        [b&&l,i+width-1],
        [b&&r,i+width+1],
    ];
    let result = cells.map(c=>c[0]?c[1]:null).filter(c=>c!==null);
    return result;
}

function nextGeneration(data){
    // add 1 to each

    let needsUpdate = false;
    data = data.map((n,i)=>{
        n++;
        if(!needsUpdate && n > 9 ){
            needsUpdate =true;
        }
        return n;
    });

    // propagate light
    let already = new Set();
    while(needsUpdate){
        needsUpdate = false;
        data.forEach((n,i)=>{
            if(n > 9 && !already.has(i)){
                needsUpdate =true;
                already.add(i);
                validCells(i).forEach(c=>{
                    data[c]++;
                });
            }
            return n;
        });
    }

    // count and reset flashed octopus
    let count = 0
    
    data = data.map(c=>{
        if(c>9){
            count++;
            return 0;
        } else {
            return c;
        }
    });
    return {data,count};
}

function display(grid){
    let str=grid.join('');
    for (let i = 0; i < height; i++) {
        console.log(Array.from(str.substring(width*i,width*(i+1))).map(c=>c!=0?`${c}`:`\x1b[7m${c}\x1b[0m`).join(''));        
    }
}

// ------------

let grid = await openFile('./input11.txt');

const height = grid.length;
const width  = grid[0].length;
const size   = height*width;

let original = grid.join('').split('').map(n=>parseInt(n,10));

let arr = [...original];
let total = 0;

let part2Found = false;

for (let i = 1; i <= 100 || !part2Found; i++) {
    let result = nextGeneration(arr);
    arr = result.data;
    
    if(i<=100)  total += result.count;
    if(i===100) console.log("Part 1:", total);
    if(result.count == size){
        console.log("Part 2:", i);
        part2Found = true;
    }
}

p.end();