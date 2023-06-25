<template>
	 <v-row>
	    <v-col cols="12" xl="2" v-for="d, idx in data" :key="idx">
	      <v-card >
	        <v-img
	          style="width: 100%"
	          :src="d.img"
	        />
	        <v-card-text>
	          <h5 class="title font-weight-medium mb-2 text-h6">
	            {{ d.title  }}
	          </h5>
	          <p class="mb-3 text-body-2 text-grey-darken-1">{{d.desc}}</p>
	          <v-btn depressed color="warning">Learn More</v-btn>
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
				title: "Super awesome, Vue 3 is coming soon!",
				desc: "Some quick example text to build on the card title and make up the bulk of the card's content.",
				img: require("@/assets/images/background/u1.jpg"),
			},
		]	

	}),
		components: {
		}
}
</script>