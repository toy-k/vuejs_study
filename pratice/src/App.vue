<template>
		<RouterView></RouterView>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
	}),
	components: {
	},
	created() {
		this.$store.dispatch('auth/tryLogin');
	},

}
</script>
