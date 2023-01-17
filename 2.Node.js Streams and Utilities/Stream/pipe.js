const fs = require('fs');

const readStream = fs.createReadStream('./data.txt');
const writeStream = fs.createWriteStream('./data-copy.txt');

readStream.pipe(writeStream);//каквото четем от единия се записва в др

//това е еквивалентно на readStream.pipe(writeStream)
//Ако искаме да се променят неща може да използваме следното
// readStream.on('data', (chunck) => {
//     console.log('WRITE CHUNK');
//     writeStream.write(chunck);
// });
// readStream.on('close', () => {
// writeStream.end();
// });