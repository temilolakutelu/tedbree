 import Vue from 'vue'
 import Vuex from 'vuex';
 import createPersistedState from "vuex-persistedstate";

 Vue.use(Vuex)

 export default new Vuex.Store({
     state: {
         isLoggedIn: false,
         token: '',
         user: {}
     },
     mutations: {
         setLoginState(state, data) {
             state.isLoggedIn = data
         },
         setToken(state, data) {
             state.token = data
         },

     },
     actions: {
         login({ commit, dispatch }, data) {
             commit('setToken', data)
             dispatch('setLoggedIn', true)
         },
         setLoggedIn({ commit }, status) {
             commit('setLoginState', status)
         }


     },
     modules: {},
     getters: {
         isLoggedIn: state => state.isLoggedIn,
         token: state => state.token
     },
     plugins: [createPersistedState()]
 })