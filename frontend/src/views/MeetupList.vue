<template>
	
  <div class="container">
		<Jumbotron />	
    <div class="row">
      <div class="col-sm-6 col-md-4 col-lg-3" v-for="(photo, index) in photos" :key="index">
        <!-- 카드 내용 -->
			<Card :photo="photo" :post="posts[index]"/>

			</div>
      </div>
    </div>
  </div></template>
<script>

import axios from 'axios';
import Card from '../components/atom/Card.vue'
import Jumbotron from '../components/atom/Jumbotron.vue';

export default {
	name: 'MeetupList',
	props: {
		msg: String
	},
	components: {
		Card,
		Jumbotron,
	},
	data() {
    return {
			photos: [],
			posts:[],
    };
	},
	mounted() {
		console.log("mounted")
		this.getPhotos();
		this.getPosts();
  },
	methods: {
		//jsonplaceholder
		getPhotos() {
			axios.get('https://jsonplaceholder.typicode.com/photos?_limit=30')
				.then(response => {
					this.photos = response.data;
					console.log(this.photos);
				})
				.catch(error => {
					console.log(error);
				})
		},
		getPosts() { 
			axios.get('https://jsonplaceholder.typicode.com/posts?_limit=30')
				.then(response => {
					this.posts = response.data;
					console.log(this.posts);
				})
				.catch(error => {
					console.log(error);
				})
		},
		}

}

</script>