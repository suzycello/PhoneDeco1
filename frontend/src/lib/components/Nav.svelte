<script>
	import { goto } from '$app/navigation';
	function move() {
		window.location.href="../3js"
	}
	function goToHome() {
		goto('/');
	}
	function goToAbout(){
		goto('/about');
	}
</script>

<nav class="navbar">
	<p class="title">Phone Deco</p>
	<div class="navMove">
	<span on:click={goToHome} class="home">Home</span>
	<span on:click={goToAbout} class="about">About</span>
	</div>
</nav>

<style>
	.navMove{
		font-size: 1.1vw;
		display: flex;
		cursor: pointer;
		color: white;
		font-weight: bold;
		margin-left: auto;
		margin-right: 8vw;
		gap: 7vw;
	}
	.navbar {
		display: flex;
		align-items: center;
		background: rgb(214, 152, 185);
		height: 10vh;
		padding: 0 1rem;
	}
	.title{
		font-size: 5vh;
		padding-left: 1vw;
		color: white;
		font-weight: bold;
		text-shadow:
        -1px -1px 0 #000,  
         1px -1px 0 #000,
        -1px  1px 0 #000,
         1px  1px 0 #000;		
	}
</style>
