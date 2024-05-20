export interface createDbInterface{
    user_table:string
    table_description:string
}

export async function createDB(db:createDbInterface) {
    try{
        const user = localStorage.getItem('user')
        if(!user) location.reload()
        const request  = await fetch("http://127.0.0.1:5000/user_tables",{
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
        const request  = await fetch(`http://127.0.0.1:5000/user_tables/${user}/${tableName}`,{
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
        const request  = await fetch(`http://127.0.0.1:5000/delete_data/${user}/${tableName}/${id}`,{
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
        const request  = await fetch(`http://127.0.0.1:5000/add_data/${user}/${tableName}`,{
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