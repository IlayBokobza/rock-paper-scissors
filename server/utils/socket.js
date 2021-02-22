const {setID,checkForGame,setNewGameReq,deleteGame,isGameFull,getGame,setAnswer,resetGame} = require('./users')
const {calcResult} = require('./helper')
const {addToQueue,removeFromQueue} = require('./queue')
const socketEvents = (io) => {
    //socket events
    io.on('connection',socket => {
        let game;
        let player;

        //game events

        //joins him in to the game
        socket.on('joinRoom',({whoToUpdate,gameID},cb) => {
            //checks for game
            if(!checkForGame(gameID)){
                return cb({Error:'Game not found'})
            }

            const localGame = getGame(gameID)

            //checks for invalid player type
            if(whoToUpdate !== 'host' && whoToUpdate !== 'player'){
                return cb({Error:'Invalid Data'})
            }

            player = whoToUpdate

            //checks if player tried to join as host
            if(whoToUpdate === 'host' && localGame.host?.id && localGame.host?.id !== socket.id){
                return cb({Error:'Cannot connect as host'})
            }

            //checks if player tried to join as host
            if(whoToUpdate === 'player' && localGame.player?.id && localGame.player?.id !== socket.id){
                return cb({Error:'Cannot connect as player now'})
            }

            setID({
                whoToUpdate,
                gameID,
                id:socket.id
            })

            socket.join(gameID)
            game = localGame

            if(isGameFull(gameID)){
                io.to(gameID).emit('gameStart',{host:game.host,player:game.player})
            }
        })

        //when a player answers
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

        //req a new game
        socket.on('reqNewGame',(cb) => {
            let err = setNewGameReq({
                whoToUpdate:player,
                gameID:game.id
            })

            if(err){
                return cb({Error:err})
            }

            game = getGame(game?.id)

            if(game.host?.wantsNewGame && game.player?.wantsNewGame){
                resetGame(game.id)
                io.to(game?.id).emit('startNewGame')
            }else {
                socket.to(game?.id).broadcast.emit('reqNewGame')
            }

        })


        //queue events
        socket.on('joinQueue',(name,cb) => {
            let res = addToQueue(name,socket.id)

            //if no response end func
            if(!res){
                return
            }

            if(res.Error){
                return cb(res.Error)
            }

            //if socket is host(unlikely)
            if(socket.id === res.host.id){
                socket.emit('gameFound',{
                    gameID:res.gameID,
                    playerType:'host'
                })
                socket.broadcast.to(res.player.id).emit('gameFound',{
                    gameID:res.gameID,
                    playerType:'player'
                })
            }
            //if socket is player (most likely)
            else if(socket.id === res.player.id){
                socket.emit('gameFound',{
                    gameID:res.gameID,
                    playerType:'player'
                })
                socket.broadcast.to(res.host.id).emit('gameFound',{
                    gameID:res.gameID,
                    playerType:'host'
                })
            }
            //if socket is none of them (possible)
            else {
                socket.broadcast.to(res.player.id).emit('gameFound',{
                    gameID:res.gameID,
                    playerType:'player'
                })
                socket.broadcast.to(res.host.id).emit('gameFound',{
                    gameID:res.gameID,
                    playerType:'host'
                })
            }

        })


        //on disconnect
        socket.on('disconnect',() => {
            if(game){
                io.to(game?.id).emit('gameOver')
                deleteGame(game?.id)
            }else {
                removeFromQueue(socket.id)
            }
        })
    })
}
module.exports = socketEvents