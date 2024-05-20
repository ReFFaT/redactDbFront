<script>
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import CloseModal from '$lib/components/closeModal/CloseModal.svelte';
    import "./addColumnModal.scss" 

    export let closeModal = ()=>{}
    export let deleteFunc = ()=>{}
    export let columnNames = ''
</script>

<div class="add-column">
    <CloseModal on:click={closeModal}/>
    <h4>Добавление колонок</h4>
    <div class="add-column__input">
        <Input title="Введите через пробел названия" bind:value={columnNames}/> 
    </div>
    <Button text="Создать" classStr='' on:click={deleteFunc}/>
</div>

<style>
.add-column{
    position: relative;
    display: flex;
    width: 300px;
    flex-direction: column;
    gap: 20px;
}
</style>