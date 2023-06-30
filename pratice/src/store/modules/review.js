const reviewModule = {
  namespaced: true,
	state() {
		return {
			review: null,
			reviewList: [],
		}
	},  mutations: {
		setReview(state, payload) {
	    state.review = payload;
    },
    setReviewList(state, payload) {
      state.reviewList = payload;
    }
  },
  actions: {
		setReview(context, payload) {
	    context.commit('setReview', payload);
    },
    setReviewList(context, payload) {
      context.commit('setReviewList', payload);
    }
  },
  getters: {
    getReview(state) {
  		return state.review;
    },
    getReviewList(state) {
      return state.reviewList;
    },
  }
}

export default reviewModule;