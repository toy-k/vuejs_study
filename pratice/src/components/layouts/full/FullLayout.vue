<template>
	<v-app>
		<!-- 사이드바 -->
		<side-bar></side-bar>
		
		<!-- 헤더 -->
		<Header></Header>
		<!-- 컨텐츠항목 -->
		
		<v-main>
			<v-container class="page-wrapper">
				<RouterView></RouterView>
			</v-container>
		</v-main>

	</v-app>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import Header from '@/components/layouts/full/header/Header.vue'

	export default {
		name: 'FullLayout',

		data: () => ({
			//
		}),
	components: {
		SideBar,
		Header
		}
	}
</script>
