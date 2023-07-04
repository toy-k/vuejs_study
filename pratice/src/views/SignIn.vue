<template>
	<v-container>
		<h1>Login</h1>
		<v-card>
			<v-divider class="my-4"></v-divider>

			<v-row>
				<v-col cols="6" sm="6">
					<h2>Social Login</h2>
					<v-card-text>
						<v-btn color="primary" @click="loginWithGoogle">
								Login with Google
						</v-btn>
						<v-spacer></v-spacer>
						<v-btn color="primary" @click="loginWithKakao">
							Login with Kakao
						</v-btn>
				</v-card-text>
				</v-col>

				<v-col cols="6" sm="6">
					<h2>Server FAKEUSER</h2>
					<v-btn color="error" @click="getFakeUserFromServer(6)">Fake Admin User</v-btn>
					<v-spacer></v-spacer>
					<v-btn v-for="(i, idx) in 5" :key="idx" color="secondary" @click="getFakeUserFromServer(i)">Fake User {{ i
					}}</v-btn>
					<v-spacer></v-spacer>
					<v-btn color="primary" @click="checkFakeUser">Check Fake User</v-btn>
					<v-spacer></v-spacer>
					<v-btn color="error" @click="logout">Logout</v-btn>
				</v-col>
			</v-row>

		</v-card>
	</v-container>
</template>

<script>
import axios from 'axios';

export default {
	methods: {
		async getFakeUserFromServer(userId) {
			try {
				const response = (await axios.get(`http://localhost:8080/fakeuser/fakeuser${userId}`, { withCredentials: true }))

				const fakeUser = response.data;
				const expires = response.headers.expires;

				let imageData = (await axios.get(`https://jsonplaceholder.typicode.com/photos?id=${userId}`)).data
				if (fakeUser.profile == null) {
					fakeUser['profile'] = imageData[0].url
				} else {
					fakeUser['profile'] = `data:image/jpeg;base64,${fakeUser.profile}`
				}
				fakeUser['userId'] = fakeUser['id']
				fakeUser['expiresIn'] = expires //120 000 = 2분 
				fakeUser['accessToken'] = this.$cookies.get('AccessToken');


				await this.$store.dispatch('auth/login', fakeUser);

				this.$cookies.set('AccessToken', '');
			} catch (e) {
				return new Error("fakeuser api from server = ", e);
			}

		},
		async checkFakeUser() {
			const user = await this.$store.getters['auth/getUser']
			const accessToken = this.$store.getters['auth/getAccessToken']

			console.log(user)
			console.log(accessToken)

			return user;
		},
		async logout() {
			await this.$store.dispatch('auth/logout');
		},
		loginWithGoogle() {
			//http://localhost:8080/oauth2/authorization/google
			console.log('Logging in with Google');
			window.location.href = 'http://localhost:8080/oauth2/authorization/google';

		},
		loginWithKakao() {
			console.log('Logging in with Kakao');
		},
		async socialLogin() {
			const user = await this.$store.getters['auth/getUser'];
			
			// console.log({user})
			if (user) {
				return;
			}

			const accessToken = this.$cookies.get('AccessToken');
			const headers = {
				Authorization: `Bearer ${accessToken}`,
			};

			if (accessToken) {
				const response = await axios({
					method: 'get',
					url: 'http://localhost:8080/api/user/me',
					headers: headers
				});

				const me = response.data;
				const expires = this.$cookies.get('expires');

				let imageData = (await axios.get(`https://jsonplaceholder.typicode.com/photos?id=${me.id}`)).data
				if (me.profile == null) {
					me['profile'] = imageData[0].url
				} else {
					me['profile'] = `data:image/jpeg;base64,${me.profile}`
				}
				me['userId'] = me['id']
				me['expiresIn'] = expires //120 000 = 2분 
				me['accessToken'] = accessToken;

				const saveMe = await this.$store.dispatch('auth/login', me);
				this.$cookies.set('AccessToken', '');

				await this.$router.push('/');
			} else { 
				return ;
			}

		}

	},
	created() {
		console.log("[craeted]")
				this.socialLogin();

	},
};
</script>