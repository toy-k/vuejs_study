<template>
	

		<v-row>
			<v-col cols="12">
				<BlogCard></BlogCard>
			</v-col>
		</v-row>

</template>

<script>

import axios from 'axios';

import BlogCard from './dashboard/dashboardComponents/blog-card/BlogCard.vue'
	export default {
		name: 'Dashboard',

		data: () => ({
		}),
	components: {
			BlogCard
	},
	created() {
		
	},
	methods: {
	
	}
}
</script>

<style>
</style>


<!-- primary
secondary
accent
success
info
warning
error -->