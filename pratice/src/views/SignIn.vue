<template>
	<v-container>
		<h1>Login</h1>
		<v-card>
			<v-card-text>
				<v-btn color="primary" @click="loginWithGoogle">
					Login with Google
				</v-btn>
				<v-btn color="primary" @click="loginWithKakao">
					Login with Kakao
				</v-btn>
			</v-card-text>

		<v-divider class="my-4"></v-divider>

		<v-row>
			<v-col cols="6" sm="6">
					<h2>FRONTEND FAKEUSER</h2>	
					<v-btn v-for="(i, idx) in 5" :key="idx" color="secondary" @click="getFakeUserFromOpenApi(i)">Fake User {{ i }}</v-btn>
					<v-spacer></v-spacer>
						<v-btn color="primary" @click="checkFakeUser">Check Fake User</v-btn>
						<v-spacer></v-spacer>
						<v-btn color="error" @click="logout">Logout</v-btn>
				</v-col>

			<v-col cols="6" sm="6">
				<h2>Server FAKEUSER</h2>	
				<v-btn v-for="(i, idx) in 5" :key="idx" color="secondary" @click="getFakeUserFromServer(i)">Fake User {{ i }}</v-btn>
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
		loginWithGoogle() {
			console.log('Logging in with Google');
		},
		loginWithKakao() {
			console.log('Logging in with Kakao');
		},
			async getFakeUserFromOpenApi(userId) {
			console.log({userId}) 
			let userData = (await axios.get(`https://jsonplaceholder.typicode.com/users?id=${userId}`)).data
			let imageData = (await axios.get(`https://jsonplaceholder.typicode.com/photos?id=${userId}`)).data
			console.log(imageData)
			let user = userData.map((u) => {
				return {
					userId: u.id,
					username: u.username,
					email: u.email,
					description: u.website,
					accessToken: "fakeToken",
					profile: imageData[0].url,
					expiresIn: 1000, // 100 seconds
				}			
			})[0]
			console.log({user})
			await this.$store.dispatch('auth/login', user);			
		},
		async getFakeUserFromServer(userId) { 
			try {
				const response = (await axios.get(`http://localhost:8080/fakeuser/fakeuser${userId}`))

				const fakeUser = response.data;
				const expires = response.headers.expires;

				let imageData = (await axios.get(`https://jsonplaceholder.typicode.com/photos?id=${userId}`)).data
				if (fakeUser.profile == null) {
					fakeUser['profile'] = imageData[0].url
				} else { 
					fakeUser['profile'] = `data:image/jpeg;base64,${fakeUser.profile}`
				}
				fakeUser['userId'] = fakeUser['id']
				fakeUser['expiresIn'] = expires // 100초 이후 로그아웃 (/10000 -> 10초, /1000 ->100초)

				await this.$store.dispatch('auth/login', fakeUser);

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
		}
	}
};
</script>