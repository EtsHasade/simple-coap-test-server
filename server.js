// require('./client/sendReq.js') - CoAP test client
///////////

const coap = require('coap')

const server = coap.createServer()

server.on('request', (req, res) => {
    const [domain, method, msg] = req.url.split('/')
    if (method === 'quit') process.exit(0)

    switch (method) {
        case 'get':
        case 'GET':
            onGet(req, res, msg)
            break;
        case 'put':
        case 'PUT':
            onPut(req, res, msg)
            break;

        default:
            console.log('some request:', method, msg);
            res.end('res: '+  msg)
            break;
    }


})

function onGet(req, res, msg) {
    console.log('get request - method "GET" from', req.rsinfo?.address)
    console.log('message:', msg)
    
    
    res.end('GET response >> ' + msg + '\n')
}


function onPut(req, res, msg) {
    console.log('get request - method "PUT" from', req.rsinfo?.address)
    console.log('message:', msg)

    res.end('PUT response>> ' + msg + '\n')
}


// the default CoAP port is 5683
const port = 5683;
server.listen(port, () => {
    console.log('coap server listen on port coap://localhost/' + port);
    console.log('send coap like that: "GET/msg"');
})

