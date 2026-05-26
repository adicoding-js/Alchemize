<script>
	import {
        PUBLIC_ADMIN_HACKCLUB_AUTH,
		PUBLIC_ADMIN_HACKCLUB_REDIRECT
	} from "$env/static/public"
	import Button from "$lib/components/ui/button/button.svelte"
	const clientId = PUBLIC_ADMIN_HACKCLUB_AUTH
	const uri = PUBLIC_ADMIN_HACKCLUB_REDIRECT
	let authUrl = `https://auth.hackclub.com/oauth/authorize?client_id=${clientId}&response_type=code&scope=openid+profile+email+name+verification_status+slack_id&redirect_uri=${uri}`
</script>

<div class="login w-screen h-screen flex items-center justify-center flex-col">
	<h1 class="text-3xl font-bold">Admin Login</h1>
	<button
        onclick={() => {
            window.location.href = authUrl
        }}
		style="background-color: #fff"
		class="bg-white text-black px-20 py-1 mt-10 hover:bg-gray-200"
		>Login with Hack Club</button
	>
</div>
