<script>
	import Button from "$lib/components/ui/button/button.svelte"
	import Input from "$lib/components/ui/input/input.svelte"
	import Textarea from "$lib/components/ui/textarea/textarea.svelte"
	import ProjectDetailsDialog from "$lib/components/projectdetails-dialog.svelte"
	let { data } = $props()
	console.log(data)
	let detailsOpen = $state(false)

	let project = {
		name: "Demo Project",
		hours: 4,
		submittedBy: "coolcream",
		type: "software",
		category: "Tribute",
		description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit Donec vel justo eget felis facilisis fermentum. Donec congue lacinia dui, lorem ipsum dolor sit amet`,
	}
</script>

<main class="w-screen h-screen">
	<div class="fixed inset-0 bg-black/20 -z-10"></div>
	<div
		class="relative z-50 p-5 h-full w-full flex items-start justify-start gap-x-5"
	>
		<aside
			class="sidebar w-1/4 h-full rounded-2xl bg-black/20 border-2 overflow-y-auto p-2"
		>
			<button
				class="project w-full border-b h-20 p-2 hover:bg-background rounded-t-2xl"
			>
				<h1 class="text-xl font-bold w-full flex items-center h-10 px-2">
					Demo Project
				</h1>
				<div class="flex px-2 gap-4 items-end h-6">
					<h2 class="creator text-sm text-gray-500">UA01239898</h2>
					<div class="theme text-xs">Tribute</div>
				</div>
			</button>
		</aside>
		<div class="w-full h-full flex flex-col items-center justify-start gap-y-5">
			<nav class="top-bar flex bg-transparent gap-16 text-white">
				<div
					class="button w-34 bg-yellow-900 flex items-center justify-center py-2 rounded-full"
				>
					Pending (20)
				</div>
				<div
					class="button w-34 bg-red-900 flex items-center justify-center py-2 rounded-full"
				>
					Rejected (5)
				</div>
				<div
					class="button w-34 bg-green-900 flex items-center justify-center py-2 rounded-full"
				>
					Approved (15)
				</div>
				<div
					class="button w-34 bg-blue-900 flex items-center justify-center py-2 rounded-full"
				>
					Total (40)
				</div>
			</nav>
			<div
				class="w-full h-full bg-background border-2 rounded-2xl flex flex-col items-center justify-start gap-y-3 p-2"
			>
				<div class="details w-full">
					<div class="top-sect w-full p-1 flex items-center justify-between">
						<div class="text flex flex-col items-start justify-start gap-y-1">
							<div class="flex items-center gap-x-2">
								<h1 class="text-2xl text-primary">Demo Project: (4hrs)</h1>
								<Button onclick={() => (detailsOpen = true)}>Details</Button>
							</div>
							<p class="text-xs text-muted-foreground">
								Submitted by: coolcream, Type: software, Category: Tribute
							</p>
						</div>
						<div class="links flex items-center justify-center gap-x-5">
							<a
								href="/"
								class="hover:scale-104 transition px-2 py-0.5 bg-primary/30 rounded-md"
							>
								Demo
							</a>
							<a
								href="/"
								class="hover:scale-104 transition px-2 py-0.5 bg-primary/30 rounded-md"
							>
								Repo
							</a>
							<a
								href="/"
								class="hover:scale-104 transition px-2 py-0.5 bg-primary/30 rounded-md"
							>
								Readme
							</a>
						</div>
					</div>
					<div
						class="flex items-center justify-between gap-x-5 w-full h-full mt-1"
					>
						<div
							class="form-fields h-full w-[50%] flex flex-col items-start justify-start gap-y-2 mt-2"
						>
							<div
								class="flex flex-col items-start justify-start gap-y-1 w-full"
							>
								<h2 class="text-muted-foreground">Decision:</h2>
								<Textarea
									class="resize-none h-32"
									placeholder="I approve/reject cuz..."
								/>
							</div>
							<div
								class="flex flex-col items-start justify-start gap-y-1 w-full"
							>
								<h2 class="text-muted-foreground">Internal notes (optional)</h2>
								<Textarea
									class="resize-none h-12"
									placeholder="Internal reviewer notes..."
								/>
							</div>
							<div
								class="flex flex-col items-start justify-start gap-y-1 w-full mt-2"
							>
								<div class="flex items-center justify-between w-full">
									<h2 class="text-muted-foreground text-lg">Override hours:</h2>
									<Input class="w-[20%]" type="number" defaultValue="4" />
								</div>
								<Textarea
									class="resize-none h-12"
									placeholder="Overriding these hours becuz..."
								/>
							</div>
							<div class="buttons grid grid-cols-2 gap-x-3 w-full mt-3">
								<button
									class="py-1 px-2 text-lg hover:scale-102 rounded-md bg-green-800"
								>
									Approve
								</button>
								<button
									class="py-1 px-2 text-lg hover:scale-102 rounded-md bg-rose-800"
								>
									Reject
								</button>
							</div>
						</div>
						<div
							class="notes h-full w-[50%] flex flex-col items-start justify-start gap-y-5 mt-2"
						>
							<div
								class="flex flex-col items-start justify-start gap-y-1 w-full"
							>
								<h2 class="text-muted-foreground">Reviewer notes</h2>
								<Textarea
									class="resize-none h-24"
									readonly
									placeholder="This project is a different one i will do it. -coolcream"
								/>
							</div>

							<div
								class="flex flex-col items-start justify-start gap-y-1 w-full"
							>
								<h2 class="text-muted-foreground">Certification History</h2>
								<div
									class="p-2 border rounded-lg space-y-3 max-w-full overflow-y-auto"
								>
									<div class="p-2 border rounded-lg">
										<div class="flex items-center gap-2 justify-between">
											<div class="flex items-center gap-x-1">
												<div
													class="avatar w-6 h-6 rounded-full bg-gray-600"
												></div>
												<div class="text-sm font-bold">Admin User</div>
											</div>
											<div class="text-xs bg-green-800 px-2 py-1 rounded">
												Approved
											</div>
										</div>
										<p class="feedback text-xs text-gray-300 user-not mt-2">
											Great project! Loved the creativity and execution.
										</p>
										<p
											class="notes text-xs text-gray-500 overrideJustification"
										>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Donec vel justo eget felis facilisis fermentum. Donec
											congue lacinia dui, lorem ipsum dolor sit amet
										</p>
									</div>
									<div class="p-2 border rounded-lg">
										<div class="flex items-center gap-2 justify-between">
											<div class="flex items-center gap-x-1">
												<div
													class="avatar w-6 h-6 rounded-full bg-gray-600"
												></div>
												<div class="text-sm font-bold">Admin User 2</div>
											</div>
											<div class="text-xs bg-red-800 px-2 py-1 rounded">
												Rejected
											</div>
										</div>
										<p class="feedback text-xs text-gray-300 user-not mt-2">
											Doesnt work. Please fix it.
										</p>
										<p
											class="notes text-xs text-gray-500 overrideJustification"
										>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Donec vel justo eget felis facilisis fermentum. Donec
											congue lacinia dui, lorem ipsum dolor sit amet
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<ProjectDetailsDialog bind:open={detailsOpen} {project} />
