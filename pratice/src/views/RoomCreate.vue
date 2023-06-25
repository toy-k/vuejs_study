<template>
	<v-container>
		<h1>Write a New Post</h1>
		<v-card>
			<v-card-text>
				<v-form @submit.prevent="submitForm">
					<v-text-field v-model="postData.title" label="Title"></v-text-field>
					<v-textarea v-model="postData.description" label="Description"></v-textarea>
					<v-select v-model="postData.category" :items="categoryOptions" label="Category"></v-select>
					<v-text-field v-model="postData.location" label="Location"></v-text-field>
					<v-text-field type="date" label="Date" v-model="postData.meetupStartDate" ></v-text-field>
					<v-text-field type="date" label="Date" v-model="postData.meetupEndDate" ></v-text-field>
					<v-text-field v-model="postData.maxJoinNumber" label="Max Join Number"></v-text-field>
					<v-text-field v-model="postData.price" label="Price"></v-text-field>
					<v-select v-model="postData.roomStatus" :items="roomStatusOptions" label="Room Status"></v-select>
					<v-select v-model="postData.roomType" :items="roomTypeOptions" label="Room Type"></v-select>
					<v-text-field v-model="postData.meetupPhotoPath" label="Meetup Photo Path"></v-text-field>
					<v-text-field v-model="postData.hostUserId" label="Host User ID"></v-text-field>
					<v-file-input v-model="postData.file" label="Meetup file" ></v-file-input>
					<v-file-input v-model="postData.file" label="Meetup Photo" accept="image/*"></v-file-input>
						<v-btn color="primary" type="submit">Submit</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
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
				roomStatus: '',
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
			roomStatusOptions: ['OPEN', 'CLOSED']
		};
	},
	methods: {
		submitForm() {
			// Perform form submission logic here
			// Send the postData object to the server
			console.log('Form Data:', this.postData);
			// Clear form fields after submission
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
				 photoFile:null,
				hostUserId: null
			};
		}
	}
};
</script>