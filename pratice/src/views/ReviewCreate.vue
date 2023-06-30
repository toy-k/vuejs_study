<template>
	<v-card>
		<v-card-title>Create Review</v-card-title>

		<v-card-text>
			<v-form @submit.prevent="submitReview">
				<v-container>
					<v-row>
						<v-col cols="12" sm="6">
						</v-col>
						<v-col cols="12" sm="6">
							<v-text-field v-model="rating" label="Rating"></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12">
							<v-textarea v-model="content" label="Content"></v-textarea>
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="12">
							<v-btn type="submit" color="primary">Submit</v-btn>
						</v-col>
					</v-row>
				</v-container>
			</v-form>
		</v-card-text>
	</v-card>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			rating: null,
			content: null,
		};
	},
	created () {
	},
	methods: {
		async submitReview() {
			const roomId = this.$route.params.id;
			let accessToken = this.$store.getters['auth/getAccessToken'];

			const room = this.$store.getters['room/getRoom'];
			const meetupEndDate = new Date(room.meetupEndDate);
			const now = new Date();
			console.log("asdf")
			if ( meetupEndDate > now) {
				alert("모임이 끝나지 않았습니다. 끝난 후 리뷰 작성할 수 있습니다.")
				return;
			}
			console.log("asdf")


			const data = {
				roomId: roomId,
				rating: this.rating,
				content: this.content,
			};

			const headers = {
				Authorization: `Bearer ${accessToken}`,
			};


			try {
				const newReview = (await axios({
					method: 'post',
					url: `http://localhost:8080/api/review`,
					data: data,
					headers: headers,
				})).data;

				this.$router.push(`/room-list`)

			} catch (error) {
				console.error('Error submitting review:', error);
			}
		},
	},
};
</script>