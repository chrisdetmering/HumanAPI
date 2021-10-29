const http = require('http')
const fs = require('fs')
const request = require('request')

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    fs.readFile(__dirname + '/index.html', (error, index) => {
        if (req.url === '/') {
            res.end(index)
        }

        if (req.url.includes('?')) {
            const query = req.url.split('?')[1]
            const value = query.split('=')[1]

            const headers = {
                'Authorization': 'Bearer demo',
            }
            request({
                method: 'GET',
                url: 'https://api.humanapi.co/v1/human',
                headers
            }, (error, response) => {
                if (error) {
                    throw error
                }

                const result = JSON.parse(response.body)
                const body = result[value]

                res.end(JSON.stringify({ body }))
            })
        }
    })
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
