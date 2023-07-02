const userModule= {
	namespaced: true,
	state() {
		return {
			user: null,
			userList:[],
		}
	},
	mutations: {
		setUser(state, payload) {
			state.user = payload;
		},
		setUserList(state, payload) {
			state.userList = payload;
		}
	},
	actions: {
		setUser(context, payload) {
			context.commit('setUser', payload);
		},
		setUserList(context, payload) {
			context.commit('setUserList', payload);
		}
	},
	getters: {
		getUser(state) { 
			return state.user;
		},
		getUserList(state) {
			return state.userList;
		}
	}
}

export default userModule;