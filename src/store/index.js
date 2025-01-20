import { createStore } from "vuex";
import state from '@/store/states'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import getters from  '@/store/getter'
//导入此插件实现数据持久化  无需手动
import createPersistedState from "vuex-persistedstate"
export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {},
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
});
