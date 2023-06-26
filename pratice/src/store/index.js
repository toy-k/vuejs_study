import { createStore } from 'vuex';
import userModule from './modules/user.js';
import roomModule from './modules/room.js';
import commentModule from './modules/comment.js';


const store = createStore({
	modules: {
		user: userModule,
		room: roomModule,
		comment: commentModule,
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