<template>
	<v-container>

				<v-btn color="primary" @click="userDetail(item)" v-for="(item, idx) in 10" :key="idx">
					user {{ item }}
				</v-btn>
	
		<v-spacer></v-spacer>

		<h1>User Profile</h1>
			<v-card>
			<v-row>
				<v-col cols="4">
					<v-avatar size="150">

						<v-img v-if="getUser && getUser.profile" :src="getUser.profile" :alt="getUser.username"></v-img>

						<v-icon v-else>mdi-account-circle</v-icon>
					</v-avatar>
				</v-col>
				<v-col cols="8">
					<v-card-text>
						<v-row>
							<v-col cols="6" >
								<v-text-field v-if="getUser" v-model="getUser.username" label="Username" readonly></v-text-field>
								<v-text-field v-if="getUser" v-model="getUser.email" label="Email" readonly></v-text-field>
							</v-col>
							<v-col cols="6">
								<v-textarea v-if="getUser" v-model="getUser.description" label="Description" readonly></v-textarea>
							</v-col>
						</v-row>
					</v-card-text>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
		};
	},
	mounted() {
	},
	methods: {
		async getUserData(userId) {
			// console.log(`[UserDetail] getUserData() userId : " + ${userId}`);
			
			let userAxios = (await axios(`https://jsonplaceholder.typicode.com/users/` + userId)).data //object
			// console.log({userAxios})
			let albumAxios = (await axios(`https://jsonplaceholder.typicode.com/albums?userId?` + userId)).data // array
			// console.log({ albumAxios })
			let photoAxios = (await axios(`https://jsonplaceholder.typicode.com/photos?albumId=` + albumAxios[userId].id)).data
			// console.log({ photoAxios })
			let photo = photoAxios[userId].url;

			userAxios['profile'] = photo;
			userAxios['description'] = userAxios['website'];
			// console.log({ userAxios })

			this.$store.dispatch('user/addUser', userAxios);

			this.userData = userAxios;

		},
		userDetail(userId) { 
			// console.log(`[UserDetail] userDetail() userId : " + ${ userId }`)
			this.getUserData(userId);
		}
	},
	computed: {
		getUser() {
			return this.$store.getters['user/getUser'];
		}
	}
};
</script>