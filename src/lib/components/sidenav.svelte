<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js"
	import * as Dialog from "$lib/components/ui/dialog/index.js"
	import { cn } from "$lib/lib/utils"
	import {
		CompassIcon,
		Home,
		Blocks,
		ShoppingBag,
		ArrowLeftRight,
		Users,
		ShieldUser,
	} from "lucide-svelte"
	const navItems = [
		{
			href: "/dashboard/projects",
			label: "Projects",
			icon: Blocks,
			description: "Manage your projects",
		},
		{
			href: "/dashboard/shop",
			label: "Shop",
			icon: ShoppingBag,
			description: "Browse the shop",
		},
		{
			href: "/dashboard/trade",
			label: "Trade",
			icon: ArrowLeftRight,
			description: "Trade and exchange",
		},
	]
	const topNavItems = [
		{
			href: "/dashboard/",
			label: "Dashboard",
			icon: Home,
			description: "Your dashboard",
		},
		{
			href: "/refer",
			label: "Refer",
			icon: Users,
			description: "Refer people for rewards",
		},
		{
			href: "/admin",
			label: "Admin",
			icon: ShieldUser,
			description: "Admin backend dash...",
		},
	]
</script>

<Dialog.Root>
	<Dialog.Trigger
		type="button"
		class="top-5 right-5 z-999 absolute bg-chart-5/20 hover:bg-chart-5/40 p-2 border border-chart-5/50 rounded-full transition-colors"
	>
		<CompassIcon class="w-6 h-6 text-chart-5" />
	</Dialog.Trigger>

	<Dialog.Content
		class="bg-background p-0 border-red-500/40 border-dashed min-w-[60vw] overflow-hidden"
	>
		<Dialog.Header
			class="flex flex-row justify-center items-center gap-3 px-6 py-4 border-red-500/20 border-b"
		>
			<img
				src="/Alchemize.png"
				alt=""
				class="w-10 h-10 object-contain shrink-0"
			/>
			<div>
				<Dialog.Title class="font-bold text-chart-5 text-2xl">
					Alchemize
				</Dialog.Title>
				<p class="text-muted-foreground text-xs">
					Where do you want to go today...
				</p>
			</div>
		</Dialog.Header>
		<div class="gap-x-3 grid grid-cols-3 px-6">
			{#each topNavItems as item}
				<Dialog.Close>
					<a href={item.href} class="group">
						<div
							class="flex gap-1 hover:bg-red-950/20 p-4 border border-red-500/20 hover:border-red-500/60 rounded-lg transition-all items-center w-full"
						>
							<div class="p-2">
								<item.icon class="w-6 h-6 text-chart-5" />
							</div>
							<div class="flex flex-col items-start w-full">
								<p class="font-semibold text-foreground text-lg">
									{item.label}
								</p>
								<p
									class={cn(
										"text-muted-foreground text-xs text-left",
										item.label === "Refer" && "text-[11px]"
									)}
								>
									{item.description}
								</p>
							</div>
						</div>
					</a>
				</Dialog.Close>
			{/each}
		</div>
		<div class="gap-3 grid grid-cols-3 px-6 pb-6">
			{#each navItems as item}
				<Dialog.Close>
					<a href={item.href} class="group">
						<div
							class="flex gap-1 hover:bg-red-950/20 p-4 border border-red-500/20 hover:border-red-500/60 rounded-lg transition-all"
						>
							<div class="p-2">
								<item.icon class="w-6 h-6 text-chart-5" />
							</div>
							<div class="flex flex-col items-start">
								<p class="font-semibold text-foreground text-lg">
									{item.label}
								</p>
								<p class="text-muted-foreground text-xs">
									{item.description}
								</p>
							</div>
						</div>
					</a>
				</Dialog.Close>
			{/each}
		</div>
	</Dialog.Content>
</Dialog.Root>
