<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte"
	import Switch from "$lib/components/ui/switch/switch.svelte"
	import { ArrowLeft } from "lucide-svelte"
	let { data } = $props()
	console.log(data)
	let isReviewer = $state(data.isReviewer)
	let isT2Reviewer = $state(data.isT2Reviewer)
	let isFulfiller = $state(data.isFulfiller)
	let isSuperAdmin = $state(data.isSuperAdmin)
	const handleSaveChanges = () => {
		console.log({
			isReviewer,
			isT2Reviewer,
			isFulfiller,
			isSuperAdmin,
		})
	}
</script>

<main class="h-full w-full px-6 py-8 text-white">
	<div class="mb-8 flex items-center gap-3">
		<a
			href="/admin/super-admin/"
			class="rounded-xl border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
		>
			<ArrowLeft class="size-5" />
		</a>

		<div>
			<p class="text-sm text-zinc-400">Manage User</p>
			<h1 class="text-3xl font-bold tracking-tight">{data.slackName}</h1>
		</div>
	</div>

	<section class="max-w-full">
		<div class="px-6 py-2 border-b-2">
			<h2 class="text-xl font-semibold">Roles & Permissions</h2>
			<p class="mt-1 text-sm text-zinc-400">
				Control what this user can access.
			</p>
		</div>

		<div class="space-y-2 px-4 py-2">
			<div
				class="flex items-center justify-between rounded-2xl px-4 py-3 transition hover:bg-white/5"
			>
				<div>
					<p class="font-medium">T1 Reviewer</p>
					<p class="text-sm text-zinc-400">Can review tier 1 submissions</p>
				</div>

				<Switch bind:checked={ isReviewer } />
			</div>

			<div
				class="flex items-center justify-between rounded-2xl px-4 py-3 transition hover:bg-white/5"
			>
				<div>
					<p class="font-medium">T2 Reviewer</p>
					<p class="text-sm text-zinc-400">Can review tier 2 submittions</p>
				</div>

				<Switch bind:checked={ isT2Reviewer } />
			</div>

			<div
				class="flex items-center justify-between rounded-2xl px-4 py-3 transition hover:bg-white/5"
			>
				<div>
					<p class="font-medium">Fulfillment</p>
					<p class="text-sm text-zinc-400">Handles fulfillement</p>
				</div>

				<Switch bind:checked={ isFulfiller } />
			</div>

			<div
				class="flex items-center justify-between rounded-2xl px-4 py-3 transition hover:bg-white/5"
			>
				<div>
					<p class="font-medium">Super Admin</p>
					<p class="text-sm text-zinc-400">Full access</p>
				</div>

				<Switch bind:checked={ isSuperAdmin } />
			</div>
		</div>

		<div class="flex justify-end px-6 py-4">
			<Button
				class="rounded-xl bg-admin-primary px-6 py-5 text-sm font-semibold text-white transition hover:opacity-90 hover:scale-104"
				onclick={() => handleSaveChanges()}
			>
				Save Changes
			</Button>
		</div>
	</section>
</main>
