<script>
	import { goto } from '$app/navigation';

	function move() {
		goto('/decoratephonecase');
	}
</script>

<div class="decorate">
	Start To Decorate phone Case
	<div>
		<button id="start" on:click={move}>Start</button>
	</div>
</div>

<style>
	.decorate {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 150px auto;
		border-radius: 10px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		width: 30%;
		height: 40%;
		background-color: whitesmoke;
		font-size: 20px;
		font-weight: bold;
	}
	#start {
		background-color: blue;
		color: white;
		padding: 10px 20px;
		border: none;
		border-radius: 5px;
		margin-top: 40px;
		cursor: pointer;
		font-size: 15px;
		display: inline;
		font-weight: bold;
	}
	#start:hover {
		background-color: rgb(127, 106, 185);
		transition: 0.5s;
	}
	/* .start a {
    color: black;
    text-decoration: none;
} */
</style>
