<script lang="ts">
	import { goto } from '$app/navigation';
	import Header from '$lib/components/header/Header.svelte';
	import { onMount } from 'svelte'; 
    import {getUserInfo} from "$lib/store/dbItems"
    
    onMount(()=>{
        const userId = localStorage.getItem("user")
        const currentDB = localStorage.getItem("currentDB")
        // if(!userId || !currentDB) goto("/login")
        if(!userId) goto("/login")

        getUserInfo()

        // if(userId && currentDB){
        //     getDbList(currentDB)
        // }
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