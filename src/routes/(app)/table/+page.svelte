<script lang="ts">
    // @ts-ignore
    import AddIcon from "$lib/icons/add-icon.svg?component";
    // @ts-ignore
    import DeleteIcon from "$lib/icons/trash.svg?component";
    // @ts-ignore
    import Pencil from "$lib/icons/pencil.svg?component";

    
	import AddColumnModal from '$lib/components/addColumnModal/AddColumnModal.svelte';
	import { scale } from 'svelte/transition';
	import AddTableItemModal from '$lib/components/addTableItemModal/AddTableItemModal.svelte';
	import { goto } from '$app/navigation';
	import DeleteRowModal from '$lib/components/deleteRowModal/DeleteRowModal.svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import { formatName } from '$lib/helper/helper';
	import { type tableItem , table } from '$lib/store/table';
	import { onMount } from 'svelte';
    import {deleteTableRow,deleteTableColumn,addTableColumn,editTableRow, addTableItem} from "$lib/helper/fetcher"
    import { getTableList } from '$lib/store/table';
    
    import "$styles/table.scss"
	import EditRowModal from "$lib/components/editRowModal/EditRowModal.svelte";
	import Button from "$lib/components/Button.svelte";

    let targetTableName: string | null = null
    let targetTable: tableItem | null = null
    let userId:string | null = null
    
    let showAddNewRow = false 
    let newRowItems = {}

    let showDeleteRowModal = false
    let deleteRowIndex:number = -1
    
    let showDeleteColumn = false
    let deleteColumnName = ''

    let showAddColumn = false
    let addColumnName = ''

    let showEditRow = false
    let editRowValues = {}

    function setTargetTable(){
        if($table && targetTableName && $table[targetTableName]) {
            targetTable = JSON.parse(JSON.stringify($table[targetTableName]))
        }
    }

    async function addRow (){
        const userId = localStorage.getItem("user")
        if(targetTableName && userId) {
            await addTableItem(targetTableName,newRowItems)
            await getTableList(userId?? '')
        }
        showAddNewRow = false
        newRowItems = {}
    }

    async function deleteRow() {
        if(targetTableName && userId) {
            await deleteTableRow(targetTableName,deleteRowIndex)
            await getTableList(userId)    
        }
        showDeleteRowModal = false
    }

    async function deleteColumn() {
        if(targetTableName && userId) {
            await deleteTableColumn(targetTableName,deleteColumnName)
            await getTableList(userId)    
        }
        showDeleteColumn = false
    }

    async function addColumn() {
        if(targetTableName && userId) {
            await addTableColumn(targetTableName,addColumnName)
            await getTableList(userId)    
        }
        showAddColumn = false
    }

    async function editRow() {
        if(targetTableName && userId) {
            await editTableRow(targetTableName,editRowValues)
            await getTableList(userId)    
        }
        showEditRow = false
        editRowValues = {}
    }

    onMount(()=>{
        userId = localStorage.getItem("user")
        if(!userId) goto("/login")
        targetTableName = sessionStorage.getItem("targetTable")
        if(!targetTableName) goto('/') 
    })

    $:targetTableName && $table && setTargetTable()
</script>


<div class="table">
    <div class="table__title">
        <h1>Таблица {formatName(targetTableName?? "")}</h1>
        <Button text="Вернуться" classStr="table__title-button" on:click={()=>{
            sessionStorage.setItem("targetTable","")
            goto('/')}}
        />
    </div>
    {#if targetTable}
        <table class="table__wrapper">
            <thead>
                <tr class="table__row  text-font text-sm">
                    {#each targetTable.fields as field }
                        <td class="table__row-elem table__row-elem-head">
                            <div class="table__row-head">
                                {field}
                                {#if field !== 'id'}
                                    <button class="table__row-head-button" on:click={()=>{
                                        deleteColumnName = field
                                        showDeleteColumn = true
                                    }}>
                                        <DeleteIcon class= "table__row-button-delete"/>
                                    </button>
                                {/if}
                            </div>
                        </td>
                    {/each}
                    <td class="table__row-delete table__row-elem-head">
                        
                    </td>
                    <td class="table__row-delete table__row-elem-head">
                        <button class="table__row-head-button" on:click={()=>{
                            showAddColumn = true
                        }}>
                            <AddIcon class="table__new-head-icon"/>
                        </button>
                    </td>
                </tr>
            </thead>
            <tbody>
                {#each targetTable.data as data}
                    <tr class="table__row text-font text-sm" in:scale={{delay:200,duration:300}}>
                        {#each targetTable.fields as field }
                                <td class="table__row-elem">{data[field]?? ''}</td>
                        {/each}
                        <td class="table__row-elem">
                            <button on:click={()=>{
                                showEditRow = true
                                editRowValues = data
                                }} class="table__row-button text-font text-sm">
                                <Pencil class= "table__row-button-delete"/>
                            </button>
                        </td>
                        <td class="table__row-elem">
                            <button on:click={()=>{
                                showDeleteRowModal = true
                                if(data.id !== undefined){
                                    deleteRowIndex = Number(data.id)
                                }
                                }} class="table__row-button text-font text-sm">
                                <DeleteIcon class= "table__row-button-delete"/>
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
        <div class="table__new">
            <button class="table__new-button" on:click={()=>showAddNewRow = true}>
                <AddIcon class="table__new-icon"/>
            </button>
        </div>
    {/if}
</div>


{#if showEditRow}
    <Modal>
        <EditRowModal closeFunc={()=>{
            showEditRow = false
            editRowValues = {}
        }}
        on:click={editRow}
        bind:editRowValues = {editRowValues}
        />
    </Modal>
{/if}
{#if showAddColumn}
    <Modal>
        <AddColumnModal bind:columnNames = {addColumnName} closeModal = {()=>{
            addColumnName = ''
            showAddColumn = false
        }} deleteFunc = {addColumn}/>
    </Modal>
{/if}
{#if showDeleteColumn}
    <Modal>
        <DeleteRowModal title='Вы точно хотите удалить эту колонку?' closeModal = {()=>{
            deleteColumnName = 'false'
            showDeleteColumn = false
        }} deleteFunc = {deleteColumn}/>
    </Modal>
{/if}
{#if showDeleteRowModal}
    <Modal>
        <DeleteRowModal title='Вы точно хотите удалить эту запись?' closeModal = {()=>{
            showDeleteRowModal = false
            deleteRowIndex = -1
        }} deleteFunc = {deleteRow}/>
    </Modal>
{/if}
{#if showAddNewRow}
    <Modal>
        <AddTableItemModal on:click={addRow} bind:newItems={newRowItems} itemsList={targetTable?.fields?? []} closeFunc={()=>showAddNewRow = false} />
    </Modal>
{/if}
