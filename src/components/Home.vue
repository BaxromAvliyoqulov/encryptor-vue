<template>
	<div class="container">
		<!-- Breadcrumbs -->
		<nav class="breadcrumbs">
			<router-link to="/">🏠 Bosh sahifa</router-link>
		</nav>

		<h1 class="title">🔐 Fayl Shifrlash / Deshifrlash</h1>
		<p class="subtitle">Jarayonni boshlashdan oldin fayl tanlang</p>

		<!-- File input -->
		<div class="file-upload">
			<input type="file" id="file" @change="handleFileChange" style="display: none" />
			<label for="file" class="upload-button"> 📁 Fayl tanlang </label>
		</div>

		<!-- File and algorithm selection -->
		<div v-if="fileName" class="file-info">
			<span class="file-icon">{{ getFileIcon(fileName) }}</span>
			<span>{{ fileName }}</span>
			<button class="remove-btn" @click="clearFile">❌</button>
		</div>

		<!-- Select algorithm -->
		<div v-if="file" class="algorithm-select">
			<label for="algorithm">Shifrlash algoritmi:</label>
			<select id="algorithm" v-model="selectedAlgorithm">
				<option value="aes">AES</option>
				<option value="rsa">RSA</option>
				<option value="des">DES</option>
			</select>
		</div>

		<!-- Status -->
		<div v-if="status" class="status">
			<p><strong>Status:</strong> {{ status.message }}</p>
			<p><strong>Fayl hajmi:</strong> {{ status.fileSize }} MB</p>
			<p><strong>Shifrlash vaqti:</strong> {{ status.encryptionTime }} saniya</p>
		</div>

		<!-- Progress bar -->
		<div v-if="loading" class="progress">
			<div class="progress-bar"></div>
		</div>

		<!-- Action buttons -->
		<div class="button-group">
			<button @click="encryptFile" class="action-button" :disabled="!file">🔒 Shifrlash</button>
			<button @click="decryptFile" class="action-button" :disabled="!file">🔓 Deshifrlash</button>
		</div>

		<!-- Download button -->
		<div v-if="encryptedFile" class="download-button">
			<a :href="downloadLink" download="encrypted-file">
				<button class="action-button">📥 Yuklab olish</button>
			</a>
		</div>
	</div>
</template>

<script>
	import { toast } from "vue3-toastify";
	import "vue3-toastify/dist/index.css";

	export default {
		name: "Home",
		data() {
			return {
				file: null,
				fileName: "",
				loading: false,
				selectedAlgorithm: "aes", // Default algorithm
				encryptedFile: null,
				status: null,
			};
		},
		methods: {
			handleFileChange(event) {
				const file = event.target.files[0];
				if (file) {
					this.file = file;
					this.fileName = file.name;
					this.status = null; // Reset status when a new file is selected
					toast.success("✅ Fayl tanlandi");
				}
			},
			clearFile() {
				this.file = null;
				this.fileName = "";
				this.status = null;
				toast.info("❌ Fayl bekor qilindi");
			},
			encryptFile() {
				if (this.file) {
					this.showLoading();
					const startTime = Date.now();
					const fileSizeMB = (this.file.size / (1024 * 1024)).toFixed(2); // Calculate file size in MB

					// Simulate encryption based on selected algorithm
					setTimeout(() => {
						const encryptionTime = ((Date.now() - startTime) / 1000).toFixed(2);
						this.hideLoading();
						this.status = {
							message: `Fayl ${this.selectedAlgorithm.toUpperCase()} algoritmi bilan shifrlangan.`,
							fileSize: fileSizeMB,
							encryptionTime,
						};
						this.encryptedFile = new Blob([this.file], { type: this.file.type });
						this.downloadLink = URL.createObjectURL(this.encryptedFile);
						toast.success("🔒 Fayl muvaffaqiyatli shifrlandi!");
					}, 2000); // Simulate delay in encryption
				} else {
					toast.warning("⚠️ Iltimos, fayl tanlang");
				}
			},
			decryptFile() {
				if (this.file) {
					this.showLoading();
					const startTime = Date.now();
					const fileSizeMB = (this.file.size / (1024 * 1024)).toFixed(2); // Calculate file size in MB

					// Simulate decryption based on selected algorithm
					setTimeout(() => {
						const encryptionTime = ((Date.now() - startTime) / 1000).toFixed(2);
						this.hideLoading();
						this.status = {
							message: `Fayl ${this.selectedAlgorithm.toUpperCase()} algoritmi bilan deshifrlangan.`,
							fileSize: fileSizeMB,
							encryptionTime,
						};
						toast.success("🔓 Fayl muvaffaqiyatli deshifrlanadi!");
					}, 2000); // Simulate delay in decryption
				} else {
					toast.warning("⚠️ Iltimos, fayl tanlang");
				}
			},
			showLoading() {
				this.loading = true;
			},
			hideLoading() {
				this.loading = false;
			},
			getFileIcon(filename) {
				const ext = filename.split(".").pop().toLowerCase();
				switch (ext) {
					case "doc":
					case "docx":
						return "📄 Word";
					case "xls":
					case "xlsx":
						return "📊 Excel";
					case "pdf":
						return "📕 PDF";
					default:
						return "📁 Fayl";
				}
			},
		},
	};
</script>
<style scoped>
	@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@500&display=swap");

	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #f8fafc;
		padding: 40px 20px;
		font-family: "Fira Code", monospace;
		box-sizing: border-box;
		text-align: center;
	}

	.breadcrumbs {
		width: 100%;
		max-width: 600px;
		margin-bottom: 20px;
		text-align: left;
		font-size: 14px;
		color: #475569;
	}
	.breadcrumbs a {
		color: #02457a;
		text-decoration: none;
		font-weight: 500;
	}

	.title {
		font-size: 28px;
		font-weight: bold;
		color: #02457a;
		margin-bottom: 10px;
		text-transform: capitalize;
	}
	.subtitle {
		font-size: 16px;
		color: #475569;
		margin-bottom: 30px;
	}

	.file-upload {
		margin-bottom: 20px;
	}
	.file-upload label {
		font-weight: 600;
		color: #475569;
		margin-right: 10px;
	}
	.file-upload input[type="file"] {
		margin-top: 10px;
	}

	.file-name {
		margin-top: 8px;
		color: #1e293b;
		font-size: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
	.remove-btn {
		background: transparent;
		border: none;
		cursor: pointer;
		color: #dc2626;
		font-size: 16px;
	}

	.button-group {
		display: flex;
		flex-direction: column;
		gap: 15px;
		width: 100%;
		max-width: 300px;
		margin-top: 20px;
	}

	.action-button {
		width: 100%;
		background: linear-gradient(to right, #02457a, #018abe);
		color: white;
		font-weight: 600;
		padding: 14px;
		font-size: 16px;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.3s ease;
	}
	.action-button:hover {
		background: linear-gradient(to right, #018abe, #02457a);
		transform: translateY(-1px);
	}
	.action-button:disabled {
		background: linear-gradient(to right, #02457a, #018abe);
		cursor: not-allowed;
		transform: none;
	}
	.file-name {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		color: #1e293b;
		font-size: 14px;
		background: #f1f5f9;
		padding: 8px 12px;
		border-radius: 8px;
	}
	.file-icon {
		font-weight: bold;
	}

	.upload-button {
		display: inline-block;
		padding: 12px 24px;
		color: white;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
		font-weight: 500;
		margin-bottom: 20px;
		transition: 0.3s ease;
		cursor: pointer;
	}

	.upload-button:hover {
		box-shadow: 0 5px 10px black;
	}
	.algorithm-select {
		margin-top: 20px;
		text-align: left;
	}

	.algorithm-select select {
		padding: 8px;
		font-size: 16px;
		border-radius: 8px;
		border: 1px solid #ccc;
		width: 100%;
		max-width: 300px;
	}

	.status {
		margin-top: 20px;
		font-size: 16px;
		color: #333;
		background: #f1f5f9;
		padding: 10px;
		border-radius: 8px;
	}

	.download-button {
		margin-top: 20px;
	}

	.download-button a {
		text-decoration: none;
	}

	.download-button button {
		width: 100%;
		background: #018abe;
		color: white;
		font-weight: 600;
		padding: 12px;
		font-size: 16px;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.download-button button:hover {
		background: #02457a;
	}

	/* Loading progress */
	.progress {
		width: 100%;
		max-width: 300px;
		background: #e2e8f0;
		height: 8px;
		border-radius: 10px;
		overflow: hidden;
		margin-top: 10px;
	}
	.progress-bar {
		width: 100%;
		height: 100%;
		background: linear-gradient(to right, #02457a, #018abe);
		animation: loading 2s infinite;
	}
	@keyframes loading {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	/* Responsive */
	@media (max-width: 480px) {
		.title {
			font-size: 22px;
		}
		.action-button {
			font-size: 14px;
			padding: 12px;
		}
	}
</style>
