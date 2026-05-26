<script>
    let {children} = $props();
</script>
<div class="bg-black fixed w-screen h-screen -z-10">
<div class="bg fixed w-screen h-screen -z-10">

</div>
</div>
{@render children()}
<style>
    .bg{
        background-image: linear-gradient(#ffffff13 1px, #0000 0), linear-gradient(90deg, #ffffff13 1px, #0000 0);
        background-size: 40px 40px;
    }
</style>