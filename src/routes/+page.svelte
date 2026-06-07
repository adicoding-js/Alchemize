<script lang="ts">
	import {
		ArrowDown,
		Blocks,
		FlaskConical,
		Rocket,
		ShoppingCart,
		Users,
		X,
	} from "lucide-svelte"
	import { onMount } from "svelte"
	import { browser } from "$app/environment"
	import {
		PUBLIC_HACKCLUB_AUTH,
		PUBLIC_HACKCLUB_REDIRECT,
	} from "$env/static/public"
	import Accordion from "$lib/components/accordion.svelte"
	let { data } = $props()
	let rsvpCount: number | "Fetching" = $state("Fetching")
	let showRotator = $state(false)
	const clientId = PUBLIC_HACKCLUB_AUTH
	const uri = encodeURIComponent(PUBLIC_HACKCLUB_REDIRECT)

	let hasaccessToken = $state(
		browser &&
			document.cookie.split("; ").find(row => row.startsWith("slack_id=")) !==
				undefined
	)

	let authUrl = $derived(
		hasaccessToken
			? `./dashboard`
			: `https://auth.hackclub.com/oauth/authorize?client_id=${clientId}&response_type=code&scope=openid+profile+email+name+verification_status+slack_id&redirect_uri=${uri}`
	)
	let referUrl = $state(`./refer`)

	onMount(() => {
		if (data.error) {
			alert(data.error)
		}
		hasaccessToken =
			document.cookie.split("; ").find(row => row.startsWith("slack_id=")) !==
			undefined

		authUrl = hasaccessToken
			? `./dashboard`
			: `https://auth.hackclub.com/oauth/authorize?client_id=${clientId}&response_type=code&scope=openid+profile+email+name+verification_status+slack_id&redirect_uri=${uri}`
		fetch("/rsvp")
			.then(res => res.json())
			.then(data => (rsvpCount = data.count))

		referUrl = hasaccessToken
			? `./refer`
			: `https://auth.hackclub.com/oauth/authorize?client_id=${clientId}&response_type=code&scope=openid+profile+email+name+verification_status+slack_id&redirect_uri=${uri}`
		fetch("/rsvp")
			.then(res => res.json())
			.then(data => (rsvpCount = data.count))

		const blob = document.getElementById("blob")
		let mouseX = 0
		let mouseY = 0
		let currentX = 0
		let currentY = 0

		const handleMouseMove = (event: MouseEvent) => {
			mouseX = event.clientX - 128
			mouseY = event.clientY - 128
		}

		const animateBlob = () => {
			currentX += (mouseX - currentX) * 0.08
			currentY += (mouseY - currentY) * 0.08

			if (blob instanceof HTMLElement) {
				blob.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
			}

			requestAnimationFrame(animateBlob)
		}

		requestAnimationFrame(animateBlob)

		window.addEventListener("mousemove", handleMouseMove)
		return () => window.removeEventListener("mousemove", handleMouseMove)
	})
</script>

<div
	id="blob"
	class="z-20 fixed opacity-40 blur-[100px] size-72 pointer-events-none background-gradient"
></div>

<div
	class="relative w-screen min-h-screen overflow-x-hidden bg-zinc-950 text-zinc-100 selection:bg-rose-500 selection:text-white"
>
	<div
		class="absolute inset-0 bg-[linear-gradient(to_right,#1f1115_1px,transparent_1px),linear-gradient(to_bottom,#1f1115_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10"
	></div>
	<div class="absolute inset-0 -z-10 bg-black/40 backdrop-blur-[2px]"></div>

	<div class="streaks">
		<div class="streak streak-1"></div>
		<div class="streak streak-2"></div>
		<div class="streak streak-3"></div>
		<div class="streak streak-4"></div>
	</div>

	<main class="z-10 relative">
		<section
			class="flex flex-col justify-center pt-24 gap-y-11 px-[clamp(20px,5vw,64px)] min-h-screen relative max-w-7xl mx-auto"
		>
			<div
				class="flex items-center gap-x-4 justify-self-start absolute top-0 left-10 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/80 px-4 py-2 pt-0 rounded-2xl shadow-lg shadow-black/20 border-t-0 rounded-t-none"
			>
				<a
					href="https://hackclub.com/"
					class="transition-transform hover:scale-105"
				>
					<img
						class="border-0 w-24 z-999"
						src="https://assets.hackclub.com/flag-orpheus-top.svg"
						alt="Hack Club"
					/>
				</a>
				<X class="font-bold h-5 w-5 text-rose-500/80" />
				<div class="relative group">
					<img src="/Alchemist.webp" alt="" class="w-9 h-9 relative z-10" />
				</div>
				<span
					class="font-alchemize font-bold tracking-widest text-sm text-rose-500 select-none pointer-events-none"
				>
					ALCHEMIZE
				</span>
			</div>

			<div class="space-y-4">
				<h1
					class="font-alchemize hero-title text-rose-600 drop-shadow-[0_0_35px_rgba(225,29,72,0.5)] animate-pulse duration-[4000ms]"
				>
					ALCHEMIZE
				</h1>

				<p
					class="text-rose-200/90 text-[clamp(1.1rem,4vw,1.75rem)] leading-relaxed max-w-2xl font-medium"
				>
					Turn your code into prizes.<br />
					<span
						class="bg-gradient-to-r from-white via-rose-200 to-rose-400 bg-clip-text text-transparent text-[clamp(1.5rem,5vw,2.25rem)] font-extrabold tracking-tight"
					>
						And you're invited.
					</span>
					<br />
					<span
						class="inline-flex items-center mt-2 px-3 py-1 text-sm font-semibold rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 backdrop-blur-sm"
					>
						Ages 13-18 Only
					</span>
				</p>
			</div>

			<div class="flex flex-wrap items-center gap-4">
				<a
					href={authUrl}
					class="cta-btn relative group overflow-hidden bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white shadow-[0_4px_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_35px_rgba(225,29,72,0.6)] transition-all duration-300 border-t border-rose-400/30"
					onclick={() => (showRotator = true)}
				>
					<span class="cta-text z-10">GET STARTED</span>
					{#if showRotator}
						<div
							class="w-6 h-6 border-3 border-rose-950 border-t-white rounded-full animate-spin z-10"
						></div>
					{:else}
						<div
							class="cta-chevrons text-rose-200 z-10 flex gap-0.5 font-sans font-bold"
						>
							<span>›</span><span>›</span><span>›</span>
						</div>
					{/if}
					<div
						class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"
					></div>
				</a>

				<div class="group relative flex items-center gap-x-3">
					<a
						href={referUrl}
						class="refer-btn bg-zinc-900/60 border border-rose-900/50 hover:border-rose-500/80 backdrop-blur-md text-rose-300 shadow-md transition-all duration-300 hover:text-white flex flex-col"
					>
						<Users
							class="h-5 w-5 mb-0.5 text-rose-400 group-hover:scale-110 transition-transform"
						/>
						<p class="text-xs font-bold tracking-wider">REFER!</p>
					</a>

					<div
						class="pointer-events-none absolute left-0 -top-14 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 text-xs font-medium bg-zinc-900/90 border border-rose-900/40 p-3 rounded-xl text-zinc-200 shadow-xl shadow-black/40 backdrop-blur-md w-48"
					>
						<div
							class="absolute bottom-[-5px] left-6 w-2 h-2 bg-zinc-900 border-r border-b border-rose-900/40 rotate-45"
						></div>
						Refer people for cool rewards!
					</div>
				</div>
			</div>

			<div
				class="flex flex-col gap-3 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-md w-[clamp(260px,50vw,420px)] shadow-lg shadow-black/20 relative group overflow-hidden"
			>
				<div
					class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/40 to-transparent"
				></div>
				<div
					class="flex items-center justify-between text-xs font-semibold tracking-wider text-rose-300/80"
				>
					<span>Start Goal</span>
					<span
						class="text-rose-400 font-mono bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20"
						>{rsvpCount} RSVPs</span
					>
				</div>
				<div
					class="bg-zinc-950 border border-zinc-800 rounded-full w-full h-4 p-0.5 overflow-hidden"
				>
					<div
						class="bg-gradient-to-r from-rose-700 via-rose-500 to-rose-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(225,29,72,0.8)] relative"
						style="width: {((typeof rsvpCount === 'string' ? 140 : rsvpCount) /
							210) *
							100}%"
					>
						<div
							class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[size:1rem_1rem] animate-[progressStripes_1s_linear_infinite]"
						></div>
					</div>
				</div>
			</div>

			<a
				href="#features"
				class="self-start text-rose-500 hover:text-rose-400 p-2 rounded-full bg-rose-500/5 border border-rose-500/20 hover:border-rose-500/50 hover:bg-rose-500/10 transition-all duration-300 shadow-inner"
			>
				<ArrowDown class="w-6 h-6 animate-bounce" />
			</a>
		</section>

		<div
			class="w-full leading-none relative z-0 opacity-80 filter drop-shadow-[0_-10px_20px_rgba(225,29,72,0.05)]"
		>
			<svg
				viewBox="0 0 1440 100"
				preserveAspectRatio="none"
				class="w-full h-24"
			>
				<path
					d="M0,40 C200,90 400,10 600,50 C800,90 1000,20 1200,60 C1440,85 1440,55 1440,55 L1440,100 L0,100 Z"
					class="fill-rose-950/30"
				/>
				<path
					d="M0,60 C150,30 350,80 550,45 C750,10 950,70 1150,40 C1400,20 1440,50 1440,50 L1440,100 L0,100 Z"
					class="fill-rose-950/15"
					opacity="0.6"
				/>
			</svg>
		</div>

		<section
			id="features"
			class="flex flex-col items-center gap-16 bg-gradient-to-b from-rose-950/20 to-zinc-950 px-6 md:px-16 py-24 relative"
		>
			<div
				class="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-rose-500/5 rounded-full blur-[120px] pointer-events-none"
			></div>

			<h2
				class="font-alchemize text-center section-title text-3xl text-rose-100 tracking-widest bg-gradient-to-b from-zinc-100 to-zinc-400 bg-clip-text text-transparent"
			>
				HOW IT WORKS
			</h2>

			<div class="gap-6 grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl">
				<div
					class="feature-card group relative bg-zinc-900/30 border border-zinc-800/60 hover:border-rose-500/40 p-8 rounded-2xl backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
				>
					<div
						class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
					></div>
					<div
						class="p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl w-fit mb-4 group-hover:bg-rose-500/10 group-hover:border-rose-500/40 transition-colors shadow-inner"
					>
						<Blocks class="h-6 w-6 text-rose-400" />
					</div>
					<h3
						class="font-alchemize text-rose-200 text-xl font-bold mb-2 tracking-wide"
					>
						Create
					</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Pick a theme (Sci-Fi, Anime, or Tribute) and track hours via
						<span class="text-rose-400/90 font-medium">Hackatime</span>.
					</p>
				</div>
				<div
					class="feature-card group relative bg-zinc-900/30 border border-zinc-800/60 hover:border-rose-500/40 p-8 rounded-2xl backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
				>
					<div
						class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
					></div>
					<div
						class="p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl w-fit mb-4 group-hover:bg-rose-500/10 group-hover:border-rose-500/40 transition-colors shadow-inner"
					>
						<Rocket class="h-6 w-6 text-rose-400" />
					</div>
					<h3
						class="font-alchemize text-rose-200 text-xl font-bold mb-2 tracking-wide"
					>
						Ship It
					</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Submit your project for review by <span
							class="text-rose-400/90 font-medium">Master Alchistants</span
						> to earn theme currency.
					</p>
				</div>
				<div
					class="feature-card group relative bg-zinc-900/30 border border-zinc-800/60 hover:border-rose-500/40 p-8 rounded-2xl backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
				>
					<div
						class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
					></div>
					<div
						class="p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl w-fit mb-4 group-hover:bg-rose-500/10 group-hover:border-rose-500/40 transition-colors shadow-inner"
					>
						<FlaskConical class="h-6 w-6 text-rose-400" />
					</div>
					<h3
						class="font-alchemize text-rose-200 text-xl font-bold mb-2 tracking-wide"
					>
						Mix Potions
					</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Convert currencies into <span class="text-rose-400/90 font-medium"
							>Potion Mix</span
						>. Mixing multiple types grants legendary compound bonuses.
					</p>
				</div>
				<div
					class="feature-card group relative bg-zinc-900/30 border border-zinc-800/60 hover:border-rose-500/40 p-8 rounded-2xl backdrop-blur-md transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
				>
					<div
						class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
					></div>
					<div
						class="p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl w-fit mb-4 group-hover:bg-rose-500/10 group-hover:border-rose-500/40 transition-colors shadow-inner"
					>
						<ShoppingCart class="h-6 w-6 text-rose-400" />
					</div>
					<h3
						class="font-alchemize text-rose-200 text-xl font-bold mb-2 tracking-wide"
					>
						Dynamic Shop
					</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Spend your Potion Mix on real rewards. New components and items
						added weekly based on suggestions!
					</p>
				</div>
			</div>
		</section>

		<section
			id="themes"
			class="flex flex-col items-center gap-16 bg-zinc-950 px-6 md:px-16 pt-12 pb-72 relative"
		>
			<h2
				class="font-alchemize text-center section-title text-2xl text-rose-100 tracking-widest"
			>
				The Three Themes of Season 1
			</h2>

			<div class="gap-6 grid grid-cols-1 md:grid-cols-3 w-full max-w-5xl">
				<div
					class="feature-card group bg-gradient-to-b from-zinc-900/40 to-zinc-950 border border-zinc-800/40 hover:border-rose-950 p-6 rounded-2xl transition-all duration-300 relative overflow-hidden"
				>
					<div
						class="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-colors"
					></div>
					<h3
						class="font-alchemize text-rose-400 text-xl mb-3 tracking-wide border-b border-zinc-800/60 pb-2"
					>
						Endless
					</h3>
					<p class="text-zinc-400 text-xs leading-relaxed">
						Create a project with an infinite Canvas. It can be a game where
						levels generate endlessly (like Pac-Man), a paint app with an
						infinite canvas, or a scientific simulation which keeps on running
						indefinitely.
					</p>
				</div>
				<div
					class="feature-card group bg-gradient-to-b from-zinc-900/40 to-zinc-950 border border-zinc-800/40 hover:border-rose-950 p-6 rounded-2xl transition-all duration-300 relative overflow-hidden"
				>
					<div
						class="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-colors"
					></div>
					<h3
						class="font-alchemize text-rose-400 text-xl mb-3 tracking-wide border-b border-zinc-800/60 pb-2"
					>
						No Internet
					</h3>
					<p class="text-zinc-400 text-xs leading-relaxed">
						Make something that works without an internet connection. No APIs,
						no CDNs, no remote asset fetching. Build an offline local
						multiplayer game, a chat application running on Bluetooth networks,
						or standalone hardware.
					</p>
				</div>
				<div
					class="feature-card group bg-gradient-to-b from-zinc-900/40 to-zinc-950 border border-zinc-800/40 hover:border-rose-950 p-6 rounded-2xl transition-all duration-300 relative overflow-hidden"
				>
					<div
						class="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-colors"
					></div>
					<h3
						class="font-alchemize text-rose-400 text-xl mb-3 tracking-wide border-b border-zinc-800/60 pb-2"
					>
						Indie Gamedev
					</h3>
					<p class="text-zinc-400 text-xs leading-relaxed">
						Make a game inspired by the indie genre. Focus on narrative-driven
						elements, innovative mechanics, or stylistic pixel art and
						hand-drawn aesthetics. Let creativity and retro-modern design lead
						your architecture.
					</p>
				</div>
			</div>
		</section>

		<div class="w-screen leading-none -mt-[20vw] relative z-10">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 1440 320"
				class="filter drop-shadow-[0_-5px_15px_rgba(0,0,0,0.5)]"
			>
				<path
					class="fill-rose-950/20"
					fill-opacity="1"
					d="M0,160L30,170.7C60,181,120,203,180,224C240,245,300,267,360,277.3C420,288,480,288,540,277.3C600,267,660,245,720,218.7C780,192,840,160,900,160C960,160,1020,192,1080,208C1140,224,1200,224,1260,197.3C1320,171,1380,117,1410,90.7L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
				></path>
			</svg>
		</div>

		<section
			id="faq"
			class="flex flex-col items-center gap-6 px-6 md:px-16 py-24 min-auto pb-75 h-auto bg-gradient-to-b from-rose-950/20 to-zinc-950 -mt-1 relative z-10"
		>
			<h2
				class="font-alchemize text-center section-title text-3xl text-rose-100 tracking-widest"
			>
				FAQ
			</h2>
			<div class="w-full max-w-4xl space-y-4">
				<Accordion
					Title="What is a 'ship'?"
					Content="A 'ship' is the project you submit to this event. You can ship any general project or a project related to one of the <a class='text-rose-400 p-1 hover:bg-rose-900/50 transition rounded hover:text-white underline' href='#themes'>themes</a>"
					addClass="faq-item min-h-[4.5rem] w-full font-sans border border-zinc-800/60 rounded-2xl bg-zinc-900/20 backdrop-blur-sm shadow-md px-2"
				/>
				<Accordion
					Title="How do I participate?"
					Content="Just Click on Get Started button on the home page or click on <a class='text-rose-400 p-1 hover:bg-rose-900/50 transition rounded hover:text-white underline' target='_blank' href={authUrl}>this</a> link."
					addClass="faq-item min-h-[4.5rem] w-full font-sans border border-zinc-800/60 rounded-2xl bg-zinc-900/20 backdrop-blur-sm shadow-md px-2"
				/>
				<Accordion
					Title="Who is Eligible?"
					Content="Anyone ages 13-18 who isn't banned from Hack Club can participate."
					addClass="faq-item min-h-[4.5rem] w-full font-sans border border-zinc-800/60 rounded-2xl bg-zinc-900/20 backdrop-blur-sm shadow-md px-2"
				/>
				<Accordion
					Title="How is time tracked?"
					Content="Software development time is tracked using <a class='text-rose-400 p-1 hover:bg-rose-900/50 transition rounded hover:text-white underline' target='_blank' href='hackatime.hackclub.com'>Hackatime</a>"
					addClass="faq-item min-h-[4.5rem] w-full font-sans border border-zinc-800/60 rounded-2xl bg-zinc-900/20 backdrop-blur-sm shadow-md px-2"
				/>
				<Accordion
					Title="What is Hack Club?"
					Content="Hack Club is a community of creative coders who love to build and share their projects. It is also the world’s largest nonprofit movement of teenagers making cool projects."
					addClass="faq-item min-h-[4.5rem] w-full font-sans border border-zinc-800/60 rounded-2xl bg-zinc-900/20 backdrop-blur-sm shadow-md px-2"
				/>
				<Accordion
					Title="Where can I find more information?"
					Content="If you have any questions or need help with anything, just join the <a class='text-rose-400 p-1 hover:bg-rose-900/50 transition rounded hover:text-white underline' target='_blank' href='https://hackclub.enterprise.slack.com/archives/C0ASY6R552R'>#alchemize-help</a> channel in the Hack Club Slack! You can ask for help there, and the community will be happy to assist you. "
					addClass="faq-item min-h-[4.5rem] w-full font-sans border border-zinc-800/60 rounded-2xl bg-zinc-900/20 backdrop-blur-sm shadow-md px-2"
				/>
			</div>
		</section>

		<div class="w-screen leading-none -mt-[30vw] z-10 relative h-auto">
			<svg
				width="100%"
				height="100%"
				id="svg"
				viewBox="0 0 1440 470"
				xmlns="http://www.w3.org/2000/svg"
				class="transition duration-300 ease-in-out delay-150"
			>
				<path
					d="M 0,600 L 0,350 C 163.46666666666664,318.4 326.9333333333333,286.8 498,287 C 669.0666666666667,287.2 847.7333333333333,319.2 1006,335 C 1164.2666666666667,350.8 1302.1333333333332,350.4 1440,350 L 1440,600 L 0,600 Z"
					stroke="none"
					stroke-width="0"
					class="fill-zinc-950 transition-all duration-300 ease-in-out delay-150 path-1"
				></path>
			</svg>
			<footer
				class="w-full px-6 md:px-20 absolute items-center flex flex-col md:flex-row bg-zinc-950 border-t border-zinc-900 pt-16 pb-16 gap-10 justify-around text-zinc-400 text-sm"
			>
				<div class="row1 flex flex-col gap-5 w-full md:w-1/4">
					<h3
						class="text-2xl font-semibold font-alchemize text-rose-500 tracking-wider"
					>
						Hackclub
					</h3>
					<ul class="flex list-none flex-col gap-3 font-medium text-xs">
						<li>
							<a
								class="hover:text-rose-400 transition-colors"
								href="https://hackclub.com/philosophy/">Philosophy</a
							>
						</li>
						<li>
							<a
								class="hover:text-rose-400 transition-colors"
								href="https://hackclub.com/team/">Team and Board</a
							>
						</li>
						<li>
							<a
								class="hover:text-rose-400 transition-colors"
								href="https://hackclub.com/brand/">Brand Guide</a
							>
						</li>
						<li>
							<a
								class="hover:text-rose-400 transition-colors"
								href="https://hackclub.com/philanthropy/">Donate</a
							>
						</li>
						<li>
							<a
								class="hover:text-rose-400 transition-colors"
								href="https://hackclub.com/imprint/">Imprint</a
							>
						</li>
					</ul>
				</div>
				<div
					class="midrow flex flex-col gap-2 text-center order-last md:order-none"
				>
					<h2 class="text-zinc-300 font-medium">
						Made with 💖 by TheUtkarsh8939 and coolcream
					</h2>
					<h2 class="text-zinc-600 text-xs font-mono">
						© Hackclub, All rights reserved
					</h2>
				</div>
				<div class="row2 flex flex-col gap-5 w-full md:w-1/4">
					<h3
						class="text-2xl font-semibold font-alchemize text-rose-500 tracking-wider"
					>
						Resources
					</h3>
					<ul class="flex list-none flex-col gap-3 font-medium text-xs">
						<li>
							<a
								class="hover:text-rose-400 transition-colors"
								href="https://hackclub.com/philosophy/">Community Events</a
							>
						</li>
						<li>
							<a
								class="hover:text-rose-400 transition-colors"
								href="https://hackclub.com/team/">Jams</a
							>
						</li>
						<li>
							<a
								class="hover:text-rose-400 transition-colors"
								href="https://hackclub.com/https://toolbox.hackclub.com/"
								>Toolbox</a
							>
						</li>
						<li>
							<a
								class="hover:text-rose-400 transition-colors"
								href="https://hackclub.com/conduct/">Code of Conduct</a
							>
						</li>
						<li>
							<a
								class="hover:text-rose-400 transition-colors"
								href="https://hackclub.com/privacy/">Privacy Policy</a
							>
						</li>
					</ul>
				</div>
			</footer>
		</div>
	</main>
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Shantell+Sans:ital,wght@0,300..800;1,300..800&display=swap");

	main {
		transform: translateZ(0);
	}

	section {
		will-change: transform;
	}

	.background-gradient {
		position: fixed;
		background: linear-gradient(45deg, #4c0519, #9f1239);
		will-change: transform;
	}

	.streaks {
		position: absolute;
		top: 0;
		right: 0;
		width: 50vw;
		height: 35vh;
		pointer-events: none;
		z-index: 0;
		overflow: hidden;
	}
	.streak {
		position: absolute;
		right: -10%;
		border-radius: 999px;
		transform: rotate(-8deg);
		transform-origin: right center;
	}
	.streak-1 {
		width: 80%;
		top: 6%;
		height: 16px;
		background: #4c0519;
		animation: streak-in 0.6s ease 0.1s both;
	}
	.streak-2 {
		width: 65%;
		top: 13%;
		height: 12px;
		background: #881337;
		animation: streak-in 0.6s ease 0.2s both;
	}
	.streak-3 {
		width: 50%;
		top: 19%;
		height: 8px;
		background: #9f1239;
		animation: streak-in 0.6s ease 0.3s both;
	}
	.streak-4 {
		width: 35%;
		top: 24%;
		height: 5px;
		background: #be123c;
		animation: streak-in 0.6s ease 0.4s both;
	}

	@keyframes streak-in {
		from {
			opacity: 0;
			transform: rotate(-8deg) translateX(100px);
		}
		to {
			opacity: 1;
			transform: rotate(-8deg) translateX(0);
		}
	}

	.hero-title {
		font-size: clamp(2.5rem, 12vw, 8rem);
		line-height: 1;
		pointer-events: none;
		user-select: none;
		color: #f43f5e;
		-webkit-text-stroke: 1px #e11d48;
	}

	.cta-btn {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 320px;
		width: 45vw;
		border-radius: 1rem;
		padding: 1rem 1.75rem;
		text-decoration: none;
	}

	svg {
		display: block;
	}

	.refer-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 4.5rem;
		height: 4.5rem;
		border-radius: 1rem;
		text-decoration: none;
	}

	.cta-btn:hover {
		transform: translateY(-2px);
	}
	.refer-btn:hover {
		transform: translateY(-2px);
	}

	.cta-text {
		font-family: var(--font-alchemize);
		font-size: clamp(0.9rem, 3.5vw, 1.25rem);
		font-weight: 900;
		color: white;
		letter-spacing: 0.05em;
	}

	@keyframes shimmer {
		100% {
			transform: translateX(100%);
		}
	}

	@keyframes progressStripes {
		from {
			background-position: 0 0;
		}
		to {
			background-position: 1rem 0;
		}
	}
</style>
