<template>
<nav class="bg-white border-b border-gray-200 px-4 sticky top-0 z-50">
  <div class="max-w-7xl mx-auto flex justify-between items-center">
    <!-- Logo/Brand -->
    <div class="flex items-center space-x-3">
      <img src="../assets/logo.png" class="w-28 h-28" alt="Booking App Logo" />
    </div>

    <!-- Primary Navigation -->
    <div class="hidden md:flex items-center space-x-8">
      <router-link 
        to="/" 
        class="text-gray-700 hover:text-primary font-medium transition-colors"
        active-class="text-primary border-b-2 border-primary"
      >
        Home
      </router-link>
      <router-link 
        to="/services" 
        class="text-gray-700 hover:text-primary font-medium transition-colors"
        active-class="text-navy border-b-2 border-primary"
      >
        Services
      </router-link>
      <router-link 
        to="/about" 
        class="text-gray-700 hover:text-primary font-medium transition-colors"
        active-class="text-primary border-b-2 border-primary"
      >
        About
      </router-link>
      <router-link 
        to="/contact" 
        class="text-gray-700 hover:text-primary font-medium transition-colors"
        active-class="text-primary border-b-2 border-primary"
      >
        Contact
      </router-link>
    </div>

    <!-- Auth Buttons -->
    <div class="flex items-center space-x-4">
      <router-link 
        to="/login" 
        class="text-primary font-medium px-4 py-2 rounded-lg bg-blue-50 transition-colors"
      >
        Login
      </router-link>
      <router-link 
        to="/role-selector" 
        class="bg-primary text-white font-medium px-5 py-2 rounded-lg bg-navy transition-colors shadow-sm"
      >
        Register
      </router-link>
    </div>
  </div>
</nav>
</template>