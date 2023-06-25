const roomModule = {
	namespaced: true,
	state() {
		return {
			room: null,
			roomList: [],
		}
	},
	mutations: {
		setRoom(state, payload) {
			state.room = payload;
		},
		setRoomList(state, payload) {
			state.roomList = payload;
		},
	},
	actions: {
		setRoom(context, payload) {
			context.commit('setRoom', payload);
		},
		setRoomList(context, payload) {
			context.commit('setRoomList', payload);
		},
	},
	getters: {
		getRoom(state) {return state.room;},
		getRoomList(state) {return state.roomList;},
	}
}

export default roomModule;