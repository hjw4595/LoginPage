import MainPage from '../components/MainPage.vue';
import DetailPage from '../components/DetailPage.vue';

export default [{
    path: '/',
    name: 'MainPage',
    component: MainPage
}, {
    path: '/detailPage/:id',
    name: 'DetailPage',
    component: DetailPage
}, ]