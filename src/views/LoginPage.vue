<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white rounded-lg shadow-md p-8 sm:p-12 max-w-md w-full text-center">
      <template v-if="!selectedRole">
        <h1 class="text-2xl sm:text-3xl font-semibold text-gray-800 mb-10">
          Who are you logging in as?
        </h1>

        <div class="flex flex-col sm:flex-row gap-6 justify-center mb-6">
          <div
            class="relative border-2 rounded-lg p-6 w-full sm:w-[240px] min-h-[160px] text-left cursor-pointer transition-all"
            :class="{
              'border-navy bg-orange-50': selectedRole === 'guest',
              'border-gray-200 hover:border-blue-900': selectedRole !== 'guest',
            }"
            @click="selectRole('guest')"
          >
            <div
              class="absolute top-4 right-4 w-5 h-5 rounded-full border-2"
              :class="{
                'bg-navy border-navy': selectedRole === 'guest',
                'bg-white border-gray-300': selectedRole !== 'guest',
              }"
            >
              <div
                v-if="selectedRole === 'guest'"
                class="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
              ></div>
            </div>
            <div class="text-2xl text-blue-900 mb-4">👤</div>
            <h3 class="text-md font-medium text-blue-900">
              Guest
            </h3>
          </div>

          <div
            class="relative border-2 rounded-lg p-6 w-full sm:w-[240px] min-h-[160px] text-left cursor-pointer transition-all"
            :class="{
              'border-navy bg-orange-50': selectedRole === 'provider',
              'border-gray-200 hover:border-blue-900': selectedRole !== 'provider',
            }"
            @click="selectRole('provider')"
          >
            <div
              class="absolute top-4 right-4 w-5 h-5 rounded-full border-2"
              :class="{
                'bg-navy border-navy': selectedRole === 'provider',
                'bg-white border-gray-300': selectedRole !== 'provider',
              }"
            >
              <div
                v-if="selectedRole === 'provider'"
                class="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
              ></div>
            </div>
            <div class="text-2xl text-blue-900 mb-4">💼</div>
            <h3 class="text-md font-medium text-blue-900">
              Service Provider
            </h3>
          </div>
        </div>
      </template>

      <template v-else>
        <h2 class="text-xl font-bold text-gray-800 mb-6">Login as {{ selectedRole }}</h2>

        <form @submit.prevent="handleLogin" class="space-y-4 text-left">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            class="w-full bg-navy text-white py-2 rounded hover:bg-blue-800"
          >
            Login
          </button>
        </form>

        <p class="text-sm mt-4 text-gray-500">
          Don't have an account?
          <router-link to="/" class="text-navy font-semibold hover:underline">Go to Homepage</router-link>
        </p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const auth = useAuthStore()

const selectedRole = ref(null)
const email = ref('')
const password = ref('')

function selectRole(role) {
  selectedRole.value = role
}

const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value)

    if (auth.role !== selectedRole.value) {
      alert(`This account is not registered as a ${selectedRole.value}`)
      return
    }

    router.push(selectedRole.value === 'provider' ? '/dashboard/partner' : '/dashboard/guest')
  } catch (err) {
    alert('Login failed: ' + err.message)
  }
}
</script>
