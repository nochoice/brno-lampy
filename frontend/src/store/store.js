import Vuex from 'vuex';
import Vue from 'vue';
import {loadPoints, getPointDetail, getStreetPoints} from '../services/api';

Vue.use(Vuex);

const main = {
    state: {
        points: null,
        isDetail: false,
        detail: {},
        streets: {}
    },
    mutations: {
      loadPoints: (state, points) => { state.points = points },
      loadPointDetail: (state, detail) => { state.detail = detail },
      loadStreetPoints: (state, {street, data}) => { 
          state.streets[street] = data;
       },
      showDetail: (state) => { state.isDetail = true },
      hideDetail: (state) => { state.isDetail = true },
      toggleDetail: (state) => { state.isDetail = !state.isDetail },
    }, 
    actions: {
        loadPoints: async ({commit}) => {
            commit('loadPoints', await loadPoints());
        },
        loadPointDetail: async ({commit}, id) => {
            const point = await getPointDetail(id);
            const street = point.properties['název_ulice'];
            const streetPoints = await getStreetPoints(point.properties['název_ulice']);
            
            commit('loadStreetPoints', { street, data: streetPoints });
            commit('loadPointDetail', point);
        },
        loadStreetPoints: async ({commit}, street) => {
            commit('loadStreetPoints', {
                street, 
                data: await getStreetPoints(street)
            });
        },
        showDetail: async ({commit}) => {
            commit('showDetail');
        },
        hideDetail: async ({commit}) => {
            commit('hideDetail');
        },
        toggleDetail: async ({commit}) => {
            commit('toggleDetail');
        }
    }
  }

const store = new Vuex.Store({
    modules: {
        main
    }
});

export default store;