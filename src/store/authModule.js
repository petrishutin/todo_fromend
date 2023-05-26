import axios from "axios";

export const authModule = {
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
    async register({commit}, credentials) {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/user', credentials);
        if (response.status === 201) {
          try {
            const data = new FormData();
            data.append('username', credentials.email);
            data.append('password', credentials.password1);
            const response = await axios.post('http://localhost:8000/api/v1/login', data);
            if (response.status === 200) {
              commit('setToken', `Bearer ${response.data.access_token}`);
              commit('setLoggedIn', true);
              if (credentials.callback && typeof credentials.callback === 'function') {
                credentials.callback();
              }
            } else {
              alert(response.data.message);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async login({commit}, credentials) {
      try {
        const data = new FormData();
        data.append('username', credentials.username);
        data.append('password', credentials.password);
        const response = await axios.post('http://localhost:8000/api/v1/login', data);
        if (response.status === 200) {
          commit('setToken', `Bearer ${response.data.access_token}`);
          commit('setLoggedIn', true);
          console.warn(credentials.callback)
          if (credentials.callback && typeof credentials.callback === 'function') {
            credentials.callback();
          }
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
    logout({commit}) {
      commit('setToken', null);
      commit('setLoggedIn', false);
    }
  },
}