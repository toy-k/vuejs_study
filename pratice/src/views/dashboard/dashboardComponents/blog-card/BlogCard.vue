<template>
	 <v-row>
	    <v-col cols="12" xl="2" v-for="d, idx in data" :key="idx">
	      <v-card >
		        <v-card-text>
		          <h1 class="title font-weight-medium mb-2 text-h6">
		            {{ d.title }}
			          </h1>
		          
		        </v-card-text>
		        <v-img
	          style="width: 100%"
	          :src="d.img"
	        />
					<v-card-text>
										<v-btn depressed color="black" @click="goToMeetupList">더 많은 모임 둘러보기</v-btn>
					</v-card-text>
	      </v-card>
	    </v-col>
	  </v-row>
</template>

<script>
	export default {
		name: 'BlogCard',

	data: () => ({
		data: [
			{
				title: "모임 웹사이트에 오신 것을 환영합니다.",
				desc: "Some quick example text to build on the card title and make up the bulk of the card's content.",
				img: "https://cdn.pixabay.com/photo/2019/11/29/08/34/space-4660847_1280.jpg",
			},
		]	

	}),
	methods: {
		goToMeetupList() {
			this.$router.push({ name: 'RoomList' });
		},
	}
}
</script>


<!-- https://cdn.pixabay.com/photo/2015/01/09/11/08/startup-594090_1280.jpg -->

<!-- https://cdn.pixabay.com/photo/2019/02/09/10/55/adults-3984852_1280.jpg -->