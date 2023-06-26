<template>
	<v-card>
		<v-card-title>Comments</v-card-title>
		<v-list dense>
			<v-list-item v-for="(comment,idx) in getCommentList()" :key="idx">
				<v-list-item-content>
					<v-list-item-title>{{ comment.name }}</v-list-item-title>
					<v-list-item-title>{{ comment.content }}</v-list-item-title>
					<v-list-item-subtitle>
						Rating: {{ comment.rating }}/5
					</v-list-item-subtitle>
				</v-list-item-content>
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
			const result = this.$store.getters['comment/getCommentList'];

			return result
		},
	},
};
</script>