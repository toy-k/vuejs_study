<template>
	<v-container>
			

		<h1 class="page-title">공지사항 상세페이지</h1>
		<v-card>
			<v-card-actions>
				<v-btn v-if="isHost" color="red-darken-1" @click="deleteAnnounce">Delete</v-btn>
			</v-card-actions>
		</v-card>

		<v-card>
			<v-row>
				<v-col sm="6">
					<v-img :src="getAnnounce().img" :alt="getAnnounce().title" height="800" width="100%"></v-img>
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
	},
	mounted() {
	}, computed: {
		isHost() {
			let isAdmin = this.$store.getters['auth/getIsAdmin'];
			if (!isAdmin) {
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
		async deleteAnnounce() {
			let announce = this.$store.getters['announce/getAnnounce'];
			let accessToken = this.$store.getters['auth/getAccessToken'];

			console.log({ accessToken, announce })

			const headers = {
				Authorization: `Bearer ${accessToken}`,
			};
			const data = {
				announceId: announce.id,
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