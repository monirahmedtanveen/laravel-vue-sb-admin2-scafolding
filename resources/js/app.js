require('./bootstrap');
window.Vue = require('vue');

import router from './router'

Vue.component('mainapp', require('./components/MainApp.vue').default);

const app = new Vue({
    el: '#app',
    router
});
