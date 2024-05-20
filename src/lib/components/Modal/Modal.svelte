<script lang="ts">
    export let closeFunction = ()=>{}
</script>


<div class="modal" on:click={(e)=>{ 
    if (!e.target) return
    if(!e.target.closest(".modal__wrapper")) closeFunction()
}}
    on:keydown
    tabindex=0
    role="button"
>
    <div class="modal__wrapper">
        <slot></slot>
    </div>
</div>


<style lang="scss">
    .modal{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba($color: #000000, $alpha: .6);
        &__wrapper{
            padding: 20px;
            border-radius: 20px;
            background-color: var(--content-bg);
        }
    }
</style>