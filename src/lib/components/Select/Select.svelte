<script lang="ts">
    
    interface itemsInterface{
        value:string
        description:string
    }

    export let items:itemsInterface[] = []
    export let value = ""
    export let placeholder = ""
</script>


<select class="select text-font" bind:value={value} on:change >
    <option class="select__option" value="" disabled selected>{placeholder}</option>
    {#each items as item }
        <option class="select__option" value={item.value}>{item.value} {item.description}</option>
    {/each}
</select>

<style>
select{
    cursor: pointer;
    height: 44px;
    min-height: 44px;
    min-width: 100px;
    outline: none;
    width: 100%;
    padding: 0 10px;
    border: none;
    border-radius: 10px;
    background-color: var(--click-elem-bg);
    -webkit-box-shadow: 0px 0px 33px -4px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 33px -4px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 33px -4px rgba(0, 0, 0, 0.75);
}
.select__option{
    height: 30px;
}
</style>