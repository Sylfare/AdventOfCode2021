import { readFile } from "fs/promises";
export const openFile = (name,separator="\n")=>{
    return readFile(name)
    .then((file)=>file.toString().trim().replaceAll('\r\n','\n').split(separator));
}

export const openFileNumber = (name,separator="\n")=>{
    return openFile(name,separator)
    .then(file=>file.map(n=>parseInt(n.trim())));
}