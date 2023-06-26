<template>
	<v-card>
		<v-card-actions>
			<v-card-title>Comments</v-card-title>
			<!-- <v-spacer></v-spacer> -->
				<v-btn color="primary" @click="createReview">Create Review</v-btn>
		</v-card-actions>
		
		<v-list dense>
			<v-list-item v-for="(comment,idx) in getCommentList()" :key="idx">
				<v-list-item-action>
					<v-list-item-title>{{ comment.name }}</v-list-item-title>					
					<v-spacer />
					<v-btn color="pink-lighten-4" @click="deleteReview(comment.id)">Delete</v-btn>
				</v-list-item-action>
				<v-list-item-title>{{ comment.content }}</v-list-item-title>
				<v-list-item-subtitle>
					Rating: {{ comment.rating }}/5
				</v-list-item-subtitle>
			
			</v-list-item>
		</v-list>
	</v-card>
</template>

<script>

export default {
	data() {
		return {
			comments: [],
		};
	},
	mounted() {
	},
	methods: {
		getCommentList() {

			const result = this.$store.getters['comment/getCommentList'] || [];

			return result
		},
		deleteReview(id) {
			return "deleteReview"
		},
		createReview() {
			return "createReview"
		},
	},
};
</script>