<script>

</script>

<div class="background"></div>
<div class="decorate">
    Start To Decorate phone Case
    <div class="start">
        <a href="DecoratePhoneCase.svelte">get start</a>
    </div>
</div>

<style>
    .background{
        background-color: pink;
    }
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
    .start{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 60px;
        border-radius: 10px;
        width: 30%;
        height: 20%;
        background-color: rgb(218, 164, 103);
        font-size: 15px
        
    }
    .start:hover {
        background-color: rgb(173, 121, 62);
    }
</style>