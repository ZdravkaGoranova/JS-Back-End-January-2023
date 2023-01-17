const fs = require('fs');

const readStream = fs.createReadStream('./data.txt',{encoding:'utf-8'});

readStream.on('data', (chunk) => {
    console.log('---------------New Chunk------------');
    console.log(chunk);
});

readStream.on('close',()=>{
console.log('/////Straem closed////')
});