<script lang="ts">
	import { type newUserInterface,createUser } from '$lib/helper/fetcher';
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
    import "./register.scss"

    const newUser:newUserInterface ={
        login:"",
        name:"",
        pass:"",
        repeatPass:""
    }
</script>

<div class="register">
    <div class="register__wrapper">
        <div class="register__input">
            <Input bind:value={newUser.login} title="Логин" placeHolder ="Логин"/>
        </div>
        <div class="register__input">
            <Input bind:value={newUser.name} title="Имя" placeHolder ="Имя"/>
        </div>
        <div class="register__input">
            <Input bind:value={newUser.pass} title="Пароль" placeHolder ="Пароль" useIcon={true}/>
        </div>
        <div class="register__input">
            <Input bind:value={newUser.repeatPass} title="Повторите пароль" placeHolder ="Повторите пароль" useIcon={true}/>
        </div>
    </div>
    <div class="register__button">
        <Button on:click={()=>createUser(newUser)} text="Зарегистрироваться"/>
    </div>
</div>


<style>

</style>