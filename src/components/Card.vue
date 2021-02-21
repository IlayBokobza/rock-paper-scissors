<template>
  <div @click="$emit('click')" class="my-card">
    <h2>{{title}}</h2>
    <img alt :src="src">
  </div>
</template>

<script>
export default {
  name: "Card",
  props:['img','title'],
  data(){
    return{
      src:null
    }
  },
  created() {
    switch (this.img){
      case 'paper':
        this.src = require('@/assets/paper.png')
        break;
      case 'pc':
        this.src = require('@/assets/pc.png')
        break;
      case 'rock':
        this.src = require('@/assets/rock.png')
        break;
      case 'scissors':
        this.src = require('@/assets/scissors.png')
        break
      case 'vs':
        this.src = require('@/assets/vs.png')
        break;
      default:
        this.src = 'https://vuejs.org/images/logo.png';
        break;
    }
  }
}
</script>

<style lang="scss" scoped>
.my-card{
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  background: #FFFFFF;
  border: 1px solid #CFCFCF;
  width: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
  transform: translateY(0);
  transition: all .1s;

  &:hover{
    transform: translateY(-5px);
    box-shadow: 3px 7px 7px rgba(0, 0, 0, 0.25);
  }

  img{
    width: 100%;
    -webkit-user-drag: none;
  }
}
</style>