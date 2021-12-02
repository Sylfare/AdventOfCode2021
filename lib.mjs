import { readFile } from "fs/promises";
export const openFile = (name)=>{
    return readFile(name)
    .then((file)=>file.toString().trim().split('\n'));
}

export const openFileNumber = (name)=>{
    return openFile(name)
    .then(file=>file.map(n=>parseInt(n.trim())));
}