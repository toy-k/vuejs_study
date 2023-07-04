<template>
	<v-container>
			

		<h1 class="page-title">모임 생성</h1>
		<br>
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
							<v-text-field type="datetime-local" label="모임 시작 시간" v-model="postData.meetupStartDate"
								:rules="[meetupStartDateRule]"></v-text-field>
						</v-col>
						<v-col cols="6">
							<v-text-field type="datetime-local" label="모임 끝 시간" v-model="postData.meetupEndDate"
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
							<v-file-input label="Meetup file" @change="onFileChange"></v-file-input>
						</v-col>
						<v-col cols="6">
							<v-file-input  label="Meetup Photo" accept="image/*"></v-file-input>

						</v-col>
					</v-row>
					<v-btn color="primary" type="submit">Submit</v-btn>
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
				file: null, // Added file property for file upload
				photoFile: null, // Added file property for file upload
			},
			categoryOptions: [
				'STUDY', 'TRAVEL', 'CODING', 'FOOD', 'GAME', 'CAFE',
				'ALCOHOL', 'ACTIVITY', 'CULTURE', 'SPORTS', 'ETC'
			],
			roomTypeOptions: ['ONLINE', 'OFFLINE'],
			roomStatusOptions: ['OPEN', 'CLOSED'],
		};
	}, computed: {
		...mapState('auth', ['user']),

		rules() {
			return value => {
				if (value === null || value === undefined || value === '') {
					return 'You must enter a value';
				}

				return true
			}
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
			}
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
	methods: {
		isValidateForm() {
			return this.$refs.form.validate()
		},
		async submitForm() {
			console.log(await this.isValidateForm())
			if ((await this.isValidateForm()).valid == false) {
				console.error("Validation Error");
				return;
			}

			try {

				let user = this.$store.getters['auth/getUser'];
				let accessToken = user.accessToken;

				// console.log({ accessToken, user })

				const headers = {
					Authorization: `Bearer ${accessToken}`,
				};
				const data = {
					"title": this.postData.title,
					"description": this.postData.description,
					"category": this.postData.category,
					"location": this.postData.location,
					"meetupStartDate": this.postData.meetupStartDate,
					"meetupEndDate": this.postData.meetupEndDate,
					"maxJoinNumber": this.postData.maxJoinNumber,
					"price": this.postData.price,
					"roomStatus": "OPEN",
					"roomType": this.postData.roomType,
					"hostUserId": user.id
				}


				const createdPost = await axios(
					{
						method: 'post',
						url: 'http://localhost:8080/api/room',
						data: data,
						headers: headers
					}
					)
			const createdRoom = createdPost.data;
			await this.$store.dispatch('room/setCreatedRoom', createdRoom);
				console.log({ createdRoom })
			if (this.postData.file) {
				await this.uploadFile();
			}

			this.$router.push('/room-list');

		} catch(e) {
			console.log("API POST ERROR: ", e);
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

		},
		onFileChange(event) { 
			this.postData.file = event.target.files[0];
		},
		async uploadFile() { 
			let accessToken = this.$store.getters['auth/getAccessToken'];
			let room = await this.$store.getters['room/getCreatedRoom'];

			console.log({room})

			const formData = new FormData();
			formData.append('files', this.postData.file);
			formData.append('roomId', room.id)

			const headers = {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'multipart/form-data',
			};

			try {
				let res = (await axios({
					method: 'post',
					url: `http://localhost:8080/api/upload`,
					data: formData,
					headers: headers,
				})).data
				console.log({ res })

			} catch (e) {
				console.error(e);
			}

		},
	},
};
</script>

