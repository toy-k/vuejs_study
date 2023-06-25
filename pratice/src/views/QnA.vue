<template>
	<v-container>
		<h1>Q&A</h1>
		<v-card>
			<v-card-text>
				<v-list>
					<v-list-item v-for="(question, index) in questions" :key="index">
						<v-list-item-content>
							<v-list-item-title>
								<strong>{{ question.title }}</strong>
							</v-list-item-title>
							<v-list-item-subtitle>{{ question.date }}</v-list-item-subtitle>
							<v-list-item-subtitle>{{ question.author }}</v-list-item-subtitle>
							<v-list-item-subtitle>{{ question.category }}</v-list-item-subtitle>
							<v-list-item-subtitle>{{ question.views }} Views</v-list-item-subtitle>
						</v-list-item-content>
						<v-list-item-action>
							<v-btn text color="primary" @click="toggleAnswer(index)">
								{{ question.showAnswer ? 'Hide Answer' : 'Show Answer' }}
							</v-btn>
						</v-list-item-action>
					</v-list-item>
				</v-list>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			questions: [
				{
					title: 'Question 1',
					date: '2023-06-25',
					author: 'User1',
					category: 'General',
					views: 10,
					showAnswer: false,
					answer: 'This is the answer to question 1.'
				},
				{
					title: 'Question 2',
					date: '2023-06-26',
					author: 'User2',
					category: 'Technical',
					views: 5,
					showAnswer: false,
					answer: 'This is the answer to question 2.'
				},
				{
					title: 'Question 3',
					date: '2023-06-27',
					author: 'User3',
					category: 'General',
					views: 8,
					showAnswer: false,
					answer: 'This is the answer to question 3.'
				}
			]
		};
	},
	methods: {
		toggleAnswer(index) {
			this.questions[index].showAnswer = !this.questions[index].showAnswer;
		}
	}
};
</script>