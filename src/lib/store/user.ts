import { writable } from 'svelte/store';

interface userInterface{
    id: number,
    login: string,
    name: string,
    role: "admin"| "user"
}
export interface newUserInterface {
    login: string,
    name:string,
    pass:string,
    repeatPass:string
}
export const user = writable<userInterface | null>(null)


export async function auth(login:string,password:string) {
    try{
        const request  = await fetch("http://127.0.0.1:5000/login",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                "login":login,
                "password":password
            })
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
        user.set(response)
        localStorage.setItem("user",response.login)
        location.reload()
    }
    catch(err){
        console.error(err)
        user.set(null)
    }
}

export async function createUser(newUser: newUserInterface){
    if(newUser.repeatPass !== newUser.pass) return
    try{
        const request  = await fetch("http://127.0.0.1:5000/users",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                "login":newUser.login,
                "name":newUser.name,
                "password":newUser.pass,
                role:""
            })
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
        console.log(response)
        user.set(response)
        localStorage.setItem("user",response.login)
        location.reload()
    }
    catch(err){
        console.error(err)
        user.set(null)
    }
}