<script>
	import Button from "$lib/components/Button.svelte";
	import Input from "$lib/components/Input.svelte";
	import { auth } from "$lib/store/user";
    import "./signIn.scss"

    let login = "";
    let password = "";

</script>

<div class="sign-in">
    <div class="sign-in__wrapper">
        <div class="sign-in__input">
            <Input bind:value={login} title={'Логин'} placeHolder ="Логин"/>
        </div>
        <div class="login__input">
            <Input bind:value={password} title={"Пароль"} placeHolder ="Пароль" useIcon={true}/>
        </div>
    </div>
    <div class="sign-in__button">
        <Button on:click={()=>auth(login,password)} text="Войти"/>
    </div>
</div>

<style>

</style>