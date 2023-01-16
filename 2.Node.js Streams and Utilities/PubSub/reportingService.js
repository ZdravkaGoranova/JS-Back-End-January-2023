const eventBus= require('./eventBus.js');

const collect = (data) => {
    console.log('Reporting service -' + data.method)
};

eventBus.subscribe('request',collect);





// const reporter = {
//     collect,
// };

// module.exports = reporter;