<template>

			<v-navigation-drawer color="black">
				<span class="bg"></span>		
				
				<v-list>					
					<div class="pa-4" color="white">
		    	  MEETUP
					</div>
							<template v-for="item,i in items" :key="i">
							<v-list-item :to="item.to" :prepend-icon="item.icon" :title="item.title" color="white"></v-list-item>
						</template>

					</v-list>
					 <template v-slot:append>
	          <div class="pa-3" v-if="isLoggedIn">
	            <v-btn block @click="logout" color="pink-lighten-2">
	              Logout
	            </v-btn>
	          </div>
						<div class="pa-3" v-else>
	            <v-btn block to="/sign-in" color="grey-lighten-1">
	              Sign In
	            </v-btn>
	          </div>
	        </template>

			</v-navigation-drawer>
</template>

<script>


export default {
	name: 'SideBar',

	data() {
		return {
			items: [
				{
					title: "MainPage",
					icon: "mdi-view-dashboard-outline",
					to: "/main-page",
				},
				{
					title: "MeetUp List",
					icon: "mdi-account-group",
					to: "/room-list"

				},
				{
					title: "AnnounceList",
					icon: "mdi-table",
					to: "/announce-list"

				},
				{
					title: "FAQ",
					icon: "mdi-alert-circle-outline",
					to: "/faq"

				},
			]
		}
	}, computed: {
		isLoggedIn() {
			return this.$store.getters['auth/isAuthenticated'];
		}
	}, methods: {
		async logout() {
			await this.$router.replace('/main-page');
			await this.$store.dispatch('auth/logout');
		},
	}

}

</script>

<style scoped>
.bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( 'https://cdn.pixabay.com/photo/2014/10/08/06/37/hook-479270_1280.jpg') no-repeat center center;
    background-size: cover;
    background-color: red;
    transform: scale(1.1);
		 filter: blur(20px); /* 블러 처리를 위한 값 설정 */
  }
::v-deep .v-list-item__title {
  color: white;
}
</style>