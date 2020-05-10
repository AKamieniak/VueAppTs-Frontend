import Vue from 'vue';
import Vuex from 'vuex';
import { IRootState } from './states/root-state.interface';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store<IRootState>({
  strict: debug,
});
