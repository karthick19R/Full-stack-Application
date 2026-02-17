export function qantityValidate(value){
    console.log("validator function invoked")
    const number = Number(value)
    console.log(number)
    if(number===NaN)return NaN
    if(value<0)return 0
    if(value>100) return 100
    return value
}