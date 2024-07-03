<script lang="ts">
	import Button from "../Button.svelte";
	import CloseModal from "$lib/components/closeModal/CloseModal.svelte";

    export let closeModal = ()=>{}
</script>

<div class="delete-db">
    <h4>Вы действительно хотите удалить эту БД?</h4>
    <CloseModal on:click={closeModal}/>
    <Button text="Да, удалить" on:click/>
</div>

<style lang="scss">
    .delete-db{
        width: 300px;
        min-height: 50px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
</style>