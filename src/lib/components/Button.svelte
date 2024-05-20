<script lang="ts">
    export let text = ""
    export let disabled = false
    export let classStr = ''
</script>

<button on:click  disabled={disabled} class="button text-font {classStr}">
    {text}
</button>

<style lang="scss"> 
    .button{
        width: 100%;
        height: 44px;
        border-radius: 15px;
        border: none;
        background-color: var(--click-elem-bg);
        cursor: pointer;
        font-size: clamp(16px,4vw,20px);
        margin: 0;
        padding: 0 8px;
        box-sizing: border-box;
        transition: all .3s;
        &:active{
            transform: scale(.9);
        }
        &:disabled{
            color: var(--color-text-second);
        }
    }
</style>