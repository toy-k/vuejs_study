<template>
			<v-navigation-drawer class="bg-deep-orange" theme="dark" >
				<div class="pa-4">
	    	  로고 컴포넌트
				</div>
				<v-list>					
						<template v-for="item,i in items" :key="i">
							<v-list-item :to="item.to" :prepend-icon="item.icon" :title="item.title"></v-list-item>
						</template>

					</v-list>

				<template v-slot:append>
					<div class="pa-2">
						<v-btn block>
							Logout
						</v-btn>
					</div>
				</template>
			</v-navigation-drawer>
</template>

<script>

import { ref, watchEffect } from 'vue'; 

export default {
	name: 'SideBar',

	data() {
		return {
			windowSize: null,
			drawerVisible: true,
			items: [
				{
					title: "MainPage",
					icon: "mdi-view-dashboard-outline",
					to: "/main-page",
				},
				{
					title: "RoomList",
					icon: "mdi-alert-circle-outline",
					to: "/room-list"

				},
				{
					title: "RoomDetail",
					icon: "mdi-radiobox-blank",
					to: "/room-detail/1"

				},
				{
					title: "RoomCreate",
					icon: "mdi-card-outline",
					to: "/room-create"

				},
				{
					title: "Mydetail",
					icon: "mdi-form-dropdown",
					to: "/my-detail"

				},
				{
					title: "QnA",
					icon: "mdi-table",
					to: "/qna"

				},
				{
					title: "ServiceGuide",
					icon: "mdi-table",
					to: "/service-guide"
				},
				{
					title: "SignIn",
					icon: "mdi-table",
					to: "/sign-in"

				},
				{
					title: "UserDetail",
					icon: "mdi-table",
					to: "/user-detail/1"

				}
			]
		}
	},
}

</script>

<style>
</style>