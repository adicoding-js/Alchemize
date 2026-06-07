<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte"
	import ShopDialog from "$lib/components/shopitem-dialog.svelte"
	//@ts-ignore
	import looseJson from "loose-json"
	import { ShoppingBag } from "lucide-svelte"
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
		if (currency.redstone > 0) {
			return `${currency.redstone} Redstone`
		} else if (currency.glowstone > 0) {
			return `${currency.glowstone} Glowstone`
		} else if (currency.aqua_regia > 0) {
			return `${currency.aqua_regia} Aqua Regia`
		} else if (currency.potion_mix > 0) {
			return `${currency.potion_mix} Potion Mix`
		} else {
			return "0 Currency"
		}
	}
</script>

<main
	class="min-h-screen w-full bg-gradbg text-foreground p-6 md:p-10 font-mono tracking-wide selection:bg-primary selection:text-primary-foreground relative overflow-x-hidden"
>
	<div class="fixed inset-0 bg-black/60 z-0 pointer-events-none"></div>

	<div class="relative z-10 max-w-7xl mx-auto flex flex-col gap-8">
		<div
			class="flex flex-col lg:flex-row gap-4 items-center justify-between border-b-2 border-primary/40 pb-4 backdrop-blur-md px-4 py-2 -mx-4 rounded-t-sm pr-10"
		>
			<div class="flex items-center gap-3">
				<ShoppingBag class="text-primary h-4 w-4 animate-pulse" />
				<h1
					class="text-2xl font-alchemize font-black uppercase tracking-wider text-primary [text-shadow:0_2px_10px_rgba(var(--primary),0.2)]"
				>
					The Shop
					<span class="text-[0.5rem] text-white">Alchemize</span>
				</h1>
			</div>

			<div
				class="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider"
			>
				<div
					class="border-2 border-primary bg-black text-primary font-bold tracking-wider uppercase rounded-none transition-all duration-100 shadow-[2px_2px_0px_0px_rgba(var(--primary),0.3)] px-2 py-1 text-sm"
				>
					<span>Redstone: {currencies.redstone.toString()}</span>
				</div>
				<div
					class="border-2 border-primary bg-black text-yellow-500 font-bold tracking-wider uppercase rounded-none transition-all duration-100 shadow-[2px_2px_0px_0px_rgba(var(--primary),0.3)] px-2 py-1 text-sm"
				>
					<span>Glowstone: {currencies.glowstone.toString()}</span>
				</div>
				<div
					class="border-2 border-primary bg-black text-blue-500 font-bold tracking-wider uppercase rounded-none transition-all duration-100 shadow-[2px_2px_0px_0px_rgba(var(--primary),0.3)] px-2 py-1 text-sm"
				>
					<span>Aquaregia: {currencies.aqua_regia.toString()}</span>
				</div>
				<div
					class="border-2 border-primary bg-black text-primary font-bold tracking-wider uppercase rounded-none transition-all duration-100 shadow-[2px_2px_0px_0px_rgba(var(--primary),0.3)] px-2 py-1 text-sm"
				>
					<span>Potion mix: {currencies.potion_mix.toString()}</span>
				</div>
			</div>
		</div>

		<div
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
		>
			{#each shopItems as item}
				<div class="relative group">
					<div
						class="absolute inset-0 bg-primary/80 translate-x-1.5 translate-y-1.5 rounded-sm transition-transform group-hover:translate-x-1 group-hover:translate-y-1"
					></div>

					<div
						class="relative w-full flex flex-col bg-black/95 border-2 border-primary/90 rounded-sm p-4 h-105 transition-transform hover:-translate-x-px hover:-translate-y-px"
					>
						<div
							class="w-full h-48 bg-zinc-950 border border-zinc-800 rounded-none overflow-hidden shrink-0 relative"
						>
							<img
								src={item.image}
								alt={item.name}
								class="w-full h-full object-cover scale-100 transition-transform duration-300"
							/>
							<div
								class="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/40"
							></div>
						</div>

						<div class="flex flex-col gap-2 mt-4 flex-1 overflow-hidden">
							<h2
								class="text-xl font-black uppercase text-white tracking-tight line-clamp-1 font-alchemize"
							>
								{item.name}
							</h2>
							<p
								class="text-zinc-300 text-xs leading-relaxed font-mono tracking-normal line-clamp-4"
							>
								{item.description}
							</p>
						</div>

						<div class="mt-auto pt-3 border-t border-zinc-800/80">
							<Button
								class="w-full py-5 border-2 border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground font-bold tracking-wider uppercase rounded-none transition-all duration-100 shadow-[3px_3px_0px_0px_rgba(var(--primary),0.4)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-40 disabled:pointer-events-none"
								disabled={item.grayedOut}
								onclick={() => handleBuyClick(item)}
							>
								Buy • {renderCurrency(item.price)}
							</Button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>

<ShopDialog
	allItems={shopItems}
	bind:open={isDialogOpen}
	item={selectedItem}
	currency={currencies}
	onConfirm={handleConfirmPurchase}
/>
