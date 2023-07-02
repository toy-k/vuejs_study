<template>
	<v-container>
		<h1>Write a New Announce</h1>
		<v-card>
			<v-card-text>
				<v-form ref="form" @submit.prevent="submitForm" @validate="isValidateForm">
					<v-text-field v-model="postData.title" label="Title" :rules="[rules]"></v-text-field>
					<v-textarea v-model="postData.description" label="Description" :rules="[rules]"></v-textarea>

					<v-row>
					</v-row>
					<v-btn color="primary" type="submit">Submit</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>

import axios from 'axios';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			postData: {
				title: '',
				description: '',
			},
		};
	}, computed: {
		...mapState('auth', ['user']),

		rules() {
			return value => {
				if (value === null || value === undefined || value === '') {
					return 'You must enter a value';
				}

				return true
			}
		},
	},
	watch: {
		user: {
			handler: function (newVal, oldVal) {
				if (!newVal) {
					this.$router.push('/sign-in');
				}
			},
			deep: true
		}
	},
	methods: {
		isValidateForm() {
			return this.$refs.form.validate()
		},
		async submitForm() {
			console.log(await this.isValidateForm())
			if ((await this.isValidateForm()).valid == false) {
				console.error("Validation Error");
				return;
			}

			try {

				let user = this.$store.getters['auth/getUser'];
				let accessToken = user.accessToken;

				// console.log({ accessToken, user })

				const headers = {
					Authorization: `Bearer ${accessToken}`,
				};
				const data = {
					"title": this.postData.title,
					"description": this.postData.description,
					"hostUserId": user.id
				}


				const createdPost = await axios(
					{
						method: 'post',
						url: 'http://localhost:8080/api/announce',
						data: data,
						headers: headers
					}
				)
				const createdAnnounce = createdPost.data;
				await this.$store.dispatch('announce/setCreatedAnnounce', createdAnnounce);
				console.log({ createdAnnounce })

				this.$router.push('/announce-list');

			} catch (e) {
				console.log("API POST ERROR: ", e);
			}

			this.postData = {
				title: '',
				description: '',
			};

		},
	},
};
</script>

