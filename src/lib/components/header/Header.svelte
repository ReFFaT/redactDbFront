<script lang="ts">
	// @ts-ignore
    import AddIcon from "$lib/icons/add-icon.svg?component";

	import { goto } from "$app/navigation";
    // @ts-ignore
    import DbIcon from "$lib/icons/db-icon.svg?component"
    // @ts-ignore
    import UserIcon from "$lib/icons/default-user.svg?component"
    // @ts-ignore
    import Out from "$lib/icons/out.svg?component"
    import PointerRight from "$lib/icons/pointer-right.svg?component"

    import { dbItems } from "$lib/store/dbItems";
	import { getDbList } from "$lib/store/dbList";
    import "./header.scss"
	import Modal from "../Modal/Modal.svelte";
	import CreateNewDb from "../createNewDB/CreateNewDB.svelte";
	import { onMount } from "svelte";

    let isNewDb = false
    let currentDb: string| null = null
    let isOpen = false
    let header:null| HTMLElement = null
    let startTouch = 0
    function out(){
        localStorage.setItem("user","")
        localStorage.setItem("currentDB","")

        location.reload()
    }
    onMount(()=>{
        currentDb = localStorage.getItem("currentDB")
    })
</script>
<div class="header {isOpen && "open"}">
    <div class="header__wrapper {isOpen && "open"}"
        on:touchmove={(e)=>{
            if(header){
                let width = e.changedTouches[0].clientX
                if(width<200 && width>40){
                    header.style.width = width + "px"
                }
            }
        }}
        on:touchend={(e)=>{
            console.log(startTouch,e.changedTouches[0].clientX)
            if(header){
                header.style.width= ""
                if(startTouch < e.changedTouches[0].clientX-20){
                    isOpen = true
                }
                else if(startTouch > e.changedTouches[0].clientX+20){
                    isOpen = false
                }
            }
        }}
        on:touchstart={(event)=>{
            startTouch = event.changedTouches[0].clientX
        }}
        bind:this={header}
    >
        <button class="header__logo" title="Развернуть меню" on:click={(event=>{
            isOpen = !isOpen
        })}>
            <PointerRight class="header__logo-icon icon {isOpen && "rotate"}"/>
            <span class="text-lg">Свернуть</span>
        </button>
        <div class="db__title">
            <h2>Мои Бд</h2>
        </div>
        <div class="db-header__list">
            {#each $dbItems as dbItem }
                <button class="header__button {currentDb == dbItem && "active"} text-lg " on:click={()=>{
                    localStorage.setItem("currentDB",dbItem)
                    currentDb = dbItem
                    goto("/")
                    getDbList(dbItem)
                    }} title={dbItem}>
                    <DbIcon class={"header__icon icon"}/>
                    <h3 class="header__button-text"> {dbItem}</h3>
                </button>
            {/each}
        </div>
        <button class="header__button-add" on:click={()=>{
            isNewDb = true
        }} title="Создать БД">
            <AddIcon class="header__button-add-img icon"/>
            <span class="text-lg">Создать БД</span>
        </button>
        <!-- <button class="header__button text-lg" on:click={()=>{goto("/")}}>
            <DbIcon class={"header__icon"}/>
            <h3> Главная</h3>
        </button> -->
        <!-- {#each  as }
            
        {/each} -->
        <button on:click={out} class="header__button text-lg header__out">
            <Out class={"header__icon icon"}/>
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
