const calcResult = (hostPicked,playerPicked) => {
    switch(hostPicked){
        //host picked rock
        case 'rock':
            switch(playerPicked){
                case 'rock':
                    return 'tie'
                case 'paper':
                    return 'player'
                case 'scissors':
                    return 'host'
            }
            break;
            
        //host picked paper
        case 'paper':
            switch(playerPicked){
                case 'rock':
                    return 'host'
                case 'paper':
                    return 'tie'
                case 'scissors':
                    return 'player'
            }
            break;

        //host picked scissors
        case 'scissors':
            switch(playerPicked){
                case 'rock':
                    return 'player'
                case 'paper':
                    return 'host'
                case 'scissors':
                    return 'tie'
            }
            break;
    }
}


module.exports = {
    calcResult,
}