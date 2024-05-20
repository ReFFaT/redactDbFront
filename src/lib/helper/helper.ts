export function formatName (str:string){
    if(!str) return ''
    const newArr = str.split("_")
    newArr.splice(0,1)
    return newArr.join(" ")
}