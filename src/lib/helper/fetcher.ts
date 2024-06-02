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
            body:JSON.stringify({"columns": [columnName]})
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
    }
    catch(err){
        console.error(err)
    } 
}


export async function addTableColumn(tableName:string, columnName: string){
    const newColumns = columnName.split(' ')
    try{
        const user = localStorage.getItem('user')
        if(!user) location.reload()
        const request  = await fetch(`http://reffattest.ru:5000/add_columns/${user}/${tableName}`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({"columns": newColumns})
        })
        const response = await request.json()
        if(!request.ok) throw new Error(response.error)
    }
    catch(err){
        console.error(err)
    } 
}

export async function editTableRow(tableName:string, rowValue:{[key:string]:string}){
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