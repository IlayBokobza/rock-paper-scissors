const express = require('express')
const http = require('http')
require('dotenv').config()

//start express
const app = express()
const server = http.createServer(app)

//confing express to parse json
app.use(express.json())

//set routes
app.use(require('./utils/routes'))

//start socket
const socketIo = require('socket.io')
const io = socketIo(server)
//sets socket events
require('./utils/socket')(io)



//port for prod and dev
const port = process.env.PORT || 3000

//serves app
app.use(express.static(`${__dirname}/dist`))
app.get(/.*/,((req, res) => {
    //reroutes all requests back to index.html
    res.sendFile(`${__dirname}/dist/index.html`)
}))

//listens for port (3000 for dev)
server.listen(port,() => {
    console.log(`Runing on port ${port}`)
})