<template>
	<v-container>

		<h1 class="page-title">FAQ </h1>
		
		
		<br>

		<v-card v-for="question in questions" :key="question.id" class="mb-4">
			<v-card-title>
				<h2>{{ question.title }}</h2>
			</v-card-title>
			<v-card-text>
				<p>{{ question.content }}</p>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			questions: []
		};
	},
	created() {
		this.createFAQ();
	},
	methods: {
		createFAQ() {
			for (let i = 1; i <= 20; i++) {
				this.questions.push({
					id: i,
					title: `Question ${i}`,
					content: `This is the content of question ${i}.`
				});
			}
		}
	}
};
</script>