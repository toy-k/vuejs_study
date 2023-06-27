<template>
	<v-app-bar elevation="0" class="v-topbar">
				<v-menu>
		      <template v-slot:activator="{ props }">
		        <v-btn v-bind="props" color="black">
							<v-app-bar-nav-icon class="hidden-lg-and-up" @click="drawer = !drawer" />
		        </v-btn>
		      </template>
		      <v-list>
		        <v-list-item
		          v-for="(item, index) in profile"
		          :key="index"
		          :value="index"
		        >
		          <v-list-item-title>{{ item.title }}</v-list-item-title>
		        </v-list-item>
							<v-btn block color="error" variant='outlined' class="mt-4 py-4">Logout</v-btn>
			      </v-list>
		    </v-menu>

			<v-spacer />
		<div v-if="isLoggedIn">
			<v-menu>
	      <template v-slot:activator="{ props }">
	        <v-btn
	          v-bind="props" 
						 color="transparent" 
	        >
							<v-avatar size="35">
								<v-img src="@/assets/images/users/user2.jpg" alt="Julia" />
							</v-avatar>

	        </v-btn>
	      </template>
	      <v-list>
	        <v-list-item
	          v-for="(item, index) in profile"
	          :key="index"
	          :value="index"
	        >
	          <v-list-item-title>{{ item.title }}</v-list-item-title>
	        </v-list-item>
						<v-btn block color="secondary" variant='outlined' class="mt-4 py-4" @click="logout">Logout</v-btn>
		      </v-list>
	    </v-menu>
		</div>
		<div v-else>
			<v-btn color="error" class="mr-4" to="/sign-in">sign in</v-btn>
		</div>



	</v-app-bar>
</template>

<script>

export default ({
	name: 'Header',

	data: () => ({
		profile :[
			{
				title: "My Profile",
				desc: "Account Settings",
			},
			{
				title: "My Inbox",
				desc: "Messages & Emails",
			},
			{
				title: "My Tasks",
				desc: "To-do and Daily Tasks",
			},
		]
	}),
	computed: {
		isLoggedIn() { 
			return this.$store.getters['auth/isAuthenticated'];
		}
	},
	methods: {
		logout() { 
			this.$store.dispatch('auth/logout');
			this.$router.replace('/main-page');
		}
	}
})
</script>
