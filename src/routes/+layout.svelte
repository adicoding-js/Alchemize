<script lang="ts">
	import "./layout.css"

  import { Toaster } from "$lib/components/ui/sonner/index.js";
	let { children } = $props()

</script>
<Toaster />
<svelte:head><link rel="icon" href="/Alchemist.webp" /></svelte:head>
{@render children()}
