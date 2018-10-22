<template>
  <div v-bind='item.id'>
    <h1>{{item.no}}</h1>
    <article></article>
    <b-modal></b-modal>
      <b-button @click='home'>뒤로가기</b-button>
  </div>
</template>

<script>
import axios from 'axios';
 const baseURI = 'http://comento.cafe24.com/detail.php?req_no=';
  export default {
    data() {
      return {
        id: this.$route.params.id,
        item: {}
      }
    },
    methods: {
        home() {
            this.$router.push('/');
    }
  },
  mounted() {
    axios
      this.$http.get(`${baseURI}` + this.id)
      .then((result) => {
        console.log(result.data.detail.article)
        this.item = result.data.detail.article
      })
      },
  }
</script>



<style>

</style>