<template>
  <div>
    <h2 class="h-2 w-full bg-orange-500"></h2>
    <div class="w-full h-12 flex px-6 items-center justify-between">
      <router-link to="/" class="no-underline text-orange-500">Menv</router-link >
      <div class="">
        <router-link class="no-underline text-gray-600" to="/auth/login">Sign In</router-link>
        <router-link class="no-underline text-gray-600 border rounded-full border-gray-600 p-1 ml-3 px-3 py-2 hover:text-gray-900 hover:border-gray-900" to="/auth/register">Sign Up</router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>