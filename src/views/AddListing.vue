<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-10">
    <h1 class="text-2xl font-bold mb-6 text-navy">Add a New Service</h1>

    <!-- Service Type Selector -->
    <div class="mb-4">
      <label class="block font-medium text-gray-700 mb-2">Select Service Type</label>
      <select v-model="type" class="w-full border-gray-300 rounded p-2 focus:ring focus:ring-blue-500">
        <option value="">-- Select --</option>
        <option value="accommodation">Accommodation</option>
        <option value="tour">Tour Package</option>
      </select>
    </div>

    <!-- Common Fields -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block mb-1 font-medium">Title</label>
        <input v-model="title" class="w-full border rounded p-2" placeholder="Service title" />
      </div>
      <div>
        <label class="block mb-1 font-medium">Location</label>
        <input v-model="location" class="w-full border rounded p-2" placeholder="e.g. Gacuriro, Kigali" />
      </div>
    </div>

    <div class="mt-4">
      <label class="block mb-1 font-medium">Description</label>
      <textarea v-model="description" rows="4" class="w-full border rounded p-2" placeholder="100-300 words"></textarea>
    </div>

    <!-- Dynamic Fields Based on Type -->
    <div v-if="type === 'accommodation'" class="mt-6 space-y-4">
      <h2 class="text-lg font-semibold text-blue-800">Accommodation Details</h2>

      <div>
        <label class="block mb-1 font-medium">Amenities (comma separated)</label>
        <input v-model="amenities" class="w-full border rounded p-2" placeholder="e.g. Wi-Fi, Pool, Breakfast" />
      </div>

      <div>
        <label class="block mb-1 font-medium">Room Types & Prices</label>
        <textarea v-model="pricing" rows="3" class="w-full border rounded p-2" placeholder="e.g. Standard: $40/night, Deluxe: $60/night"></textarea>
      </div>

      <div>
        <label class="block mb-1 font-medium">Availability Notes</label>
        <input v-model="availability" class="w-full border rounded p-2" placeholder="e.g. Open all year or June-Aug only" />
      </div>

      <div>
        <label class="block mb-1 font-medium">Google Maps Link</label>
        <input v-model="mapLink" class="w-full border rounded p-2" placeholder="Paste Google Maps URL" />
      </div>
    </div>

    <div v-if="type === 'tour'" class="mt-6 space-y-4">
      <h2 class="text-lg font-semibold text-blue-800">Tour Package Details</h2>

      <div>
        <label class="block mb-1 font-medium">Itinerary</label>
        <textarea v-model="itinerary" rows="4" class="w-full border rounded p-2" placeholder="Time breakdown of tour day"></textarea>
      </div>

      <div>
        <label class="block mb-1 font-medium">Pricing (Solo, Group)</label>
        <textarea v-model="pricing" rows="3" class="w-full border rounded p-2" placeholder="Solo: $70, Group (2-4): $50, Group (5+): $40"></textarea>
      </div>

      <div>
        <label class="block mb-1 font-medium">Included / Not Included</label>
        <textarea v-model="includes" rows="3" class="w-full border rounded p-2" placeholder="e.g. Includes: Transport, guide. Not included: tips, souvenirs"></textarea>
      </div>
    </div>

    <!-- Submit -->
    <div class="mt-8">
      <button
        @click="submit"
        class="bg-navy text-white px-6 py-3 rounded hover:bg-blue-900 transition"
        :disabled="loading"
      >
        {{ loading ? 'Saving...' : 'Submit Service' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '@/firebase'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const type = ref('')
const title = ref('')
const location = ref('')
const description = ref('')
const amenities = ref('')
const pricing = ref('')
const availability = ref('')
const mapLink = ref('')
const itinerary = ref('')
const includes = ref('')
const loading = ref(false)

const submit = async () => {
  loading.value = true
  const user = auth.currentUser

  const base = {
    providerId: user.uid,
    type: type.value,
    title: title.value,
    description: description.value,
    location: location.value,
    pricing: pricing.value,
    createdAt: serverTimestamp(),
  }

  try {
    let serviceData = {}

    if (type.value === 'accommodation') {
      serviceData = {
        ...base,
        amenities: amenities.value.split(',').map(a => a.trim()),
        availability: availability.value,
        mapLink: mapLink.value,
      }
    } else if (type.value === 'tour') {
      serviceData = {
        ...base,
        itinerary: itinerary.value,
        includes: includes.value,
      }
    }

    await addDoc(collection(db, 'services'), serviceData)
    alert('Service added successfully!')
    router.push('/dashboard/partner')
    
  } catch (e) {
    console.error(e)
    alert('Error saving service')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.text-navy {
  color: #1e3a8a;
}
.bg-navy {
  background-color: #1e3a8a;
}
</style>
