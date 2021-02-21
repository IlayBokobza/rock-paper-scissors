<template>
  <div>
    <v-container class="d-flex mt-10 justify-space-around">
      <Card @click="$router.push({path:'/solo'})" title="Solo" img="pc" />
      <Card @click="$router.push({path:'/join-room'})" title="Vs Friend" img="vs" />
    </v-container>
  </div>
</template>

<script>
import Card from "@/components/Card";
export default {
  name: "Home",
  components: {Card},
  methods:{
  }
}
</script>

<style scoped>

</style>