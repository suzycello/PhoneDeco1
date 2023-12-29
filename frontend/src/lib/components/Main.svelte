<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let showDecorate = false; // Decorate 버튼 표시 여부

	function move() {
		goto('/decoratephonecase');
	}
	onMount(() => {
        // 컴포넌트가 마운트될 때 body의 배경 스타일을 설정합니다.
        document.body.style.backgroundImage = "url('/images/opening.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";

		const handleKeydown = (event) => {
            if (event.code === 'Space') {
                showDecorate = true;
            }
        };

        window.addEventListener('keydown', handleKeydown);

        // 컴포넌트 파괴 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        };
    });
</script>

<!-- 항상 렌더링하지만, visible 클래스로 제어 -->
<div class="decorate" class:visible={showDecorate}>
	Start To Decorate phone Case
	<div>
		<button id="start" on:click={move}>Start</button>
	</div>
</div>

<div class="text" id="designText">
	Design your own phone case as you want
</div>
<div class="text" id="spacebarText">
	Press the spacebar
</div>

<style>
	.text {
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0; /* 처음에는 보이지 않도록 */
		animation: fadeIn 2s forwards; /* 2초 동안 천천히 나타남 */
	}
	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}
	.decorate {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 23vh;
		margin-left: 50%;
		transform: translateX(-50%);
		margin-bottom: 10vh;
		border-radius: 3rem;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		width: 30%;
		height: 40%;
		background-color: whitesmoke;
		font-size: 20px;
		font-weight: bold;
		visibility: hidden; /* 초기에는 숨김 */
        opacity: 0; /* 투명도 설정 */
        transition: visibility 0s, opacity 0.5s linear; /* 부드러운 전환 효과 */
		
		
	}
	.visible {
        visibility: visible; /* 보이게 설정 */
        opacity: 1; /* 불투명하게 설정 */
	}
	@keyframes blink {
	    0%, 100% { opacity: 1; }
	    50% { opacity: 0; }
	}
	#designText{
		font-size:2rem;
      	font-weight: bold;
		text-shadow:
        -1px -1px 0 #000,  
         1px -1px 0 #000,
        -1px  1px 0 #000,
         1px  1px 0 #000;
		color:rgb(185, 136, 225);
		margin-bottom: 5vh;
	}
	
	#spacebarText{
		font-size:1.3rem;
	    animation: blink 1.5s infinite;
		color: rgb(145, 145, 145);
	}

	#start {
		background-color:  rgb(214, 152, 185);
		color: white;
		padding: 10px 20px;
		border: none;
		border-radius: 5px;
		margin-top: 8vh;
		cursor: pointer;
		font-size: 15px;
		display: inline;
		font-weight: bold;
	}
	#start:hover {
		background-color: rgb(175, 128, 153);
		transition: 0.5s;
	}
</style>
