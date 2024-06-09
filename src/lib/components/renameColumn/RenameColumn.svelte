<script lang="ts">
	import Input  from '$lib/components/Input.svelte';
	import CloseModal from "$lib/components/closeModal/CloseModal.svelte";
	import Button from '../Button.svelte';

    export let closeFunc = ()=>{}
    export let placeholder = "Введите новое значение"
    
    export let newColumnValue = ''
</script>


<div class="rename-modal">
    <h2 class="rename-modal__title">Переименовать столбец</h2>
    <CloseModal on:click={closeFunc}/>
    <Input 
        title={"Введите новое значение"}
        placeholder = {placeholder}
        bind:value ={newColumnValue}
    />
    <div class="rename-modal__btn">
        <Button on:click text={"Переименовать"}/>

    </div>
</div>

<style lang="scss">
    .rename-modal{
        position: relative;
        width: 300px;
        padding: 20px;
        border-radius: 20px;
        &__title{
            margin-bottom: 20px;
        }
        &__btn{
            display: block;
            margin-top: 20px;
        }
    }
</style>