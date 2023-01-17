const fs = require('fs');
const fsp = require('fs/promises')

const path= require('path');
const filePath = path.resolve(__dirname, './data.txt')

//Synchronous reading from file
const text = fs.readFileSync(filePath, { encoding: "utf-8" });
console.log(text);
console.log('Read from file');

//Asynchronous reading from file
const asyncText = fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
        return;
    }
    console.log(data)//2
});
console.log('Read from file');//1

//Asynchronous reading with promisses
fsp.readFile(filePath, { encoding: 'utf-8' })
    .then(result => {
        console.log(result)
    });
console.log('Read from file');