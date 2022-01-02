import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import swal from "sweetalert2";
import Request from "./Request";
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import './registerServiceWorker'
import './index.css'
import "../src/assets/css/style.css"
import "../src/assets/css/variables.css"
import "../src/assets/css/responsive.css"
import "jquery";
Vue.config.productionTip = false

Vue.prototype.$request = Request;
Vue.prototype.$swal = swal;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')