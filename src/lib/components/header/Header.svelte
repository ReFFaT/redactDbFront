<script>
	import { goto } from "$app/navigation";
    // @ts-ignore
    import DbIcon from "$lib/icons/db-icon.svg?component"
    // @ts-ignore
    import UserIcon from "$lib/icons/default-user.svg?component"
    // @ts-ignore
    import Out from "$lib/icons/out.svg?component"
    import "./header.scss"

    function out(){
        localStorage.setItem("user","")
        location.reload()
    }

</script>
<div class="header">
    <div class="header__wrapper">
        <button class="header__logo">
            <UserIcon class={"header__icon"}/>
        </button>
        <button class="header__button" on:click={()=>{goto("/")}}>
            <DbIcon class={"header__icon"}/>
        </button>
        <button on:click={out} class="header__button header__out">
            <Out class={"header__icon"}/>
        </button>
    </div>
</div>

