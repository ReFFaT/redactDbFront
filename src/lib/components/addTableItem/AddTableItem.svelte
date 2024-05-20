<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import CloseModal from '$lib/components/Modal/CloseModal.svelte';
	import { addTableItem } from '$lib/helper/fetcher';
	import { getTableList } from '$lib/store/table';

	export let closeFunc = () => {};
	export let itemsList: string[] = [];
    export let tableName = ''

    let newItems:{[key:string]:string} = {}
    itemsList.forEach(field=>{
        if(field !== "id")newItems[field] = ''
    })
</script>

<div class="add-modal">
	<CloseModal on:click={closeFunc}/>
	<h4>Новая запись</h4>
	<div class="add-modal__items">
		{#if itemsList}
			{#each itemsList as field}
				{#if field !== 'id'}
					<div class="add-modal__input">
						<Input bind:value = {newItems[field]} title={field} placeHolder={field} />
					</div>
				{/if}
			{/each}
		{/if}
	</div>
	<div class="add-modal__button">
		<Button text="Создать" on:click={async ()=>{
            const userId = localStorage.getItem("user")
            await addTableItem(tableName,newItems)
            getTableList(userId?? '')
            closeFunc()
        }}/>
	</div>
</div>

<style lang="scss">
    .add-modal{
        position: relative;
        max-width: 300px;
        min-width: 250px;
        min-height: 100px;
        &__items{
            max-height: 500px;
            overflow-x: hidden;
            overflow-y: auto;
            display: flex;
            margin-top: 10px;
            gap: 10px;
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
        }
        &__input{
            width: 100%;
            display: flex;
            gap: 5px;
            flex-direction: column;
        }
        &__button{
            margin-top: 15px;
        }
    }
</style>
