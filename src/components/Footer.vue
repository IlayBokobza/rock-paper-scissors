<template>
  <v-footer padless>
    <v-col
        class="text-center"
        cols="12"
        absolute>{{ new Date().getFullYear() }} — Made By <a href="https://ilaydev.com"><strong>Ilay Bokobza</strong></a>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="scss" scoped>
.v-footer{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;

  a{
    color: #000000;
  }
}
</style>