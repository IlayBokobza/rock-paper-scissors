<template>
  <v-app class="text-center">
    <h1>In Queue</h1>
    <h2 v-if="!isGameFound">Waiting for a game...</h2>
    <h2 v-else>Game Found</h2>
    <loader v-if="!isGameFound" class="center mt-16" />
    <Popup @agree="leave" :model="popupModel" :text="popupText" title="Sorry, an error has occurred..." onlyAccept="true" btnText="Go Back" />
  </v-app>
</template>

<script>
import {io} from 'socket.io-client'
import Popup from "@/components/Popup";
import Loader from "@/components/Loader";
export default {
  name: "Queue",
  components: {Loader, Popup},
  data(){
    return{
      socket:io(),
      name:this.$route.query.name,
      popupModel:false,
      popupText:null,
      isGameFound:false,
    }
  },
  created() {
    this.socket.emit('joinQueue',this.name,(err) => {
      this.popupText = err.Error
      this.popupModel = true
    })
    //set socket events
    this.socketEvents()
  },
   beforeDestroy() {
    if(!this.isGameFound){
      this.socket.disconnect()
      this.$store.commit('resetSocket')
    }
  },
  methods:{
    socketEvents() {
      this.socket.on('gameFound',({gameID,playerType}) => {
        this.isGameFound = true
        this.$store.commit('setSocket',this.socket)
        setTimeout(() => {
          this.$router.push({path:'/game-room',query:{username:`${this.name}`,gameID,player:playerType}})
        },1000)
      })
    },
    leave(){
      this.socket.disconnect()
      this.$router.push({path:'/'})
    }
  }
}
</script>

<style scoped>

</style>