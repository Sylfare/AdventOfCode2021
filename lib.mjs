import {
    readFile
} from "fs/promises";

/**
 * Open a file and parse it
 * @param {string} name The file path
 * @param {string} separator How to separate the file?
 * @returns a Promise with the data as an array of strings
 */
export const openFile = (name, separator = "\n") => {
    return readFile(name)
        .then((file) => file.toString().trim().replaceAll('\r\n', '\n').split(separator));
}

/**
 * Open a file and parse it as numbers
 * @param {string} name The file path
 * @param {string} separator How to separate the file?
 * @returns a Promise with the data as an array of numbers
 */
export const openFileNumber = (name, separator = "\n") => {
    return openFile(name, separator)
        .then(file => file.map(n => parseInt(n.trim(), 10)));
}

/**
 * Split an array by specified size
 * @param {any[]} array 
 * @param {number} size 
 * @returns 
 */
export const split = (array, size) => {
    let arr = [];
    for (let i = 0; i < array.length; i += size) {
        arr.push(array.slice(i, i + size));
    }
    return arr;
}

/**
 * 
 * @param {any[]} arr The array to filter
 */
export const unique = (arr) => {


    let flags = new Set();
    return arr.filter(point => {
        if (flags.has(point)) return false;
        flags.add(point);
        return true;
    })
    
}

export const count = (str,char)=>{
    return (str.split(char).length-1);
}

export const iterate =(iterator,limit=100)=>{
    const arr = [];
    let current, i=0;
    while((current = iterator.next().value) && ++i<limit){
        arr.push(current);
    }
    return arr;
}

export const xor = (a,b)=> (!a&&b) || (a&&!b);

export const sortStr = (str) => str.split('').sort((a,b)=>a.localeCompare(b)).join('');

export class Performance {
    start;

    constructor(){
        this.start = performance.now();
    }

    end(){ 
        console.log("Took ", performance.now() - this.start,'ms');
    }
}