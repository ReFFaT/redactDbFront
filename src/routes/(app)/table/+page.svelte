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
	import { formatName, formatColumn,type addColumnInterface} from '$lib/helper/helper';
	import { type tableItem , table } from '$lib/store/table';
	import { onMount } from 'svelte';
    import {deleteTableRow,deleteTableColumn,addTableColumn,editTableRow, addTableItem,searchTable} from "$lib/helper/fetcher"
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
        if($table && targetTableName && $table[targetTableName]) {
            targetTable = JSON.parse(JSON.stringify($table[targetTableName]))
        }
    }

    async function addRow (){
        const newRowValues:{[key:string]:string} = {}
        const userId = localStorage.getItem("user")

        for(let i in newRowItems){
            newRowValues[i.split("_")[0]] = newRowItems[i]
        }
        
        if(targetTableName && userId) {
            await addTableItem(targetTableName,newRowValues)
            await getTableList(userId?? '')
        }
        resetSearch()
        showAddNewRow = false
        newRowItems = {}
    }

    async function deleteRow() {
        if(targetTableName && userId) {
            await deleteTableRow(targetTableName,deleteRowIndex)
            await getTableList(userId)    
        }
        resetSearch()
        showDeleteRowModal = false
    }

    async function deleteColumn() {
        if(targetTableName && userId) {
            await deleteTableColumn(targetTableName,deleteColumnName)
            await getTableList(userId)    
        }
        resetSearch()
        showDeleteColumn = false
    }

    async function addColumn() {
        if(targetTableName && userId) {
            await addTableColumn(targetTableName,addColumnArr)
            await getTableList(userId)    
        }
        resetSearch()
        showAddColumn = false
    }

    async function editRow() {
        const newRowValues:{[key:string]:string} = {}

        for(let i in editRowValues){
            newRowValues[i.split("_")[0]] = editRowValues[i]
        }

        if(targetTableName && userId) {
            await editTableRow(targetTableName,newRowValues)
            await getTableList(userId)    
        }
        resetSearch()
        showEditRow = false
        editRowValues = {}
    }

    async function getSearch() {
        if(targetTableName && userId && targetTable?.data) {
            targetTable.data = []
            const res = await searchTable(targetTableName,searchRow)
            targetTable.data = res
        }
    }
    async function reSearch() {
        if(userId && targetTable?.data) {
            targetTable.data = []
            await getTableList(userId)
            resetSearch()
        }
        
    }

    onMount(()=>{
        userId = localStorage.getItem("user")
        if(!userId) goto("/login")
        targetTableName = sessionStorage.getItem("targetTable")
        if(!targetTableName) goto('/') 
    })

    $:targetTableName && $table && setTargetTable()
    $:searchRow && changeSearchButton()
</script>


<div class="table">
    <div class="table__title">
        <h1>Таблица {formatName(targetTableName?? "")}</h1>
        <div class="table__title-search">
            <div class="table__title-search-select">
                <Select bind:value={searchRow.field} placeholder="Выберите столбец" items={targetTable?.fields.map(el=>{return {value:el.split("_")[0],description:""}})}/>
            </div>
            <div class="table__title-search-input">
                <Input placeHolder='Введите значение' bind:value={searchRow.value}/>
            </div>
            
            <Button disabled={isSearchButton} text="Поиск" classStr="table__title-button" on:click={()=>getSearch()}/>
            <Button text="Сбросить" classStr="table__title-button" on:click={()=>reSearch()}/>
        </div>
        <div class="table__title-buttons">
            <Button text="Фильтр" classStr="table__title-button" on:click={()=>openFilter = true}/>
            <Button text="Добавить запись" classStr="table__title-button" on:click={()=>showAddNewRow = true}/>
            <Button text="Вернуться" classStr="table__title-button" on:click={()=>{
                sessionStorage.setItem("targetTable","")
                goto('/')}}
            />
        </div>
    </div>
    {#if targetTable}
        <table class="table__wrapper">
            <thead>
                <tr class="table__row  text-font text-sm">
                    {#each targetTable.fields as field }
                        <td class="table__row-elem table__row-elem-head">
                            <div class="table__row-head">
                                {formatColumn(field)}
                                {#if field !== 'id_INTEGER'}
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
                    <td class="table__row-delete table__row-elem-head">
                        
                    </td>
                    <td class="table__row-delete table__row-elem-head">
                        <button class="table__row-head-button" title="Добавить столбец" on:click={()=>{
                            showAddColumn = true
                        }}>
                            <AddIcon class="table__new-head-icon"/>
                        </button>
                    </td>
                </tr>
            </thead>
            <tbody>
                {#each targetTable.data as data,index}
                    <tr class="table__row text-font text-sm {index%2!==0 && "table__row-color"}" in:scale={{delay:200,duration:300}}>
                        {#each targetTable.fields as field }
                                <td class="table__row-elem">{data[field.split("_")[0]]?? ''}</td>
                        {/each}
                        <td class="table__row-elem">
                            <button title="Редактировать данные" on:click={()=>{
                                showEditRow = true
                                editRowValues = data
                                }} class="table__row-button text-font text-sm">
                                <Pencil class= "table__row-button-delete"/>
                            </button>
                        </td>
                        <td class="table__row-elem" title="Удалить данные">
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
    {/if}
</div>


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
