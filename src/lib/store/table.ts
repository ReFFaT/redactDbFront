import { writable } from 'svelte/store';


export interface tableItem{
    data: {
        [key:string]:string | number
    }[],
    fields: string[]
}

interface tableInterface{
    [key: string]:tableItem
}


export const table = writable<tableInterface | null>(null);


export async function getTableList(user:string){
    try{
        const request  = await fetch(`http://reffattest.ru:5000/user_tables_table/${user}`,{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
            table.set(response)
    }
    catch(err){
        console.error(err)
        table.set(null)
    }
}