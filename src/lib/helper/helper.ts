export function formatName (str:string){
    if(!str) return ''
    const newArr = str.split("_")
    newArr.splice(0,1)
    return newArr.join(" ")
}

export function formatColumn(text:string){
    const newText:string[] = text.split("_")
    newText[1] = `( ${newText[1]} )`
    return newText.join(" ")
}

export interface addColumnInterface{
    col:string
    type:string
}