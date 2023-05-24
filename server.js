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
            res.end('res: ' + msg)
            break;
    }


})

function onGet(req, res, msg) {
    const date = new Date()
    console.log('time:', `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)

    console.log('get request - method "GET" from', req.rsinfo?.address)
    console.log('get request - method "GET" from', req.options)
    console.log('message:', msg)

    if ('Observe' in req.headers) {
        let counter = 0
        res.write('oserve-response: ' + counter++)

        const timeId = setInterval(() => {
            const msg = 'oserve-response: ' + counter++
            res.write(msg)
            console.log(msg)
            if (counter > 20) {
                clearInterval(timeId)
                res.end('Observeer interval stopped')
                console.log('end observer')
            }
        }, 2000);

    } else {
        res.end('GET response >> ' + msg + '\n')
    }

}


function onPut(req, res, msg) {
    const date = new Date()
    console.log('time:', `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)


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

