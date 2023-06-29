<template>
	<v-container>
		<h1>My Profile</h1>
	
			<v-card color="">
				<v-row>
						<v-col cols="10">
						</v-col>
						<v-col cols="2">
									<v-btn color="indigo-lighten-4" @click="editUser">edit</v-btn>
						</v-col>
					</v-row>

				<v-row>
					<v-col cols="1">
					</v-col>	
				<v-col cols="4">
					<v-avatar size="270">
							<v-img v-if="getUserFromServer().profile" :src="getUserFromServer().profile" :alt="getUserFromServer().username"></v-img>
						<v-icon v-else>mdi-account-circle</v-icon>
					</v-avatar>
				</v-col>
				<v-col cols="6">
					<v-card-text>
						<v-row>
							<v-col cols="12">
								<v-text-field v-model="getUserFromServer().email" label="Email" readonly></v-text-field>
									<v-text-field v-model="getUserFromServer().username" label="Username" readonly></v-text-field>
									<v-textarea v-model="getUserFromServer().description" label="Description" readonly></v-textarea>
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
	name: 'MyDetail',
	data() {
		return {
		};
	},
	mounted() {
	},
	methods: {
		getUserFromServer() {
			let user = this.$store.getters['auth/getUser'];
			return user
		},
		editUser() { 
			this.$router.push({ name: 'UpdateMyDetail' });
		},
		
	}
};
</script>