<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
		<div class="text-center space-y-4">
			<h1 class="text-3xl font-bold">Xush kelibsiz 👋</h1>
			<div class="space-x-4">
				<router-link to="/encrypt">
					<button class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Shifrlash</button>
				</router-link>
				<router-link to="/decrypt">
					<button class="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
						Deshifrlash
					</button>
				</router-link>
			</div>
		</div>
	</div>
</template>
