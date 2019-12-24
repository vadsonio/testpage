import Vue from 'vue'
import Vuex from 'vuex'

import searchParameters from './modules/searchParameters';
import chatParametres from './modules/chatParameters';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    searchParameters,
    chatParametres
  }
})