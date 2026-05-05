<script lang="ts">
	import Button from "./ui/button/button.svelte"
	import { Blocks, ShoppingBasket } from "lucide-svelte"
	import { BookDashed } from "lucide-svelte"

	const changeHref = (href: string) => {
		window.location.href = `${href}`
	}
</script>

<div
	class="group sticky w-16 bg-accent h-full flex flex-col py-3 px-2 hover:w-64 transition-[width] duration-300 ease-in-out overflow-hidden"
>
	<Button
		variant="ghost"
		class="flex items-center justify-start gap-3 px-3 w-full mb-16"
		onclick={() => (window.location.href = "/")}
	>
		<img src="/Alchemist.webp" alt="" class="h-7 w-7 shrink-0 object-contain" />
		<span
			class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 whitespace-nowrap text-lg"
		>
			Alchemize
		</span>
	</Button>

	<div class="w-full h-full space-y-3">
		<Button
			class="w-full justify-start gap-3 px-3"
			variant="ghost"
			size="lg"
			onclick={() => changeHref("/dashboard")}
		>
			<BookDashed class="h-5 w-5 shrink-0" />
			<span
				class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 whitespace-nowrap"
			>
				Home
			</span>
		</Button>
		<Button
			class="w-full justify-start gap-3 px-3"
			variant="ghost"
			size="lg"
			onclick={() => changeHref("/dashboard/projects")}
		>
			<Blocks class="h-5 w-5 shrink-0" />
			<span
				class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 whitespace-nowrap"
			>
				Projects
			</span>
		</Button>
		<Button
			class="w-full justify-start gap-3 px-3"
			variant="ghost"
			size="lg"
			onclick={() => changeHref("/dashboard/shop")}
		>
			<ShoppingBasket class="h-5 w-5 shrink-0" />
			<span
				class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 whitespace-nowrap"
			>
				Shop
			</span>
		</Button>
	</div>
</div>
