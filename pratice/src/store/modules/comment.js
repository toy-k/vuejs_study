const commentModule = {
  namespaced: true,
	state() {
		return {
			comment: null,
			commentList: [],
		}
	},  mutations: {
		setComment(state, payload) {
	    state.comment = payload;
    },
    setCommentList(state, payload) {
      state.commentList = payload;
    }
  },
  actions: {
		setComment(context, payload) {
	    context.commit('setComment', payload);
    },
    setCommentList(context, payload) {
      context.commit('setCommentList', payload);
    }
  },
  getters: {
    getComment(state) {
  		return state.comment;
    },
    getCommentList(state) {
      return state.commentList;
    },
  }
}

export default commentModule;