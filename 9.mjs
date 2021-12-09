import { openFile } from './lib.mjs';

const t0 = performance.now();
function validCells(i){
    let toTest = [];
    const nb = parseInt(str[i]);
    const y = Math.trunc(i/width);
    const x = i%width;
    
    if(y>0) toTest.push(i-width);
    if(y<height) toTest.push(i+width);
    if(x>0) toTest.push(i-1);
    if(x<width-1) toTest.push(i+1);
    return toTest;
}

function isLowest(i){
    const nb = parseInt(str[i]);
    return validCells(i).reduce((prev, pos)=>prev && ((pos < 0 || pos > size) || (parseInt(str[pos]) > nb)) , true);
}

function biggerHeights(i){

    const nb = parseInt(str[i]);
    let toTest = validCells(i);
    let result = toTest.filter(pos=>{
        let h = parseInt(str[pos]);
        return pos >= 0 && pos <= size && h < 9 && h > nb;
    });
    return result;
}

function findBassin(i){
    const nb = parseInt(str[i]);
    let alreadyDone = [];
    let newHeights = [];
    let toCheck = [i];
    do{
        newHeights = [...toCheck].map(h=>biggerHeights(h).filter(newH=>!alreadyDone.includes(newH))).flat();
        alreadyDone = [...new Set([...alreadyDone, ...newHeights, ...toCheck])];
        toCheck = [...newHeights];

    } while (newHeights.length > 0);

    return [...new Set(alreadyDone.flat().sort())];

}

function display(l){
    let d = '';
    for (let i = 0; i < str.length; i++) {
        if(l.includes(i)){
            d += '\x1b[7m'+str[i] + '\x1b[0m';
        } else {
            d += str[i];
        } 
        
        if (i%width == width-1 && i>0) d += "\n";
        
    }
    console.log(d);
}
// ----

let list = await openFile("./input9.txt");

const height = list.length;
const width = list[0].length;
const size = height * width;

let str = list.join('');

let sum = 0;
let lowest=[];

for (let i = 0; i < str.length; i++) {
    if (isLowest(i)){

        lowest.push(i);
        sum += parseInt(str[i])+1;
        
    } 
}

console.log("Part 1: ", sum);

let bassins = lowest.map(findBassin);

let result = bassins.map(b=>b.length).sort((a,b)=>a-b).reverse().slice(0,3).reduce((prev,cur)=>prev*cur,1);

console.log("Part 2: ", result);

const t1 = performance.now();

console.log(`Took ${t1 - t0} ms`)