<div class="w-20 h-screen"></div>
<div class="absolute left-0  sidenav h-screen w-20 overflow-hidden grad-bg gap-10 border-r-[#3b0202] border-r-1 flex flex-col  pt-4 items-center">
<div class="item mb-20">
    <img src="./Alchemist.webp" alt="" class="h-14 w-14 aspect-square max-w-14">
    <h1 class="font alchemizefont text-[#ff2e2e] text-4xl w-20 ml-2 font-bold">Alchemize</h1>
</div>
<div class="item">
    <i class="fa-solid fa-code text-4xl w-10"></i>
    <h1 class="font text-3xl w-20">Projects</h1>
</div>
<div class="item">
    <i class="fa-solid fa-bag-shopping text-4xl w-10"></i>
    <h1 class="font text-3xl w-20">Shop</h1>
</div>
<div class="item">
   <i class="fa-solid fa-flask text-4xl w-10"></i>
    <h1 class="font text-3xl w-20">Exchange</h1>
</div>
</div>
<style>
	@import url("https://fonts.googleapis.com/css2?family=Saira+Stencil:ital,wght@0,100..900;1,100..900&display=swap");

    .grad-bg{
    background: #000000;
}
.item{
    padding-bottom: 10px;
    padding-top: 20px;
    padding-left: 20px;
    display: flex;
    width: 100%;
    align-items: center;
    gap: 30px;
    padding-right: 50px;
    border-bottom: 1px dotted rgba(102, 1, 1, 0.678);
}
.sidenav:hover{
    width:320px;
    align-items: center;
}
.sidenav{
    transition: width 0.5s ease;
    /* width: 70px; */
}
.item h1{
    display: none;
    transition: display 0.5s ease;
}
.sidenav:hover .item h1{
    display: block;
}
.item:hover{
    background-color: #1a0505;
    cursor: pointer;
}
</style>