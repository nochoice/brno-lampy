import Vuex from 'vuex';
import Vue from 'vue';
import {loadPoints} from '../services/api';

Vue.use(Vuex);

const main = {
    state: {
        map: null,
        points: null
    },
    mutations: {
      loadPoints (state, points) {
        state.points = points
      },
      setMap(state, map) {
          state.map = map
      }
    }, 
    actions: {
        loadPoints: async ({commit}) => {
            commit('loadPoints', await loadPoints());
        }
    }
  }

const store = new Vuex.Store({
    modules: {
        main
    }
});

export default store;