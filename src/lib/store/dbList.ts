import { writable } from 'svelte/store';

interface bdListInterface{
        id: number;
        table_columns: string;
        table_description: string;
        user: string;
        user_table: string;
}


export const dbList = writable<bdListInterface[]>([])

export async function getDbList(user:string){
    try{
        const request  = await fetch(`http://reffattest.ru:5000/user_tables/${user}`,{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
        dbList.set(response)
    }
    catch(err){
        console.error(err)
        dbList.set([])
    }
}