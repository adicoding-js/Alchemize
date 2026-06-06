<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte"
	import ProjectDialog from "$lib/components/project-dialog.svelte"
	import { themeCurrencyMaps } from "$lib/themeCurrencyMaps"
	import { Plus } from "lucide-svelte"

	import { invalidateAll } from "$app/navigation"
	import { loaderStore } from "$lib/stores/loader"

	import { formatHours, getHackatimeProjects } from "$lib/utils"

	import type { AirtableProject } from "$lib/types"

	let { data } = $props()

	type HackatimeProject = {
		name?: string
		project_name?: string
		project?: string
		total_seconds?: number
	}

	let projects: AirtableProject[] = $state(data?.projects ?? [])

	$effect(() => {
		projects = data?.projects ?? []
	})

	let projectBeingUpdated: AirtableProject | null = $state(null)

	let newProjWindowOpened = $state(false)
	let updateProjWindowOpened = $state(false)

	let showRotator = $state(false)

	let hacks: HackatimeProject[] = $derived(getHackatimeProjects(data?.hacks))

	let usedHackatimes = $derived(
		new Set(
			projects
				.flatMap(project => project.fields.hackatime?.split(",") ?? [])
				.map(name => name.trim().toLowerCase())
				.filter(Boolean)
		)
	)

	let availableHacks = $derived(
		hacks.filter(hack => {
			const hackName = (hack.name ?? hack.project_name ?? hack.project ?? "")
				.trim()
				.toLowerCase()

			return Boolean(hackName) && !usedHackatimes.has(hackName)
		})
	)

	let hackSecondsByName = $derived(
		new Map(
			hacks.map(hack => [
				(hack.name ?? hack.project_name ?? hack.project ?? "")
					.trim()
					.toLowerCase(),
				hack.total_seconds ?? 0,
			])
		)
	)

	function openUpdateProjWindow(project: AirtableProject) {
		projectBeingUpdated = project
		updateProjWindowOpened = true
	}

	function applyBadge(project: AirtableProject) {
		if (project.fields.status.startsWith("pending")) {
			return {
				class: "bg-amber-800 border-l border-l-amber-500 text-white",
				title: "Pending",
			}
		}

		if (project.fields.status.startsWith("rejected")) {
			return {
				class: "bg-red-800 border-l border-l-red-500 text-white",
				title: "Changes Needed",
			}
		}

		if (project.fields.status.startsWith("accepted")) {
			return {
				class: "bg-green-800 border-l border-l-green-500 text-white",
				title: "Approved",
			}
		}

		if (project.fields.status.startsWith("unshipped")) {
			return {
				class: "bg-blue-800 border-l border-l-blue-500 text-white",
				title: "Unshipped",
			}
		}

		return {
			class: "bg-blue-800 border-l border-l-blue-500 text-white",
			title: "Unshipped",
		}
	}

	async function invalidater() {
		loaderStore.set(true)

		try {
			await invalidateAll()
		} finally {
			loaderStore.set(false)
		}
	}

	async function shipProject(changelog: string) {
		if (changelog.trim().length < 20) {
			alert("Please provide a changelog before shipping.")
			return
		}

		const project = projectBeingUpdated

		if (!project) {
			return
		}

		showRotator = true

		try {
			const response = await fetch("/dashboard/projects/ship", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					recordId: project.id,
					changelog,
				}),
				credentials: "include",
			})

			alert(
				response.ok
					? "Project shipped successfully!"
					: `Error shipping project. Code: ${response.status} — contact @TheUtkarsh8939 on Slack`
			)

			const responseData = await response.json()

			if (projectBeingUpdated) {
				const updatedProject = {
					...projectBeingUpdated,
					fields: {
						...projectBeingUpdated.fields,
						...(responseData.newLog
							? {
									log: JSON.stringify(responseData.newLog),
								}
							: {}),
						...(responseData.newStatus
							? {
									status: responseData.newStatus,
								}
							: {}),
					},
				}

				projectBeingUpdated = updatedProject

				projects = projects.map(project =>
					project.id === updatedProject.id ? updatedProject : project
				)
			}

			await invalidateAll()
		} finally {
			showRotator = false
		}
	}
	const renderTheme = (project: AirtableProject) => {

		const theme = project.fields.Theme
		console.log("Rendering theme for", theme)
		const currency = themeCurrencyMaps[theme as keyof typeof themeCurrencyMaps]
		if (!currency) return null
		let iconSrc = ""
		if (currency === "redstone") {
			iconSrc = "/alch-redstone.png"
		}else if (currency === "glowstone") {
			iconSrc = "/alch-glowstone.png"
		}else if (currency === "aqua_regia") {
			iconSrc = "/alch-aquaregia.png"
		}
		return `<img src="${iconSrc}" alt="" class="size-4" />${theme}`
	}
</script>

<!-- <main class="bg-gradbg h-screen w-screen flex flex-col items-center">
	<div class="fixed inset-0 bg-black/60 z-10"></div>

	<div
		class="relative h-full w-full flex flex-col items-center z-50 text-foreground gap-10 p-5 pt-[9%]"
	>
		<div class="h-[90%] w-[80%] flex flex-col items-center justify-start">
			<div
				class="flex items-center justify-between bg-primary/60 p-3 w-full rounded-t-2xl"
			>
				<div class="flex items-center gap-x-2">
					<img src="/Alchemize.png" alt="alch" class="h-14 object-contain" />

					<div>
						<h1 class="text-lg font-alchemize font-semibold">
							Alchemize Projects
						</h1>

						<h2 class="text-xs font-light font-mono">Manage your projects</h2>
					</div>
				</div>

				<Button
					class="h-full px-8 hover:scale-103 transition-transform"
					onclick={() => (newProjWindowOpened = true)}
				>
					<Plus />
					<p class="text-lg">New Project</p>
				</Button>
			</div>

			<div
				class="h-full max-h-full w-full border-primary border-2 border-t-0 rounded-b-2xl p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-start justify-start"
			>
				{#each projects as project}
					<button
						class="text-left"
						onclick={() => openUpdateProjWindow(project)}
					>
						<div
							class=" rounded-xl border border-primary/60 bg-primary/5 hover:bg-primary/10 transition-colors p-4 flex flex-col justify-between"
						>
							<div class="flex items-center justify-between">
								<h2
									class="font-alchemize text-2xl font-semibold text-chart-5 wrap-break-word line-clamp-2"
								>
									{project.fields.Name}
								</h2>

								<p class="text-xs text-muted-foreground font-mono">
									{project.fields.hackatime}
								</p>
							</div>

							<div class="flex flex-col gap-3 mt-5">
								<div>
									<p class="text-xs uppercase opacity-70">Time Tracked</p>

									<p class="text-2xl font-mono">
										{formatHours(
											hackSecondsByName.get(
												project.fields.hackatime.trim().toLowerCase()
											)
										)}
									</p>
								</div>

								<div
									class={`px-3 py-1 rounded-full text-xs font-medium w-fit ${applyBadge(project).class}`}
								>
									{applyBadge(project).title}
								</div>
							</div>
						</div>
					</button>
				{/each}

				{#if projects.length === 0}
					<div
						class="col-span-full flex items-center justify-center h-64 text-muted-foreground"
					>
						No projects yet. Create your first project.
					</div>
				{/if}
			</div>
		</div>
	</div>
</main> -->
<main class="bg-gradbg h-screen w-screen flex flex-col gap-15">
	<div class="container w-150 clip-path-hex bg-primary h-auto mt-10">
		<div
			class="heading h-14 w-140 bg-heading items-center flex text-3xl px-4 font-extrabold tracking-tighter text-rose-100 clip-path-hex"
		>
			Alchemize Projects
		</div>
	</div>
	<div class="projects grid gap-10 w-full px-10 h-full px-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-0">
		{#each projects as project}
		<button
			class="project w-[1fr] h-70 border-4 border-b-12 box-border border-l-12 border-[color-mix(var(--primary)_80%,#000000)] flex relative"
			style="background-image: url({project.fields.screenshot}); background-size: cover; background-repeat: no-repeat; background-position: center;"
			onclick={() => openUpdateProjWindow(project)}
		>
			<div class="abosolute w-full h-full bg-black/80 px-3 py-1">
				<div class="w-full flex justify-between items-center">
					<h1 class="text-[clamp(1rem,1.5vw,1.875rem)] font-semibold font-mono">{project.fields.Name}</h1>
					<div class="time flex gap-3 items-center text-[clamp(0.8rem,1vw,1.3rem)]">
						<i class="fa-clock fa-solid"></i>
						{formatHours(
							hackSecondsByName.get(
								project.fields.hackatime.trim().toLowerCase()
							)
						)}
					</div>
				</div>
				<div
					class="themeIcon flex items-center gap-2 mt-2 text-sm text-neutral-300"
				>
					{@html renderTheme(project)}
				</div>
				<div
					class="desc w-full overflow-hidden text-[13px] h-3/5 text-neutral-500/80 pt-2 text-justify"
				>
					{project.fields.description}
				</div>
				
					<div class="flex items-center absolute bottom-3 right-3">
						<svg
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						width="30"
						height="30"
						viewBox="0 0 50 50"
						fill="#ffffff"
					>
						<path
							d="M 14.78125 5 C 14.75 5.007813 14.71875 5.019531 14.6875 5.03125 C 14.644531 5.050781 14.601563 5.070313 14.5625 5.09375 C 14.550781 5.09375 14.542969 5.09375 14.53125 5.09375 C 14.511719 5.101563 14.488281 5.113281 14.46875 5.125 C 14.457031 5.136719 14.449219 5.144531 14.4375 5.15625 C 14.425781 5.167969 14.417969 5.175781 14.40625 5.1875 C 14.375 5.207031 14.34375 5.226563 14.3125 5.25 C 14.289063 5.269531 14.269531 5.289063 14.25 5.3125 C 14.238281 5.332031 14.226563 5.355469 14.21875 5.375 C 14.183594 5.414063 14.152344 5.457031 14.125 5.5 C 14.113281 5.511719 14.105469 5.519531 14.09375 5.53125 C 14.09375 5.542969 14.09375 5.550781 14.09375 5.5625 C 14.082031 5.582031 14.070313 5.605469 14.0625 5.625 C 14.050781 5.636719 14.042969 5.644531 14.03125 5.65625 C 14.03125 5.675781 14.03125 5.699219 14.03125 5.71875 C 14.019531 5.757813 14.007813 5.800781 14 5.84375 C 14 5.875 14 5.90625 14 5.9375 C 14 5.949219 14 5.957031 14 5.96875 C 14 5.980469 14 5.988281 14 6 C 13.996094 6.050781 13.996094 6.105469 14 6.15625 L 14 39 C 14.003906 39.398438 14.242188 39.757813 14.609375 39.914063 C 14.972656 40.070313 15.398438 39.992188 15.6875 39.71875 L 22.9375 32.90625 L 28.78125 46.40625 C 28.890625 46.652344 29.09375 46.847656 29.347656 46.941406 C 29.601563 47.035156 29.882813 47.023438 30.125 46.90625 L 34.5 44.90625 C 34.996094 44.679688 35.21875 44.09375 35 43.59375 L 28.90625 30.28125 L 39.09375 29.40625 C 39.496094 29.378906 39.84375 29.113281 39.976563 28.730469 C 40.105469 28.347656 39.992188 27.921875 39.6875 27.65625 L 15.84375 5.4375 C 15.796875 5.378906 15.746094 5.328125 15.6875 5.28125 C 15.648438 5.234375 15.609375 5.195313 15.5625 5.15625 C 15.550781 5.15625 15.542969 5.15625 15.53125 5.15625 C 15.511719 5.132813 15.492188 5.113281 15.46875 5.09375 C 15.457031 5.09375 15.449219 5.09375 15.4375 5.09375 C 15.386719 5.070313 15.335938 5.046875 15.28125 5.03125 C 15.269531 5.03125 15.261719 5.03125 15.25 5.03125 C 15.230469 5.019531 15.207031 5.007813 15.1875 5 C 15.175781 5 15.167969 5 15.15625 5 C 15.136719 5 15.113281 5 15.09375 5 C 15.082031 5 15.074219 5 15.0625 5 C 15.042969 5 15.019531 5 15 5 C 14.988281 5 14.980469 5 14.96875 5 C 14.9375 5 14.90625 5 14.875 5 C 14.84375 5 14.8125 5 14.78125 5 Z M 16 8.28125 L 36.6875 27.59375 L 27.3125 28.40625 C 26.992188 28.4375 26.707031 28.621094 26.546875 28.902344 C 26.382813 29.179688 26.367188 29.519531 26.5 29.8125 L 32.78125 43.5 L 30.21875 44.65625 L 24.21875 30.8125 C 24.089844 30.515625 23.828125 30.296875 23.511719 30.230469 C 23.195313 30.160156 22.863281 30.25 22.625 30.46875 L 16 36.6875 Z"
						></path>
					</svg> To View
					</div>
				
			</div>
		</button>
			
		{/each}
				<button
			class="project w-[1fr] h-70 border-4 border-b-12 box-border border-l-12 border-[color-mix(var(--primary)_80%,#000000)] flex relative"
			style="background-image: url('https://picsum.photos/1600/900'); background-size: cover; background-repeat: no-repeat; background-position: center;"
			onclick={() => newProjWindowOpened = true}
		>
			<div class="abosolute w-full h-full bg-black/90 px-3 py-1 flex items-center justify-center">
				<div class="text-xl font-semibold font-mono text-center items-center flex gap-3">
					<i class="fa-solid fa-plus text-3xl"></i> New project
				</div>
				
					<div class="flex items-center absolute bottom-3 right-3">
						<svg
						xmlns="http://www.w3.org/2000/svg"
						x="0px"
						y="0px"
						width="30"
						height="30"
						viewBox="0 0 50 50"
						fill="#ffffff"
					>
						<path
							d="M 14.78125 5 C 14.75 5.007813 14.71875 5.019531 14.6875 5.03125 C 14.644531 5.050781 14.601563 5.070313 14.5625 5.09375 C 14.550781 5.09375 14.542969 5.09375 14.53125 5.09375 C 14.511719 5.101563 14.488281 5.113281 14.46875 5.125 C 14.457031 5.136719 14.449219 5.144531 14.4375 5.15625 C 14.425781 5.167969 14.417969 5.175781 14.40625 5.1875 C 14.375 5.207031 14.34375 5.226563 14.3125 5.25 C 14.289063 5.269531 14.269531 5.289063 14.25 5.3125 C 14.238281 5.332031 14.226563 5.355469 14.21875 5.375 C 14.183594 5.414063 14.152344 5.457031 14.125 5.5 C 14.113281 5.511719 14.105469 5.519531 14.09375 5.53125 C 14.09375 5.542969 14.09375 5.550781 14.09375 5.5625 C 14.082031 5.582031 14.070313 5.605469 14.0625 5.625 C 14.050781 5.636719 14.042969 5.644531 14.03125 5.65625 C 14.03125 5.675781 14.03125 5.699219 14.03125 5.71875 C 14.019531 5.757813 14.007813 5.800781 14 5.84375 C 14 5.875 14 5.90625 14 5.9375 C 14 5.949219 14 5.957031 14 5.96875 C 14 5.980469 14 5.988281 14 6 C 13.996094 6.050781 13.996094 6.105469 14 6.15625 L 14 39 C 14.003906 39.398438 14.242188 39.757813 14.609375 39.914063 C 14.972656 40.070313 15.398438 39.992188 15.6875 39.71875 L 22.9375 32.90625 L 28.78125 46.40625 C 28.890625 46.652344 29.09375 46.847656 29.347656 46.941406 C 29.601563 47.035156 29.882813 47.023438 30.125 46.90625 L 34.5 44.90625 C 34.996094 44.679688 35.21875 44.09375 35 43.59375 L 28.90625 30.28125 L 39.09375 29.40625 C 39.496094 29.378906 39.84375 29.113281 39.976563 28.730469 C 40.105469 28.347656 39.992188 27.921875 39.6875 27.65625 L 15.84375 5.4375 C 15.796875 5.378906 15.746094 5.328125 15.6875 5.28125 C 15.648438 5.234375 15.609375 5.195313 15.5625 5.15625 C 15.550781 5.15625 15.542969 5.15625 15.53125 5.15625 C 15.511719 5.132813 15.492188 5.113281 15.46875 5.09375 C 15.457031 5.09375 15.449219 5.09375 15.4375 5.09375 C 15.386719 5.070313 15.335938 5.046875 15.28125 5.03125 C 15.269531 5.03125 15.261719 5.03125 15.25 5.03125 C 15.230469 5.019531 15.207031 5.007813 15.1875 5 C 15.175781 5 15.167969 5 15.15625 5 C 15.136719 5 15.113281 5 15.09375 5 C 15.082031 5 15.074219 5 15.0625 5 C 15.042969 5 15.019531 5 15 5 C 14.988281 5 14.980469 5 14.96875 5 C 14.9375 5 14.90625 5 14.875 5 C 14.84375 5 14.8125 5 14.78125 5 Z M 16 8.28125 L 36.6875 27.59375 L 27.3125 28.40625 C 26.992188 28.4375 26.707031 28.621094 26.546875 28.902344 C 26.382813 29.179688 26.367188 29.519531 26.5 29.8125 L 32.78125 43.5 L 30.21875 44.65625 L 24.21875 30.8125 C 24.089844 30.515625 23.828125 30.296875 23.511719 30.230469 C 23.195313 30.160156 22.863281 30.25 22.625 30.46875 L 16 36.6875 Z"
						></path>
					</svg> To Create
					</div>
				
			</div>
		</button>
	
	</div>
</main>
<ProjectDialog
	bind:open={newProjWindowOpened}
	mode="create"
	{availableHacks}
	{invalidater}
	onship={() => {}}
/>

<ProjectDialog
	bind:open={updateProjWindowOpened}
	mode="update"
	project={projectBeingUpdated}
	{availableHacks}
	onship={shipProject}
	{showRotator}
	{invalidater}
/>

<style>
	.bg-heading {
		background: color-mix(in hsl, var(--primary), #430000);
	}
	.clip-path-hex {
		clip-path: polygon(0 0, 100% 0, 92% 100%, 0 100%);
	}
	.bg-gradbg {
		background-image: linear-gradient(
			to bottom right,
			var(--color-neutral-950) /* oklch(14.5% 0 0) = #0a0a0a */,
			#130609,
			#2b030e
		);
	}
	.project {
		box-shadow: inset 0 0 0 2px var(--primary);
		clip-path: polygon(
			10px 0,
			100% 0,
			100% calc(100% - 10px),
			calc(100% - 10px) 100%,
			0 100%,
			0 10px
		);
	}
</style>
