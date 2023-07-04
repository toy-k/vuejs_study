<template>
	<v-container>
		<h1>Announce</h1>
		<v-row>
			<v-btn v-if="isAdmin" fab fixed right top color="primary" class="ma-4" @click="goTocreateAnnounce">
				<v-icon>mdi-plus</v-icon>
			</v-btn>

		</v-row>
		<v-row>
			<v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="(d, idx) in paginatedAnnounces" :key="idx">
				<v-card>
					<v-img style="width: 100%" :src="d.img" />
					<v-card-text>
						<h5 class="title font-weight-medium mb-2 text-h6">
							{{ d.title }}
						</h5>
						<p class="mb-3 text-body-2 text-grey-darken-1">{{ d.desc }}</p>
						<v-btn depressed color="warning" @click="goToAnnounceDetail(d.id)">Learn More</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
		<v-pagination v-model="currentPage" :length="totalPages" color="primary"></v-pagination>
	</v-container>
</template>

<script>
import axios from 'axios';

export default {
	name: 'AnnounceList',

	data: () => ({
		itemsPerPage: 10,
		currentPage: 1,

	}),
	components: {
	},
	watch: {
		currentPage: {
			handler: function (newVal, oldVal) {
				console.log("[watch currentPage]", newVal, oldVal)
				this.getAnnouncesFromServer(this.currentPage);
			},
			deep: true
		}
	},
	computed: {
		paginatedAnnounces() {
			const announceList = this.$store.getters['announce/getAnnounceList'] || [];
			return announceList;
		},
		totalPages() {

			let announceCount = this.$store.getters['announce/getCount'];
			let totalPage = Math.ceil(announceCount / this.itemsPerPage);

			return totalPage
		},

		getAnnounceListData() {
			return this.$store.getters['announce/getAnnounceList'];
		},
		isAdmin() {
			return (this.$store.getters['auth/isAuthenticated'] && this.$store.getters['auth/getIsAdmin']);
		}


	},
	methods: {
		async goToAnnounceDetail(id) {

			let announceDetail = (await axios(`http://localhost:8080/api/announce/id/${id}`)).data

			const announceList = await this.$store.getters['announce/getAnnounceList'];
			const announce = announceList.find(Announce => Announce.id === id);
			announceDetail['img'] = announce.img;

			await this.$store.dispatch('announce/setAnnounce', announceDetail);

			this.$router.push(`/announce-detail/${id}`);
		},

		async getAnnouncesFromServer(page) {
			console.log("[getAnnounceFromServer]")
			try {

				if (!page) {
					page = 1;
				}

				const res = (await axios.get(`http://localhost:8080/api/announce/list?page=${page}&size=10`))
				const announces = res.data;

				console.log({ announces, page })

				let photos = (await axios("https://picsum.photos/v2/list?limit=150")).data; //array
				let announceList = announces.map((announce, idx) => {
					return {
						...announce, img: photos[idx * 11].download_url,
					}
				})
				await this.$store.dispatch('announce/setAnnounceList', announceList);
			} catch (e) {
				return new Error("getAnnouncesFromServer error", e);
			}
		},
		async getAnnounceCount() {
			try {
				const response = (await axios.get(`http://localhost:8080/api/announce/count`))
				const announceCount = response.data;
				console.log({ announceCount })

				await this.$store.dispatch('announce/setCount', announceCount);

			} catch (e) {
				return new Error("getAnnounceCount error", e);
			}
		},
		goTocreateAnnounce() {
			this.$router.push('/announce-create');
		},

	},
	beforeMount() {
		this.getAnnouncesFromServer();
		this.getAnnounceCount();

	}
};
</script>