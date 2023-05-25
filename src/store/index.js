import {createStore} from 'vuex'
import axios from "axios";
import {authModule} from "@/store/authModule";

export default createStore({
  modules: {
    auth: authModule,
  },
})
