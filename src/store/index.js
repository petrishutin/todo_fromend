import {createStore} from 'vuex'
import {authModule} from "@/store/authModule";
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  modules: {
    auth: authModule,
  },
  plugins: [createPersistedState()]
})
