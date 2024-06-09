<script lang="ts">
	import { onMount } from 'svelte';
    import EyeClose from "$lib/icons/eye-close.svg?component"
    import EyeOpen from "$lib/icons/eye-open.svg?component"

	export let useIcon = false;
	export let value = '';
	export let placeHolder = '';
	export let title = ""


	let input: null | HTMLInputElement = null;
	let inputType = useIcon ? 'password' : 'text';

	function changeInputType() {
		if (!input) return;
		input.setAttribute('type', inputType);
		inputType = inputType == 'text' ? 'password' : 'text';
	}
	
    onMount(() => {
		changeInputType();
	});
</script>


{#if title!== ''}
	<p class="input-title text-sm text-font">{title}</p>
{/if}
<div class="input">
	<input
		bind:this={input}
		class="input__inp text-font"
		class:pr-40={useIcon}
		type="text"
		placeholder={placeHolder}
		bind:value
	/>

	{#if useIcon}
		<button on:click={changeInputType} class="input__image">
            {#if inputType =="password"}
                <EyeClose class="input__image-img"/>
            {:else}
                <EyeOpen class="input__image-img"/>
            {/if}
        </button>
	{/if}
</div>

<style lang="scss">
	.input-title{
		margin-left: 10px;
		margin-bottom: 5px;
	}
	.input {
		width: 100%;
		height: 40px;
		position: relative;
		box-sizing: border-box;
		user-select: none;
		border: none;
		&__inp {
			background-color: var(--click-elem-bg);
			width: 100%;
			height: 40px;
			border-radius: 8px;
			padding-left: 10px;
			padding-right: 10px;
			font-size: 16px;
			box-sizing: border-box;
			outline: none;
			border: none;
			-webkit-box-shadow: 0px 0px 33px -4px var(--shadow-color);
			-moz-box-shadow: 0px 0px 33px -4px var(--shadow-color);
			box-shadow: 0px 0px 33px -4px var(--shadow-color);
			&::placeholder{
				color: var(--color-text-second);
			}
		}
		&__image {
			top: 6px;
			position: absolute;
			z-index: 1;
			cursor: pointer;
			width: 30px;
			height: 30px;
            padding: 0;
            margin: 0;
            border: none;
			right: 5px;
            background: none;
            &-img{
                width: 30px;
                height: 30px;
            }
		}
	}
</style>
