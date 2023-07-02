<template>
	<v-container>
		<h1>User detail</h1>

		<v-card color="">
			<v-row>
				<v-col cols="10">
				</v-col>
				<v-col cols="2">
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="1">
				</v-col>
				<v-col cols="4">
					<v-avatar size="270">
						<v-img v-if="getUserFromServer().profile" :src="getUserFromServer().profile"
							:alt="getUserFromServer().username"></v-img>
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
	data() {
		return {
		};
	},
	mounted() {
	},
	methods: {
		getUserFromServer() {
			const userDetail = this.$store.getters['user/getUser'];
			return userDetail
		},

	},
	computed: {
		getUser() {
			return this.$store.getters['user/getUser'];
		}
	}
};
</script>