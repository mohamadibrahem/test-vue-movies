import { createStore } from 'vuex'

export const store = createStore({
    state: {
        user: ''
    },
    mutations: {
        setUserData (state, userData) {
          state.user = userData
          localStorage.setItem('user', JSON.stringify(userData))
          axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
          Echo.connector.pusher.config.auth.headers['Authorization'] = `Bearer ${userData.token}`
        },
    
        clearUserData () {
          localStorage.removeItem('user')
          location.reload()
        }
    },
    
    actions: {
        login (data){
          commit('setUserData', data)  
        },
    
        logout ({ commit }) {
          commit('clearUserData')
        }
    },
    
    getters : {
        isLogged: state => !!state.user
    },
})
