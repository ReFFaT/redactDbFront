import { writable } from 'svelte/store';


export interface tableItem{
    data: {
        [key:string]:string
    }[],
    fields: string[]
}

// interface tableInterface{
//     [key: string]:tableItem
// }


export const table = writable<tableItem | null>(null);


export async function getTableList(tableName:string){
    try{
        const currentDB = localStorage.getItem('currentDB')
        if(!currentDB) location.reload()
        const request  = await fetch(`http://127.0.0.1:5000/table_data/${currentDB}/${tableName}`,{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            }
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
// export async function getTableData(tableName:string){
//     try{
//         const currentDB = localStorage.getItem('currentDB')
//         if(!currentDB) location.reload()
//         const request  = await fetch(`http://127.0.0.1:5000/table_data/${currentDB}/${tableName}`,{
//             method:"GET",
//             headers: {
//                 "Content-Type": "application/json",
//             }
//         })
//         const response = await request.json()
//         if(!request.ok) throw new Error(response.error)
//         return response
//     }
//     catch(err){
//         console.error(err)
//     } 
// }