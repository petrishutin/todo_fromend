import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    isLoggedIn: false,
    token: null,
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    token: state => state.token,
  },
  mutations: {
    setLoggedIn(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    async login({commit}, credentials) {
      try {
        const data = new FormData();
        for (const key in credentials) {
          data.append(key, credentials[key]);
        }
        const response = await axios.post('http://localhost:8000/api/v1/login', data);
        if (response.status === 200) {
          commit('setToken', `Bearer ${response.data.access_token}`);
          commit('setLoggedIn', true);
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    logout({commit}) {
      commit('setLoggedIn', false);
    }
  },
  modules: {},
  plugins: [
    store => {
      const savedState = localStorage.getItem('vuex');
      if (savedState) {
        store.replaceState(JSON.parse(savedState));
      }

      window.addEventListener('beforeunload', () => {
        localStorage.setItem('vuex', JSON.stringify(store.state));
      });
    },
  ],
})
