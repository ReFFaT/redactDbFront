import { goto } from "$app/navigation"
import type { addColumnInterface } from "$lib/helper/helper"
export interface createDbInterface{
    user_table:string
    table_description:string
}
export interface newUserInterface {
    login: string,
    name:string,
    pass:string,
    repeatPass:string
}

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
        console.log(response)
        
        if(!request.ok) throw new Error(response.error)
        localStorage.setItem("user",response.login)
        localStorage.setItem("currentDB",response.db_list.split(",")[0].split(".")[0])
        location.reload()
    }
    catch(err){
        console.error(err)
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
                role:"user"
            })
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
        console.log(response)
        localStorage.setItem("user",response.login)
        localStorage.setItem("currentDB",'')

        location.reload()
    }
    catch(err){
        console.error(err)
    }
}

export async function createDB(db:createDbInterface) {
    try{
        const currentDB = localStorage.getItem('currentDB')
        // if(!currentDB) location.reload()
        // if(!currentDB) return
        if(!currentDB) goto("/")

        const request  = await fetch("http://127.0.0.1:5000/user_tables",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                "user": currentDB,
                "table_name": db.user_table,
                "table_description": db.table_description,
            })
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
    }
    catch(err){
        console.error(err)
    } 
}

export async function deleteDB(tableName:string) {
    try{
        const currentDB = localStorage.getItem('currentDB')
        // if(!currentDB) location.reload()
        // if(!currentDB) return
        if(!currentDB) goto("/")

        const request  = await fetch(`http://127.0.0.1:5000/tables/${currentDB}/${tableName}`,{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
    }
    catch(err){
        console.error(err)
    } 
}


export async function deleteTableRow(tableName:string, id:number | string){
    try{
        const currentDB = localStorage.getItem('currentDB')
        // if(!currentDB) location.reload()
        // if(!currentDB) return
        if(!currentDB) goto("/")

        const request  = await fetch(`http://127.0.0.1:5000/delete_data`,{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                db_name:currentDB,
                table_name:tableName,
                id:id
            })
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
    }
    catch(err){
        console.error(err)
    } 
}


export async function addTableItem(tableName:string, data:object){
    try{
        const currentDB = localStorage.getItem('currentDB')
        // if(!currentDB) location.reload()
        // if(!currentDB) return
        if(!currentDB) goto("/")

        const request  = await fetch(`http://127.0.0.1:5000/add_data`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                table_name:tableName,
                db_name:currentDB,
                data:data
            })
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
    }
    catch(err){
        console.error(err)
    } 
}



export async function deleteTableColumn(tableName:string, columnName: string){
    try{
        const currentDB = localStorage.getItem('currentDB')
        // if(!currentDB) location.reload()
        // if(!currentDB) return
        if(!currentDB) goto("/")

        const request  = await fetch(`http://127.0.0.1:5000/drop_column/${currentDB}/${tableName}/${columnName.split("_")[0]}`,{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
            }
            // body:JSON.stringify({
            //     db_name:currentDB,
            //     table_name:tableName,
            //     column_name:columnName
            // })
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
    }
    catch(err){
        console.error(err)
    } 
}


export async function addTableColumn(tableName:string, columnName: addColumnInterface[]){
    try{
        const currentDB = localStorage.getItem('currentDB')
        // if(!currentDB) location.reload()
        // if(!currentDB)return
        if(!currentDB) goto("/")

        const request  = await fetch(`http://127.0.0.1:5000/add_columns`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                db_name:currentDB,
                table_name:tableName,
                "columns": columnName})
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
    }
    catch(err){
        console.error(err)
    } 
}

export async function editTableRow(tableName:string, rowValue:{[key:string]:string | number}){
    const id = rowValue.id??-1
    if(rowValue.id) delete rowValue.id
    try{
        const currentDB = localStorage.getItem('currentDB')
        // if(!currentDB) location.reload()
        // if(!currentDB) return
        if(!currentDB) goto("/")
        
        const editRow={
            db_name:currentDB,
            table_name:tableName,
            id:id,
            new_data:rowValue
        }
        const request  = await fetch(`http://127.0.0.1:5000/update_data`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(editRow)
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
    }
    catch(err){
        console.error(err)
    } 
}


export async function searchTable(tableName:string,searchRow:{value:string,field:string}):Promise<{[key:string]:string}[]>{
    try{
        const currentDB = localStorage.getItem('currentDB')
        // if(!currentDB) location.reload()
        // if(!currentDB) return[]
        if(!currentDB) goto("/")

        const request  = await fetch(`http://127.0.0.1:5000/search-table`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                db_name:currentDB,
                table_name:tableName,
                column:searchRow.field,
                value:searchRow.value
            })
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
        return response
    }
    catch(err){
        console.error(err)
    }
    return [] 
}


export interface filterValueInterface{
    table:string,
    db_name:string,
    filters:({
        column:string,
        from:string,
        to:string
    } |{
        column:string,
        value:string
    })[]
}
export async function searchFilter(filterValue:filterValueInterface):Promise<{[key:string]:string}[]>{
    try{
        const currentDB = localStorage.getItem('currentDB')
        // if(!currentDB) location.reload()
        // if(!currentDB) return[]
        if(!currentDB) goto("/")

        if(currentDB) filterValue.db_name = currentDB
        const request  = await fetch(`http://127.0.0.1:5000/filter`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(filterValue)
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
        return response
    }
    catch(err){
        console.error(err)
    }
    return [] 
}


export async function renameColumnFetch(tableName:string,oldColumn:string,newColumn:string){
    try{
        const currentDB = localStorage.getItem('currentDB')
        // if(!currentDB) location.reload()
        // if(!currentDB) return
        if(!currentDB) goto("/")

        const request  = await fetch(`http://127.0.0.1:5000/rename_column`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                db_name:currentDB,
                table_name:tableName,
                old_column_name:oldColumn,
                new_column_name:newColumn
            })
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
        return response
    }
    catch(err){
        console.error(err)
    }
    return [] 
}

export async function downLoadTable(db_name:string, tableName:string){
    try{
        const response = await fetch('http://127.0.0.1:5000/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ table: tableName,db_name:db_name })
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${tableName}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } else {
            console.error('Failed to export table');
        }
    }
    catch(err){
        console.error(err)
    }
}



export async function createNewDB(newDb:string){
    try{
        const user = localStorage.getItem('user')
        if(!user) location.reload()
        const request  = await fetch(`http://127.0.0.1:5000/create_db`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                login: user,
                db_name:newDb
            })
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
        return response
    }
    catch(err){
        console.error(err)
    }
    return
}


export async function deleteDbFetch(dBName:string){
    try{
        const user = localStorage.getItem('user')
        if(!user) location.reload()
        const request  = await fetch(`http://127.0.0.1:5000/delete_db/${user}/${dBName}`,{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
        return response
    }
    catch(err){
        console.error(err)
    }
    return
}


export async function downloadFile(db_name:string) {
    fetch(`http://localhost:5000/download/${db_name}`)
    .then(response => response.blob())
    .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${db_name}.db`;
        a.click();
        URL.revokeObjectURL(url);
    })
    .catch(error => console.error(error));
}