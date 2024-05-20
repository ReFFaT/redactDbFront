<script lang="ts">
	import CloseModal from './../Modal/CloseModal.svelte';
	import { getDbList } from '$lib/store/dbList';
	import { type createDbInterface,createDB } from '$lib/helper/fetcher';
	import Button from "../Button.svelte";
    import Input from "../Input.svelte";
    import "./adddatabase.scss"

    export let closeFunction =()=>{}

    let db:createDbInterface = {
        user_table:"",
        table_description:""
    }

    function changeDisabled(){
        if(db.user_table!== "" && db.table_description!== "") disabled = false
        else disabled = true
    }

    let disabled = true
    let error:"" | "Такая таблица уже существует" = ""

    $: changeDisabled(db)

</script>


<div class="add-db">
    <CloseModal on:click={closeFunction}/>
    <h4>Новая таблица</h4>
    <p>{error}</p>
    <div class="add-db__input">
        <Input bind:value={db.user_table} placeHolder="Название таблицы" title="Название таблицы"/>
    </div>
    <div class="add-db__input">
        <Input bind:value={db.table_description} placeHolder="Описание таблицы" title="Описание таблицы"/>
    </div>
    <div class="add-db__button">
        <Button bind:disabled={disabled} on:click={async ()=>{
            const user = localStorage.getItem('user')
            if(user) {
                await createDB(db)
                getDbList(user)
                closeFunction()
            }
        }} text= "Создать"/>
    </div>
</div>
