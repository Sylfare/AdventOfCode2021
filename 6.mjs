import { openFileNumber } from "./lib.mjs";

const t0 = performance.now();

const length = 9;

function generateDay(count){
    const newCount = {...blankCount};
    for (let i = 0; i < length-1; i++) {
        newCount[i] = count[i+1];
    }
    newCount[8] += count[0];
    newCount[6] += count[0];
    return newCount;
}

function generate(count, days){
    for (let i = 0; i < days; i++) {
        count = generateDay(count);
    }
    return Object.values(count).reduce((prev,cur)=>prev+cur);
}

const blankCount = {}
for(const n of Array.from({length: 9}).keys()){
    blankCount[n]=0;
}

// load the list

const list = await openFileNumber('./input6.txt',',');

const count = {...blankCount};

for (let i = 0; i < list.length; i++) {
    const n = list[i];
    
    count[n]++;
}

[80,256].map(v=>generate(count, v)).forEach((v,i)=>console.log(`Part ${i+1}: ${v}`));

const t1 = performance.now();

console.log(`Took ${t1 - t0} ms`)