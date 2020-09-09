<template>
    <button
    :disabled="disabled"
          @click="$emit('click')"
          class="w-full text-sm mt-3 py-4  text-center text-white rounded-sm focus:outline-none hover:bg-teal-400"
        :class="{'bg-teal-500': !loading, 'bg-teal-300': loading}"
        >
        
        <loader class="mx-auto" v-if="loading" />
        <span v-if="!loading">{{label}}</span>
        </button>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        label: {
            type: String,
            required: true
        },
        loading: {
            type: Boolean,
             required: false,
            default: false
        }
    }
}
</script>