import { createStore } from 'vuex';
import userModule from './modules/user.js';
import roomModule from './modules/room.js';
import reviewModule from './modules/review.js';
import authModule from './modules/auth.js';
import announceModule from './modules/announce.js';

console.log({authModule})
const store = createStore({
	modules: {
		user: userModule,
		room: roomModule,
		review: reviewModule,
		auth: authModule,
		announce: announceModule,
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