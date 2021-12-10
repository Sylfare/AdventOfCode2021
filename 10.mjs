import { openFile } from "./lib.mjs";
const t0 = performance.now();

let lines = await openFile('./input10.txt');

const corruptScores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}

const completeScore = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
}

const pairs = {
    '(':')',
    '[':']',
    '{':'}',
    '<':'>',
}

const inverse = Object.fromEntries(Object.entries(pairs).map(v=>v.reverse()));

let start = Object.keys(pairs);
let ends = Object.values(pairs);


function getInvalid(line){
    let stack = '';
    let arr = Array.from(line);
    let result = {valid: false, score: 0};
    let corruptedChar ='';
    for (let i = 0; i < arr.length; i++) {
        const char = arr[i];
        if(start.includes(char)){
            stack += char;
        } else if (ends.includes(char)){
            let lastChar = stack.slice(-1);
            if(inverse[char] == lastChar){
                stack = stack.slice(0,-1);
            } else {
                corruptedChar = char;
                break;
            }
        }
    }
    if(corruptedChar){
        result.score = corruptScores[corruptedChar];
    } else {
        // valid but incomplete
        //result.complete = Array.from(stack).reverse().map(c=>pairs[c]).join('');
        result.valid = true;
        result.score = Array.from(stack).reverse().map(c=>completeScore[pairs[c]]).reduce((p,c)=>(p*5)+c,0);
    }
    return result;
}
let sum = 0;
let corrected = [];
for (const line of lines) {
    let result = getInvalid(line);
    if(result.valid){
        corrected.push(result);
    } else {
        sum += result.score;
    }
}

console.log("Part 1:", sum);
console.log("Part 2:", corrected.map(l=>l.score).sort((a,b)=>a-b)[Math.floor((corrected.length)/2)]);

const t1 = performance.now();

console.log(`Took ${t1 - t0} ms`)