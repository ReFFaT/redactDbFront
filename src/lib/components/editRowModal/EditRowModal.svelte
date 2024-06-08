<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import CloseModal from '$lib/components/closeModal/CloseModal.svelte';
	import { formatColumn } from '$lib/helper/helper';
    import "./editRowModal.scss"

    interface editRowInterface {[key:string]:string}

	export let closeFunc = () => {};
    export let editRowValues:editRowInterface = {}
	export let fields:string[] = []

    let editRowElms = Object.keys(editRowValues)
</script>

<div class="edit-modal">
	<CloseModal on:click={closeFunc}/>
	<h4>Редактирование</h4>
	<div class="edit-modal__items">
		{#if editRowElms}
			{#each editRowElms as field}
				{#if field !== 'id'}
					<div class="edit-modal__input">
						<Input bind:value = {editRowValues[field]} title={formatColumn(fields.find(elem=>elem.split("_")[0] === field)?? "")} placeHolder={field} />
					</div>
				{/if}
			{/each}
		{/if}
	</div>
	<div class="edit-modal__button">
		<Button text="Редактировать" on:click/>
	</div>
</div>