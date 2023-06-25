<template>
	<v-row>
		<v-col cols="12" sm="12">
			<BlogCard></BlogCard>
		</v-col>
	</v-row>
</template>

<script>
import BlogCard from './dashboard/dashboardComponents/blog-card/BlogCard.vue'
	export default {
		name: 'Dashboard',

		data: () => ({
			//
		}),
	components: {
			BlogCard
		}
}
</script>