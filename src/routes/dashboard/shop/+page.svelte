<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte"
	import ShopDialog from "$lib/components/shopitem-dialog.svelte"
	import looseJson from "loose-json"
	
	let { data } = $props()
	let currencies = $state(
		looseJson(data.userRecord?.fields?.currency ?? "{}") as UserCurrency
	)

	interface UserCurrency {
		redstone: number
		glowstone: number
		aqua_regia: number
		potion_mix: number
	}

	type ShopItem = {
		itemID: string
		name: string
		description: string
		price: UserCurrency
		image: string
		grayedOut?: boolean
	}

	let isDialogOpen = $state(false)
	let selectedItem = $state<ShopItem>({
		name: "",
		description: "",
		price: { redstone: 0, glowstone: 0, aqua_regia: 0, potion_mix: 0 },
		image: "",
		itemID: "",
	})

	const shopItems: ShopItem[] = [
		...data?.items.map((item: any) => ({
			itemID: item.itemID,
			name: item.name,
			description: item.description,
			price: item.itemPrice,
			image: item.cdnImage,
			grayedOut: isGrayedOut(currencies, item.itemPrice),
		})),
	]
	function isGrayedOut(userHas: UserCurrency, itemPrice: UserCurrency) {
		return (
			userHas.redstone < itemPrice.redstone ||
			userHas.glowstone < itemPrice.glowstone ||
			userHas.aqua_regia < itemPrice.aqua_regia ||
			userHas.potion_mix < itemPrice.potion_mix
		)
	}
	function handleBuyClick(item: ShopItem) {
		selectedItem = item
		isDialogOpen = true
	}

	function handleConfirmPurchase(qty: number) {
		console.log(
			`Purchased ${selectedItem.name} for ${qty * selectedItem.price.potion_mix} potion mixes!`
		)
				currencies.potion_mix -= qty * selectedItem.price.potion_mix
				currencies.redstone -= qty * selectedItem.price.redstone
				currencies.glowstone -= qty * selectedItem.price.glowstone
				currencies.aqua_regia -= qty * selectedItem.price.aqua_regia
				currencies = currencies // trigger reactivity

		const buyApi = fetch("/dashboard/shop/order", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				itemId: selectedItem.itemID,
				quantity: qty,
			}),
		}).then(res => {
			if (res.ok) {
				alert("Purchase successful!")
			} else {
				alert("Purchase failed")
				console.error("Purchase failed", res)
				const body = res.text().then(text => {
					console.error("Response body:", text)
				})
			}
		})
	}
	const renderCurrency = (currency: UserCurrency) => {
		if(currency.redstone>0){
			return `${currency.redstone} Redstone`
		}else if(currency.glowstone>0){
			return `${currency.glowstone} Glowstone`
		}else if(currency.aqua_regia>0){
			return `${currency.aqua_regia} Aqua Regia`
		}else if(currency.potion_mix>0){
			return `${currency.potion_mix} Potion Mix`
		}else{
			return "0 Currency"
		}
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
								{item.description}
							</p>
						</div>

						<Button
							class="w-full py-5 text-black text-lg font-bold hover:bg-primary/80"
							disabled={item.grayedOut}
							onclick={() => handleBuyClick(item)}
						>
							Buy • {renderCurrency(item.price)}
						</Button>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<ShopDialog
	allItems={shopItems}
	bind:open={isDialogOpen}
	item={selectedItem}
	currency={currencies}
	onConfirm={handleConfirmPurchase}
/>
