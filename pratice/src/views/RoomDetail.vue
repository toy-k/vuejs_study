<template>
	<v-container>
		<v-card>
			<v-card-actions>
				<v-btn v-if="isJoined" color="teal-lighten-1" @click="joinRoom">Join</v-btn>
				<v-btn v-if="isPossibleToLeave" color="primary" @click="leaveRoom">Leave</v-btn>
				<v-spacer />
				<v-btn v-if="isHost" color="indigo-lighten-1" @click="editRoom">Edit</v-btn>
				<v-btn v-if="isHost" color="red-darken-1" @click="deleteRoom">Delete</v-btn>
			</v-card-actions>
		</v-card>

		<v-card>
			<v-row>
				<v-col cols="12">
					<v-img :src="getRoom().img" :alt="getRoom().title" height="300" width="100%"></v-img>
				</v-col>
				<v-col cols="12">
				</v-col>
			</v-row>


			<v-card-title>{{ getRoom().title }}</v-card-title>
			<v-card-subtitle class="mb-4">Category: {{ getRoom().category }}</v-card-subtitle>
			<v-card-text>{{ getRoom().description }}</v-card-text>
			<v-divider class="my-4"></v-divider>
			<v-card-text class="font-weight-bold">참여 중인 유저</v-card-text>

			<div>
				<v-avatar class="avatar-container" v-for="(user, index) in getJoinedUserList()" :key="index" size="80" @mouseover="showInfo" @mouseleave="hideInfo">
					<v-img :src="user.profile"
						:alt="`Participant ${index}`" >
						<div class="avatar-info" v-show="isShow">
							{{ user.username }}
						</div>
						</v-img>				
				</v-avatar>

			</div>

			
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

			<v-row>
				<v-col cols="6" sm="4">
					<v-card-text class="font-weight-bold">Host User ID</v-card-text>
					<v-card-text>{{ getRoom().hostUserId }}</v-card-text>
				</v-col>
				<v-col cols="6" sm="4">
					<v-card-text class="font-weight-bold">upload file</v-card-text>
					<v-card-text @click="downloadFile">{{ getRoom().uploadFile }}</v-card-text>
				</v-col>
				<v-col cols="6" sm="4">
				</v-col>
			</v-row>
		</v-card>

		<v-spacer></v-spacer>
		<Review />
	</v-container>
</template>

<script>
import Review from '@/views/Review.vue';
import axios from 'axios';

export default {
	name: 'RoomDetail',
	data() {
		return {
			isShow: false,
		};
	},
	components: {
		Review
	},
	mounted() {
		// this.getRoom();
		// this.getReviewListApi();
	}, computed: {
		isHost() {
			let room = this.$store.getters['room/getRoom'];
			let user = this.$store.getters['auth/getUser'];

			if (!room || !user || (room.hostUserId !== user.id)) {
				// console.log("false")
				return false;
			} else {
				// console.log("true")
				return true;
			}
		},
		isJoined() {
			let room = this.$store.getters['room/getRoom'];
			let user = this.$store.getters['auth/getUser'];
			let joinedUserIds = this.$store.getters['room/getJoinedUserIds'];

			if (!room || !user || !joinedUserIds
				|| (room.hostUserId === user.id)
				|| (joinedUserIds.includes(user.id))
				|| (room.currentJoinNumber >= room.maxJoinNumber)
			) {

				console.log("false")
				return false;
			} else {
				console.log("true")
				return true;
			}
		},
		isPossibleToLeave() {
			let room = this.$store.getters['room/getRoom'];
			let user = this.$store.getters['auth/getUser'];
			let joinedUserIds = this.$store.getters['room/getJoinedUserIds'];

			if (!room || !user || !joinedUserIds
				|| (room.hostUserId === user.id)
				|| (!joinedUserIds.includes(user.id))
			) {

				console.log("false")
				return false;
			} else {
				console.log("true")
				return true;
			}

		}
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
		async getReviewListApi() {
			try {
				const roomId = this.$route.params.id;
				let reviewAxios = (await axios(`https://jsonplaceholder.typicode.com/comments?postId=` + roomId)).data
				// console.log({ reviewAxios })
				const reviewList = reviewAxios.map((review, idx) =>
				({
					id: review.id,
					content: review.body,
					rating: review.id,
					name: review.email
				})
				)
				// console.log({ reviewList })
				await this.$store.dispatch('review/setReviewList', reviewList)

			} catch (e) {
				console.error("error axios reviewList = ", e);
			}
		},
		async joinRoom() {
			let room = this.$store.getters['room/getRoom'];
			let user = this.$store.getters['auth/getUser'];
			let joinedUserIds = this.$store.getters['room/getJoinedUserIds'];

			if (!room || !user || !joinedUserIds
				|| (room.hostUserId === user.id)
				|| (joinedUserIds.includes(user.id))) {

				console.error("joinRoom error")

				return null;
			}

			console.log(user)
			console.log(user.accessToken)


			await axios({
				method: 'post',
				url: 'http://localhost:8080/api/joinedUser',
				data: {
					roomId: room.id,
					userId: user.id
				},
				headers: {
					Authorization: `Bearer ${user.accessToken}`,
				},
			})

			await this.$store.dispatch('room/setJoinedUserIds', [...joinedUserIds, user.id])
			this.$router.push('/room-list');

		},
		async leaveRoom() {
			let room = this.$store.getters['room/getRoom'];
			let user = this.$store.getters['auth/getUser'];
			let joinedUserIds = this.$store.getters['room/getJoinedUserIds'];

			if (!room || !user || !joinedUserIds
				|| (room.hostUserId === user.id)
				|| (!joinedUserIds.includes(user.id))) {

				console.error("joinRoom error")

				return null;
			}

			await axios({
				method: 'delete',
				url: 'http://localhost:8080/api/joinedUser',
				data: {
					roomId: room.id,
					userId: user.id
				},
				headers: {
					Authorization: `Bearer ${user.accessToken}`
				}
			})

			joinedUserIds = joinedUserIds.filter((id) => id !== user.id)

			await this.$store.dispatch('room/setJoinedUserIds', joinedUserIds)
			this.$router.push('/room-list');
		},
		editRoom() {
			this.$router.push(`/room-update/${this.getRoom().id}`);
		},
		async deleteRoom() {
			let room = this.$store.getters['room/getRoom'];
			let accessToken = this.$store.getters['auth/getAccessToken'];

			console.log({ accessToken, room })

			const headers = {
				Authorization: `Bearer ${accessToken}`,
			};
			const data = {
				id: room.id,
			}

			await axios({
				method: 'delete',
				url: `http://localhost:8080/api/room`,
				headers: headers,
				data: data
			})

			this.$router.push('/room-list');


		},
		async downloadFile() {
			let room = this.$store.getters['room/getRoom'];
			window.location.href = `http://localhost:8080/api/upload/download/roomId/${room.id}?files=${room.uploadFile}`;

		},
		getJoinedUserList() {
			let room = this.$store.getters['room/getRoom'];
			let joinedUserIds = this.$store.getters['room/getJoinedUserIds'];
			let userList = this.$store.getters['user/getUserList'];
			let joinedUserList = [];
			if (!room || !joinedUserIds || !userList) {
				return null;
			}

			//유저들 중 방에 참여중인 유저 정보를 joinedUserList에 넣는다.
			for (let i = 0; i < userList.length; i++) {
				if (joinedUserIds.includes(userList[i].id)) {
					joinedUserList.push(userList[i])

				}
			}
			console.log({ joinedUserList })
			return joinedUserList
		},
		showUsernamePopup(username, on) {
			on.show();

			// Delay hiding the tooltip after a certain time (e.g., 2 seconds)
			setTimeout(() => {
				on.hide();
			}, 2000);
		},
		showInfo() { 
			this.isShow = true;
		}, hideInfo() { 
			this.isShow = false;
		}

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
  margin-right: 10px; /* 원하는 간격 크기로 조정 */
	margin-left: 10px;
}
</style>