<script>
	// @ts-ignore
    import AddIcon from "$lib/icons/add-icon.svg?component";

	import { goto } from "$app/navigation";
    // @ts-ignore
    import DbIcon from "$lib/icons/db-icon.svg?component"
    // @ts-ignore
    import UserIcon from "$lib/icons/default-user.svg?component"
    // @ts-ignore
    import Out from "$lib/icons/out.svg?component"
	import { dbItems } from "$lib/store/dbItems";
	import { getDbList } from "$lib/store/dbList";
    import "./header.scss"
	import Modal from "../Modal/Modal.svelte";
	import CreateNewDb from "../createNewDB/CreateNewDB.svelte";

    let isNewDb = false

    function out(){
        localStorage.setItem("user","")
        localStorage.setItem("currentDB","")

        location.reload()
    }
</script>
<div class="header">
    <div class="header__wrapper">
        <!-- <button class="header__logo">
            <UserIcon class={"header__icon"}/>
        </button> -->
        {#each $dbItems as dbItem }
            <button class="header__button text-lg" on:click={()=>{
                localStorage.setItem("currentDB",dbItem)
                goto("/")
                getDbList(dbItem)
                }} title={dbItem}>
                <DbIcon class={"header__icon"}/>
                <h3 class="header__button-text"> {dbItem}</h3>
            </button>
        {/each}
        <button class="header__button-add" on:click={()=>{
            isNewDb = true
        }} title="Создать БД">
            <AddIcon class="header__button-add-img"/>
        </button>
        <!-- <button class="header__button text-lg" on:click={()=>{goto("/")}}>
            <DbIcon class={"header__icon"}/>
            <h3> Главная</h3>
        </button> -->
        <!-- {#each  as }
            
        {/each} -->
        <button on:click={out} class="header__button text-lg header__out">
            <Out class={"header__icon"}/>
            <h3> Выход</h3>
        </button>
    </div>
</div>
{#if isNewDb}
    <Modal>
        <CreateNewDb 
        closeFunc={()=>isNewDb = false}/>
    </Modal>    
{/if}
