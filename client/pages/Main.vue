<template>
    <div>
        <flash />
        <div class="w-full h-12 text-gray-500 bg-orange-300 flex items-center justify-center" v-if="auth && !confirmed">
            Please confirm your email address. Didn't receive an email? <span @click="resendEmailConfirm" class="cursor-pointer ml-2 border-b-2 border-gray-400 hover:text-gray-400">Click here to resend email.</span>
        </div>
        <div class="h-2 w-full bg-orange-400"></div>
        <div class="py-5 mx-10 flex justify-between items-center">
            <router-link to="/" class="no-underline text-gold">Mevn</router-link>
            <div v-if="!auth">
                <router-link class="no-underline text-gray-500" to="/auth/login">Sign In</router-link>
                <router-link class="no-underline text-gray-500 border-2 px-3 py-2 hover:text-gray-500-darkest hover:border-gray-800 rounded-full border-brown ml-3"  to="/auth/register">Join Now</router-link>
            </div>
            <div v-else>
                <span class="cursor-pointer text-gray-500 hover:text-gray-800-darkest" @click="unsetAuth">Logout</span>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import Flash from '@components/Flash.vue'

    export default {
        components: {
            Flash
        }
    }
</script>
