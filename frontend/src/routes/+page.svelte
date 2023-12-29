<script>
	import Nav from '../lib/components/Nav.svelte';
	import Main from '$lib/components/Main.svelte';
	import { onMount } from 'svelte';
	// import { onMount } from 'svelte';
	// import { youtube } from '../lib/utils/control';

	// onMount(() => {
	// 	youtube();
	// });

	onMount(() => {
		console.log("loaded")
	})
</script>

<div class="main_div"> 
    <Nav></Nav>
	
</div>
<div class="main">
	<Main></Main>
</div>



<style>
	.main {
		height: 100%;
		width: 100%;
		/* background-color: #dddddd; */
	}
    .main_div {
        display: flex;  
        flex-direction: column;
    }
	#container {
		background-repeat: no-repeat;
		width: 100%;
		background-size: cover;
	}
</style>
