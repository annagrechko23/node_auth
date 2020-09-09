<template>
  <div class="container w-full mx-auto">
    <div class="max-w-xs h-12 mx-auto">
      <h2 class="text-cener text-lg text-gray-500">Register</h2>
      <div class="w-full bg-white p-8 shadow mt-3 rounded-sm">
        <text-input
          name="name"
          :value="model.name"
          v-model="model.name"
          v-validate="'required'"
          :error="errors.first('name')"

          placeholder="Enter Your Name"
        />
        <text-input
          name="email"
          :value="model.email"
          v-model="model.email"
          v-validate="'required|email'"
          :error="errors.first('email')"
          placeholder="Enter Your Email"
        />
        <text-input
          name="password"
          :value="model.password"

          v-model="model.password"
          v-validate="'required|min:6'"
          :error="errors.first('password')"

          placeholder="Enter Your Password"
        />
        <button
          @click="register"
          class="w-full text-sm mt-3 py-4 bg-teal-500 text-white rounded-sm focus:outline-none hover:bg-teal-400"
        >Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
import { POST_REGISTER } from '@store/auth/actions'

export default {
  data: () => ({
    model: {
      name: '',
      email: '',
      password: '',
    },
  }),
  methods: {
    register() {
      this.$validator.validate().then(isValid => {
        if(!isValid) {
          return
        }
        this.$store.dispatch(POST_REGISTER, this.model)
      })
    }
  }
}
</script>