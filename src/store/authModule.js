import axios from "axios";

const login = async (commit, credentials, callback) => {
  try {
    const data = new FormData();
    data.append('username', credentials.username);
    data.append('password', credentials.password);
    const response = await axios.post(`${process.env.VUE_APP_API_ROOT}login`, data);
    if (response.status === 200) {
      commit('setToken', `Bearer ${response.data.access_token}`);
      commit('setLoggedIn', true);
      if (callback && typeof callback === 'function') {
        callback();
      }
    } else {
      console.log(response.data);
      alert(response.data.detail);
    }
  } catch (error) {
    if ('response' in error && 'detail' in error.response.data) {
      alert(error.response.data.detail);
    }
    console.log(error);
  }
};

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
    async register({ commit }, credentials) {
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_ROOT}user`, credentials);
        if (response.status === 201) {
          const login_credentials = {
            username: credentials.email,
            password: credentials.password1,
          };
          await login(commit, login_credentials, credentials.callback);
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        if ('response' in error && 'detail' in error.response.data) {
          alert(error.response.data.detail);
        }
        console.log(error);
      }
    },
    async login({ commit }, credentials) {
      await login(commit, credentials, credentials.callback);
    },
    logout({ commit }) {
      commit('setToken', null);
      commit('setLoggedIn', false);
    }
  }
};
