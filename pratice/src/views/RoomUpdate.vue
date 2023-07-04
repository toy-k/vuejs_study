<template>
	<v-container>
			

		<h1 class="page-title">Edit Post</h1>
		<v-card>
			<v-card-text>
				<v-form ref="form" @submit.prevent="submitForm" @validate="isValidateForm">
					<v-text-field v-model="postData.title" label="Title" :rules="[rules]"></v-text-field>
					<v-textarea v-model="postData.description" label="Description" :rules="[rules]"></v-textarea>
					<v-text-field v-model="postData.location" label="Location" :rules="[rules]"></v-text-field>
					<v-row>
						<v-col cols="6">
							<v-select v-model="postData.category" :items="categoryOptions" label="Category" :rules="[rules]"></v-select>
						</v-col>
						<v-col cols="6">
							<v-text-field v-model="postData.maxJoinNumber" label="Max Join Number"
								:rules="[positiveRule]"></v-text-field>
						</v-col>
					</v-row>

					<v-row>
						<v-col cols="6">
							<v-text-field type="datetime-local" label="Meetup Start Time" v-model="postData.meetupStartDate"
								:rules="[meetupStartDateRule]"></v-text-field>
						</v-col>
						<v-col cols="6">
							<v-text-field type="datetime-local" label="Meetup End Time" v-model="postData.meetupEndDate"
								:rules="[meetupEndDateRule]"></v-text-field>
						</v-col>
					</v-row>

					<v-row>
						<v-col cols="6">
							<v-text-field v-model="postData.price" label="Price" :rules="[positiveRule]"></v-text-field>
						</v-col>
						<v-col cols="6">
							<v-select v-model="postData.roomType" :items="roomTypeOptions" label="Room Type"
								:rules="[rules]"></v-select>
						</v-col>
					</v-row>

					<v-row>
						<v-col cols="6">
							<v-file-input v-model="postData.file" label="Meetup File"></v-file-input>
						</v-col>
						<v-col cols="6">
							<v-file-input v-model="postData.photoFile" label="Meetup Photo" accept="image/*"></v-file-input>
						</v-col>
					</v-row>
					<v-btn color="primary" type="submit">Update</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
	data() {
		return {
			roomId:'',
			postData: {
				title: '',
				description: '',
				category: '',
				location: '',
				meetupStartDate: null,
				meetupEndDate: null,
				maxJoinNumber: null,
				price: null,
				roomType: '',
				file: null,
				photoFile: null,
			},
			categoryOptions: [
				'STUDY', 'TRAVEL', 'CODING', 'FOOD', 'GAME', 'CAFE',
				'ALCOHOL', 'ACTIVITY', 'CULTURE', 'SPORTS', 'ETC'
			],
			roomTypeOptions: ['ONLINE', 'OFFLINE'],
		};
	},
	computed: {
		...mapState('auth', ['user']),

		rules() {
			return value => {
				if (value === null || value === undefined || value === '') {
					return 'You must enter a value';
				}
				return true;
			};
		},
		positiveRule() {
			return value => {
				if (value === null || value === undefined || value === '') {
					return 'You must enter a value';
				}
				const numericValue = Number(value);
				if (isNaN(numericValue) || numericValue < 0) {
					return 'You must enter a positive number';
				}
				return true;
			};
		},
		meetupStartDateRule() {
			return value => {
				if (value === null || value === undefined || value === '') {
					return 'You must enter a value';
				}
				const selectedTime = new Date(value).getTime();
				const currentTime = new Date().getTime();
				if (selectedTime <= currentTime) {
					return 'Start time must be in the future';
				}
				return true;
			};
		},
		meetupEndDateRule() {
			return value => {
				if (value === null || value === undefined || value === '') {
					return 'You must enter a value';
				}
				const selectedTime = new Date(value).getTime();
				const startTime = new Date(this.postData.meetupStartDate).getTime();
				if (selectedTime <= startTime) {
					return 'End time must be later than start time';
				}
				return true;
			};
		},
	},
	watch: {
		user: {
			handler: function (newVal, oldVal) {
				if (!newVal) {
					this.$router.push('/sign-in');
				}
			},
			deep: true
		}
	},
	created() {
		let room = this.$store.getters['room/getRoom'];
		this.roomId = room.id;
		console.log(this.roomId)

		this.getRoomFromServer();
	},
	methods: {
		isValidateForm() {
			return this.$refs.form.validate();
		},
		async getRoomFromServer() {
			try {
				console.log(this.roomId);
				const response = await axios.get(`http://localhost:8080/api/room/id/${this.roomId}`);
				const roomData = response.data;
				this.postData = { ...roomData }; 
			} catch (error) {
				console.log('Error fetching room data:', error);
			}
		},
		async submitForm() {
			console.log(await this.isValidateForm());
			if ((await this.isValidateForm()).valid == false) {
				console.error("Validation Error");
				return;
			}

			try {
				let user = this.$store.getters['auth/getUser'];
				let accessToken = this.$store.getters['auth/getAccessToken'];

				console.log({ accessToken, user })
				console.log(user.id)

				const headers = {
					Authorization: `Bearer ${accessToken}`,
				};

				const data = {
					id: this.roomId,
					title: this.postData.title,
					description: this.postData.description,
					category: this.postData.category,
					location: this.postData.location,
					meetupStartDate: this.postData.meetupStartDate,
					meetupEndDate: this.postData.meetupEndDate,
					maxJoinNumber: this.postData.maxJoinNumber,
					price: this.postData.price,
					"roomStatus": "OPEN",
					roomType: this.postData.roomType,
					"hostUserId": user.id
				};

				const updatedPost = await axios({
					method: 'put',
					url: `http://localhost:8080/api/room`, // Replace 'roomId' with the actual ID of the room to be updated
					data: data,
					headers: headers
				});

				const updatedRoom = updatedPost.data;
				await this.$store.dispatch('room/setCreatedRoom', updatedRoom);
				this.$router.push('/room-list');
			} catch (e) {
				console.log("API PUT ERROR:", e);
			}

			this.postData = {
				title: '',
				description: '',
				category: '',
				location: '',
				meetupStartDate: null,
				meetupEndDate: null,
				maxJoinNumber: null,
				price: null,
				roomType: '',
				file: null,
				photoFile: null,
			};
		}
	}
};
</script>