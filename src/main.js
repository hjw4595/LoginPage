import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './router/index.js'
import axios from 'axios';

Vue.use(VueRouter)
Vue.prototype.$http = axios

Vue.filter('to-uppercase', function(value) {
    return value.toUpperCase();
});

Vue.filter('snippet', function(value) {
    return value.slice(0, 150) + '...';
});

Vue.config.productionTip = false

const router = new VueRouter({
    routes: Routes
})

new Vue({
    el: '#app',
    render: h => h(App),
    router: router
})