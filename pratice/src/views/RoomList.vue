<template>
		

	<v-container>
				<h1 class="page-title">모임 목록</h1><br>
		<v-row>
				<v-btn v-if="isLoggedIn" fab fixed right top color="primary" class="ma-4" @click="goTocreateRoom">
				    <v-icon>mdi-plus</v-icon>
				  </v-btn>

			<v-col cols="12">
				<v-btn v-for="category in categories" :key="category" class="mr-2 mb-2" color="white"
					@click="filterByCategory(category)">
					{{ category }}
				</v-btn>
			</v-col>
		</v-row>
		<br>
			<v-row>
			<v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="(d, idx) in paginatedRooms" :key="idx">
				<v-card @click="goToRoomDetail(d.id)" >
					<v-img style="width: 100%" :src="d.img" />
					<v-card-text>
						<h5 class="title font-weight-medium mb-2 text-h6">
							{{ d.title }}
						</h5>
						<p class="mb-3 text-body-2 text-grey-darken-1">{{ d.desc }}</p>
						<p>{{formatDate(d.createdAt)}}</p>

					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<br>
		<br>
		<v-pagination v-model="currentPage" :length="totalPages" ></v-pagination>
	</v-container>
</template>

<script>
import axios from 'axios';

export default {
	name: 'RoomList',

	data: () => ({
		categories: ['ALL','STUDY', 'TRAVEL', 'CODING', 'FOOD', 'GAME', 'CAFE', 'ALCHOLE', 'ACTIVITY', 'CULTURE', 'SPORTS', 'ETC'],
		itemsPerPage: 10,
		currentPage: 1,
		selectedCategory: null,

	}),
	components: {
	},
	watch: {
		currentPage: {
			handler: function (newVal, oldVal) {
				console.log("[watch currentPage]", newVal, oldVal)
				this.getRoomsFromServer(this.currentPage);
			},
			deep: true
		}
	},
	computed: {
		paginatedRooms() {
			const roomList = this.$store.getters['room/getRoomList'] || [];
			if (this.selectedCategory && this.selectedCategory !== 'ALL') {
				return roomList.filter(room => room.category === this.selectedCategory);
			} else {
				return roomList;
			}
		},
		totalPages() {

			let roomCount = this.$store.getters['room/getCount'];
			let totalPage = Math.ceil(roomCount / this.itemsPerPage);

			return totalPage
		},

		getRoomListData() {
			return this.$store.getters['room/getRoomList'];
		},
		isLoggedIn() {
			return this.$store.getters['auth/isAuthenticated'];
		}


	},
	methods: {
				formatDate(dateString) {
			const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

			return new Date(dateString).toLocaleDateString(undefined, options);
		},

		async goToRoomDetail(id) {

			let roomDetail = (await axios(`http://localhost:8080/api/room/id/${id}`)).data
			let joinedUserList = (await axios(`http://localhost:8080/api/joinedUser/roomId/${id}`)).data
			let joinedUserIds = joinedUserList.map((user) => {
				return user.userId
			})
			let uploadFile;
			
			try {
				uploadFile = (await axios(`http://localhost:8080/api/upload/roomId/${id}`))
				if (uploadFile) {
					uploadFile = uploadFile.data
				} else { 
					uploadFile=''
				}

			} catch (e) {
				uploadFile = '';
			  }
			
			roomDetail['uploadFile'] = uploadFile.fileName

			const roomList = await this.$store.getters['room/getRoomList'];
			const room = roomList.find(room => room.id === id);
			roomDetail['img'] = room.img;

			await this.$store.dispatch('room/setRoom', roomDetail);
			await this.$store.dispatch('room/setJoinedUserIds', joinedUserIds);
			await this.getReviewFromServer(id);

			this.$router.push(`/room-detail/${id}`);
		},
		filterByCategory(category) {
			this.selectedCategory = category;
			this.currentPage = 1;
		},

		async getRoomsFromServer(page) {
			console.log("[getRoomFromServer]")
			try {

				if (!page) {
					page = 1;
				}

				const res = (await axios.get(`http://localhost:8080/api/room/list?page=${page}&size=10`))
				const rooms = res.data;

				console.log({ rooms, page })

				let photos = (await axios("https://picsum.photos/v2/list?limit=110")).data; //array
				let roomList = rooms.map((room, idx) => {
					return {
						...room, img: photos[idx*10].download_url,
					}
				})
				await this.$store.dispatch('room/setRoomList', roomList);
			} catch (e) {
				return new Error("getRoomsFromServer error", e);
			}
		},
		async getRoomCount() {
			try {
				const response = (await axios.get(`http://localhost:8080/api/room/count`))
				const roomCount = response.data;
				console.log({ roomCount })

				await this.$store.dispatch('room/setCount', roomCount);

			} catch (e) {
				return new Error("getRoomCount error", e);
			}
		},
		async getReviewFromServer(roomId) { 
			try {
				const response = (await axios.get(`http://localhost:8080/api/review/roomId/${roomId}`))
				const review = response.data;
				console.log({ review })

				await this.$store.dispatch('review/setReviewList', review);

			} catch (e) {
				return new Error("getReview error", e);
			}
		},
		goTocreateRoom() {
			this.$router.push('/room-create');
		},
		async getUsersFromServer() { 
			try {
				const response = (await axios.get(`http://localhost:8080/api/user/list`))
				let users = response.data;

				users.map(async (user) => { 
					let imageData = (await axios.get(`https://jsonplaceholder.typicode.com/photos?id=${user.id}`)).data
					user['profile'] = user['profile'] ? `data:image/jpeg;base64,${user.profile}` : imageData[0].url
				})
				console.log({ users })

				await this.$store.dispatch('user/setUserList', users);

			} catch (e) {
				return new Error("getUsersFromServer error", e);
			}
		},
		
	},
	beforeMount() {
		this.getRoomsFromServer();
		this.getUsersFromServer();
		this.getRoomCount();

	}
};
</script>