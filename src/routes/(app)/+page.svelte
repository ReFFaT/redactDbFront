<script lang="ts">
	import DBItem from '$lib/components/DBItem/DBItem.svelte';
    import AddIcon from "$lib/icons/add-icon.svg?component";
    import { scale } from "svelte/transition"
	import Modal from '$lib/components/Modal/Modal.svelte';
	import AddDataBaseModal from '$lib/components/addDataBaseModal/AddDataBaseModal.svelte';
	import { table } from '$lib/store/table';
	import { dbList } from '$lib/store/dbList';
	import { formatName } from '$lib/helper/helper';
	
    let addNewDB = false

    $:console.log($table)
    $:console.log($dbList)
</script>

    <div class="database">
        <h1>Мои таблицы</h1>
        <ul class="database__list">
            {#each $dbList as db}
                <li class="database__list-item" in:scale={{duration:300}}>
                    <DBItem dbName={formatName(db.user_table)}  dbTitle={db.table_description} dbIdName={db.user_table}/>
                </li>
            {/each}
            <li class="database__list-item">
                <div class="item-db-add">
                    <button class="item-db-add__button" on:click={()=>addNewDB = true}>
                        <AddIcon class="item-db-add__icon"/>
                    </button>
                </div>
            </li>
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
        background-color: rgb(40, 39, 39);
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
