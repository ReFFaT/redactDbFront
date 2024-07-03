<script lang="ts">
	import { searchFilter, type filterValueInterface } from "$lib/helper/fetcher";
	import type { tableItem } from "$lib/store/table";
	import Button from "../Button.svelte";
    import Input from "../Input.svelte";

    export let openFilter = false
    export let targetTableName:string | null = null
    export let fields:string[]| null = []
    export let targetTable:tableItem | null = null

    let fieldsList: string[][] = []
    
    let filterValue: filterValueInterface = {
        table:"",
        filters:[]
    }

    function setFieldsList(){
        if(fields){
            // if(fields.length === filterValue.filters.length) return
            // else filterValue.filters = []
            filterValue.filters = []
            fieldsList = []
            if(targetTableName) filterValue.table = targetTableName
            fieldsList = fields.map(el=>el.split("_"))
            fieldsList.forEach(el=>{
                if(el[1]==="INTEGER"||el[1] === "REAL") filterValue.filters.push({
                    column:el[0],
                    from:"",
                    to:""
                })
                else filterValue.filters.push({
                    column:el[0],
                    value:""
                })
            })
        }
    } 
    async function getFilterTable() {
        if(targetTable?.data){
            targetTable.data = []
            const res = await searchFilter(filterValue)
            targetTable.data = res
            openFilter = false
        }
    }

    $:fields && fields.length && setFieldsList()
</script>


<div class="filter {openFilter && "open"}" >
    <button class="filter__close-btn"
        on:click={()=>{
            openFilter = false
        }}></button>
    <div class="filter__content {openFilter && "open"}">
        <h2>Задать фильтр</h2>
        <div class="filter__list">
            {#each fieldsList as field,index}
                <div class="filter__item">
                    {#if field[1] === "INTEGER" || field[1] === "REAL"}
                        <h4>Введите промежуток для "{field[0]}"</h4>    
                        <Input placeHolder="Число" title="От" bind:value={filterValue.filters[index].from}/>
                        <Input placeHolder="Число" title="До" bind:value={filterValue.filters[index].to}/>
                    {:else}
                        <h4>Введите значение для "{field[0]}"</h4>
                        <Input title="Значение" bind:value={filterValue.filters[index].value}/>
                    {/if}
                </div>
            {/each}
        </div>
        <div class="filter__buttons">
            <Button text="Закрыть" on:click={()=>openFilter = false}/>
            <Button text="Отправить" on:click={getFilterTable}/>
        </div>
    </div>
</div>

<style lang="scss">
    .filter{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        z-index: 10;
        pointer-events: none;
        &.open{
            background-color: rgba($color: #000000, $alpha: .5);
            pointer-events: all;
        }
        &__buttons{
            display: flex;
            gap: 10px;
        }
        &__item{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        &__list{
            width: 100%;
            padding: 20px;
            height: calc(100% - 60px);
            margin: 30px 0;
            display: flex;
            flex-direction: column;
            gap: 20px;
            overflow-y: auto;
            overflow-x: hidden;
            box-sizing: border-box;
        }
        &__close-btn{
            width: 100%;
            height: 100vh;
            background: transparent;
            border: none;
            outline: none;
        }
        &__content{ 
            display: flex;
            flex-direction: column;
            width: 500px;
            height: 100%;
            box-sizing: border-box;
            position: absolute;
            background-color: var(--body-background-color);
            right: -500px;
            bottom: 0;
            transition: all .3s;
            border-radius: 40px 0 0 40px;
            padding: 20px;
            &.open{
                right: 0px;
            }
        }
    }
</style>