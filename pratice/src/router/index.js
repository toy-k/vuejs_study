import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index.js';

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
			{ name: 'RoomCreate', path: '/room-create', component: () => import('@/views/RoomCreate.vue'), meta: { requestsAuth: true } },
			{ name: 'RoomUpdate', path: '/room-update/:id', component: () => import('@/views/RoomUpdate.vue'), meta: { requestsAuth: true } },
			{ name: 'MyDetail', path: '/my-detail', component: () => import('@/views/MyDetail.vue'), meta: { requestsAuth: true } },
			{ name: 'UpdateMyDetail', path: '/update-my-detail', component: () => import('@/views/UpdateMyDetail.vue'), meta: { requestsAuth: true } },
			{ name: 'QnA', path: '/qna', component: () => import('@/views/QnA.vue'), },
			{ name: 'ServiceGuide', path: '/service-guide', component: () => import('@/views/ServiceGuide.vue'), },
			{ name: 'SignIn', path: '/sign-in', component: () => import('@/views/SignIn.vue'), meta: {requestsUnAuth:true} },
			{ name: 'UserDetail', path: '/user-detail/:id', component: () => import('@/views/UserDetail.vue'), },
		
			{ name: 'NotFound', path: '/:notFound(.*)', component: () => import('@/views/NotFound.vue'), }
		],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function (to, _, next) {
	if (to.meta.requestsAuth && !store.getters['auth/isAuthenticated']) {
		next('/sign-in');
	} else if (to.meta.requestsUnAuth && store.getters['auth/isAuthenticated']) {
		// next('/main-page')
		next();//test
	} else { 
		next();
	}
});

export default router
