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
							<v-btn block color="secondary" variant='outlined' class="mt-4 py-4">Logout</v-btn>
			      </v-list>
		    </v-menu>

			<v-spacer />
		
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
						<v-btn block color="secondary" variant='outlined' class="mt-4 py-4">Logout</v-btn>
		      </v-list>
	    </v-menu>


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
})
</script>
