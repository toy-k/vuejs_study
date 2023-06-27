let timer;

const authModule = {
	namespaced: true,
	state() { 
		return {
			userId: null,
			accessToken: null,
			user: null,
			didAutoLogout: false,
		}
	},
	mutations: {
		setUser(state, payload) {
			console.log("[setUser] ", payload);
			state.userId = payload.userId;
			state.accessToken = payload.accessToken;
			state.didAutoLogout = false;
			state.user = payload.user;
		},
		setAutoLogout(state) {
			state.didAutoLogout = true;
		}
	},
	actions: {
		async login(context, payload) { 
			console.log("[login] ", payload)
			return context.dispatch('auth', {
				...payload,
				mode: 'login'
			});
		},
		async auth(context, payload) {
			const mode = payload.mode;
			const userData = payload;
			const expiresIn = + userData.expiresIn * 1000;
			const expirationDate = new Date().getTime() + expiresIn;

			localStorage.setItem('accessToken', userData.accessToken);
			localStorage.setItem('userId', userData.userId);
			localStorage.setItem('accessTokenExpiration', expirationDate);

			timer = setTimeout(function () {
				context.dispatch('autoLogout');
			}, expiresIn);

			context.commit('setUser',
				{
				userId: userData.userId,
				accessToken: userData.accessToken,
				user:userData
				}
			);
		},
		tryLogin(context) {
			const accessToken = localStorage.getItem('accessToken');
			const userId = localStorage.getItem('userId');
			const accessTokenExpiration = localStorage.getItem('accessTokenExpiration');

			const expiresIn = +accessTokenExpiration - new Date().getTime();

			if (expiresIn < 0) {
				return;
			}

			timer = setTimeout(function () {
				context.dispatch('autoLogout');
			}, expiresIn);

			if(accessToken && userId) {
				context.commit('setUser', {
					userId: userId,
					accessToken: accessToken
				});
			}
		},
		logout(context) {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('userId');
			localStorage.removeItem('accessTokenExpiration');

			clearTimeout(timer);

			context.commit('setUser', {
				userId: null,
				accessToken: null
			});
		},
		autoLogout(context) {
			context.dispatch('logout');
			context.commit('setAutoLogout');
		}
		
	},
	getters: {
		getUserId(state) { return state.userId; },
		getaccessToken(state) { return state.accessToken; },
		getDidAutoLogout(state) { return state.didAutoLogout; },
		isAuthenticated(state) { return !!state.accessToken; },
		getUser(state) { return state.user; },

	}
}

export default authModule;
