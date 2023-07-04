<template>


	<v-container>
		<h1 class="page-title">로그인</h1>
			

		<v-card>
		
			<v-row>
				<v-col cols="6" sm="6">
		<v-img
		  :width="500"
			:height="800"
		  aspect-ratio="16/9"
		  cover
		  src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
		></v-img>
					</v-col>
				<v-col cols="6" sm="6">
												<br>
					<br>
					<br>
				<h2>Social Login</h2><br>
						<v-card-text>
									<v-btn color="primary" @click="loginWithGoogle">
									Login with Google
							</v-btn>
		<br>
		<br>
								<v-btn color="primary" @click="loginWithKakao">
								Login with Kakao
							</v-btn>
					</v-card-text>
					<br>
					<br>
					<br>
						<br>
							<v-divider class="my-4"></v-divider>

						<br>
						<br>
							<br>
						<h2>Test User Login</h2>
						<br>
								<br>
							<v-btn color="error" @click="getFakeUserFromServer(6)">ADMIN USER</v-btn>
							<v-spacer></v-spacer>
							<br>
							<v-btn v-for="(i, idx) in 5" :key="idx" color="secondary" @click="getFakeUserFromServer(i)">TEST User {{ i
							}}</v-btn>
							<v-spacer></v-spacer>
							<!-- <v-btn color="primary" @click="checkFakeUser">Check Fake User</v-btn>
						<v-spacer></v-spacer>
						<v-btn color="error" @click="logout">Logout</v-btn> -->
							<br>

				</v-col>
			</v-row>

		</v-card>

		<br>
			<br>

	</v-container>
</template>

<script>
import axios from 'axios';

export default {
		computed: {
	},

	methods: {
				isLoggedIn() {
			const isLoggedIn = this.$store.getters['auth/isAuthenticated']
			if (isLoggedIn) {
				this.$router.push('/main-page')
			}
			return isLoggedIn;
		},

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
						this.isLoggedIn();

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
		this.isLoggedIn();
	},
};
</script>