<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import { changeColor, clearContext, loadAndTransformModel, phonecase, putStickers,showcase } from '$lib/utils/phonecase';
	import { afterUpdate, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {casenumber,stickername} from '$lib/utils/store';
	$: toggleState = 'none';
	$: selectedColor = 'none';
	$: selectedImg = 'none';

	const colors = ['white', 'black', 'DodgerBlue', 'gold', 'purple', 'pink'];
	const imgs = [
		'/images/mary.png',
		'/images/ryan.png',
		'/images/mickey2.png',
		'/images/도라에몽.png',
		'/images/어피치.png',
		'/images/맹구2.png',
		'/images/흰둥이.png'
	];

	$: showViewingButton = selectedColor !== 'none' && selectedImg !== 'none';

    function toggleOption(option: string) {
		// 'Decorating' 옵션을 선택하고 색상이 선택되지 않은 경우
		if (option === 'decorate' && selectedColor === 'none') {
			alert('Please select a color first!');
			return; // 함수 종료
		}

		if (selectedColor === 'none') selectedColor = 'white';

		if (toggleState === option) {
			toggleState = 'none';
			selectedImg = 'none';
		} else {
			toggleState = option;
		}
	}
	$: if (loaded) changeColor(casenum);
	let casenum:any;
    let sticker:any;
	let loaded =false;
	onMount(() => {
		phonecase(3);
		let params = new URLSearchParams(window.location.search);
		casenum = params.get('casenum');
		console.log(casenum)
		sticker = params.get('stickername');
		console.log(sticker)
	    putStickers(sticker!)
		showcase(casenum)
		return () => clearContext();
	});
	
	
</script>

<Nav></Nav>
<div id="container">
	<div class="canvas"></div>
</div>

<style>
	.canvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		height: 100%;
		width: 100%;
	}
</style>


