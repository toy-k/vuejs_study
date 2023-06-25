<template>
	<v-container>
		<h1>My Profile</h1>
		<v-card>
			<v-row>
				<v-col cols="4">
					<v-avatar size="150">
						<v-img v-if="userData.profile" :src="userData.profile" :alt="userData.username"></v-img>
						<v-icon v-else>mdi-account-circle</v-icon>
					</v-avatar>
				</v-col>
				<v-col cols="8">
					<v-card-text>
						<v-row>
							<v-col cols="6">
								<v-text-field v-model="userData.username" label="Username" readonly></v-text-field>
								<v-text-field v-model="userData.email" label="Email" readonly></v-text-field>
							</v-col>
							<v-col cols="6">
								<v-textarea v-model="userData.description" label="Description" readonly></v-textarea>
							</v-col>
						</v-row>
					</v-card-text>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
export default {
	name: 'MyDetail',
	data() {
		return {
			userData: {
				id: null,
				username: '',
				profile: null,
				email: '',
				description: ''
			}
		};
	},
	mounted() {
		this.getUserData();
	},
	methods: {
		getUserData() {
			// Simulate GET request to retrieve user data
			// Replace this with your actual API call
			setTimeout(() => {
				const responseData = {
					id: 1,
					username: 'fakeuser1',
					profile: 'https://example.com/profile-image.jpg',
					email: 'jeonghwanlee11@gmail.com',
					description: 'fakeuser1description'
				};
				this.userData = responseData;
			}, 1000);
		}
	}
};
</script>