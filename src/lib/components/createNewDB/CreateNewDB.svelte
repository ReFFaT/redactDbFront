<script lang="ts">
	import { createNewDB } from "$lib/helper/fetcher";
	import { getUserInfo } from "$lib/store/dbItems";
    import Button from "../Button.svelte";
    import Input from "../Input.svelte";
    import CloseModal from "../closeModal/CloseModal.svelte";
    
    export let closeFunc = ()=>{}
    async function createDb(){
        await createNewDB(newValue)
        await getUserInfo()
        closeFunc()
    }
    let newValue = ''
</script>



<div class="create-db">
    <CloseModal on:click={closeFunc}/>
    <h3>Создание бд</h3>
    <Input bind:value={newValue}/>
    <Button text="Создать" on:click={createDb}/>
</div>


<style lang="scss">
    .create-db{
        display: flex;
        flex-direction: column;
        gap:  20px;
        position: relative;
        width: 300px;
        min-height: 50px;
        border-radius: 20px;
    }
</style>