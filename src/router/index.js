import MainPage from '../components/MainPage.vue';
import DetailPage from '../components/DetailPage.vue';
import Popup from '../components/Popup.vue';

export default [{
    path: '/',
    name: 'MainPage',
    component: MainPage
}, {
    path: '/detailPage',
    name: 'DetailPage',
    component: DetailPage
}, {
    path: '/detailPage/popup',
    name: 'Popup',
    component: Popup
}]