const express = require('express')
const {createGame,setPlayer} = require('./users')
const router = express.Router()

router.post('/api/game',(req,res) => {
    let username = req.body.username

    if(!username){
        return res.send({Error:"Please Provide a username"})
    }

    let id = createGame(username,null)
    res.send({id})
})

router.post('/api/game/:id',(req, res) => {
    let username = req.body?.username

    if(!username){
        return res.status(400).send({Error:"Please Provide a username"})
    }

    let err = setPlayer({
        gameID:req.params.id,
        playName:username
    })

    if(err){
        return res.status(400).send(err)
    }

    res.send()
})

module.exports = router