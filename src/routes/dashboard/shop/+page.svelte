<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte"
	import ShopDialog from "$lib/components/shopitem-dialog.svelte"

	type ShopItem = {
		name: string
		shortDescription: string
		longDescription: string
		price: number
		image: string
	}

	let isDialogOpen = $state(false)
	let selectedItem = $state<ShopItem>({
		name: "",
		shortDescription: "",
		longDescription: "",
		price: 0,
		image: "",
	})

	const shopItems: ShopItem[] = [
		{
			name: "Item 1",
			shortDescription: "Here goes a short description of this item...",
			longDescription:
				"Here goes a long long long long long long long long long long description of this item...",
			price: 500,
			image: "https://placehold.co/300x220",
		},
	]

	function handleBuyClick(item: ShopItem) {
		selectedItem = item
		isDialogOpen = true
	}

	function handleConfirmPurchase() {
		console.log(
			`Purchased ${selectedItem.name} for ${selectedItem.price} potion mixes!`
		)
	}
</script>

<div class="w-full h-screen bg-gradbg overflow-hidden">
	<div class="fixed inset-0 bg-black/60 z-10"></div>

	<div class="relative z-50 h-full flex flex-col">
		<h1 class="text-5xl text-white text-center pt-8 font-alchemize">
			The Shop
		</h1>

		<div class="flex-1 overflow-y-auto px-10 py-10 mt-2">
			<div class="grid grid-cols-4 gap-8 place-items-center">
				{#each shopItems as item}
					<div
						class="w-72 h-104 bg-background rounded-3xl border border-border p-6 flex flex-col justify-between hover:scale-105 transition duration-300"
					>
						<img
							src={item.image}
							alt={item.name}
							class="w-full h-52 object-cover rounded-2xl"
						/>

						<div>
							<h2 class="text-2xl font-bold text-white">{item.name}</h2>
							<p class="text-muted-foreground mt-2">
								{item.shortDescription}
							</p>
						</div>

						<Button
							class="w-full py-5 text-black text-lg font-bold hover:bg-primary/80"
							onclick={() => handleBuyClick(item)}
						>
							Buy • {item.price}
						</Button>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<ShopDialog
	bind:open={isDialogOpen}
	item={selectedItem}
	onConfirm={handleConfirmPurchase}
/>
