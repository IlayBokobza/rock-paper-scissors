<template>
  <div class="home">
    <h1>hello world</h1>
    <input style="display: block;margin: 0 auto;" type="text" v-model="name">
    <button v-if="name" @click="createGame">Create Game</button>
    <button v-if="name" @click="joinGame">Join Game</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data(){
    return{
      name:null,
    }
  },
  components: {
  },
  created() {

  },
  methods:{
    async joinGame(){
      const gameID = prompt("What is the game id?")

      await axios.post(`/api/game/${gameID}`,{username:this.name})

      await this.$router.push({name:'GameRoom',query: {gameID,username:this.name,player:'player'}})
    },
    async createGame(){
      const {data} = await axios.post('/api/game',{username:this.name}).catch(err => console.warn(err))

      await this.$router.push({name:'GameRoom',query: {username:this.name,gameID:data.id,player:'host'}})
    }
  }
}
</script>
