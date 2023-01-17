const fs = require('fs');
const path= require('path');

fs.writeFile(path.resolve(__dirname,'./output.txt'), 'Hello , How are you today?', (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('File is created!')
})

// Без path.resolve
// fs.writeFile('./output.txt', 'Hello , How are you today?', (err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('File is created!')
// })