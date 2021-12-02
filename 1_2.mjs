import {openFile} from './lib.mjs';

openFile("./input1.txt")
.then((file)=>{
    let nb = 0;
    
    file = file.map(n=>parseInt(n.trim()));
    let before = file[0] + file[1] + file[2];
    
    let now = 0;
    for (let i = 3; i < file.length; i++) {
        now = before - file[i-3] + file[i]
        if (now  > before){
            nb++;
        }        

        before = now;
    }
    return nb;
})
.then(console.log);