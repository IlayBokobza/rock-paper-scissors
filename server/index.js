const express = require('express')
const http = require('http')
const {setID,checkForGame,deleteGame,isGameFull,getGame,setAnswer} = require('./utils/users')
const {calcResult} = require('./utils/helper')

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

//socket events
io.on('connection',socket => {
    let game;
    let player;

    //joins him in to the game
    socket.on('joinRoom',({whoToUpdate,gameID},cb) => {
        //checks for game
        if(!checkForGame(gameID)){
            return cb({Error:'Game not found'})
        }

        game = getGame(gameID)

        //checks for invalid player type
        if(whoToUpdate !== 'host' && whoToUpdate !== 'player'){
            return cb({Error:'Invalid Data'})
        }

        player = whoToUpdate

        //checks if player tried to join as host
        if(game.host?.id && whoToUpdate === 'host'){
            return cb({Error:'Cannot connect as host'})
        }

        setID({
            whoToUpdate,
            gameID,
            id:socket.id
        })

        socket.join(gameID)

        if(isGameFull(gameID)){
            io.to(gameID).emit('gameStart',{host:game.host,player:game.player})
        }
    })

    socket.on('answer',answer => {
        setAnswer({
            gameID:game?.id,
            whoToUpdate:player,
            answer,
        })
        game = getGame(game?.id)

        if(game?.host.answer && game?.player.answer){
            let res = calcResult(game.host.answer,game.player.answer)
            io.to(game?.id).emit('result',res)
            return
        }

        socket.to(game?.id).broadcast.emit('enemyAnswered')
    })


    //on disconnect
    socket.on('disconnect',() => {
        io.to(game?.id).emit('gameOver')
        deleteGame(game?.id)
    })


    socket.on('test',() => {
        console.log('')
    })
})

//port for prod and dev
const port = process.env.PORT || 3000

//serves test page
app.get('/api/testing',(req, res) => {
    res.sendFile(`${__dirname}/test.html`)
})

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