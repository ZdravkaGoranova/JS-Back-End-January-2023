const http = require('http');

const eventBus = require('./eventBus.js');

// const logger = require('./logger.js')
// const reporter = require('./reportingService.js')
//модули

const server = http.createServer((req, res) => {
    eventBus.publish('request', { method: req.method, url: req.url })

    // logger.log("Request:-" + req.url)
    // reporter.collect(`${req.method}-${req.url}`)//Dependensi

    res.end();
});
server.listen(5000);
console.log('Server is listening on port 5000..')
