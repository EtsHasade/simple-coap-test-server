const coap = require('coap')

process.stdin.on('data', data => {
    const [method, msg] = data.toString().split(':')
    const req = coap.request(`coap://192.168.1.6/${method}/${msg}`)

    req.on('response', (res) => {
        res.pipe(process.stdout)
    })
    req.end()
})

