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



router.beforeEach(async(to, from, next) => {
    await store.restored
    const isPublic = to.matched.some(record => record.meta.public);

    const onlyWhenLoggedOut = to.matched.some(
        record => record.meta.onlyWhenLoggedOut
    );
    const loggedIn = store.getters.isLoggedIn;


    // Do not allow user to visit login page or register page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
        if (isPublic) {
            return next("/");
        }
        return next("/");
    }


    next();
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')