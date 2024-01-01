<script lang="ts">
	// import Nav from './Nav.svelte';
	import {clearContext, phonecase} from '$lib/utils/phonecase';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
  
	
	onMount(() => {
	   phonecase(3);
	    // 키보드 이벤트 리스너 추가
        window.addEventListener('keydown', handleKeyDown);

        // 컴포넌트가 언마운트될 때 정리 함수 반환
        return () => {
            clearContext();
            window.removeEventListener('keydown', handleKeyDown); // 이벤트 리스너 정리
        };
    });

    function handleKeyDown(event) {
        if (event.key === ' ') { // spacebar의 key 값은 ' '
            goto('/decoratephonecase'); // spacebar가 눌리면 navigate
        }
    }

  
	</script>
	<div class="container">
	<div class="background"></div>
	<div class="canvas"></div>
	<div class="text" id="name">Phone Deco</div>
	<div class="text" id="designText">
	   "Design your own phone case as you want"
	 </div>
	 <div class="text" id="spacebarText">
	   Press the spacebar
	 </div>
	 
	</div>
	<style>

	.canvas {
		position: absolute;
		top: 0;
		left: 25%;
		z-index: -1;
		height: 100%;
		width: 100%;
		}
	/* .background {
		background-color: #fcedf3;
		height: 100vh;
	} */
	:global(.navbar .title) {
	   --title-display: none; /* Main.svelte에서 title을 숨깁니다 */
	}
	.text {
	   display: flex;
	   /* justify-content: center; */
	   /* align-items: center; */
	   margin-top: 25vh;
	   /* margin-left: 10vw; */
	   opacity: 0; /* 처음에는 보이지 않도록 */
	   animation: fadeIn 4s forwards; /* 2초 동안 천천히 나타남 */
	}
	@keyframes fadeIn {
	   to {
		  opacity: 1;
	   }
	}
	.visible {
		 visibility: visible; /* 보이게 설정 */
		 opacity: 1; /* 불투명하게 설정 */
	}
	@keyframes blink {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}
	#name{
		font-size:4vw;
		font-weight: bold;
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
		color:rgb(184, 214, 243);
		margin-left:12.5vw;
	}
	#designText{
		margin-left: 11.5vw;
		margin-top:8vh;
		font-size:2vw;
		font-weight: bold;
		color:rgb(212, 209, 214);
		margin-bottom: 5vh;
	}
	
	#spacebarText{
	   font-size:1.3vw;
	   justify-content: center;
	  animation: blink 1.5s infinite;
	   color: rgb(216, 190, 231);
	}
 
 
	
	</style>