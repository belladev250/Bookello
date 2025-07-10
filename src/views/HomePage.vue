<template>
  <div class="bg-white min-h-screen text-gray-800">
 <NavbarPage/>

    <!-- HERO -->
    <section class="bg-gradient-to-r from-navy to-[#31c8ff] text-white text-center py-28 px-4">
      <h1 class="text-4xl font-extrabold mb-4">Explore. Book. Enjoy.</h1>
      <p class="text-lg mb-6">Apartments, Tours, Chefs & More — all in one platform.</p>
      <router-link to="#services" class="bg-white text-primary font-semibold px-6 py-3 rounded shadow hover:scale-105 transition">
        Start Booking
      </router-link>
    </section>

    <!-- SERVICE CATEGORIES -->
    <section id="services" class="py-16 px-4 max-w-6xl mx-auto">
      <h2 class="text-2xl font-bold text-center mb-10">Choose Your Experience</h2>

      <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
        <div v-for="cat in categories" :key="cat.name" class="text-center hover:shadow-md p-4 border rounded cursor-pointer transition">
          <div class="text-5xl mb-3">{{ cat.emoji }}</div>
          <h3 class="text-lg font-semibold">{{ cat.name }}</h3>
        </div>
      </div>
    </section>

    <!-- FEATURED LISTINGS -->
    <section class="py-12 px-4 max-w-6xl mx-auto">
      <h2 class="text-xl font-bold mb-6">Featured Listings</h2>

      <div v-if="services.length === 0" class="text-gray-500">No listings available yet.</div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div v-for="item in services" :key="item.id" class="border rounded shadow-sm hover:shadow-lg transition">
          <img :src="item.image || 'https://via.placeholder.com/400x250'" alt="preview" class="w-full h-48 object-cover rounded-t" />
          <div class="p-4">
            <h3 class="text-lg font-semibold">{{ item.name }}</h3>
            <p class="text-sm text-gray-600">{{ item.description }}</p>
            <router-link :to="`/book/${item.id}`" class="block mt-4 text-sm font-medium text-blue-600 hover:underline">
              Book Now
            </router-link>
          </div>
        </div>
      </div>d
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
  { name: 'Apartments', emoji: '🏠' },
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
</style>
