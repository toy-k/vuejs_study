const roomModule = {
	namespaced: true,
	state() {
		return {
			room: null,
			roomList: [],
			createdRoom: null,
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
		}
	},
	getters: {
		getRoom(state) {return state.room;},
		getRoomList(state) { return state.roomList; },
		getCreatedRoom(state) { return state.createdRoom; },
	}
}

export default roomModule;