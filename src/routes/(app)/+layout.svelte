<script lang="ts">
	import { goto } from '$app/navigation';
	import Header from '$lib/components/header/Header.svelte';
	import { getDbList } from '$lib/store/dbList';
	import { getTableList } from '$lib/store/table';
	import { onMount } from 'svelte';  

    async function auth(){
        
    }

    onMount(()=>{
        const userId = localStorage.getItem("user")
        if(!userId) goto("/login")
        if(userId){
            getDbList(userId)
            getTableList(userId)
        }
    })
</script>
<div class="wrapper">
    <Header />
<slot></slot>
</div>


<style lang="scss">
    .wrapper{
        min-height: 100vh;
        height: 100%;
        width: 100%;
        display: flex;
    }
</style>