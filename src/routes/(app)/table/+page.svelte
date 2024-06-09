<script lang="ts">
	import RenameColumn from './../../../lib/components/renameColumn/RenameColumn.svelte';
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
	import { formatName, formatColumn,type addColumnInterface} from '$lib/helper/helper';
	import { type tableItem , table } from '$lib/store/table';
	import { onDestroy, onMount } from 'svelte';
    import {deleteTableRow,deleteTableColumn,addTableColumn,editTableRow, addTableItem,searchTable,renameColumnFetch} from "$lib/helper/fetcher"
    import { getTableList } from '$lib/store/table';
    
    import "$styles/table.scss"
	import EditRowModal from "$lib/components/editRowModal/EditRowModal.svelte";
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import Select from "$lib/components/Select/Select.svelte";
	import Filter from "$lib/components/filter/Filter.svelte";

    let targetTableName: string | null = null
    let targetTable: tableItem | null = null
    let userId:string | null = null

    let showAddNewRow = false 
    let newRowItems:{[key:string]:string} = {}

    let showDeleteRowModal = false
    let deleteRowIndex:number = -1
    
    let showDeleteColumn = false
    let deleteColumnName = ''

    let showAddColumn = false
    let addColumnArr:addColumnInterface[] = []

    let showEditRow = false
    let editRowValues:{[key:string]:string} = {}


    let isRenameColumn = false
    let renameColumnVal = ''
    let newColumnValue = ""

    let searchRow = {
        field:"",
        value:""
    }
    let isSearchButton = true
    function changeSearchButton(){
        if(searchRow.field !== "" && searchRow.value !== "") isSearchButton = false
        else isSearchButton = true
    }
    function resetSearch(){
        searchRow.field = ""
        searchRow.value = ""
    }

    interface filterValueInterface{

    }

    let openFilter = false


    function setTargetTable(){
        if($table && targetTableName) {
            targetTable = JSON.parse(JSON.stringify($table))
        }
    }

    async function addRow (){
        const newRowValues:{[key:string]:string} = {}

        for(let i in newRowItems){
            newRowValues[i.split("_")[0]] = newRowItems[i]
        }
        
        if(targetTableName) {
            await addTableItem(targetTableName,newRowValues)
            await getTableList(targetTableName)
        }
        resetSearch()
        showAddNewRow = false
        newRowItems = {}
    }

    async function deleteRow() {
        if(targetTableName) {
            await deleteTableRow(targetTableName,deleteRowIndex)
            await getTableList(targetTableName)    
        }
        resetSearch()
        showDeleteRowModal = false
    }

    async function deleteColumn() {
        if(targetTableName) {
            await deleteTableColumn(targetTableName,deleteColumnName)
            await getTableList(targetTableName)    
        }
        resetSearch()
        showDeleteColumn = false
    }

    async function addColumn() {
        if(targetTableName) {
            await addTableColumn(targetTableName,addColumnArr)
            await getTableList(targetTableName)    
        }
        resetSearch()
        showAddColumn = false
    }

    async function editRow() {
        const newRowValues:{[key:string]:string} = {}

        for(let i in editRowValues){
            newRowValues[i.split("_")[0]] = editRowValues[i]
        }

        if(targetTableName) {
            await editTableRow(targetTableName,newRowValues)
            await getTableList(targetTableName)    
        }
        resetSearch()
        showEditRow = false
        editRowValues = {}
    }

    async function getSearch() {

        if(targetTableName && targetTable?.data) {
            targetTable.data = []
            const res = await searchTable(targetTableName,searchRow)
            targetTable.data = res
        }
    }
    async function reSearch() {
        if(targetTableName && targetTable?.data) {
            targetTable.data = []
            await getTableList(targetTableName)
            resetSearch()
        }
        
    }
    async function renameColumn() {
        if(targetTableName && targetTable?.data) {
            await renameColumnFetch(targetTableName,renameColumnVal,newColumnValue)
            renameColumnVal = ''
            newColumnValue = ""
            await getTableList(targetTableName)
            isRenameColumn = false
        }
        
    }

    onMount(()=>{
        userId = localStorage.getItem("user")
        if(!userId) goto("/login")
        targetTableName = sessionStorage.getItem("targetTable")
        if(targetTableName) getTableList(targetTableName) 
        else goto("/")
    })
    onDestroy(()=>{
        targetTable = null
    })
    $:targetTableName && $table && setTargetTable()
    $:searchRow && changeSearchButton()
</script>


<div class="table">
    <div class="table__title">
        <h1>Таблица {targetTableName}</h1>
        <div class="table__title-search">
            <div class="table__title-search-select">
                <Select bind:value={searchRow.field} placeholder="Выберите столбец" items={targetTable?.fields.map(el=>{return {value:el.split("_")[0],description:""}})}/>
            </div>
            <div class="table__title-search-input">
                <Input placeHolder='Введите значение' bind:value={searchRow.value}/>
            </div>
            <Button disabled={isSearchButton} text="Поиск" classStr="table__title-button" on:click={()=>getSearch()}/>
            <div class="table__title-buttons">
                <Button text="Сбросить" classStr="table__title-button" on:click={()=>reSearch()}/>
                <Button text="Фильтр" classStr="table__title-button" on:click={()=>openFilter = true}/>
                <Button text="Добавить запись" classStr="table__title-button" on:click={()=>showAddNewRow = true}/>
                <Button text="Вернуться" classStr="table__title-button" on:click={()=>{
                    sessionStorage.setItem("targetTable","")
                    goto('/')}}
                />
            </div>
        </div>
        <div class="table__title-buttons">
            
        </div>
    </div>
    {#if targetTable}
        <div class="table__overflow">
            <div class="table__overflow-hidden">
                <table class="table__wrapper">
                    <thead>
                        <tr class="table__row  text-font text-sm">
                            <td class="table__row-delete table__row-elem-head">
                                
                            </td>
                            <td class="table__row-delete table__row-elem-head">
                                <button class="table__row-head-button" title="Добавить столбец" on:click={()=>{
                                    showAddColumn = true
                                }}>
                                    <AddIcon class="table__new-head-icon"/>
                                </button>
                            </td>
                            {#each targetTable.fields as field }
                                <td class="table__row-elem table__row-elem-head">
                                    <div class="table__row-head">
                                        {formatColumn(field)}
                                        {#if field !== 'id_INTEGER'}
                                            <!-- <button class="table__row-head-button" title="Удалить столбец" on:click={()=>{
                                                deleteColumnName = field
                                                showDeleteColumn = true
                                            }}>
                                                <DeleteIcon class= "table__row-button-delete"/>
                                            </button> -->
                                            <!-- TO:DO efaffeafeafaefaefeaaeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee -->
                                            <button title="Переименовать столбец" on:click={()=>{
                                                isRenameColumn = true
                                                renameColumnVal = field.split("_")[0]
                                                }} class="table__row-head-button text-font text-sm">
                                                <Pencil class= "table__row-button-delete"/>
                                            </button>
                                            <button class="table__row-head-button" title="Удалить столбец" on:click={()=>{
                                                deleteColumnName = field
                                                showDeleteColumn = true
                                            }}>
                                                <DeleteIcon class= "table__row-button-delete"/>
                                            </button>
                                        {/if}
                                    </div>
                                </td>
                            {/each}
                            
                        </tr>
                    </thead>
                    <tbody>
                        {#each targetTable.data as data,index}
                            <tr class="table__row text-font text-sm {index%2!==0 && "table__row-color"}" in:scale={{delay:200,duration:300}}>
                                <td class="table__row-elem" title="Удалить данные">
                                    <button on:click={()=>{
                                        showDeleteRowModal = true
                                        if(data.id !== undefined){
                                            deleteRowIndex = Number(data.id)
                                        }
                                        }} class="table__row-button table__row-elem-buttons text-font text-sm">
                                        <DeleteIcon class= "table__row-button-delete"/>
                                    </button>
                                </td>
                                <td class="table__row-elem">
                                    <button title="Редактировать данные" on:click={()=>{
                                        showEditRow = true
                                        editRowValues = data
                                        }} class="table__row-button table__row-elem-buttons text-font text-sm">
                                        <Pencil class= "table__row-button-delete"/>
                                    </button>
                                </td>
                                {#each targetTable.fields as field }
                                        <td class="table__row-elem">{data[field.split("_")[0]]?? ''}</td>
                                {/each}
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    {/if}
</div>

{#if isRenameColumn}
    <Modal>
        <RenameColumn 
            bind:placeholder = {renameColumnVal}
            bind:newColumnValue={newColumnValue}
            closeFunc={()=>isRenameColumn = false}
            on:click={renameColumn}
        />
    </Modal>
{/if}

{#if showEditRow}
    <Modal>
        <EditRowModal closeFunc={()=>{
            showEditRow = false
            editRowValues = {}
        }}
        fields = {targetTable?.fields}
        on:click={editRow}
        editRowValues = {editRowValues}
        />
    </Modal>
{/if}
{#if showAddColumn}
    <Modal>
        <AddColumnModal bind:addColumnArr={addColumnArr} closeModal = {()=>{
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
<Filter bind:targetTable={targetTable} fields={targetTable?.fields} targetTableName={targetTableName} bind:openFilter = {openFilter}/>
