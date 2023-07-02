<template>
	<v-container>
		<v-card>
			<v-card-actions>
				<v-btn v-if="isHost" color="indigo-lighten-1" @click="editAnnounce">Edit</v-btn>
				<v-btn v-if="isHost" color="red-darken-1" @click="deleteAnnounce">Delete</v-btn>
			</v-card-actions>
		</v-card>

		<v-card>
			<v-row>
				<v-col sm="6">
					<v-img :src="getAnnounce().img" :alt="getAnnounce().title" height="300" width="100%"></v-img>
				</v-col>
				<v-col sm="6">
					<v-card-title>
						<h2>
							{{ getAnnounce().title }}
						</h2>
					</v-card-title>
					<v-card-subtitle class="mb-4">Category: {{ getAnnounce().category }}</v-card-subtitle>
					<v-card-text>
						<p>
							{{ getAnnounce().description }}

						</p>
					</v-card-text>



				</v-col>
			</v-row>



		</v-card>

		<v-spacer></v-spacer>
		<Review />
	</v-container>
</template>

<script>
import axios from 'axios';

export default {
	name: 'AnnounceDetail',
	data() {
		return {
		};
	},
	components: {
		Review
	},
	mounted() {
	}, computed: {
		isHost() {
			let announce = this.$store.getters['announce/getAnnounce'];
			let user = this.$store.getters['auth/getUser'];

			if (!announce || !user || (announce.hostUserId !== user.id)) {
				// console.log("false")
				return false;
			} else {
				// console.log("true")
				return true;
			}
		},
	},
	methods: {
		getAnnounce() {
			const AnnounceId = this.$route.params.id;

			return this.$store.getters['announce/getAnnounce'];

		},
		editAnnounce() {
			this.$router.push(`/announce-update/${this.getAnnounce().id}`);
		},
		async deleteAnnounce() {
			let announce = this.$store.getters['announce/getAnnounce'];
			let accessToken = this.$store.getters['auth/getAccessToken'];

			console.log({ accessToken, announce })

			const headers = {
				Authorization: `Bearer ${accessToken}`,
			};
			const data = {
				id: announce.id,
			}

			await axios({
				method: 'delete',
				url: `http://localhost:8080/api/announce`,
				headers: headers,
				data: data
			})

			this.$router.push('/announce-list');


		},
	}
};
</script>

<style scoped>
.v-card-title {
	font-size: 24px;
	font-weight: bold;
}

.v-card-subtitle {
	font-size: 16px;
}

.font-weight-bold {
	font-weight: bold;
}

.avatar-info {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 18px;
	font-weight: bold;
	color: white;
	background-color: rgba(0, 0, 0, 0.7);
	padding: 8px 16px;
	border-radius: 4px;
}

.avatar-container {
	margin-right: 10px;
	/* 원하는 간격 크기로 조정 */
	margin-left: 10px;
}
</style>