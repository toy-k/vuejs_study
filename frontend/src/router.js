
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import MeetupList from "./views/MeetupList.vue";
import Login from "./views/Login.vue";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	routes: [
		{ path: "/", component: Home },
		{ path: "/about", component: About },
		{ path: "/meeupList", component: MeetupList },
		{ path:"/login", component: Login }
	]
});

export default router;