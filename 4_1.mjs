import { openFile } from "./lib.mjs";

function splitStr(str, len){
    let array = []
    for (let i = 0; i < str.length; i+=len) {
        array.push(str.substring(i, i+len));
    }
    return array;
}

const toCheck = [];
for(let i = 0; i < 5; i++){
    toCheck.push(Array.from({length:5}, (v,j)=> i*5 + j));
    toCheck.push(Array.from({length:5}, (v,j)=> j*5 + i));
}

class Grid{
    grid;
    lines=[];
    checked=[];
    completed=[];

    constructor(originalString){
        //parse the string
        this.grid = originalString.split('\n').map(l => splitStr(l, 3).map(c => parseInt(c.trim()))).flat();
        
        //console.table(this.grid);
    }

    checkNumber(n){
        //console.log(this.grid, n);
        let index = this.grid.indexOf(n);
        if (index != -1){
            this.checked.push(index);
        }
    }

    isCompleted(){
        for (const line of toCheck) {
            let valid = line.reduce((prev, cur)=>prev && this.checked.includes(cur), true);
            if(valid){
                //console.log(line.map(c=>this.grid[c]));
                this.completed=line;
                return line;
            }
        }
        return null;
    }

    renderGrid(){
        for(let y=0; y<4; y++){
            console.log(this.grid.slice(y*5,y*5+5).map(c=>this.checked.includes(c)? 'X\t' : `${c}\t`).join(''));
        }
    }
    
    calculateScore(calledNumber){
        //return calledNumber * this.grid.reduce((prev,cur)=> !this.checked.includes(cur) && (prev += cur), 0);
        let sum=0;
        for (let i = 0; i < this.grid.length; i++) {
            if(!this.checked.includes(i)){
                sum += this.grid[i];
            }
        }
        return calledNumber * sum;
    }
}


let gridsText = await openFile('./input4.txt','\n\n');
//console.table(gridsText)
const numbers = gridsText.shift().split(',').map(n=>parseInt(n,10));

let grids = gridsText.map(g => new Grid(g));

let finished = false;
for (const number of numbers) {
    grids.forEach((grid)=>{
        
        grid.checkNumber(number);
        let completed = grid.isCompleted();
        
        if(completed){
            console.log("Score :", grid.calculateScore(number));
            finished=true;
            return;
        }
    });

    // display the grids
    /*for(let y=0; y<5; y++){
        console.log(grids.reduce((prev, grid)=> prev+=grid.grid.slice(y*5,y*5+5).map((c,index)=>grid.checked.includes(y*5+index)? 'X\t' : `${c}\t`).join('') + "\t", ""));
    }*/
    if(finished) break;
}