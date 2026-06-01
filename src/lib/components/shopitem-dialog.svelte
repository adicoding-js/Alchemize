<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte"
	import * as Dialog from "$lib/components/ui/dialog"
	import type {UserCurrency} from "$lib/types"
	let qty = $state(1)
	
	type ShopItem = {
		name: string
		description: string
		price: UserCurrency
		image: string
	}

	let {
		open = $bindable(false),
		allItems = [] as ShopItem[],
		item = {
			name: "",
			description: "",
			price: { redstone: 0, glowstone: 0, aqua_regia: 0, potion_mix: 0 },
			image: "",
		},
		currency,
		onConfirm = (qty: number) => {},
	}: {
		open: boolean,
		allItems: ShopItem[],
		item: ShopItem,
		currency: UserCurrency,
		onConfirm: (qty: number) => void
	} = $props()
	// let disabled = $derived(currency < qty*item.price.potion_mix)
	
	const renderCurrency = (currency: UserCurrency): [string, keyof UserCurrency] => {
		if(currency.redstone>0){
			return [`${currency.redstone} Redstone`, "redstone"]
		}else if(currency.glowstone>0){
			return [`${currency.glowstone} Glowstone`, "glowstone"]
		}else if(currency.aqua_regia>0){
			return [`${currency.aqua_regia} Aqua Regia`, "aqua_regia"]
		}else if(currency.potion_mix>0){
			return [`${currency.potion_mix} Potion Mix`, "potion_mix"]
		}else{
			return ["0 Currency", "potion_mix"]
		}
	}
	let currencyToShow = $derived(renderCurrency(item.price))
	const isDisabled = (userHas: UserCurrency, itemPrice: UserCurrency, qty: number) => {
		return (
			userHas.redstone < qty * itemPrice.redstone ||
			userHas.glowstone < qty * itemPrice.glowstone ||
			userHas.aqua_regia < qty * itemPrice.aqua_regia ||
			userHas.potion_mix < qty * itemPrice.potion_mix
		)
	}
	let disabled = $derived(isDisabled(currency, item.price, qty))

</script>

<Dialog.Root bind:open>
	<Dialog.Content
		class="min-w-[80%] bg-background border border-border rounded-3xl [&>button]:hidden"
	>
		<div class="flex gap-5">
			<div class="flex flex-col gap-y-5 min-w-[40%]">
				<img
					src={item.image}
					alt={item.name}
					class="w-full h-56 object-cover rounded-2xl"
				/>

				<div>
					<Dialog.Title class="text-3xl font-bold">
						{item.name}
					</Dialog.Title>

					<div
						class="mt-2 text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap"
					>
						{item.description}
					</div>
				</div>
			</div>

			<div class="flex flex-col justify-between w-full">
				<div
					class="flex flex-col justify-between items-end w-full h-full gap-3 p-2"
				>
					<div class="space-y-1 text-right">
						<p class="text-xl">
							Item price: {currencyToShow[0]}
						</p>
						<p class="text-xl">
							Current balance: {currency[currencyToShow[1]]} {currencyToShow[1]}
						</p>
						<div class="flex mt-4 items-center justify-center h-10 gap-5 text-white text-xl"><span>Quantity:</span> <input type="number" name="" id="" bind:value={qty} class="border-red-800 text-white w-20 p-2 border outline-none rounded-lg" on:input={(e) => (qty = parseInt((e.target as HTMLInputElement).value) || 1)}></div>
					</div>
					<div class="flex flex-col gap-y-2 w-full p-2">
						
					</div>
				</div>

				<div class="flex gap-3 justify-end min-w-full items-end">
					<Button
						variant="outline"
						onclick={() => (open = false)}
						class="py-6 px-15 text-lg"
					>
						Cancel
					</Button>

					<Button
						onclick={() => {
							onConfirm(qty)
							open = false
						}}
						class="py-6 px-15 text-lg hover:bg-primary/80"
						disabled={disabled}
					>
						Buy
					</Button>
				</div>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
