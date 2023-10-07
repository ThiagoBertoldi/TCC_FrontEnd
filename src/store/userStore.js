import router from '@/router';
import axios from 'axios';
import { createStore } from 'vuex'

export default createStore({
   state: {
      user: null
   }, 
   mutations: {
      setUser: (state, user) => {
         state.user = user
      }
   },
   getters: {
      getUser(state) {
         return state.user
      }
   },
   actions: {
      login: async ({ commit }, dto) => {
         return await new Promise(async (resolve, reject) => {
            await axios.post('http://localhost:3000/login', dto)
            .then(response => {
               commit('setUser', response.data)
               resolve(response)
            })
            .catch(err => reject(err.response.data))
         })
      },
      cadastro: async({ dispatch }, dto) => {
         return await new Promise(async (resolve, reject) => {
            await axios.post('http://localhost:3000/register', { dto })
            .then(response => {
               resolve(response)
            })
            .catch(err => reject(err.response.data))
         })
      },
      setUserNull: async ({ commit }) => commit('setUser', null),
      logOut: async({ commit }) => {
         router.push('/')
         commit('setUser', null)
      }
   }
})
