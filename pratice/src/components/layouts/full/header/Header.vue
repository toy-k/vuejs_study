<template>
	<v-app-bar elevation="0" class="v-topbar">
		<v-menu>
			<template v-slot:activator="{ props }">
				<v-btn v-bind="props" color="black">
					<v-app-bar-nav-icon class="hidden-lg-and-up" @click="drawer = !drawer" />
				</v-btn>
			</template>
			<v-list>
				<template v-for="item, i in items" :key="i">
					<v-list-item :to="item.to" :prepend-icon="item.icon" :title="item.title"></v-list-item>
				</template>
			</v-list>
		</v-menu>

		<v-spacer />
		<div v-if="isLoggedIn">
			<v-menu>
				<template v-slot:activator="{ props }">
					<v-btn v-bind="props" color="transparent">
						<v-avatar size="35">
							<v-img :src="getProfile()" :alt="`Particip`"></v-img>

						</v-avatar>

					</v-btn>
				</template>
				<v-list>
					<v-list-item v-for="(item, index) in profile" :key="index" :value="index">
						<v-list-item-title @click="goToMyDetail">{{ item.title }}</v-list-item-title>
					</v-list-item>
					<v-btn block color="secondary" variant='outlined' class="mt-4 py-4" @click="logout">Logout</v-btn>
				</v-list>
			</v-menu>
		</div>
		<div v-else>
			<v-btn color="black" class="mr-4" to="/sign-in">sign in</v-btn>
		</div>



	</v-app-bar>
</template>

<script>

export default ({
	name: 'Header',

	data: () => ({
		profile: [
			{
				title: "My Profile",
				desc: "Account Settings",
			},
		],
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
	}),
	computed: {
		isLoggedIn() {
			return this.$store.getters['auth/isAuthenticated'];
		}
	},
	methods: {
		async logout() {
			await this.$router.replace('/main-page');
			await this.$store.dispatch('auth/logout');
		},
		goToMyDetail() {
			this.$router.push("/my-detail")
		},
		getProfile() {
			const user = this.$store.getters['auth/getUser'];
			return user.profile
		}
	}
})
</script>