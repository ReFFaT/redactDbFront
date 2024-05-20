<script>
	import  CloseIcon  from '$lib/icons/close.svg?component';
	import Button from '../Button.svelte';
	import CloseModal from '../Modal/CloseModal.svelte';
    import "./deleteitem.scss" 

    export let closeModal = ()=>{}
    export let deleteFunc = ()=>{}
    export let title = ""
</script>

<div class="delete-row">
    <CloseModal on:click={closeModal}/>
    <h4>{title}</h4>
    <Button text="Да, удалить" classStr='delete-row__item-button' on:click={deleteFunc}/>
</div>
