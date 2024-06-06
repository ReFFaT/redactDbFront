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
        const request  = await fetch("http://reffattest.ru:5000/login",{
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
        localStorage.setItem("user",response.login)
        location.reload()
    }
    catch(err){
        console.error(err)
    }
}

export async function createUser(newUser: newUserInterface){
    if(newUser.repeatPass !== newUser.pass) return
    try{
        const request  = await fetch("http://reffattest.ru:5000/users",{
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
        localStorage.setItem("user",response.login)
        location.reload()
    }
    catch(err){
        console.error(err)
    }
}

export async function createDB(db:createDbInterface) {
    try{
        const user = localStorage.getItem('user')
        if(!user) location.reload()
        const request  = await fetch("http://reffattest.ru:5000/user_tables",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                "user": user,
                "user_table": user + "_" + db.user_table.split(" ").join("_"),
                "table_description": db.table_description,
                "table_columns": "id INTEGER PRIMARY KEY"
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
        const user = localStorage.getItem('user')
        if(!user) location.reload()
        const request  = await fetch(`http://reffattest.ru:5000/user_tables/${user}/${tableName}`,{
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
        const user = localStorage.getItem('user')
        if(!user) location.reload()
        const request  = await fetch(`http://reffattest.ru:5000/delete_data/${user}/${tableName}/${id}`,{
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


export async function addTableItem(tableName:string, data:object){
    try{
        const user = localStorage.getItem('user')
        if(!user) location.reload()
        const request  = await fetch(`http://reffattest.ru:5000/add_data/${user}/${tableName}`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
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
        const user = localStorage.getItem('user')
        if(!user) location.reload()
        const request  = await fetch(`http://reffattest.ru:5000/drop_columns/${user}/${tableName}`,{
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({"columns": [columnName.split("_")[0]]})
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
        const user = localStorage.getItem('user')
        if(!user) location.reload()
        const request  = await fetch(`http://reffattest.ru:5000/add_columns/${user}/${tableName}`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({"columns": columnName})
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
        const user = localStorage.getItem('user')
        if(!user) location.reload()
        const request  = await fetch(`http://reffattest.ru:5000/update_data/${user}/${tableName}/${id}`,{
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(rowValue)
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
        const user = localStorage.getItem('user')
        if(!user) location.reload()
        const request  = await fetch(`http://reffattest.ru:5000/search-table/${tableName}?column=${searchRow.field}&value=${searchRow.value}`,{
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            },
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
        const user = localStorage.getItem('user')
        if(!user) location.reload()
        const request  = await fetch(`http://reffattest.ru:5000/filter`,{
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

export async function downLoadTable(tableName:string){
    try{
        const response = await fetch('http://reffattest.ru:5000/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ table: tableName })
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