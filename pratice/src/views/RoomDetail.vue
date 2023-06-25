<template>
	<v-container>
		<v-card>
			<v-img :src="getRoom().img" :alt="getRoom.title" height="300"></v-img>
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
	</v-container>
</template>

<script>
export default {
	name: 'RoomDetail',
	data() {
		return {
		};
	},
	mounted() {
		this.getRoom();
	},
	methods: {
		formatDate(dateString) {
			const options = { year: 'numeric', month: 'long', day: 'numeric' };
			return new Date(dateString).toLocaleDateString(undefined, options);
		},
		getRoom() { 
			const roomId = this.$route.params.id;
			return this.$store.getters['room/getRoom'];

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
</style>