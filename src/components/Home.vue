<template>
	<div class="container">
		<h1>Bosh sahifa</h1>
		<p>Faylni shifrlash yoki deshifrlashni tanlang</p>
		<router-link to="/encrypt">
			<button>🔒 Shifrlash</button>
		</router-link>
		<router-link to="/decrypt">
			<button>🔓 Deshifrlash</button>
		</router-link>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				file: null, // Faylni saqlash
				fileName: "", // Fayl nomini ko'rsatish
			};
		},
		methods: {
			// Faylni tanlash
			handleFileChange(event) {
				const file = event.target.files[0];
				if (file) {
					this.fileName = file.name;
					this.file = file;
				}
			},
			// Shifrlash funksiyasi
			encryptFile() {
				if (this.file) {
					// Shifrlash uchun kod yoziladi
					console.log("Fayl shifrlanadi:", this.file);
				} else {
					alert("Iltimos, fayl tanlang");
				}
			},
			// Deshifrlash funksiyasi
			decryptFile() {
				if (this.file) {
					// Deshifrlash uchun kod yoziladi
					console.log("Fayl deshifrlanadi:", this.file);
				} else {
					alert("Iltimos, fayl tanlang");
				}
			},
		},
	};
</script>

<style scoped>
	.container {
		padding: 20px;
	}
	button {
		margin-top: 10px;
		padding: 10px;
	}
</style>
