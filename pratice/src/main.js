import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueCookies from 'vue-cookies'
loadFonts()

const app = createApp(App);
app.use(router)
app.use(store)
app.use(vuetify)
app.use(VueCookies)


const savedState = JSON.parse(localStorage.getItem('state'));
console.log(savedState)
if (savedState) {
	store.replaceState(savedState);
}

window.addEventListener('beforeunload', () => {
	console.log(JSON.stringify(store.state))
	localStorage.setItem('state', JSON.stringify(store.state));
});

app.mount('#app')


