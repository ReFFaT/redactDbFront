<script lang="ts">
	import Modal  from '$lib/components/Modal/Modal.svelte';
	import { deleteDB, downLoadTable } from "$lib/helper/fetcher";
	import { getDbList } from "$lib/store/dbList";
	import Button from "../Button.svelte";
    import "./dbItem.scss"
	import { goto } from '$app/navigation';
	import CloseModal from '../closeModal/CloseModal.svelte';
	import { get } from 'svelte/store';

    export let dbName = "";
    export let dbTitle = ""; 
    export let dbCount = 0
    export let dbColumns:string[] = []
    let deleteModal =false

    async function deleteDataBase(){
        const currentDB = localStorage.getItem('currentDB')
        await deleteDB(dbName)
        if(currentDB) getDbList(currentDB)
        else location.reload()
    }
</script>


<div class="db__item">
    <div class="db__item-info">
        <p class="text-font text-h3 db__item-name">Таблица: {dbName}</p>
        <p class="text-font text-h3 db__item-name">Количество записей: {dbCount}</p>
    </div>

    <p class="text-lg text-font db__item-name">Структура: {dbColumns.join(", ")}</p>

    <p class="db__item-title text-lg text-font">Описание: {dbTitle}</p>
    <div class="db__item-buttons">
        <Button text="Перейти к таблице" classStr='db__item-button' on:click={()=>{
            sessionStorage.setItem("targetTable",dbName)
            goto("/table")
        }}/>
        <Button text="Скачать в XLSX" classStr='db__item-button' on:click={async ()=>{
            const currentDB = localStorage.getItem("currentDB")
            if(currentDB) downLoadTable(currentDB,dbName)
        }}/>
        <Button text="Удалить таблицу" classStr='db__item-button' on:click={()=>deleteModal =true}/>
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
