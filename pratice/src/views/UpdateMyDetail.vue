<template>
	<v-container>
			

		<h1 class="page-title">Update My Profile</h1>

		<v-card color="">
			<v-row>
				<v-col cols="10"></v-col>
				<v-col cols="2">
					<v-btn color="indigo-lighten-4" @click="editUser">Save</v-btn>
						<v-btn color="red-lighten-4" @click="onCancle">Cancle</v-btn>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="1"></v-col>
				<v-col cols="4">
					<v-avatar size="190">
						<v-img v-if="editedUser.profile" :src="editedUser.profile" :alt="editedUser.username"></v-img>
						<v-icon v-else>mdi-account-circle</v-icon>
					</v-avatar>
					<v-file-input label="Upload Image" accept="image/*" @change="onProfileImageChange"></v-file-input>
				</v-col>
				<v-col cols="6">
					<v-card-text>
						<v-row>
							<v-col cols="12">
								<v-text-field v-model="editedUser.username" label="Username" :rules="[rules] "></v-text-field>
									<v-textarea v-model="editedUser.description" label="Description" :rules="[rules]"></v-textarea>
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
	name: 'UpdateMyDetail',
	data() {
		return {
			  editedUser: {
				username: '',
				description: '',
				profile:''
			},
			newProfileImage: null,
		};
	}, computed: {
				rules() {
			return value => {
				if (value === null || value === undefined || value === '') {
					return 'You must enter a value';
				}
				return true;
			};
		},
	}, mounted() {
		this.getUserFromServer(); // 페이지가 로드될 때 사용자 정보를 가져옴
	},
	methods: {
		getUserFromServer() {
			let user = this.$store.getters['auth/getUser'];
			this.editedUser.username = user.username;
			this.editedUser.description = user.description;
			this.editedUser.profile = user.profile;
		},
		async editUser() {
			let user = this.$store.getters['auth/getUser'];
			let accessToken = this.$store.getters['auth/getAccessToken'];

			if (this.newProfileImage) { 
				await this.updateProfileImage();
			}

			const headers = {
				Authorization: `Bearer ${accessToken}`,
			};

			const data = {
				id: user.id,
				username: this.editedUser.username,
				description: this.editedUser.description,
			};

			try {
				let imageRes = (await axios({
					method: 'put',
					url: `http://localhost:8080/api/user/me`,
					data: data,
					headers: headers,
				})).data

				let userRes = (await axios({
					method: 'get',
					url: `http://localhost:8080/api/user/me`,
					headers: headers,
				})).data

				userRes['profile'] = `data:image/jpeg;base64,${imageRes['profile']}`

				let newUser = {
					userId: user.id,
					accessToken: accessToken,
					user : userRes
				}

				await this.$store.dispatch('auth/updateUser', newUser);

				this.$router.push({ name: 'MyDetail' });
				
			} catch (e) { 
				console.error(e);
			 }

		},
		async updateProfileImage() { 
			let accessToken = this.$store.getters['auth/getAccessToken'];

			const formData = new FormData();
			formData.append('file', this.newProfileImage);

				const headers = {
				Authorization: `Bearer ${accessToken}`,
			};

			try {
				let res = (await axios({
					method: 'put',
					url: `http://localhost:8080/api/userImage`,
					data: formData,
					headers: headers,
				})).data
				console.log({ res })

			} catch (e) {
				console.error(e);
			}

		},
		onProfileImageChange(event) {
			this.newProfileImage = event.target.files[0];
		},
		onCancle() { 
							this.$router.push({ name: 'MyDetail' });
		}
	},
};
</script>