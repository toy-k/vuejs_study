<template>
	<div id="apo">
		<Header />
		<!-- 라우터 페이지 전환-->
		<div id="content" class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Header from './components/layout/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
  }
}
</script>

<style>
</style>
