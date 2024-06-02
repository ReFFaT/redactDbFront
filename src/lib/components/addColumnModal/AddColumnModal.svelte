<script lang="ts">
	import {type addColumnInterface } from '$lib/helper/helper';
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import CloseModal from '$lib/components/closeModal/CloseModal.svelte';
    import "./addColumnModal.scss" 
	import { onDestroy } from 'svelte';
    export let closeModal = ()=>{}
    export let deleteFunc = ()=>{}
    export let addColumnArr : addColumnInterface[] = []

    function changeValue(elem:Event,column:addColumnInterface){
        let selectElem = elem.target as HTMLSelectElement
        if(selectElem && selectElem.value){
            column.type = selectElem.value
        }
    }
    onDestroy(()=>{
        addColumnArr = []
    })
</script>

<div class="add-column">
    <CloseModal on:click={closeModal}/>
    <h4>Добавление колонок</h4>
    <div class="add-column__wrapper">
        {#each addColumnArr as column , index}
        <div class="add-column__input">
            <Input title="Введите название" bind:value={column.col}/> 
            <p class="add-column__select-title text-sm text-font">Выберите тип</p>
            <select class="select text-font" on:change={(e)=>changeValue(e,column)}>
                <option class="select__option" value="">UNKNOWN (Динамический тип данных)</option>
                <option class="select__option" value="BLOB">BLOB (Двоичные данные)</option>
                <option class="select__option" value="INTEGER">INTEGER (Целое число)</option>
                <option class="select__option" value="REAL">REAL (Число с плавающей точкой)</option>
                <option class="select__option" value="TEXT">TEXT (Строка)</option>
            </select>
            <button class="add-column__button text-sm"
            on:click={()=>{
                addColumnArr.splice(index, 1);
                addColumnArr = addColumnArr
            }}
            >Удалить</button>
        </div>
            {/each}
        <Button text="Добавить колонку" classStr='' on:click={()=>{
            addColumnArr.push({col:"",type:""})
            addColumnArr = addColumnArr
        }}/>
        <Button text="Создать" classStr='' on:click={deleteFunc}/>
    </div>
</div>

<style>
    .add-column__select-title{
        margin-left: 15px;
    }
select{
    cursor: pointer;
    height: 44px;
    min-height: 44px;
    outline: none;
    width: 100%;
    padding: 0 10px;
    border: none;
    border-radius: 10px;
    background-color: var(--click-elem-bg);
}
.select__option{
    height: 30px;
}
.add-column{
    position: relative;
    width: 300px;
}
.add-column__wrapper{
    margin-top: 10px;
    display: flex;
    box-sizing: border-box;
    padding-right: 10px;
    flex-direction: column;
    max-height: 90vh;
    gap: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: thin;
    width: 100%;
}
.add-column__input{
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: 20px 0;
    gap: 10px;
}
.add-column__button{
    width: 150px;
    height: 30px;
    background-color: var(--click-elem-bg);
    cursor: pointer;
    border: none;
    border-radius: 10px;
    transition: all .3s;
    min-height: 30px;
}
.add-column__button:active{
    transform: scale(.9);
}

</style>