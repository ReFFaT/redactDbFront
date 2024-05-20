<script lang="ts">
	import  CloseIcon  from '$lib/icons/close.svg?component';
	import Modal  from '$lib/components/Modal/Modal.svelte';
	import { deleteDB } from "$lib/helper/fetcher";
	import { getDbList } from "$lib/store/dbList";
	import Button from "../Button.svelte";
    import "./dbItem.scss"
	import { goto } from '$app/navigation';
	import CloseModal from '../closeModal/CloseModal.svelte';

    export let dbName = "";
    export let dbTitle = ""; 
    export let dbIdName = "";

    let deleteModal =false

    async function deleteDataBase(){
        const user = localStorage.getItem('user')
        await deleteDB(dbIdName)
        if(user) getDbList(user)
        else location.reload()
    }
</script>


<div class="db__item">
    <h2 class="db__item-name">{dbName}</h2>
    <p class="db__item-title text-sm text-font">{dbTitle}</p>
    <div class="db__item-buttons">
        <Button text="Перейти к таблице" classStr='db__item-button' on:click={()=>{
            sessionStorage.setItem("targetTable",dbIdName)
            goto("/table")
        }}/>
        <Button text="Удалить" classStr='db__item-button' on:click={()=>deleteModal =true}/>
    </div>
</div>

{#if deleteModal}
    <Modal closeFunction = {()=>deleteModal = false}>
        <div class="delete-db">
            <CloseModal on:click={() => deleteModal = false}/>
            <h4>Вы точно хотите удалить эту таблицу?</h4>
            <Button text="Да, удалить" classStr='db__item-button' on:click={deleteDataBase}/>
        </div>
    </Modal>
{/if}
