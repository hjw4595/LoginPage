<template>
  <div id="app">
    <div>

    </div>
    <body>
      <router-view></router-view>

    </body>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BootstrapVue from 'bootstrap-vue'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import MainPage from './components/MainPage.vue';

  Vue.use(BootstrapVue)
  
  export default {
    name: 'App',
    components: {
       MainPage
    },
    data: function () {
      return {
        created(){
        }
      }
    }
  };
</script>

<style>

</style>