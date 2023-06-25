import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
		path: '/',
		redirect: '/main-page',
		component: () => import("@/components/layouts/full/FullLayout.vue"),
		children: [
			{
				name: 'MainPage',
				path: '/main-page',
				component: () => import('@/views/MainPage.vue'),
			},
			{ name: 'RoomList', path: '/room-list', component: () => import('@/views/RoomList.vue'), },
			{ name: 'RoomDetail', path: '/room-detail/:id', component: () => import('@/views/RoomDetail.vue'), },
			{ name: 'RoomCreate', path: '/room-create', component: () => import('@/views/RoomCreate.vue'), },
			{ name: 'MyDetail', path: '/my-detail', component: () => import('@/views/MyDetail.vue'), },
			{ name: 'QnA', path: '/qna', component: () => import('@/views/QnA.vue'), },
			{ name: 'ServiceGuide', path: '/service-guide', component: () => import('@/views/ServiceGuide.vue'), },
			{ name: 'SignIn', path: '/sign-in', component: () => import('@/views/SignIn.vue'), },
			{ name: 'UserDetail', path: '/user-detail/:id', component: () => import('@/views/UserDetail.vue'), },
		],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
