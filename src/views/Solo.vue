<template>
  <div class="game-room">
    <div class="text-center mt-2 text-box">
      <h1 class=" mb-5">Solo</h1>
      <h2 v-if="result">Result: You Lose!</h2>
    </div>
    <button class="new-game-btn" v-if="result" @click="newGame">New Game?</button>
    <v-container class="d-flex justify-space-around" v-if="!result">
      <button @click="pick"><img alt="cartoon rock" src="@/assets/rock.png"></button>
      <button @click="pick"><img alt="cartoon paper" src="@/assets/paper.png"></button>
      <button @click="pick"><img alt="cartoon scissors" src="@/assets/scissors.png"></button>
    </v-container>
    <Popup @agree="popupModel = false" :model="popupModel" title="Alert!" text="Hint: you cant win solo loser! get friend lol!" onlyAccept="true" btnText="ok :("/>
  </div>
</template>

<script>
import Popup from "@/components/Popup";
export default {
  name: "Solo",
  components: {Popup},
  data(){
    return{
      result:false,
      count:0,
      answer:false,
      popupModel:false,
    }
  },
  methods:{
    pick(){
      this.result = true
      this.count++

      if(this.count === 5){
        this.count = 0
        this.popupModel = true
      }
    },
    newGame(){
      this.result = false
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
}
img{
  width: 280px;
}
</style>