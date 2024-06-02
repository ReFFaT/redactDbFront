<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import CloseModal from '$lib/components/closeModal/CloseModal.svelte';
	import { formatColumn } from '$lib/helper/helper';
    import "./addTableItemModal.scss"

	export let closeFunc = () => {};
	export let itemsList: string[] = [];

    export let newItems:{[key:string]:string} = {}
    itemsList.forEach(field=>{
        if(field !== "id_INTEGER")newItems[field] = ''
    })
</script>

<div class="add-modal">
	<CloseModal on:click={closeFunc}/>
	<h4>Новая запись</h4>
	<div class="add-modal__items">
		{#if itemsList}
			{#each itemsList as field}
				{#if field !== 'id_INTEGER'}
					<div class="add-modal__input">
						<Input bind:value = {newItems[field]} title={formatColumn(field)} placeHolder={formatColumn(field)} />
					</div>
				{/if}
			{/each}
		{/if}
	</div>
	<div class="add-modal__button">
		<Button text="Создать" on:click/>
	</div>
</div>

