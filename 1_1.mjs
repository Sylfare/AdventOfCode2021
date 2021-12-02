import {openFile} from './lib.mjs';

openFile("./input1.txt")
.then((file)=>{
    let nb = 0;
    let result=[];
    file = file.map(n=>parseInt(n.trim()));

    //console.log(file);

    for (let i = 1; i < file.length; i++) {
        let alt1=file[i-1];
        let alt2=file[i];
        if (alt2 > alt1){
            nb++;
        }        
    }
    return nb;
})
.then(console.log);