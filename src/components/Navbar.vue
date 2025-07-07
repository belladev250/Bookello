<template>

      <nav class="flex justify-between items-center p-4 shadow">
      <div class="text-xl font-bold text-primary">
        <img src="../assets/logo.png" class="w-12 h-13" />
      </div>
      <div class="space-x-4">
        <router-link to="/login" class="text-primary font-semibold hover:underline">Login</router-link>
        <router-link to="/role-select" class="bg-primary text-white px-4 py-2 rounded hover:bg-indigo-800">
          Register
        </router-link>
      </div>
    </nav>

</template>