<script lang="ts">
	import { goto } from "$app/navigation";
    import Button from "$lib/components/Button.svelte";
	import Register from "$lib/components/login/register/register.svelte";
	import SignIn from "$lib/components/login/signIn/SignIn.svelte";
    import "$styles/login.scss"
	import { onMount } from "svelte";
    
    let isLogin = true

    onMount(()=>{
        const userId = localStorage.getItem("user")
        if(userId) goto("/")
    })
</script>

<div class="login">
    <div class="login__wrapper">
        <h1>Своя Бд</h1>
        <div class="login__change">
            <Button text="Авторизация" classStr={!isLogin? "btn-shade" : ""} disabled = {isLogin} on:click={()=>isLogin=true}/>
            <Button text="Регистрация" classStr={isLogin? "btn-shade" : ""} disabled = {!isLogin} on:click={()=>isLogin=false}/>
        </div>
        {#if isLogin}
            <SignIn />
        {:else}
            <Register />
        {/if}
    </div>
</div>