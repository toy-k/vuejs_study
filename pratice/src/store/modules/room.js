const roomModule = {
	namespaced: true,
	state() {
		return {
			room: null,
			roomList: [],
			createdRoom: null,
			count: 0,
		}
	},
	mutations: {
		setRoom(state, payload) {
			state.room = payload;
		},
		setRoomList(state, payload) {
			state.roomList = payload;
		},
		setCreatedRoom(state, payload) {
			state.createdRoom = payload;
		},
		setCount(state, payload) {
			state.count = payload;
		}
	},
	actions: {
		setRoom(context, payload) {
			context.commit('setRoom', payload);
		},
		setRoomList(context, payload) {
			context.commit('setRoomList', payload);
		},
		setCreatedRoom(context, payload) {
			context.commit('setCreatedRoom', payload);
		},
		setCount(context, payload) {
			context.commit('setCount', payload);
		}
	},
	getters: {
		getRoom(state) {return state.room;},
		getRoomList(state) { return state.roomList; },
		getCreatedRoom(state) { return state.createdRoom; },
		getCount(state) { return state.count; },
	}
}

export default roomModule;