import { ref } from "vue";
export function counter(){
const count = ref(0)
function increment(){
    count.value++
}
function decrement(){
    if(count.value>0){
     count.value--}
}
function reset(){
    count.value =0
}
return {count,increment,decrement,reset}
}