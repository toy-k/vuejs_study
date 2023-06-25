<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<v-btn v-for="category in categories" :key="category" class="mr-2 mb-2" color="purple-lighten-5"
					@click="filterByCategory(category)">
					{{ category }}
				</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="(d, idx) in paginatedRooms" :key="idx">
				<v-card>
					<v-img style="width: 100%" :src="d.img" />
					<v-card-text>
						<h5 class="title font-weight-medium mb-2 text-h6">
							{{ d.title }}
						</h5>
						<p class="mb-3 text-body-2 text-grey-darken-1">{{ d.desc }}</p>
						<v-btn depressed color="warning" @click="goToRoomDetail(d.id)">Learn More</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-pagination v-model="currentPage" :length="totalPages" @input="setCurrentPage" color="primary"></v-pagination>
	</v-container>
</template>

<script>
import axios from 'axios';

export default {
	name: 'BlogCard',

	data: () => ({
		categories: ['STUDY', 'TRAVEL', 'CODING', 'FOOD', 'GAME', 'CAFE', 'ALCHOLE', 'ACTIVITY', 'CULTURE', 'SPORTS', 'ETC'],
		itemsPerPage: 10,
		currentPage: 1,
		 selectedCategory: null,

	}),
	components: {
	},
	computed: {
		paginatedRooms() {
			let rooms = this.getRoomListData || [];
			const startIndex = (this.currentPage - 1) * this.itemsPerPage;
			const endIndex = startIndex + this.itemsPerPage;
			const filteredRooms = this.selectedCategory
				? rooms.filter((item) => item.category === this.selectedCategory)
				: rooms;
			return filteredRooms.slice(startIndex, endIndex);
		},
		totalPages() {
			let rooms = this.getRoomListData || [];
			const filteredRoomsLength = this.selectedCategory
				? rooms.filter((item) => item.category === this.selectedCategory).length
				: rooms.length;
			return Math.ceil(filteredRoomsLength / this.itemsPerPage);
		},

		getRoomListData() {
			return this.$store.getters['room/getRoomList'];
		}

	},
	methods: {
		setCurrentPage(page) {
			this.currentPage = page;
		},
		goToRoomDetail(id) {

			let detailRoom = this.paginatedRooms.find((room) => room.id === id);
			const setRoom = {
				id: detailRoom.id,
				title: detailRoom.title,
				description: detailRoom.body,
				img: detailRoom.img,
				category: 'TRAVEL',
				location: 'meetupLocation1',
				meetupStartDate: '2023-06-10T14:20:06.589264',
				meetupEndDate: '2023-06-11T14:20:06.589281',
				maxJoinNumber: 10,
				currentJoinNumber: 1,
				price: 10000,
				roomStatus: 'OPEN',
				roomType: 'ONLINE',
				viewCount: 31,
				hostUserId: 1
			};

			this.$store.dispatch('room/setRoom', setRoom);
			this.$router.push(`/room-detail/${id}`);
		},
		filterByCategory(category) {
			this.selectedCategory = category;
			this.currentPage = 1;
		},

		async getRoomList() { 
			let roomListAxios = (await axios(`http://jsonplaceholder.typicode.com/posts?_limit=33`)).data //array

			let photoAxios = (await axios(`https://jsonplaceholder.typicode.com/photos?albumId=1&_limit=33`)).data;

			let roomList = roomListAxios.map((room, idx) => 
				({
					...room, img: photoAxios[idx].url,
				})
			)

			this.$store.dispatch('room/setRoomList', roomList);
		}
	}, 
	beforeMount() {
		this.getRoomList();
		
	}
};
</script>