<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte"
	import * as Dialog from "$lib/components/ui/dialog"

	type ShopItem = {
		name: string
		shortDescription: string
		longDescription: string
		price: number
		image: string
	}

	let {
		open = $bindable(false),
		item = {
			name: "",
			shortDescription: "",
			longDescription: "",
			price: 0,
			image: "",
		},
		onConfirm = () => {},
	}: {
		open: boolean
		item: ShopItem
		onConfirm: () => void
	} = $props()
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
						{item.longDescription}
					</div>
				</div>
			</div>

			<div class="flex flex-col justify-between w-full">
				<div
					class="flex flex-col justify-between items-end w-full h-full gap-3 p-2"
				>
					<div class="space-y-1 text-right">
						<p class="text-xl">
							Item price: <span class="text-primary font-bold">
								{item.price}</span
							>
							Potion Mixes
						</p>
						<p class="text-xl">
							Current balance: <span class="text-primary font-bold"> 800</span>
							Potion Mixes
						</p>
					</div>
					<div class="flex flex-col gap-y-2 w-full p-2">
						<div
							class="text-sm font-mono bg-muted text-muted-foreground py-3 px-2 w-full text-right rounded-xl"
						>
							preloaded address from hc auth goes here
						</div>
						<p class="text-xs text-muted-foreground text-right">
							Not the right address? Change it from
							<a
								href="https://auth.hackclub.com/addresses"
								class="text-primary hover:text-primary/70"
								target="_blank"
							>
								HC auth
							</a>
						</p>
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
							onConfirm()
							open = false
						}}
						class="py-6 px-15 text-lg hover:bg-primary/80"
					>
						Buy
					</Button>
				</div>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
