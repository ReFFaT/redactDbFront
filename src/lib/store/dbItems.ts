import { writable } from 'svelte/store';

export const dbItems = writable<string[]>([])


export async function getUserInfo(){
    try{
        const user = localStorage.getItem("user")
        // if(!user) location.reload()
        if(!user) return


        const request = await fetch(`http://127.0.0.1:5000/user/${user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (request.ok) {
            const response = await request.json()
            const newDbList:string[] = response.db_list.split(",")
            if(newDbList[0]==="") return dbItems.set([])
            dbItems.set(newDbList.map(el=>el.split(".")[0]))
        } else {
            console.error('Failed to get user');
        }
    }
    catch(err){
        console.error(err)
    }
}