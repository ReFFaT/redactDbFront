<script lang="ts">
    import "./modal.scss"
    export let closeFunction = ()=>{}
</script>


<div class="modal" on:click={(e)=>{ 
    if (!e.target) return
    // @ts-ignore
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