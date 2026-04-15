<script>
    import Nav from '$lib/Nav.svelte';
</script>
<Nav />
<div class="absolute center-ovr w-screen h-screen flex items-center justify-center top-0">
<div class="alchemy">
    <h1 class=" text-red-500 text-5xl font-bold text-center mt-10 flex justify-center items-center">
        <img src="./Alchemist.webp" alt="" class="logo size-20">
        <span class="font alchemizefont">Alchemize</span>
    </h1>
    <div class="description">
        <div class="flex items-center justify-center"><p class="text-gray-300 text-justify mt-10 text-lg w-4/5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique blanditiis velit natus, nisi accusamus quibusdam deleniti doloremque, possimus adipisci, eaque odio incidunt labore nemo at molestiae minus iusto ea inventore! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt totam sapiente blanditiis molestiae eius. Ea laudantium reprehenderit ab expedita cum molestias doloremque? Sequi harum excepturi quae magnam vitae dolore minus.</p></div>
    </div>
</div>
    
</div>
<div class="absolute -z-10 w-screen h-screen"><div class="img absolute -z-20 w-full h-full"></div><div class="ovr h-full w-screen -z-10"></div></div>
<style>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
    .img {
        background-image: url('./bg.png');
        background-size: cover;
        background-position: center;
    }
    .ovr{
        background: rgba(0, 0, 0, 0.541);
    }
    .alchemy{
        background: radial-gradient(#00000028, #000000);
        height: 500px;
        width: 600px;
        border: 1px solid #161616;
        border-radius: 30px;
    }
    .alchemizefont{
        font-family: 'Dancing Script', cursive;
    }
</style>