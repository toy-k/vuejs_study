<template>
	<v-container>
		<v-card>
			<v-card-actions>
				<v-btn color="teal-lighten-1" @click="joinRoom">Join</v-btn>
				<v-btn color="primary" @click="leaveRoom">Leave</v-btn>
				<v-spacer />
				<v-btn color="indigo-lighten-1" @click="editRoom">Edit</v-btn>
				<v-btn color="red-darken-1" @click="deleteRoom">Delete</v-btn>
			</v-card-actions>
		</v-card>

		<v-card>
			<v-row>
				<v-col cols="6" sm="8">
					<v-img :src="getRoom().img" :alt="getRoom().title" height="300"></v-img>
				</v-col>
				<v-card-text class="font-weight-bold">참여 중인 유저</v-card-text>
					<v-col cols="6" sm="4">
						<v-img v-for="(image, index) in getRoom().participants" :key="index" :src="image"
							:alt="`Participant ${index + 1}`" height="50" class="mr-2 mb-2"></v-img>
					</v-col>
				</v-row>


			<v-card-title>{{ getRoom().title }}</v-card-title>
			<v-card-subtitle class="mb-4">Category: {{ getRoom().category }}</v-card-subtitle>
			<v-card-text>{{ getRoom().description }}</v-card-text>
			<v-divider class="my-4"></v-divider>
			<v-row>
				<v-col cols="6" sm="4">
					<v-card-text class="font-weight-bold">Location</v-card-text>
					<v-card-text>{{ getRoom().location }}</v-card-text>
				</v-col>
				<v-col cols="6" sm="4">
					<v-card-text class="font-weight-bold">Meetup Start Date</v-card-text>
					<v-card-text>{{ formatDate(getRoom().meetupStartDate) }}</v-card-text>
				</v-col>
				<v-col cols="6" sm="4">
					<v-card-text class="font-weight-bold">Meetup End Date</v-card-text>
					<v-card-text>{{ formatDate(getRoom().meetupEndDate) }}</v-card-text>
				</v-col>
			</v-row>
			<v-divider class="my-4"></v-divider>
			<v-row>
				<v-col cols="6" sm="4">
					<v-card-text class="font-weight-bold">Max Join Number</v-card-text>
					<v-card-text>{{ getRoom().maxJoinNumber }}</v-card-text>
				</v-col>
				<v-col cols="6" sm="4">
					<v-card-text class="font-weight-bold">Current Join Number</v-card-text>
					<v-card-text>{{ getRoom().currentJoinNumber }}</v-card-text>
				</v-col>
				<v-col cols="6" sm="4">
					<v-card-text class="font-weight-bold">Price</v-card-text>
					<v-card-text>{{ getRoom().price }}</v-card-text>
				</v-col>
			</v-row>
			<v-divider class="my-4"></v-divider>
			<v-row>
				<v-col cols="6" sm="4">
					<v-card-text class="font-weight-bold">Room Status</v-card-text>
					<v-card-text>{{ getRoom().roomStatus }}</v-card-text>
				</v-col>
				<v-col cols="6" sm="4">
					<v-card-text class="font-weight-bold">Room Type</v-card-text>
					<v-card-text>{{ getRoom().roomType }}</v-card-text>
				</v-col>
				<v-col cols="6" sm="4">
					<v-card-text class="font-weight-bold">View Count</v-card-text>
					<v-card-text>{{ getRoom().viewCount }}</v-card-text>
				</v-col>
			</v-row>
			<v-divider class="my-4"></v-divider>
			<v-card-text class="font-weight-bold">Host User ID</v-card-text>
			<v-card-text>{{ getRoom().hostUserId }}</v-card-text>
		</v-card>

		<v-spacer></v-spacer>
		<Comment />
	</v-container>
</template>

<script>
import Comment from '@/views/Comment.vue';
import axios from 'axios';

export default {
	name: 'RoomDetail',
	data() {
		return {
		};
	},
	components: {
		Comment
	},
	mounted() {
		this.getRoom();
		this.getCommentListApi();
	},
	methods: {
		formatDate(dateString) {
			const options = { year: 'numeric', month: 'long', day: 'numeric' };
			return new Date(dateString).toLocaleDateString(undefined, options);
		},
		getRoom() {
			const roomId = this.$route.params.id;

			return this.$store.getters['room/getRoom'];

		},
		async getCommentListApi() {
			try {
				const roomId = this.$route.params.id;
				let commentAxios = (await axios(`https://jsonplaceholder.typicode.com/comments?postId=` + roomId)).data
				// console.log({ commentAxios })
				const commentList = commentAxios.map((comment, idx) =>
				({
					id: comment.id,
					content: comment.body,
					rating: comment.id,
					name: comment.email
				})
				)
				// console.log({ commentList })
				await this.$store.dispatch('comment/setCommentList', commentList)

			} catch (e) {
				console.error("error axios commentList = ", e);
			}
		},
		editRoom() { return "editRoom" },
		deleteRoom() { return "deleteRoom" },
		joinRoom() { return "joinRoom" },
		leaveRoom() { return "leaveRoom" },

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
</style>