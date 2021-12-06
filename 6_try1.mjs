import { openFileNumber } from "./lib.mjs";

let nbDays = 256;

let list = await openFileNumber('./input6_test.txt',',');

function generateDay(list){
    let size = list.length;
    for (let i = 0; i < size; i++) {
        let cell = list[i];
        list[i]--;
        if (list[i] < 0){
            list[i] = 6;
            list.push(8);
        }
        
    }
    return list;
}

for (let i = 0; i < nbDays; i++) {
    list = generateDay(list);
    console.log(i, list.length);
}

//console.log(generateDay(list).join(','));