<template>
  <div class="max-w-4xl mx-auto p-6 bg-gray-100
   rounded shadow mt-10">
    <h1 class="text-2xl font-bold mb-6 text-navy">Add a New Service</h1>

    <div class="mb-4">
      <label class="block font-medium text-gray-700 mb-2">Select Service Type</label>
      <select v-model="type" class="w-full border-gray-300 rounded p-2 focus:ring focus:ring-blue-500">
        <option value="">-- Select --</option>
        <option value="accommodation">Accommodation</option>
        <option value="tour">Tour Package</option>
        <option value="car rental">Car Rental</option>
        <option value="chefs">Chefs</option>
        <option value="spa">spa & massage</option>
        <option value="manpower"> Manpower & Household Services</option>
       

      </select>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block mb-1 font-medium">Title</label>
        <input v-model="title" class="w-full border rounded p-2" placeholder="Service title" />
      </div>

     <!-- Location Fields -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>
    <label class="block mb-1 font-medium">Street Address</label>
    <input v-model="street" class="w-full border rounded p-2" placeholder='KG 543 St' />
  </div>
  <div>
    <label class="block mb-1 font-medium">location name</label>
    <input v-model="city" class="w-full border rounded p-2" placeholder='Kigali' />
  </div>
  <div>
    <label class="block mb-1 font-medium">Country</label>
    <input v-model="country" class="w-full border rounded p-2" placeholder="Rwanda" />
  </div>
</div>



    </div>

    <div class="mt-4">
      <label class="block mb-1 font-medium">Description</label>
      <textarea v-model="description" rows="4" class="w-full border rounded p-2" placeholder="100-300 words"></textarea>
    </div>

    <div v-if="type === 'accommodation'" class="mt-6 space-y-4">
      <h2 class="text-lg font-semibold text-blue-800">Accommodation Details</h2>

     <!-- Availability Calendar -->
<div>
  <label class="block mb-1 font-medium">Availability Dates</label>
  <Datepicker
  v-model="selectedRange"
   range
  :format="'yyyy-MM-dd'"
  class="w-full border rounded p-2"
/>

  <button
    @click="addAvailabilityRange"
    class="mt-2 bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
  >
    + Add This Range
  </button>

  <div class="mt-2 text-gray-700 text-sm space-y-1">
    <div
      v-for="(range, index) in availabilityDates"
      :key="index"
      class="flex justify-between items-center bg-white p-2 rounded border"
    >
      <span>{{ range.start }} → {{ range.end }}</span>
      <button @click="removeAvailabilityRange(index)" class="text-red-500 text-xs">Remove</button>
    </div>
  </div>
</div>


      <div>
        <label class="block mb-1 font-medium">Rooms & Prices</label>
        <div v-for="(r, i) in rooms" :key="i" class="flex gap-2 mb-2">
          <input v-model="r.name" placeholder="Room name" class="border rounded p-2 flex-1" />
          <input v-model="r.price" type="number" placeholder="Price ($)" class="border rounded p-2 w-24" />
          <button @click="removeRoom(i)" class="text-red-500">✕</button>
        </div>
        <button @click="addRoom" class="text-blue-600 hover:underline text-sm">+ Add another room</button>
      </div>

      <div>
        <label class="block mb-1 font-medium">Select Amenities</label>
        <Multiselect
          v-model="amenities"
          :options="groupedAmenities"
          :multiple="true"
          :group-values="'options'"
          :group-label="'group'"
          placeholder="Select amenities"
          track-by="label"
          label="label"
          class="w-full"
        />
      </div>

      <div>
        <label class="block mb-1 font-medium">Google Maps Link</label>
        <input v-model="mapLink" class="w-full border rounded p-2" placeholder="Paste Google Maps URL" />
      </div>

      <div>
        <label class="block mb-1 font-medium">Upload Photos (max 6)</label>
        <input type="file" accept="image/*" multiple @change="handleImageUpload" class="hidden" ref="fileInput" />
        <button @click="fileInput.click()" class="bg-blue-600 text-white px-4 py-2 rounded">Choose Photos</button>
        <div class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          <img v-for="(img,i) in previewImages" :key="i" :src="img" class="w-full h-32 object-cover rounded border" />
        </div>
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

    <div class="mt-8">
      <button @click="submit" class="bg-navy text-white px-6 py-3 rounded hover:bg-blue-900 transition" :disabled="loading">
        {{ loading ? 'Saving...' : 'Submit Service' }}
      </button>
    </div>
  </div>
</template>

<script setup>


import { ref } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '@/firebase'
import { useRouter } from 'vue-router'

const router = useRouter()
const type = ref('')
const title = ref('')
const description = ref('')
const amenities = ref([])
const street = ref('')
const city = ref('')
const country = ref('')
const rooms = ref([{ name: '', price: '' }])
const mapLink = ref('')
const previewImages = ref([])
const imageUrls = ref([])
const fileInput = ref(null)
const pricing = ref('')
const itinerary = ref('')
const includes = ref('')
const loading = ref(false)
const selectedRange = ref(null)
const availabilityDates = ref([])




 function addAvailabilityRange() {
 
  if (Array.isArray(selectedRange.value) && selectedRange.value.length === 2) {
    const [start, end] = selectedRange.value
    if (start && end) {
      availabilityDates.value.push({
        start: formatDate(start),
        end: formatDate(end),
      })
      selectedRange.value = [] // Clear the picker
    } else {
      alert('Please select a valid date range.')
    }
  } else {
    alert('Please select a valid date range.')
  }
}

function removeAvailabilityRange(index) {
  availabilityDates.value.splice(index, 1)
}

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toISOString().split('T')[0] // format to yyyy-MM-dd
}

const groupedAmenities = [
  {
    group: '🛏️ Inside the Apartment',
    options: [
      { label: 'Fully furnished living room' },
      { label: 'Smart TV with channels' },
      { label: 'High-speed Wi-Fi' },
      { label: 'Private balcony' },
      { label: 'Premium bedding' },
      { label: 'Closets and storage' },
      { label: 'Workstation / laptop desk' },
    ]
  },
  {
    group: '🍽️ Kitchen',
    options: [
      { label: 'Fully equipped kitchen' },
      { label: 'Refrigerator & freezer' },
      { label: 'Microwave' },
      { label: 'Electric stove & oven' },
      { label: 'Electric kettle' },
      { label: 'Cutlery, plates, glasses' },
      { label: 'Dining table' },
    ]
  },
  {
    group: '🛁 Bathroom',
    options: [
      { label: 'Hot water shower' },
      { label: 'Fresh towels' },
      { label: 'Toiletries provided' },
      { label: 'Mirror & storage cabinet' },
    ]
  },
  {
    group: '🧺 Cleaning & Laundry',
    options: [
      { label: 'Daily housekeeping' },
      { label: 'Laundry service' },
      { label: 'Iron & ironing board' },
    ]
  },
  {
    group: '🛡️ Safety & Security',
    options: [
      { label: '24/7 security guard' },
      { label: 'CCTV cameras' },
      { label: 'Gated compound' },
      { label: 'Fire extinguisher' },
      { label: 'First aid kit' },
    ]
  },
  {
    group: '🚗 Parking & Transport',
    options: [
      { label: 'Free private parking' },
      { label: 'Airport pickup available' },
      { label: 'Car rental help' },
      { label: 'Safe moto-taxi access' },
    ]
  },
  {
    group: '🌿 Extra Features',
    options: [
      { label: 'Peaceful environment' },
      { label: 'Scenic views' },
      { label: 'Near shops & hospitals' },
      { label: 'Family friendly' },
      { label: 'Long-stay discounts' },
    ]
  }
]

function addRoom() { rooms.value.push({ name: '', price: '' }) }
function removeRoom(i) { rooms.value.splice(i, 1) }

async function handleImageUpload(e) {
  const files = Array.from(e.target.files).slice(0, 6)
  previewImages.value = files.map(f => URL.createObjectURL(f))
  imageUrls.value = []
  for (const f of files) {
    const form = new FormData()
    form.append('file', f)
    form.append('upload_preset', 'bookello_pics')
    const res = await fetch('https://api.cloudinary.com/v1_1/dpfkxvnln/image/upload', { method: 'POST', body: form })
    const data = await res.json()
    imageUrls.value.push(data.secure_url)
  }
}

async function submit() {
  loading.value = true
  const user = auth.currentUser
  const base = { 
  providerId: user.uid,
  type: type.value,
  title: title.value,
  description: description.value, 
  location: `${street.value}, ${city.value}, ${country.value}`,
  createdAt: serverTimestamp(), images: imageUrls.value }
  let serviceData = {}
  if (type.value === 'accommodation') {
    serviceData = { ...base, rooms: rooms.value.filter(r => r.name && r.price), amenities: amenities.value.map(a => a.label), availability: availabilityDates.value, mapLink: mapLink.value }
  } else {
    serviceData = { ...base, itinerary, includes, pricing }
  }
  await addDoc(collection(db, 'services'), serviceData)
  router.push('/dashboard/partner')
  loading.value = false
}
</script>

<style scoped>
.text-navy { color: #1e3a8a }
.bg-navy { background-color: #1e3a8a }
</style>
