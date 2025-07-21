<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-gradient-to-b from-navy to-blue-800 shadow-xl p-6 hidden md:block fixed h-full">
      <div class="flex items-center space-x-3">
      <img src="../assets/logo-white.png" class="w-28 h-28" alt="Booking App Logo" />
    </div>
      <ul class="space-y-3">
        <li>
          <router-link 
            to="/provider/dashboard" 
            class="flex items-center px-4 py-3 text-white font-medium rounded-lg bg-blue-700 hover:bg-blue-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            My Listings
          </router-link>
        </li>
        <li>
          <router-link 
            to="/dashboard/partner/add-service" 
            class="flex items-center px-4 py-3 text-blue-100 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Service
          </router-link>
        </li>
        <li class="border-t border-blue-600 pt-3 mt-4">
          <a 
            href="#" 
            class="flex items-center px-4 py-3 text-red-200 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition"
            @click.prevent="logout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </a>
        </li>
      </ul>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8 ml-0 md:ml-64">
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Welcome Back!</h1>
          <p class="text-gray-600 mt-1">Manage your listings and track your business</p>
        </div>
        <router-link
          to="/dashboard/partner/add-service"
          class="bg-gradient-to-r from-navy to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition flex items-center mt-4 md:mt-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Listing
        </router-link>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500">Total Listings</p>
              <h3 class="text-2xl font-bold text-gray-800 mt-1">{{ services.length }}</h3>
            </div>
            <div class="bg-blue-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500">Active Bookings</p>
              <h3 class="text-2xl font-bold text-gray-800 mt-1">24</h3>
            </div>
            <div class="bg-green-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
          <div class="flex justify-between items-start">
            <div>
              <p class="text-sm text-gray-500">Earnings</p>
              <h3 class="text-2xl font-bold text-gray-800 mt-1">$2,450</h3>
            </div>
            <div class="bg-purple-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Listings Section -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800">Your Listings</h2>
            <div class="relative">
              <select class="appearance-none bg-gray-100 border-0 text-gray-700 py-2 pl-4 pr-8 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option>All Services</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
        
        <div v-if="services.length === 0" class="p-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="mt-4 text-lg font-medium text-gray-700">No listings found</h3>
          <p class="mt-1 text-gray-500">Get started by adding your first service</p>
          <router-link
            to="/dashboard/partner/add-service"
            class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Service
          </router-link>
        </div>

        <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-6">
          <div
            v-for="item in services"
            :key="item.id"
            class="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition transform hover:-translate-y-1"
          >
            <div class="relative">
              <img 
                :src="item.images?.[0]"
                class="w-full h-48 object-cover" 
                alt="Service image"
              />
              <div class="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                {{ item.type || 'Service' }}
              </div>
            </div>
            <div class="p-4">
              <div class="flex justify-between items-start">
                <h3 class="text-lg font-bold text-gray-900">{{ item.title }}</h3>
                <span class="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">Active</span>
              </div>
              <div class="flex items-center mt-1 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-sm">{{ item.location || 'Location not specified' }}</span>
              </div>
              <p class="text-sm text-gray-700 mt-2 line-clamp-2">{{ item.description || 'No description provided' }}</p>
              
              <div class="mt-4 flex justify-between items-center">
                <!-- <div>
                  <span class="text-gray-900 font-bold">{{ item.pricing || '0' }}</span>
                  <span class="text-gray-500 text-sm"> / service</span>
                </div> -->
                <router-link 
                  :to="`/edit-listing/${item.id}`" 
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Edit
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { db, auth } from '@/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { signOut } from 'firebase/auth'

const router = useRouter()
const services = ref([])

const logout = async () => {
  try {
    await signOut(auth)
    router.push('/')
  } catch (error) {
    console.error("Logout error:", error)
  }
}

onMounted(async () => {
  const user = auth.currentUser
  if (!user) {
    router.push('/login')
    return
  }

  const q = query(collection(db, 'services'), where('providerId', '==', user.uid))
  const snap = await getDocs(q)
  services.value = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bg-navy {
  background-color: #1e3a8a;
}

.border-navy {
  border-color: #1e3a8a;
}

.text-navy {
  color: #1e3a8a;
}

.hover\:bg-navy:hover {
  background-color: #1e3a8a;
}
</style>