// require('./client/sendReq.js') - CoAP test client
///////////

const coap = require('coap')

const server = coap.createServer()

server.on('request', (req, res) => {
    const [domain, method, msg] = req.url.split('/')
    if (method === 'quit') process.exit(0)

    switch (method) {
        case 'GET':
            onGet(req, res, msg)
            break;
        case 'post':
            onPost(req, res, msg)
            break;

        default:
            console.log('some reques:', method, msg);
            res.end('res: '+  msg)
            break;
    }


})

function onGet(req, res, msg) {
    res.end('GET >> ' + msg + '\n')
}


function onPost(req, res, msg) {
    res.end('POST >> ' + msg + '\n')
}


// the default CoAP port is 5683
const port = 5683;
server.listen(port, () => {
    console.log('coap server listen on port coap://localhost/' + port);
    console.log('send coap like that: "GET:msg"');
})

