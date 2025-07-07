<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <template v-if="!selectedRole">
        <RoleSelector @select="selectedRole = $event" />
      </template>

      <template v-else>
        <h2 class="text-xl font-bold mb-4">
          Register as {{ selectedRole === 'provider' ? 'Service Provider' : 'Guest' }}
        </h2>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <input v-model="username" type="text" placeholder="Username" class="input" required />
          <input v-model="email" type="email" placeholder="Email" class="input" required />
          <input v-model="password" type="password" placeholder="Password" class="input" required />

          <!-- Provider Specific Fields -->
          <div v-if="selectedRole === 'provider'" class="space-y-4">
            <input v-model="country" type="text" placeholder="Country" class="input" required />

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Select Services You Provide:</label>
              <div class="flex flex-wrap gap-2">
                <label v-for="service in allServices" :key="service" class="flex items-center gap-2">
                  <input type="checkbox" :value="service" v-model="services" />
                  <span>{{ service }}</span>
                </label>
              </div>
            </div>
          </div>

          <button class="w-full bg-primary text-white py-2 rounded bg-navy">Register</button>
        </form>

        <p class="text-sm mt-4 text-gray-500">
          Already have an account?
          <router-link to="/login" class="text-accent font-semibold">Login</router-link>
        </p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import RoleSelector from '../components/RoleSelector.vue'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const selectedRole = ref('')
const email = ref('')
const password = ref('')
const username = ref('')
const country = ref('')
const services = ref([])

const allServices = ['Apartments', 'Tours', 'Boat Rentals', 'Private Chef', 'Photographer']

onMounted(() => {
  const roleFromQuery = route.query.role
  if (roleFromQuery === 'guest' || roleFromQuery === 'provider') {
    selectedRole.value = roleFromQuery
  } else {
    router.push('/') // fallback
  }
})

const handleRegister = async () => {
  const extraData = {
    username: username.value,
    country: selectedRole.value === 'provider' ? country.value : null,
    services: selectedRole.value === 'provider' ? services.value : [],
  }

  await auth.register(email.value, password.value, selectedRole.value, extraData)
  router.push(selectedRole.value === 'provider' ? '/dashboard/partner' : '/')
}
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid #ccc;
  padding: 0.75rem;
  border-radius: 6px;
}
</style>
