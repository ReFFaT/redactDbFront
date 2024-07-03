<script lang="ts">
	import {getUserInfo} from "$lib/store/dbItems"
	import Button from '$lib/components/Button.svelte';
     // @ts-ignore
	import AddIcon from "$lib/icons/add-icon.svg?component";

    import DBItem from '$lib/components/DBItem/DBItem.svelte';
    import { scale } from "svelte/transition"
	import Modal from '$lib/components/Modal/Modal.svelte';
	import AddDataBaseModal from '$lib/components/addDataBaseModal/AddDataBaseModal.svelte';
	import { dbList, getDbList } from '$lib/store/dbList';
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { dbItems } from "$lib/store/dbItems";
	import DeleteDb from '$lib/components/deleteDB/DeleteDB.svelte';
    import {deleteDbFetch, downloadFile} from "$lib/helper/fetcher"
    
    let addNewDB = false
    let thisDB = ''
    let isDeleteModal = false
    function closeDeleteModal(){
        isDeleteModal = false
    }

    function setNewName(){
        const currentDB = localStorage.getItem("currentDB")
        $dbItems.forEach((el)=>{
            if(el===currentDB) {
                thisDB = el
            }
        })
    }
    async function deleteDb (){
        await deleteDbFetch(thisDB)
        await getUserInfo()
        thisDB = ""
        localStorage.setItem("currentDB","")
        closeDeleteModal()
        dbList.set([])
    }
    onMount(()=>{
        const currentDB = localStorage.getItem("currentDB")
        if( currentDB){
            thisDB = currentDB
            getDbList(currentDB)
        }
    })
    $:$dbList && setNewName()
</script>

<div class="database">
    {#if thisDB}
            <div class="database__title">
                <h1>Мои таблицы в базе {thisDB}</h1>
                <div class="database__title-buttons">
                    <Button text="Скачать БД" classStr='db__item-button' on:click={()=>downloadFile(thisDB)}/>
                    <Button text="Удалить БД" classStr='db__item-button' on:click={()=>isDeleteModal =true}/>
                </div>
             

            </div>
            <ul class="database__list">
                <li class="database__list-item">
                    <div class="item-db-add">
                        <button class="item-db-add__button text-font text-lg" title="Создать таблицу" on:click={()=>addNewDB = true}>
                            <h2>Создать таблицу</h2>
                            <AddIcon class="item-db-add__icon icon"/>
                        </button>
                    </div>
                </li>
                {#each $dbList as db}
                    <li class="database__list-item" in:scale={{duration:300}}>
                        <DBItem dbColumns={db.columns} dbName={db.tables} dbCount={db.record_count} dbTitle={db.description}/>
                    </li>
                {/each}
            </ul> 
    {:else}
        <h1>Выберите или создайте БД</h1>
    {/if}
</div>


{#if isDeleteModal}
    <Modal>
        <DeleteDb closeModal={closeDeleteModal} on:click={deleteDb}/>
    </Modal>
{/if}
{#if addNewDB}
    <Modal closeFunction={()=>addNewDB=false}>
        <AddDataBaseModal closeFunction={()=>addNewDB=false}/>
    </Modal>
{/if}

<style lang="scss">
    .database{
        padding: 30px;
        width: 100%;
        background-color: var(--body-background-color);
        &__list{
            display: grid;
            grid-template-columns: repeat( auto-fit, minmax(630px, 1fr) );
            // flex-direction: column;
            gap: 30px;
            list-style: none;
            margin: 0;
            padding: 0;
            margin-top: 30px;
        }
        &__title{
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: center;
            gap: 30px;
            &-buttons{
                display: flex;
                gap: 20px;
            }
        }
    }
    :global(.item-db-add__icon){
        fill: var(--color-text);
    }
    .item-db-add{
        box-sizing: border-box;
        width: 100%;
        min-height: 150px;
        height: 100%;
        border-radius: 30px;
        border: 3px solid var(--content-bg);
        border-style: dashed;
        display: flex;
        align-items: center;
        justify-content: center;
        &__button{
            width: min-content;
            height: 60px;
            align-items: center;
            gap: 10px;
            text-wrap: nowrap;
            display: flex;
            background-color: transparent;
            border: 1px solid transparent; 
            cursor: pointer;
            transition: all .3s;
            &:active{
                transform: scale(.9);
            }
        }
    }
    @media screen and (max-width:750px){
        .database{
            padding: 0 5px;
        }
        .database__list{
            grid-template-columns: repeat( auto-fit, minmax(200px, 1fr) );
            gap: 10px;
        }
        .database__title{
            flex-direction: column;
            margin-top: 10px;
        }
    }
</style>
