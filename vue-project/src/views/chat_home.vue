<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useUserDetails } from '@/stores/score'
import { useChatStore } from '@/stores/chatstore'

const store = useUserDetails()
const chatdetails = useChatStore()

const Allmessages = ref([])
const messages = ref([])
const selectedUser = ref(null)
const newMessage = ref('')
const messageBox = ref(null)

const currentUserId = computed(() => store.currentuser.data?.id)

onMounted(async () => {
  const res = await chatdetails.getallchats()
  Allmessages.value = res.data.data || []
})

const uniqueUsers = computed(() => {
  if (!currentUserId.value) return []

  const chatMap = new Map()

  Allmessages.value.forEach(msg => {
    const otherUser =
      msg.senderid === currentUserId.value
        ? msg.receiver
        : msg.sender

    chatMap.set(otherUser.id, otherUser)
  })

  return Array.from(chatMap.values())
})

watch(uniqueUsers, (users) => {
  if (users.length && !selectedUser.value) {
    selectUser(users[0])
  }
})

async function selectUser(user) {
  selectedUser.value = user
  await personalchat(user.id)
}

async function personalchat(id) {
  const res = await chatdetails.getpersonalchat(id)
  messages.value = res.data.data || []

  await nextTick()
  scrollToBottom()
}

function scrollToBottom() {
  if (messageBox.value) {
    messageBox.value.scrollTop = messageBox.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || !selectedUser.value) return

  try {
    const res = await chatdetails.addmessage({
      receiverid: selectedUser.value.id,
      content: newMessage.value
    })

    const createdMessage = res.data.data

    messages.value.push(createdMessage)

    newMessage.value = ''

    await nextTick()
    scrollToBottom()

  } catch (error) {
    console.error("Send message failed:", error)
  }
}

</script>

<template>
  <v-app>
    <v-layout style="height: 100vh">

      <v-navigation-drawer
        permanent
        width="300"
        class="chat-sidebar"
      >
        <div class="pa-4 text-h6 font-weight-bold">
          Messages
        </div>

        <v-divider />

        <v-list>
          <v-list-item
            v-for="user in uniqueUsers"
            :key="user.id"
            @click="selectUser(user)"
            class="chat-user"
            :class="{ active: selectedUser?.id === user.id }"
          >
            <template #prepend>
              <!-- <v-avatar size="42"> -->
                <!-- <v-img :src="user.avatar || 'https://i.pravatar.cc/150?img=3'" /> -->
              <!-- </v-avatar> -->
            </template>

            <v-list-item-title class="font-weight-medium">
              {{ user.name || user.fullName }}
            </v-list-item-title>

            <v-list-item-subtitle class="text-caption text-grey">
              Tap to open chat
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="chat-main">

        <div class="chat-header">
          <!-- <v-avatar size="36">
            <v-img :src="selectedUser?.avatar || 'https://i.pravatar.cc/150?img=3'" />
          </v-avatar> -->

          <div class="ml-3">
            <div class="font-weight-medium">
              {{ selectedUser?.name || selectedUser?.fullName || 'Select Chat' }}
            </div>
            <div class="text-caption text-grey">
              Online
            </div>
          </div>
        </div>

        <div class="chat-messages" ref="messageBox">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="message-wrapper"
            :class="msg.senderid === currentUserId ? 'me' : 'other'"
          >
            <div class="message-bubble">
              {{ msg.content }}
            </div>

            <div class="message-time">
              {{
                new Date(msg.createdAt || msg.created_at)
                  .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }}
            </div>
          </div>
        </div>

        <div class="chat-input">
          <v-text-field
            v-model="newMessage"
            placeholder="Type a message..."
            variant="solo"
            flat
            hide-details
            density="comfortable"
            @keyup.enter="sendMessage"
          />

          <v-btn
            icon
            color="primary"
            @click="sendMessage"
          >
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </div>

      </v-main>
    </v-layout>
  </v-app>
</template>
<style scoped>

.chat-sidebar {
  border-right: 1px solid #f0f0f0;
}

.chat-user {
  transition: all 0.2s ease;
  border-radius: 12px;
  margin: 6px 8px;
}

.chat-user:hover {
  background-color: #f5f5f5;
}

.chat-user.active {
  background-color: #e3f2fd;
}

.chat-main {
  display: flex;
  flex-direction: column;
  background: #f7f9fc;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 16px;
  background: white;
  border-bottom: 1px solid #f0f0f0;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.message-wrapper {
  max-width: 60%;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}

.message-wrapper.me {
  align-self: flex-end;
  text-align: right;
}

.message-wrapper.other {
  align-self: flex-start;
}

.message-bubble {
  padding: 10px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.4;
}

.message-wrapper.me .message-bubble {
  background-color: #1976d2;
  color: white;
  border-bottom-right-radius: 4px;
}

.message-wrapper.other .message-bubble {
  background-color: white;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.message-time {
  font-size: 11px;
  margin-top: 4px;
  opacity: 0.6;
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 16px;
  background: white;
  border-top: 1px solid #f0f0f0;
  gap: 10px;
}

</style>






<!-- <script setup>
import { ref, nextTick, onMounted,computed } from 'vue'
import { useUserDetails } from '@/stores/score'
import { useChatStore } from '@/stores/chatstore'
const store = useUserDetails()
import { all } from 'axios'
// const allposts = ref()
const chatdetails = useChatStore()
const Allmessages = ref([])
onMounted(async () => {
    const allposts = await chatdetails.getallchats()
    console.log("allposts : ",allposts)
    Allmessages.value = allposts.data.data
    console.log("Allmessages.value : ",Allmessages.value)
})

const currentUserId = store.currentuser.data.id
console.log("currentUserId : ",currentUserId)
const users = ref()
console.log(Allmessages.value)
const uniqueUsers = computed(() => {
  const chatUsers = Allmessages.value.map(msg =>
    msg.senderid === currentUserId
      ? msg.receiver
      : msg.sender
  )
  return Array.from(
    new Map(chatUsers.map(user => [user.id, user])).values()
  )
})

 const selectedUser = ref(uniqueUsers.value[0])

// const messages = ref([
//   { text: 'Hi', sender: 'other', time: '10:00 AM' },
//   { text: 'Hey, how are you?', sender: 'me', time: '10:01 AM' },
//   { text: 'Doing great.', sender: 'other', time: '10:02 AM' }
// ])
const message = ref()
async function personalchat(id){
    message.value = await chatdetails.getpersonalchat(id)
    console.log("personalchat in personal chat function : ",message.value)
}
// personalchat(1)
// console.log("Personal Messages : ",message.value)
const newMessage = ref('')
const messageBox = ref(null)

const sendMessage = async () => {
  if (!newMessage.value.trim()) return

//   message.value.push({
//     text: newMessage.value,
//     sender: 'me',
//     time: new Date().toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit'
//     })
 // })

  newMessage.value = ''

  await nextTick()
  messageBox.value.scrollTop = messageBox.value.scrollHeight
}
</script> -->