<template>
  <v-app>
    <Bar/>
    <router-view></router-view>
    <Footer/>
  </v-app>
</template>
<script>
import Bar from '@/components/Bar'
import Footer from "@/components/Footer";
export default {
  name: 'App',
  components: {
    Bar,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
  *{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
</style>
