<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white rounded-lg shadow-md p-8 max-w-xl w-full">
      <h2 class="text-2xl font-semibold mb-4 text-blue-900">Book: {{ service?.name }}</h2>

      <form @submit.prevent="submitBooking" class="space-y-4">
        <input v-model="form.name" required type="text" placeholder="Full Name" class="input" />
        <input v-model="form.email" required type="email" placeholder="Email" class="input" />
        <input v-model="form.date" required type="date" class="input" />
        <input v-model="form.people" required type="number" placeholder="Number of people" min="1" class="input" />
        <textarea v-model="form.note" rows="3" placeholder="Additional notes (optional)" class="input"></textarea>

        <button type="submit" class="w-full bg-navy text-white font-medium py-3 rounded hover:bg-navy">
          Submit Booking
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { db } from '@/firebase'
import { doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore'

const route = useRoute()
const router = useRouter()
const service = ref(null)

const form = ref({
  name: '',
  email: '',
  date: '',
  people: 1,
  note: '',
})

onMounted(async () => {
  const docRef = doc(db, 'services', route.params.id)
  const snap = await getDoc(docRef)
  if (snap.exists()) {
    service.value = snap.data()
  }
})

const submitBooking = async () => {
  if (!service.value) return

  await addDoc(collection(db, 'bookings'), {
    ...form.value,
    serviceId: route.params.id,
    serviceName: service.value.name,
    serviceType: service.value.type,
    createdAt: serverTimestamp(),
    status: 'pending',
  })

  alert('Booking request sent!')
  router.push('/')
}
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400;
}
</style>
