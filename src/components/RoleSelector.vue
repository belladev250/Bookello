<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white rounded-lg shadow-md p-8 sm:p-12 max-w-2xl w-full text-center">
      <h1 class="text-2xl sm:text-3xl font-normal text-gray-800 mb-12">
        Who are you joining as?
      </h1>

      <div class="flex flex-col sm:flex-row gap-6 justify-center mb-8">
        <div
          class="relative border-2 rounded-lg p-6 w-full sm:w-[280px] min-h-[180px] text-left cursor-pointer transition-all"
          :class="{
            'border-navy bg-orange-50': selectedRole === 'guest',
            'border-gray-200 hover:border-blue-900': selectedRole !== 'guest',
          }"
          @click="selectRole('guest')"
        >
          <div
            class="absolute top-6 right-6 w-5 h-5 rounded-full border-2"
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
          <div class="text-3xl text-blue-900 mb-6">👤</div>
          <h3 class="text-lg font-medium text-blue-900 leading-snug">
            I'm a guest, looking for services
          </h3>
        </div>

        <div
          class="relative border-2 rounded-lg p-6 w-full sm:w-[280px] min-h-[180px] text-left cursor-pointer transition-all"
          :class="{
            'border-navy bg-orange-50': selectedRole === 'provider',
            'border-gray-200 hover:border-blue-900': selectedRole !== 'provider',
          }"
          @click="selectRole('provider')"
        >
          <div
            class="absolute top-6 right-6 w-5 h-5 rounded-full border-2"
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
          <div class="text-3xl text-blue-900 mb-6">💼</div>
          <h3 class="text-lg font-medium text-blue-900 leading-snug">
            I'm a service provider, offering my services
          </h3>
        </div>
      </div>

      <button
        class="bg-navy text-white font-medium py-3 px-6 rounded-md min-w-[200px] transition-all disabled:opacity-50 disabled:pointer-events-none hover:bg-navy"
        :disabled="!selectedRole"
        @click="proceedWithRole"
      >
        {{ buttonText }}
      </button>

      <div class="mt-6 text-sm text-gray-500">
        Already have an account?
        <a href="#" @click.prevent="showLogin" class="text-navy font-medium hover:underline">Log In</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { ref, computed } from 'vue'

const selectedRole = ref(null)

const buttonText = computed(() => {
  if (selectedRole.value === 'guest') return 'Join as a Guest'
  if (selectedRole.value === 'provider') return 'Apply as a Service Provider'
  return 'Continue'
})

function selectRole(role) {
  selectedRole.value = role
}

function proceedWithRole() {
  if (selectedRole.value) {
  router.push(`/register?role=${selectedRole.value}`)
  }
}

function showLogin() {
  router.push('/login')
}
</script>



