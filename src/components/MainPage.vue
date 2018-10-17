<template>
    <div class='mainContents'>
        <div class='listMenu'>
        <b-button class='btn btn-primary'>필터</b-button>
        <a>오름차순</a> <a>내림차순</a>
        </div>

        <div class=list>
        <b-list-group>
                <b-list-group-item class='mt-5' v-for='item in list' v-bind:key='item.no'>
                    <div class='list-header'>
                        <a>{{item.category_no}}</a> <a id='contentNum'>{{item.no}}</a>
                        <hr>
                    </div>
                    <div class='list-info'>
                        <a>{{item.email}}</a>  <span> | </span> <a>{{item.updated_at}}</a>
                    </div>
                    <div class='list-title'>
                        <h5>{{item.title | to-uppercase}}</h5>
                        <article>{{item.contents | snippet }} </article>
                    </div>
 
            </b-list-group-item>
        </b-list-group>
        </div>
  <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </div>
        
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import axios from 'axios';

const api = 'http://comento.cafe24.com/request.php?page=2&ord=asc&caregory=2';

export default {
 name:'mainPage',
  data() {
    return {
        list:[]
    };
  },  
  components: {InfiniteLoading,},

    methods: {
    infiniteHandler($state) {
      axios.get(api, {
        params: {
          page: this.list.length / 10 + 1,
        },
      }).then(({ data }) => {
        if (data.list.length) {
          this.list = this.list.concat(data.list);
          $state.loaded();
          if (this.list.length / 20 === 10) {
            $state.complete();
          }
        } else {
          $state.complete();
        }
      });
    },
  },
};

</script>
 
<style>
div{
}
.mainContents{
    width: 60%;
    margin: 0 auto;
}
.listMenu a{
   float: right;
   margin-right: 1rem;
}
#contentNum{
    float: right;
    margin-right: 1rem;
}

</style>
