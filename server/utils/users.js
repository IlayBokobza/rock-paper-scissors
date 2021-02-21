const fs = require('fs')
const uniqid = require('uniqid')

const getGames = () => {
    return JSON.parse(fs.readFileSync(`${__dirname}/games.json`).toString())
}

const updateGames = (games) => {
    fs.writeFileSync(`${__dirname}/games.json`,JSON.stringify(games))
}


const createGame = (username,id) => {
    let games = getGames()
    let newGame = {
        host:{
            username,
            id,
        },
        player:null,
        id:uniqid.time()
    }

    games.push(newGame)

    updateGames(games)

    return newGame.id
}

const deleteGame = (id) => {
    let games = getGames()

    let index = games.findIndex(game => game.id === id)

    if(index === -1){
        return {Error:'Game not found'}
    }

    games.splice(index,1)

    updateGames(games)
}

const setPlayer = ({gameID,playName}) => {
    let games = getGames()

    let index = games.findIndex(game => game.id === gameID)

    //if game is full
    if(games[index]?.player){
        return {Error:'Game is full'}
    }

    if(games[index]?.host.username === playName){
        return {Error:'Name is taken'}
    }

    games[index].player = {username:playName,id:null}

    updateGames(games)
}

const setID = ({whoToUpdate,gameID,id}) => {
    if(whoToUpdate !== 'player' && whoToUpdate !== 'host'){
        return {Error:'invalid data'}
    }

    let games = getGames()

    let index = games.findIndex(game => game.id === gameID)

    //check if game doest exist
    if(index === -1){
        return {Error:'Game not found'}
    }

    //check if id is already set
    if(games[index][whoToUpdate]?.id){
        return {Error:'Id already set'}
    }

    games[index][whoToUpdate].id = id

    updateGames(games)
}

const checkForGame = (gameID) => {
    let games = getGames()

    let index = games.findIndex(game => game.id === gameID)

    return index !== -1;
}

const isGameFull = (gameID) => {
    if(!gameID){
        return {Error:'No Game ID'}
    }

    let games = getGames()
    let index = games.findIndex(game => game.id === gameID)

    if(index === -1){
        return {Error:'Game not found'}
    }

    return !!(games[index].host.id && games[index].player);
}

const getGame = (gameID) => {
    let games = getGames()
    return games.find(game => game.id === gameID)
}

const setAnswer = ({gameID,whoToUpdate,answer}) => {
    let games = getGames();
    let index = games.findIndex(game => game.id === gameID)

    if(index === -1){
        return {Error:'Game not found'}
    }

    games[index][whoToUpdate].answer = answer

    updateGames(games)
}

const setNewGameReq = ({whoToUpdate,gameID}) => {
    let games = getGames()
    let index = games.findIndex(game => game.id === gameID)

    if(index === -1){
        return {Error:'Game not found'}
    }

    games[index][whoToUpdate].wantsNewGame = true

    updateGames(games)
}

const resetGame = (gameID) => {
    let games = getGames()
    let index = games.findIndex(game => game.id === gameID)

    if(index === -1){
        return {Error:'Game not found'}
    }

    try{
        games[index].host.wantsNewGame = false;
        games[index].player.wantsNewGame = false;

        games[index].host.answer = null;
        games[index].player.answer = null;
    }catch{}

    updateGames(games)
}

module.exports = {
    getGames,
    updateGames,
    createGame,
    deleteGame,
    setPlayer,
    setID,
    checkForGame,
    isGameFull,
    getGame,
    setAnswer,
    setNewGameReq,
    resetGame,
}