<template>
	<v-container>
		<h1>Write a New Post</h1>
		<v-card>
			<v-card-text>
				<v-form ref="form" @submit.prevent="submitForm" @validate="isValidateForm">
					<v-text-field v-model="postData.title" label="Title" :rules="rules" ></v-text-field>
					<v-textarea v-model="postData.description" label="Description" :rules="rules"></v-textarea>
					<v-select v-model="postData.category" :items="categoryOptions" label="Category" :rules="rules"></v-select>
					<v-text-field v-model="postData.location" label="Location" :rules="rules"></v-text-field>
					<v-text-field type="date" label="Date" v-model="postData.meetupStartDate"  :rules="rules"></v-text-field>
					<v-text-field type="date" label="Date" v-model="postData.meetupEndDate"  :rules="rules"></v-text-field>
					<v-text-field v-model="postData.maxJoinNumber" label="Max Join Number" :rules="rules"></v-text-field>
					<v-text-field v-model="postData.price" label="Price" :rules="rules"></v-text-field>
					<v-select v-model="postData.roomType" :items="roomTypeOptions" label="Room Type" :rules="rules"></v-select>
					<v-text-field v-model="postData.meetupPhotoPath" label="Meetup Photo Path" :rules="rules"></v-text-field>
					<v-text-field v-model="postData.hostUserId" label="Host User ID" :rules="rules"></v-text-field>
					<v-file-input v-model="postData.file" label="Meetup file" ></v-file-input>
					<v-file-input v-model="postData.file" label="Meetup Photo" accept="image/*"></v-file-input>
						<v-btn color="primary" type="submit">Submit</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>

import axios from 'axios';

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
				meetupPhotoPath: '',
				file: null, // Added file property for file upload
				photoFile: null, // Added file property for file upload
				hostUserId: null
			},
			categoryOptions: [
				'STUDY', 'TRAVEL', 'CODING', 'FOOD', 'GAME', 'CAFE',
				'ALCOHOL', 'ACTIVITY', 'CULTURE', 'SPORTS', 'ETC'
			],
			roomTypeOptions: ['Online', 'Offline'],
			roomStatusOptions: ['OPEN', 'CLOSED'],
			  rules: [
				value => {
					if (value) return true

					return 'You must enter a value'
				},
			],
		};
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

			const headers = {
				'Content-Type': 'application/json; charset=UTF-8',
				'Authorization': 'Bearer YourAccessToken'
			};
			try {
				const createdPost = await axios.post('https://jsonplaceholder.typicode.com/posts', this.postData, { headers })
				const createdRoom = createdPost.data;
				await this.$store.dispatch('room/setCreatedRoom', createdRoom);

				this.$router.push('/main-page');

			} catch (e) { 
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
				roomStatus: '',
				roomType: '',
				meetupPhotoPath: '',
				file: null,
				photoFile: null,
				hostUserId: null
			};

		}
	}
};
</script>