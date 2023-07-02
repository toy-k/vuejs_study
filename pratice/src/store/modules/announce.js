const announceModule = {
	namespaced: true,
	state() {
		return {
			announce: null,
			announceList: [],
			createdAnnounce: null,
			count: 0,

		}
	},
	mutations: {
		setAnnounce(state, payload) {
			state.announce = payload;
		},
		setAnnounceList(state, payload) {
			state.announceList = payload;
		},
		setCreatedAnnounce(state, payload) {
			state.createdAnnounce = payload;
		},
		setCount(state, payload) {
			state.count = payload;
		},

	},
	actions: {
		setAnnounce(context, payload) {
			context.commit('setAnnounce', payload);
		},
		setAnnounceList(context, payload) {
			context.commit('setAnnounceList', payload);
		},
		setCreatedAnnounce(context, payload) {
			context.commit('setCreatedAnnounce', payload);
		},
		setCount(context, payload) {
			context.commit('setCount', payload);
		},

	},
	getters: {
		getAnnounce(state) {return state.announce;},
		getAnnounceList(state) { return state.announceList; },
		getCreatedAnnounce(state) { return state.createdAnnounce; },
		getCount(state) { return state.count; },

	}
}

export default announceModule;