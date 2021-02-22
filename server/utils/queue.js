const fs = require('fs')
const path = require('path')
const filePath = path.resolve(__dirname,'../data/queue.json')
const {createGame,setPlayer} = require('./users')

const getQueue = () => {
    return JSON.parse(fs.readFileSync(filePath).toString())
}

const updateQueue = (queue) => {
    fs.writeFileSync(filePath,JSON.stringify(queue))
}

const addToQueue = (name,id) => {
    const queue = getQueue()
    let isPlayerAlreadyInQueue =  queue.findIndex(player => player.id === id)

    if(isPlayerAlreadyInQueue !== -1){
        return {Error:'Player already in queue'}
    }

    queue.push({
        name,
        id,
    })

    if(queue.length >= 2){
        const host = queue[0]
        const player = queue[1]

        let id = createGame(host.name,host.id)
        setPlayer({
            gameID:id,
            playName:player.name,
            playerId:player.id
        })

        queue.splice(0,2)

        updateQueue(queue)

        return {
            host,
            player,
            gameID:id,
        }
    }else{
        updateQueue(queue)
    }
}

const removeFromQueue = (id) => {
    const queue = getQueue()
    let index = queue.findIndex(player => player.id === id)

    if(index === -1){
        return null
    }

    queue.splice(index,1)

    updateQueue(queue)
}

module.exports = {
    getQueue,
    updateQueue,
    addToQueue,
    removeFromQueue,
}