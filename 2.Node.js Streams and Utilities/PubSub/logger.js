const eventBus=require('./eventBus.js')

const log = (data) => {
    console.log(`Logger: ${data.url}`);
};

// const logger = {
//     log, // log:log
// }
//module.exports = logger;

eventBus.subscribe('request',log)
//всеки път когато възникне request event да се изпълни ог метода