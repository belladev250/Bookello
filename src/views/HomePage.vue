<template>
  <div class="bg-gray-100 min-h-screen text-gray-800">
 <NavbarPage/>

    <!-- HERO -->
    <section class="bg-gradient-to-r from-navy to-[#31c8ff] text-white text-center py-28 px-4">
      <h1 class="text-4xl font-extrabold mb-4">Explore. Book. Enjoy.</h1>
      <p class="text-lg mb-6">Accomodation, Tours, Chefs & More — all in one platform.</p>
      <router-link to="#services" class="bg-white text-primary font-semibold px-6 py-3 rounded shadow hover:scale-105 transition">
        Start Booking
      </router-link>
    </section>

    <!-- SERVICE CATEGORIES -->
    <section id="services" class="py-16 px-4 max-w-6xl mx-auto">
      <h2 class="text-2xl font-bold text-center mb-10">Choose Your Experience</h2>

      <div class="  grid grid-cols-2 md:grid-cols-5 gap-6">
        <div v-for="cat in categories" :key="cat.name" class="text-center bg-white hover:shadow-md p-4 border rounded cursor-pointer transition">
          <div class="text-5xl mb-3">{{ cat.emoji }}</div>
          <h3 class="text-lg font-semibold">{{ cat.name }}</h3>
        </div>
      </div>
    </section>

    <!-- FEATURED LISTINGS -->
    <section class="py-12 px-4 max-w-6xl mx-auto">
      <h2 class="text-xl font-bold mb-6">Featured Listings</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  <div
    v-for="item in services"
    :key="item.id"
    class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
  >
    <img
      :src="item.image || 'https://picsum.photos/600/400'"
      class="w-full h-52 object-cover"
      alt="Listing image"
    />
    <div class="p-4 space-y-2">
      <h3 class="text-xl font-bold text-gray-800">{{ item.title || item.name }}</h3>
      <p class="text-gray-600 text-sm line-clamp-2">{{ item.description }}</p>
      <div class="flex items-center text-sm text-gray-500">
        <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {{ item.location || 'Location not specified' }}
      </div>
      <div class="flex justify-between items-center mt-3">
        <span class="text-blue-600 font-bold text-base"> ${{ extractPrice(item.pricing) }}</span>
        <router-link
          :to="`/book/${item.id}`"
          class="text-white bg-blue-600 hover:bg-blue-700 text-sm px-4 py-2 rounded"
        >
          Book Now
        </router-link>
      </div>
    </div>
  </div>
</div>

    </section>

    <!-- FOOTER -->
  
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'
import NavbarPage from '@/components/NavbarPage.vue'


const services = ref([])


const categories = [
  { name: 'Accomodation', emoji: '🏠' },
  { name: 'Tours', emoji: '🗺️' },
  { name: 'Boats', emoji: '🚤' },
  { name: 'Chefs', emoji: '👨‍🍳' },
  { name: 'Photographers', emoji: '📸' },
 
]

onMounted(async () => {
  try {
    const colRef = collection(db, 'services') 
    const snapshot = await getDocs(colRef)
    services.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error("Error fetching services:", error)
  }
})

const extractPrice = (pricing) => {
  if (typeof pricing === 'string') {
    const match = pricing.match(/\$?\d+/)
    return match ? match[0] : '0'
  }
  return '0'
}

</script>

<style scoped>
.text-primary {
  color: #2b3499;
}
.bg-primary {
  background-color: #2b3499;
}
.bg-primary-dark {
  background-color: #1f2575;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

</style>
