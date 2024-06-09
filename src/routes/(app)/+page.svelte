<script lang="ts">
     // @ts-ignore
	import AddIcon from "$lib/icons/add-icon.svg?component";

    import DBItem from '$lib/components/DBItem/DBItem.svelte';
    import { scale } from "svelte/transition"
	import Modal from '$lib/components/Modal/Modal.svelte';
	import AddDataBaseModal from '$lib/components/addDataBaseModal/AddDataBaseModal.svelte';
	import { dbList, getDbList } from '$lib/store/dbList';
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
    let addNewDB = false
    onMount(()=>{
        const currentDB = localStorage.getItem("currentDB")

        if(!currentDB) goto("/login")
        if( currentDB){
            getDbList(currentDB)
        }
    })
</script>

    <div class="database">
        <h1>Мои таблицы</h1>
        <ul class="database__list">
            <li class="database__list-item">
                <div class="item-db-add">
                    <button class="item-db-add__button" title="Создать таблицу" on:click={()=>addNewDB = true}>
                        <AddIcon class="item-db-add__icon"/>
                    </button>
                </div>
            </li>
            {#each $dbList as db}
                <li class="database__list-item" in:scale={{duration:300}}>
                    <DBItem dbColumns={db.columns} dbName={db.tables} dbCount={db.record_count} dbTitle={db.description}/>
                </li>
            {/each}
        </ul>
    </div>
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
            display: flex;
            flex-direction: column;
            gap: 30px;
            list-style: none;
            margin: 0;
            padding: 0;
            margin-top: 30px;
        }
    }
    :global(.item-db-add__icon){
        width: 40px;
        height: 40px;
        fill: var(--color-text);
    }
    .item-db-add{
        box-sizing: border-box;
        width: 100%;
        height: 150px;
        border-radius: 30px;
        border: 3px solid var(--content-bg);
        border-style: dashed;
        display: flex;
        align-items: center;
        justify-content: center;
        &__button{
            width: 60px;
            height: 60px;
            background-color: transparent;
            border: 1px solid transparent; 
            cursor: pointer;
            transition: all .3s;
            &:active{
                transform: scale(.9);
            }
        }
    }
</style>
