<script lang="ts">
	let {
		adminPrimary = $bindable(),
		adminHover = $bindable(),
		adminText = $bindable(),
		adminBg = $bindable(),
		admin2Bg = $bindable(),
	} = $props()
</script>

<div class="grid gap-4">
	<div class="grid grid-cols-3 items-center gap-4">
		<label for="adminPrimary" class="text-sm font-medium leading-none">
			Admin Primary
		</label>
		<input
			type="color"
			id="adminPrimary"
			bind:value={adminPrimary}
			class="col-span-2 w-full h-8 cursor-pointer rounded-md border border-input bg-background"
		/>
	</div>
	<div class="grid grid-cols-3 items-center gap-4">
		<label for="adminHover" class="text-sm font-medium leading-none"
			>Admin Hover</label
		>
		<input
			type="color"
			id="adminHover"
			bind:value={adminHover}
			class="col-span-2 w-full h-8 cursor-pointer rounded-md border border-input bg-background"
		/>
	</div>
	<div class="grid grid-cols-3 items-center gap-4">
		<label for="adminText" class="text-sm font-medium leading-none"
			>Admin Text</label
		>
		<input
			type="color"
			id="adminText"
			bind:value={adminText}
			class="col-span-2 w-full h-8 cursor-pointer rounded-md border border-input bg-background"
		/>
	</div>
	<div class="grid grid-cols-3 items-center gap-4">
		<label for="adminBg" class="text-sm font-medium leading-none"
			>Admin Bg</label
		>
		<input
			type="color"
			id="adminBg"
			bind:value={adminBg}
			class="col-span-2 w-full h-8 cursor-pointer rounded-md border border-input bg-background"
		/>
	</div>
	<div class="grid grid-cols-3 items-center gap-4">
		<label for="admin2Bg" class="text-sm font-medium leading-none"
			>Admin Bg 2</label
		>
		<input
			type="color"
			id="admin2Bg"
			bind:value={admin2Bg}
			class="col-span-2 w-full h-8 cursor-pointer rounded-md border border-input bg-background"
		/>
	</div>
</div>
