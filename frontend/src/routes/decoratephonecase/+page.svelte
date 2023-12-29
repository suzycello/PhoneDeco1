<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import { changeColor, clearContext, loadAndTransformModel, phonecase, putStickers } from '$lib/utils/phonecase';
	import { onMount } from 'svelte';
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
	 } else {
	   toggleState = option;
	 }
   }
   
   
	function selectColor(color: string) {
	   selectedColor = color;
	}
   
	function selectImg(img: string) {
	   selectedImg = img;
	   putStickers(img)
	}
   
	function move2() {
	   window.location.href=`/viewingyourcase?casenum=${selectedColor}&stickername=${selectedImg}`
	}
	 let caseLoaded = false;
   
	$: {
	   if (selectedColor !== 'none' && caseLoaded == false) {
		  caseLoaded = true;
		loadAndTransformModel(3);
	   }
	}
   
	 $: {
	   if (caseLoaded == true) {
		changeColor(selectedColor)
	   };
	 }
   
	onMount(() => {
	   phonecase(3);
   
	   return () => clearContext();
	});
   </script>
   
   <Nav></Nav>
   <div id="container">
	<fieldset>
	   <button
		type="button"
		id="caseColor"
		name="option"
		on:click={() => toggleOption('color')}
		aria-current={toggleState === 'color'}>Case Color</button>
	   <button
		type="button"
		id="decorate"
		name="option"
		on:click={() => toggleOption('decorate')}
		aria-current={toggleState === 'decorate'}>Decorating</button>
	   {#if showViewingButton}
		<button
		  type="button"
		  id="viewing"
		  name="option"
		  on:click={move2}
		  aria-current={toggleState === 'viewing'}>View your case</button>
	   {/if}
	</fieldset>
   
	{#if toggleState === 'color'}
	   <div id="colors">
		{#each colors as color, i}
		  <button
		   aria-current={selectedColor === color}
		   aria-label={color}
		   style={`background:  ${color}`}
		   on:click={() => (selectedColor = color)}
		  ></button>
		{/each}
	   </div>
	{/if}
   
	{#if toggleState === 'decorate'}
	   <div id="imgs">
		{#each imgs as img, k}
		  <img
		   src={img}
		   alt="image decorating"
		   class:active={selectedImg === img}
		   on:click={() => selectImg(img)}
		  />
		{/each}
	   </div>
	{/if}
   
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
   
	fieldset button {
	   background-color: rgb(214, 152, 185);
	   color: white;
	   padding: 3vh 1vw;
	   border: none;
	   /* border: 1px solid black; */
	   border-radius: 50%;
	   cursor: pointer;
	   font-size: 1.4rem;
	   transition: 1s;
	   opacity: 0; /* 처음에는 보이지 않도록 */
	   animation: fadeIn 1s forwards; /* 2초 동안 천천히 나타남 */
	}
   
	fieldset button[aria-current='true'] {
	   background: rgb(171, 122, 148);
	   transition: 0.5s;
	}
   
	fieldset {
	   display: flex;
	   width: 12vw;
	   height: 5vh;
	   position: absolute;
	   right: 5vw;
	   top: 35%;
	   transform: translateY(-50%);
	   flex-direction: column;
	   gap: 5vh;
	   border: none;
	}
	#colors {
	   display: none;
	}
   
	#imgs {
	   display: none;
	}
	/* #viewing {
	   display: none;
	} */
   
	#colors {
	   display: flex;
	   gap: 100px;
	   max-width: 70vw;
	   position: absolute;
	   bottom: 4vh;
	   left: 50%;
	   transform: translateX(-50%);
	}
	#imgs {
	   display: flex;
	   gap: 8vw;
	   max-width: 100vw;
	   position: absolute;
	   bottom: 4vh;
	   left: 50%;
	   transform: translateX(-50%);
	}
	#caseColor{
	   white-space: nowrap;
	}
	#viewing {
	   display: none;
	   background-color: rgb(214, 152, 185);
	   color: white;
	   cursor: pointer;
	   font-size: 1.4rem;
	   display: block;
	   white-space: nowrap;
	}
	@keyframes fadeIn {
	   to {
		  opacity: 1;
	   }
	}
	#viewing:hover {
	   background: rgb(171, 122, 148);
	   transition: 0.2s;
	}
   
	#colors button {
	   aspect-ratio: 1;
	   padding: 3vh 3vw;
	   border-radius: 50%;
	   background: var(--color, #fff);
	   transform: translate(-2px, -2px);
	   filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2));
	   transition: all 0.1s;
	   width: 6vw;
	}
	#colors button[aria-current='true'] {
	   transform: none;
	   filter: none;
	   box-shadow: inset 3px 3px 4px rgba(0, 0, 0, 0.2);
	}
	#imgs img {
	   width: 6vw;
	   /* height:100px; */
	   cursor: pointer;
	   transition: all 0.1s;
	}
   
	#imgs img.active {
	   box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}
   </style>