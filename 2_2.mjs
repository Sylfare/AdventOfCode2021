import {openFile} from './lib.mjs';

openFile("./input2.txt")
.then((file)=>file.map(line=>{let l = line.split(' '); l[1]=parseInt(l[1]); return l;}))
.then((lines)=>{
    
    let hor = 0, depth = 0, aim=0;
    let commands = {
        "forward": (n)=>{
            hor += n;
            depth += aim*n;
        },
        "down": (n)=>aim+=n,
        "up": (n)=>aim-=n,
    };

    for(let line of lines){
        //console.table(line);
        let f = commands[line[0]];
        //console.log(f);
        f(line[1])
    }
    return {hor,depth,aim,result: hor*depth};
})
.then(console.table);