<template>
  <div class="game-room">
    <h1>Game Room</h1>
    <h2 v-if="!enemy">Game Id: {{gameID}}</h2>
    <h2 v-if="!result">Enemy: {{enemy || 'waiting...'}}</h2>
    <h2 v-if="enemy && hasEnemyAnswered && !result">{{enemy}} has answered!</h2>
    <h2 v-if="answer">You Chose: {{answer}}</h2>
    <h2 v-if="result === 'tie'">Result: Tie!</h2>
    <h2 v-else-if="result">Result: {{result}} has won!</h2>
    <div v-if="enemy">
      <button :disabled="answer" @click="sendAnswer('rock')">Rock</button>
      <button :disabled="answer" @click="sendAnswer('paper')">Paper</button>
      <button :disabled="answer" @click="sendAnswer('scissors')">Scissors</button>
    </div>
  </div>
</template>

<script>
import {io} from 'socket.io-client'
export default {
  name: "GameRoom",
  data(){
    return{
      gameID: this.gameID = this.$route.query.gameID,
      name:this.$route.query.gameID,
      enemy:null,
      answer:null,
      hasEnemyAnswered:false,
      result:null,
      socket:io()
    }
  },
  created() {
    //set up socket events
    this.socketEvents()

    //joinRoom
    this.socket.emit('joinRoom',{
      whoToUpdate:this.$route.query.player,
      gameID:this.gameID,
    },(err) => {
      console.warn(err)
    })
  },
  methods:{
    sendAnswer(answer){
      this.answer = answer
      this.socket.emit('answer',answer)
    },
    socketEvents(){
      //game start
      this.socket.on('gameStart',(data) => {
        if(this.$route.query.player === 'host'){
          this.enemy = data.player.username
        }else {
          this.enemy = data.host.username
        }
      })
      //game over
      this.socket.on('gameOver',() => {
        this.$router.push({name:'Home'})
      })

      //enemy answered
      this.socket.on('enemyAnswered',() => {
        this.hasEnemyAnswered = true
      })

      //both answered
      this.socket.on('result',(res) => {
        if(res !== 'tie'){
          if(res === this.$route.query.player){
            res = 'you'
          }else {
             res = this.enemy
          }
        }
        this.result = res
      })
    }
  }
}
</script>

<style scoped>

</style>