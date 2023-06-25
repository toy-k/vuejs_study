import { createStore } from 'vuex';
import userModule from './modules/user.js';
import roomModule from './modules/room.js';


const store = createStore({
	modules: {
		user: userModule,
		room: roomModule
	},
	state() {
		return {
		};
	},
	getters: {},
	mutations: {},
	actions: {},
});

export default store;