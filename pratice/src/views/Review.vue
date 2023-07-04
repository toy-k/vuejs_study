<template>
	<v-card>
		<v-card-actions>
			<v-card-title>모임 후기</v-card-title>
			<!-- <v-spacer></v-spacer> -->
			<!-- <v-btn color="primary" @click="createReview">Create Review</v-btn> -->
		</v-card-actions>

		<v-list dense>
			<v-list-item v-for="(review, idx) in getReviewList()" :key="idx">
				<v-row>
					<v-col cols="1">
												<v-avatar size="50">
								<v-img v-if="review.profile" :src="review.profile" :alt="review.username"></v-img>
								<v-icon v-else>mdi-account-circle</v-icon>
							</v-avatar>

					</v-col>
					<v-col cols="10">

						<v-list-item-action>
							<v-list-item-title>{{ review.name }}</v-list-item-title>
							<v-spacer />
						</v-list-item-action>
						<v-list-item-title>{{ review.content }}</v-list-item-title>
						<v-list-item-subtitle>
							Rating: {{ review.rating }}/5
						</v-list-item-subtitle>
				</v-col>
				<v-col cols="1">
								<v-btn v-if="isWriter(review.userId)" color="pink-lighten-4" @click="deleteReview(review.id)">Delete</v-btn>
				</v-col>
				</v-row>
	<br>
			</v-list-item>

			<ReviewCretae v-if="didWrited()"/>

		</v-list>
	</v-card>
</template>

<script>
import axios from 'axios';

import ReviewCretae from '@/views/ReviewCreate.vue';

export default {
	data() {
		return {
			reviews: [],
		};
	},components: {
		ReviewCretae,
	},
	mounted() {
	},
	computed: { 

	},
	methods: {
		getReviewList() {
			const users = this.$store.getters['user/getUserList'] || [];
			const result = this.$store.getters['review/getReviewList'] || [];

			result.map((review) => {
				const user = users.find((u) => u.id === review.userId);
				review.name = user ? user.username : 'Unknown';
				review.profile = user.profile;
			});

			return result
		},
		isWriter(userId) {
			let user = this.$store.getters['auth/getUser'];
	
			if (!user) {
				return false;
			}
			if (user.id === userId) {
				return true;
			} else {
				return false;
			}

		},
		didWrited() { 
			let user = this.$store.getters['auth/getUser'];
			let joinedUserIds = this.$store.getters['room/getJoinedUserIds'];

			if (!user) {
				return false;
			}
	
			let reviewList = this.$store.getters['review/getReviewList'];

			let didWrited = reviewList.find((review) => {
				return review.userId === user.id
			})

			
			if(joinedUserIds.includes(user.id)){
				if (didWrited) {
					return false;
				} else {
					return true;
				}
			} else {
				return false;
			}


		},
		async deleteReview(reviewId) {
			let accessToken = this.$store.getters['auth/getAccessToken'];
			let reviewList = await this.$store.getters['review/getReviewList'];

			const headers = {
				Authorization: `Bearer ${accessToken}`,
			};

			const data = {
				reviewId: reviewId,
			};

			try {
				let res = (await axios({
					method: 'delete',
					url: `http://localhost:8080/api/review`,
					data: data,
					headers: headers,
				})).data

				reviewList = reviewList.filter((review) => {
					return review.id != reviewId
				})

				await this.$store.dispatch('review/setReviewList', reviewList);

				await this.$router.push(`/room-list`)				

			} catch (e) {
				console.error(e);
			}

		},
	},
};
</script>