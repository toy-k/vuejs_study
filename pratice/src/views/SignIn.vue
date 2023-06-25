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
		</v-card>
	</v-container>
</template>

<script>
export default {
	methods: {
		loginWithGoogle() {
			// Perform Google login logic here
			// Redirect or handle response from Google
			console.log('Logging in with Google');
		},
		loginWithKakao() {
			// Perform Kakao login logic here
			// Redirect or handle response from Kakao
			console.log('Logging in with Kakao');
		}
	}
};
</script>