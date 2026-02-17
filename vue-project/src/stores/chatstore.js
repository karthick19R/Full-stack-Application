import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserDetails } from '@/stores/score'
const userstore = useUserDetails()
import {getAllchats,getPersonalChat,addMessage, currentUser} from '@/service/userapi'
export const useChatStore = defineStore("chat", () => {
    const users = ref([])
    async function getallchats(){
        const res = await getAllchats()
        users.value = res
        return res
    }
    async function getpersonalchat(f_id){
        const res = await getPersonalChat(f_id)
        console.log("getpersonalchat in store : ",res)
        return res
    }
    async function addmessage(payload) {
        try {
            // const res = await api.post('/addpost', payload, {
            // const res = await api.post('/addpost', payload, {
            // withCredentials: true
            // })
            console.log("userstore.currentuser.data:",userstore.currentuser.data)
            console.log("userstore.currentuser.data.id : ",userstore.currentuser.data.id )
            payload ={senderid : userstore.currentuser.data.id ,...payload}
            console.log("payload inside addmessage : ",payload)
            const res = await addMessage(payload)

            return res
        } catch (error) {
            console.error("Error sending message:", error)
            throw error
        }
        }
    return { users, getallchats ,addmessage,getpersonalchat}
})
