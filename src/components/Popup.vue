<template>
  <v-row justify="center">
    <v-dialog v-model="model" persistent transition="dialog-top-transition" max-width="290">
      <v-card>
        <v-card-title class="headline">{{title}}</v-card-title>
        <v-card-text>{{text}}</v-card-text>
        <v-text-field v-if="input" aria-autocomplete="none" v-model="textModel" :label="placeholder || 'placeholder'"></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="!onlyAccept" color="blue darken-1" text @click="disagree">{{disagreeBtnText||'Disagree'}}</v-btn>
          <v-btn color="blue darken-1" text @click="agree">{{btnText||'Agree'}}</v-btn>
        </v-card-actions>
        <v-card-subtitle v-if="feedback" class="text-center red--text">{{feedback}}</v-card-subtitle>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "Popup",
  props:['model','title','text','input','onlyAccept','btnText','placeholder','feedback','disagreeBtnText'],
  data(){
    return{
      textModel:null
    }
  },
  methods:{
    disagree(){
      this.$emit('disagree')
    },
    agree(){
      this.$emit('agree',this.textModel)
    },
  }
}
</script>

<style lang="scss" scoped>
.v-input{
  width: 70%;
  display: block;
  margin: 0 auto;
}
.v-card,.v-card *{
  word-break: normal;
}
</style>