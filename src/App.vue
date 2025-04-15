<template>
	<router-view />
</template>

<script>
	import Login from "./components/Login.vue";
	import EncryptDecryptForm from "./components/EncryptDecryptForm.vue";

	export default {
		components: {
			Login,
			EncryptDecryptForm,
		},
	};
</script>

<style>
	/* Add global styles here if needed */
</style>
