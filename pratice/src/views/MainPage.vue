<template>
	<v-row>
		<v-col cols="6" sm="6">
			<BlogCard></BlogCard>
		</v-col>
		<v-col cols="6" sm="6">
				<BlogCard></BlogCard>
			</v-col>
	</v-row>
</template>

<script>

//import axios from 'axios';

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