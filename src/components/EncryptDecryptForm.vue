<template>
	<div class="flex justify-center items-center min-h-screen bg-gray-100">
		<div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
			<h2 class="text-2xl font-bold text-center mb-4">Shifrlash va Deshifrlash</h2>

			<!-- Fayl yuklash -->
			<div>
				<label for="file" class="block text-sm font-medium text-gray-700">Select File</label>
				<input
					type="file"
					id="file"
					@change="handleFileUpload"
					class="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
				/>

				<!-- Algorithm Tanlash -->
				<div class="mt-4">
					<label for="algorithm" class="block text-sm font-medium text-gray-700">Select Algorithm</label>
					<select
						id="algorithm"
						v-model="selectedAlgorithm"
						class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
					>
						<option value="AES">AES</option>
						<option value="DES">DES</option>
						<option value="Blowfish">Blowfish</option>
						<option value="ChaCha20">ChaCha20</option>
					</select>
				</div>

				<!-- Shifrlash va Deshifrlash tugmalari -->
				<div class="mt-6 flex space-x-4">
					<button
						@click="encryptFile"
						class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
					>
						Encrypt
					</button>
					<button
						@click="decryptFile"
						class="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
					>
						Decrypt
					</button>
				</div>

				<div v-if="result" class="mt-6">
					<h3 class="text-xl font-bold">Result:</h3>
					<textarea
						v-model="result"
						rows="4"
						class="w-full mt-2 p-2 border border-gray-300 rounded-md"
						readonly
					></textarea>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { storage } from "../firebase/config.js"; // Firebase Storage'ni import qilish

	export default {
		data() {
			return {
				selectedAlgorithm: "AES",
				file: null,
				result: "",
			};
		},
		methods: {
			handleFileUpload(event) {
				this.file = event.target.files[0];
			},
			async encryptFile() {
				if (this.file) {
					// Faylni Firebase Storage'ga yuklash
					const fileRef = storage.ref().child(`files/${this.file.name}`);
					await fileRef.put(this.file);
					const fileURL = await fileRef.getDownloadURL();
					this.result = `File uploaded to Firebase Storage: ${fileURL}`;
				} else {
					alert("Faylni tanlang!");
				}
			},
			decryptFile() {
				if (this.file) {
					this.result = `Deshifrlash: ${this.file.name} - Algoritm: ${this.selectedAlgorithm}`;
				} else {
					alert("Faylni tanlang!");
				}
			},
		},
	};
</script>

<style scoped>
	/* Add your custom styles here if needed */
</style>
