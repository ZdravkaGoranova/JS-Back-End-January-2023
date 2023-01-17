const fs = require('fs');

const writeStream = fs.createWriteStream('./output.txt', { encoding: 'utf-8',flags:'a' });
//flags:'a'означава да добавяме всеки път 

//const writeStream = fs.createWriteStream('./output.txt', { encoding: 'utf-8' });
//ако нямаме flags:'a'означава всеки път да започваме отново

// const chunk1 = 'I ';
// const chunk2 = 'LOVE ';
// const chunk3 = 'YOU';//output.txt//I LOVE YOU

const chunk1 = 'Niki \n';
const chunk2 = 'Petko \n';
const chunk3 = 'Dadi\n';
//output.txt:
//Niki 
//Petko 
//Dadi


writeStream.write(chunk1);//writeStream.write(chunk1 +'\n')
writeStream.write(chunk2);
writeStream.write(chunk3);

writeStream.on('close', () => {
    console.log('Stop STREAM...')
})

writeStream.end();
