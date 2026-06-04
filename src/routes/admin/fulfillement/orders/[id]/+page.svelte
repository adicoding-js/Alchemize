<script>
	import Button from "$lib/components/ui/button/button.svelte"
</script>

<main class="w-full h-full">
	<div class="fixed inset-0 bg-black/20 -z-10"></div>
	<div
		class="relative z-50 p-5 h-full w-full flex flex-col items-center justify-center gap-y-5"
	>
		<div class="space-y-4">
			<div class="flex items-start gap-x-5">
				<img
					src="/Alchemize-Admin.png"
					alt=""
					class="h-60 w-60 p-5 bg-blue-900/40 border-2 rounded-xl"
				/>
				<div class="flex flex-col gap-y-2 items-start justify-start max-w-full">
					<h1 class="text-3xl font-bold font-alchemize text-admin-text">
						Cookie for Utkarsh
					</h1>
					<h2 class="text-xl text-admin-text font-semibold">Ordered on:</h2>
					<h2 class="text-xl text-admin-text font-semibold">Ordered by:</h2>
					<h2 class="text-xl text-admin-text font-semibold">Total cost:</h2>
					<div class="grid grid-cols-2 w-full gap-x-2">
						<Button class="bg-green-700">Mark as Fulfilled</Button>
						<Button>Mark as Unfulfilled</Button>
					</div>
				</div>
			</div>
			<div class="flex items-start gap-x-5">
				<div class="flex flex-col gap-y-2 items-start justify-start max-w-full">
					<h1 class="text-2xl font-bold font-alchemize text-admin-text">
						User details (username)
					</h1>
					<h2 class="text-lg text-admin-text font-medium">Total hours:</h2>
					<h2 class="text-lg text-admin-text font-medium">Total projects:</h2>
					<h2 class="text-lg text-admin-text font-medium">
						Total potion mixes:
					</h2>
					<h2 class="text-lg text-admin-text font-medium">
						Hackatime trust factor:
					</h2>
				</div>
			</div>
		</div>
	</div>
</main>
