<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
		<div class="w-full max-w-sm bg-white shadow-xl rounded-xl p-6 space-y-6">
			<h2 class="text-2xl font-bold text-center">Kirish</h2>

			<div class="space-y-4">
				<input
					v-model="username"
					type="text"
					placeholder="Login"
					class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>

				<div class="relative">
					<input
						:type="showPassword ? 'text' : 'password'"
						v-model="password"
						placeholder="Parol"
						class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<button
						@click="togglePassword"
						type="button"
						class="absolute right-3 top-2.5 text-sm text-gray-600"
					>
						{{ showPassword ? "Hide" : "Show" }}
					</button>
				</div>

				<button
					@click="login"
					class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
				>
					Kirish
				</button>

				<p v-if="error" class="text-red-500 text-center text-sm">{{ error }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import { checkCredentials } from "@/utils/auth.js";

	const username = ref("");
	const password = ref("");
	const showPassword = ref(false);
	const error = ref("");
	const router = useRouter();

	const togglePassword = () => {
		showPassword.value = !showPassword.value;
	};

	const login = () => {
		if (checkCredentials(username.value, password.value)) {
			localStorage.setItem("auth", "true");
			router.push("/home");
		} else {
			error.value = "Login yoki parol noto‘g‘ri";
		}
	};
</script>
