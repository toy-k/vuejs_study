const userModule= {
	namespaced: true,
	state() {
		return {
			user: null
		}
	},
	mutations: {
		addUser(state, payload) {
			state.user = payload;
		}
	},
	actions: {
		addUser(context, payload) {
			context.commit('addUser', payload);
		},
	},
	getters: {
		getUser(state) { 
			return state.user;
		}
	}
}

export default userModule;