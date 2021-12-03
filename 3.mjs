import { Cipher } from 'crypto';
import {openFile} from './lib.mjs';

openFile("./input3.txt")
.then((file)=>{

    // part 1

    // count each column
    const length = file[0]?.length;
    let count = Array(length);


    const {criteria, antiCriteria} = countBits(file);

    let gamma = parseInt(criteria.join(""), 2);
    let epsilon = parseInt(antiCriteria.join(""), 2);

    // part 2
    let oxygenStr = findRating(file, true);
    let co2Str = findRating(file, false);
    
    let oxygen = parseInt(oxygenStr, 2);
    let co2 = parseInt(co2Str, 2);

    return {gamma, epsilon, "result1": gamma * epsilon, oxygen, co2, "result2": oxygen * co2};
})
.then(console.table);

function countBits(lines){
    const length = lines[0].length;
    let count = Array(length);
    
    let criteria = [];
    let antiCriteria = [];

    //fill the count array
    for (let i = 0; i < length; i++) {
        count[i]={"0":0,"1":0};
    }

    // count for each line
    for (const line of lines) {
        for (let i = 0; i < length; i++) {
            const element = line.charAt(i);
            count[i][element]++;
        }
    }
    
    // set criteria
    for (const column of count) {
        let result = column["1"] >= column["0"];
        criteria.push(result ? "1" : "0");
        antiCriteria.push(result ? "0" : "1");
    }

    return {criteria, antiCriteria};

}

function findRating(lines, mostBits){
    let remaining = Array.from(lines);
    let pos = 0, column = 0;
    while (remaining.length > 1){
        let {criteria, antiCriteria} = countBits(remaining);
        let crit = mostBits ? criteria : antiCriteria;
        for (const key in remaining) {
            if (remaining.length > 1) {
                const line = remaining[key];

                if(line.charAt(column) != crit[column]){
                    remaining[key] = undefined;
                }
            }
        }

        remaining = remaining.filter(v=>v!==undefined);

        column++;
    }
    return remaining[0] ?? "";
}