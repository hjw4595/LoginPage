<template>
  <div class='mainContents'>
    {{$router.params}}
    <div class='listMenu'>
      <b-button @click="showModal">필터</b-button>
      <b-modal ref="myModalRef" hide-footer title="필터">
        <div class="d-block text-center">
          <b-form-group>
            <b-form-checkbox-group v-model="selected" :options="options"></b-form-checkbox-group>
          </b-form-group>
        </div>
        <b-btn class="mt-3 col-2" block @click="hideModal">저장</b-btn>
      </b-modal>

      <!-- <a href="javascript:void(0)" onclick='sorted()'>오름차순</a>
      <a href="javascript:nosorted();" onclick="return false;">내림차순</a> -->
    </div>

    <div class=list>
      <b-list-group>

        <b-list-group-item class='mt-5' v-for='(item, index) in list' v-bind:key='index'>

          <div class='list-ad' v-if='item.img'>
            <img v-bind:src="item.image" />
          </div>
          <div class='list-header' v-else>
            {{item.category_no}} <a id='contentNum'>{{item.no}}</a>
            <hr>
          </div>
          <div class='list-info'>
            {{item.email}} <span> | </span> {{item.updated_at}}
          </div>
          <div class='list-title'>
            <router-link v-bind:to="'/detailPage/' + item.no">
              <h5>{{item.title | to-uppercase}}</h5>
            </router-link>
            <article>{{item.contents | snippet }}</article>
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

// mounted:{
//   axios.get('http://comento.cafe24.com/request.php?ord=asc&caregory=1')
//   .then(function(res){
//     console.log('Data',res);
//   })
// }
// 'http://comento.cafe24.com/request.php?page=2&ord=asc&caregory=1';
  const mainContents = 'http://comento.cafe24.com/request.php?ord=asc&caregory=1';
  const mainads = 'http://comento.cafe24.com/ads.php';

  export default {
    name: 'mainPage',
    data() {
      return {
        ad_index: 0,
        four_ad: 1,
        flag: true,
        list: [],
        ads: [],

        selected: [],
        options: [{
            text: 'apple',
            value: '1'
          },
          {
            text: 'banana',
            value: '2'
          },
          {
            text: 'coconut',
            value: '3'
          },
        ]
      };
    },
  
    components: {
      InfiniteLoading,
    },

    methods: {
      //필터 모달 부분 
      showModal() {
        this.$refs.myModalRef.show()
      },
      hideModal() {
        this.$refs.myModalRef.hide()
      },
      //리스트 그려주는 부분
      infiniteHandler($state) {
        axios.get(mainContents, {
            params: {
              page: this.list.length / 10 + 1, // 
            },
          }).then(({
            data
          }) => {
            if (data.list.length) {
              this.list = this.list.concat(data.list);
              
              $state.loaded(); //불러오기 멈춤 
            } else {
              $state.complete(); //불러오기 
            }
          })
          .then( (o) => {
              //if (this.list.length == 10 || this.list.length % 40 == 0) {
                 axios.get(mainads, {
                  params: {
                    page: this.list.length / 40 + 1, // 40개 마다 페이지 넘겨줌
                  },
                }).then(({
                    data
                  }) => {
                    this.ads = this.ads.concat(data.list);
                    //광고 4번째 인덱스마다 넣어주기
                      let numAd = 3;
                      if (this.flag) numAd = 2;
                      this.flag = !this.flag

                      for (let seatAd = 0; seatAd < numAd; seatAd++) {
                        this.four_ad += 3;
                        this.list.splice(this.four_ad + this.ad_index -1 , 0, this.ads[this.ad_index++])
                      }
                    });
               // }
              })
          },
      },
      //정렬 x
      // computed: {
      //   sorted: function () {
      //     return item.no.sort()
      //   },
      //   nosorted: function () {
      //     let result = item.no.sort(function (a, b) {
      //       return b - a;
      //     })
      //   },
        //필터 -> 광고가 x 에러가남 
        // filtered: function () {
        //   return this.list.filter((item) => {
        //     return item.category_no.match(this.selected)
        //   })
        // }
      // }
    };

</script>

<style>
  div {}

  .mainContents {
    width: 80%;
    margin: 0 auto;
  }
  .listMenu a {
    float: right;
    margin-right: 1rem;
  }

  #contentNum {
    float: right;
    margin-right: 1rem;
  }

</style>
