import { openFileNumber } from './lib.mjs';

let list = await openFileNumber('./input7.txt',",");

const sumNumb = n => ((n-1)*n)/2;

function findLeast(list, proportional){

    const o = proportional ? (start,end)=>{
        if (end > start) [start, end]=[end,start];
        return Math.abs(sumNumb(end-start));
    } : (start,end)=>Math.abs(end - start);
    let max = Math.max(...list);

    let leastIndex = -1, leastFuel = Number.MAX_SAFE_INTEGER;
    
    let listLength = list.length;
    
    for (let n = 0; n < max; n++) {
        let sum = 0, finished = true;
        for (let i = 0; i < listLength; i++) {
            let diff = o(list[i], n);
            sum += diff;
            if(sum > leastFuel){
                finished = false;
                break;
            }            
        }
        if (finished){
            leastFuel = sum;
            leastIndex = n;
        }
    
    }

    return {leastFuel, leastIndex};
}

console.log(findLeast(list, false));
console.log(findLeast(list, true));

