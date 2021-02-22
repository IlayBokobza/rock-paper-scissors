<template>
  <div class="home">
    <h1 class="text-center mb-4 mt-2">Join Room</h1>
    <v-text-field v-model="name" label="Username"></v-text-field>
    <v-container class="d-flex justify-space-around">
      <button v-if="name" @click="createGame">Create <br> Game</button>
      <button v-if="name" @click="namePopupModel = true">Join <br> Game</button>
      <button v-if="name" @click="$router.push({path:'/queue',query:{name}})">Queue <br> Game</button>
    </v-container>
    <Popup @disagree="namePopupModel = false" @agree="joinGame" :model="namePopupModel" :feedback="popupFeedback" title="Please Enter Game Id" input="true" disagreeBtnText="Cancel" btnText="Join" placeholder="Game Id"/>
  </div>
</template>

<script>
import axios from 'axios'
import Popup from "@/components/Popup";
import {io} from 'socket.io-client'
export default {
  name: 'Home',
  components:{
    Popup,
  },
  data() {
    return {
      name: null,
      namePopupModel:false,
      popupFeedback:null,
      socket:io()
    }
  },
  created() {

  },
  methods: {
    async joinGame(gameID) {
      if(!gameID){
        return this.popupFeedback = 'Please Provide a game id.'
      }
      this.popupFeedback = null

      try {
        await axios.post(`/api/game/${gameID}`, {username: this.name})

        await this.$router.push({name: 'GameRoom', query: {gameID, username: this.name, player: 'player'}})
      }catch (err){
        this.popupFeedback = err.response.data.Error
      }

    },
    async createGame() {
      const {data} = await axios.post('/api/game', {username: this.name}).catch(err => console.warn(err))

      await this.$router.push({name: 'GameRoom', query: {username: this.name, gameID: data.id, player: 'host'}})
    }
  }
}
</script>
<style lang="scss" scoped>
button{
  background: #FFFFFF;
  border: 2px solid #CFCFCF;
  box-sizing: border-box;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  padding: 50px;
  font-weight: 700;
  user-select: none;
  transform: translateY(0);
  transition: all .1s;

  &:hover{
    transform: translateY(-3px);
    box-shadow: 2px 5px 4px rgba(0, 0, 0, 0.25);
  }
}
.v-input{
  width: 50%;
  margin: 0 auto;
  display: block;
}
</style>
