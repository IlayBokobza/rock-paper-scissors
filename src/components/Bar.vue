<template>
  <v-app-bar color="#356BF5" class="v-app-bar"><span @click="goHome">Rock Paper Scissors</span></v-app-bar>
</template>

<script>
export default {
  name: "Bar",
  methods:{
    goHome(){
      if(this.$route.path !== '/'){
        this.$router.push({path:'/'})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-app-bar{
  font-family: 'Chelsea Market', cursive;
  flex: 0;
  user-select: none;
  span{
    color: #EDEDED;
    margin: 0 auto;
    display: block;
    font-size: 40px;
    cursor: pointer;
  }
}
</style>