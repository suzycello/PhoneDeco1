<script>
    import Nav from '$lib/components/Nav.svelte';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
  
    onMount(() => {
    const unsubscribe = page.subscribe(() => {
      // 특정 경로에서만 작동하도록 조건을 설정합니다.
      if (window.location.pathname === '/about') {
        // 로컬 스토리지에서 'reloaded' 플래그를 확인합니다.
        if (!localStorage.getItem('reloaded')) {
          // 플래그가 설정되지 않았다면, 페이지를 새로고침하고 플래그를 설정합니다.
          localStorage.setItem('reloaded', 'true');
          window.location.reload();
        } else {
          // 페이지가 이미 새로고침되었다면, 'reloaded' 플래그를 제거합니다.
          localStorage.removeItem('reloaded');
        }
      }
    });

    return () => {
      unsubscribe();
    };
  });
</script>
  

<Nav></Nav>
<div class="content">
<div class="introduce">
    <div class="centerText">
    <b style="font-style:italic; font-size:1.6vw;">"개성 있는 휴대폰 케이스, 우리의 손끝에서 탄생합니다."</b><br><br><br>
    </div>

    이 웹 앱은 단순히 기성품 케이스를 선택하는 것을 넘어서 사용자가 직접 색상과 디자인을 정하여 자신만의 케이스를 창조할 수 있는 창의적인 경험을 제공합니다.<br><br>
    
    <b>- 색상 선택</b>: 'Case Color' 버튼을 클릭하여 다양한 색상 중 하나를 선택합니다. 디폴트 색상은 흰색으로 설정되어 있습니다.<br><br>
    <b>- 디자인</b>: 'Decorating' 버튼을 통해 케이스에 디자인을 추가할 수 있습니다. <span style="color:gray;">(주의: 색상을 먼저 선택하지 않으면 'Please select a color first!'라는 알림창이 뜹니다.)</span><br><br>
    <b>- 360도 뷰</b>: 모든 디자인이 완료되면 'Go to view your case' 버튼이 활성화됩니다. 이를 클릭하면 버튼들이 사라지고 사용자는 자유롭게 회전, 확대, 축소하여 자신이 디자인한 케이스를 모든 각도에서 관찰할 수 있습니다.<br><br>
    이 웹 앱은 사용자가 직접 창의력을 발휘할 수 있는 독특한 플랫폼을 제공함으로써 휴대폰 케이스를 단순한 액세서리가 아닌 개인의 취향과 스타일을 반영하는 예술 작품으로 만들어 줍니다.
</div>
<div class="image-container"><img src="/images/case.png" alt="Case example" class="caseImage"></div>
</div>

<style>
    .content {
    display: flex;
    margin-top: 10vh;
}
    body{
        background-color: white;
    }
    .introduce{
        font-size:1.2vw;
        margin-left: 5vw;
        width: 80%;
        max-width: 60vw;
        word-wrap: break-word; /* 단어 단위로 줄바꿈 */
    }
    .centerText{
        text-align: center;
    }
    .image-container { /* 새로운 컨테이너 클래스 */
      margin-left: auto;
      margin-right:auto;
  }
    .caseImage {
        width: 15vw;
        max-width: 70vw;
        height: auto;
    }
</style>