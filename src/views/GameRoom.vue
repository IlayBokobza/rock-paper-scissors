<template>
  <div class="game-room">
    <div class="text-center mt-2 text-box">
      <h1 class="font-weight-bold" v-if="!enemy">Game Id: {{gameID}}</h1>
      <h2 v-if="!result">Enemy: {{enemy || 'waiting...'}}</h2>
      <h2 v-if="enemy && hasEnemyAnswered && !result">{{enemy}} has answered!</h2>
      <h2 v-if="answer">You Chose: {{answer}}</h2>
      <h2 v-if="result === 'tie'">Result: Tie!</h2>
      <h2 v-else-if="result === 'you'">You won!</h2>
      <h2 v-else-if="result">Result: {{result}} has won!</h2>
    </div>
    <button class="new-game-btn" v-if="result && !reqForNewGame" @click="socket.emit('reqNewGame');reqForNewGame = true">New Game?</button>
    <p v-if="reqForNewGame" class="new-game-btn">Request Sent!</p>
    <v-container class="d-flex justify-space-around" v-if="enemy && !answer">
      <button @click="sendAnswer('rock')"><img alt="cartoon rock" src="@/assets/rock.png"></button>
      <button @click="sendAnswer('paper')"><img alt="cartoon paper" src="@/assets/paper.png"></button>
      <button @click="sendAnswer('scissors')"><img alt="cartoon scissors" src="@/assets/scissors.png"></button>
    </v-container>
    <Popup @agree="leaveGame" :model="popupModel" :text="popupText" :title="popupTitle" onlyAccept="true" btnText="Go Back" />
    <Popup @agree="socket.emit('reqNewGame')" @disagree="leaveGame" :model="alertPopupModel" :title="alertPopupTitle" :text="alertPopupText" />
  </div>
</template>

<script>
import {io} from 'socket.io-client'
import Popup from "@/components/Popup";
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
      reqForNewGame:false,
      //popup values
      popupModel:false,
      popupText:null,
      popupTitle:null,
      //alert popup
      alertPopupModel:false,
      alertPopupTitle:null,
      alertPopupText:null,
    }
  },
  components:{
    Popup
  },
  created() {
    //set up socket events
    this.socketEvents()

    //joinRoom
    this.socket.emit('joinRoom',{
      whoToUpdate:this.$route.query.player,
      gameID:this.gameID,
    },(err) => {
      this.popupTitle = 'Sorry, An Error has occurred'
      this.popupText = err.Error
      this.popupModel = true
    })

    //makes sure to disconnect from socket when closes tab
    window.addEventListener('beforeunload',(e) => {
      e.preventDefault()
      this.socket.disconnect()
    })
  },
  beforeDestroy() {
    this.socket.disconnect()
    this.$store.commit('resetSocket')
  },
  methods:{
    sendAnswer(answer){
      this.answer = answer
      this.socket.emit('answer',answer)
    },
    leaveGame(){
      this.socket.disconnect()
      this.$store.commit('resetSocket')
      this.$router.push({path:'/join-room'})
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
        this.popupTitle = 'Alert!'
        this.popupText = 'The other user has disconnected!'
        this.popupModel = true
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

      //requested a new game
      this.socket.on('reqNewGame',() => {
        this.alertPopupText = `${this.enemy} has requested a new game!`
        this.alertPopupTitle = 'Alert!'
        this.alertPopupModel = true
      })

      //start New Game
      this.socket.on('startNewGame',() => {
        //resets values
        this.alertPopupModel = false
        this.result = null
        this.hasEnemyAnswered = false
        this.answer = false
        this.reqForNewGame = false
      })
    }
  },
  computed:{
    socket(){
      if(this.$store.state.socket){
        return this.$store.state.socket
      }else {
        return io()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
button{
  outline: none;
}
.text-box{
  *{
    font-weight: 300;
  }
}
.new-game-btn{
  display: block;
  margin: 10px auto;
  text-decoration: underline;
  text-align: center;
}
img{
  width: 280px;
}
</style>