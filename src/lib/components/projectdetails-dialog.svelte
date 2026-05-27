<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog"
	import Button from "$lib/components/ui/button/button.svelte"

	type Project = {
		name: string
		hours: number
		submittedBy: string
		type: string
		category: string
		description: string
	}

	let {
		open = $bindable(false),
		project = {
			name: "Demo Project",
			hours: 4,
			submittedBy: "coolcream",
			type: "software",
			category: "Tribute",
			description:
				"This is a demo project description. Soon this will be dynamic.",
		},
	}: {
		open: boolean
		project: Project
	} = $props()
</script>

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-150">
		<Dialog.Header>
			<Dialog.Title>{project.name} ({project.hours}hrs)</Dialog.Title>

			<Dialog.Description>
				{project.submittedBy} • {project.type} • {project.category}
			</Dialog.Description>
		</Dialog.Header>

		<div class="space-y-4 py-2">
			<div>
				<h2 class="font-semibold">Description</h2>
				<p class="text-muted-foreground">
					{project.description}
				</p>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
