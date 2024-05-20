<script lang="ts">
	import { scale } from 'svelte/transition';
	import AddTableItem from '$lib/components/addTableItem/AddTableItem.svelte';
	import Button from './../../../lib/components/Button.svelte';
	import Input from './../../../lib/components/Input.svelte';
	import { goto } from '$app/navigation';
	import DeleteRow from '$lib/components/deleteRow/DeleteRow.svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import { formatName } from '$lib/helper/helper';
	import { type tableItem , table } from '$lib/store/table';
	import { onMount } from 'svelte';
    import {deleteTableRow} from "$lib/helper/fetcher"
    import { getTableList } from '$lib/store/table';
    import AddIcon from "$lib/icons/add-icon.svg?component";
    import "$styles/table.scss"

    let targetTableName: string | null = null
    let targetTable: tableItem | null = null
    let showDeleteRowModal = false
    let userId:string | null = null
    let deleteIndex:number = -1
    let addNewRow = false 

    function setTargetTable(){
        if($table && targetTableName) {
            targetTable = JSON.parse(JSON.stringify($table[targetTableName]))
        }
    }

    async function deleteRow() {
        if(targetTableName && userId) {
            await deleteTableRow(targetTableName,deleteIndex)
            await getTableList(userId)    
        }
        showDeleteRowModal = false
    }

    onMount(()=>{
        userId = localStorage.getItem("user")
        if(!userId) goto("/login")
        targetTableName = sessionStorage.getItem("targetTable")
    })

    $:targetTableName && $table && setTargetTable()
</script>


<div class="table">
    <h1>Таблица {formatName(targetTableName?? "")}</h1>
    {#if targetTable}
        <table class="table__wrapper">
            <thead>
                <tr class="table__row  text-font text-sm">
                    {#each targetTable.fields as field }
                        <td class="table__row-elem table__row-elem-head">
                            {field}
                        </td>
                    {/each}
                    <td class="table__row-delete table__row-elem-head">
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
                                showDeleteRowModal = true
                                if(data.id !== undefined){
                                    deleteIndex = Number(data.id)
                                }
                                }} class="table__row-button text-font text-sm">
                                Удалить
                            </button>
                    </tr>
                {/each}
            </tbody>
        </table>
        <div class="table__new">
            <button class="table__new-button" on:click={()=>addNewRow = true}>
                <AddIcon class="table__new-icon"/>
            </button>
        </div>
    {/if}

</div>
{#if showDeleteRowModal}
    <Modal>
        <DeleteRow title='Вы точно хотите удалить эту запись?' closeModal = {()=>{
            showDeleteRowModal = false
            deleteIndex = -1
        }} deleteFunc = {deleteRow}/>
    </Modal>
{/if}
{#if addNewRow}
    <Modal>
        <AddTableItem tableName={targetTableName?? ""} itemsList={targetTable?.fields?? []} closeFunc={()=>addNewRow = false} />
    </Modal>
{/if}
