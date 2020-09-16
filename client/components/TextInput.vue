<template>
<div class="mb-3">
  <input 
  :type="type" 
  :name="name" 
  :class="customClass" 
  :value="value"
  @focus="$emit('focus')"
  @blur="$emit('blur')"
  @change="$emit('input', $event.target.value)"
  :placeholder="placeholder"
  @input="$emit('input', $event.target.value)"
  >  
    <span v-if="error" class="text-xs text-red-500">
        {{error}}
    </span>
</div>

</template>

<script>
export default {
    inheritAttrs: false,
    props: {
        placeholder: {
            type: String,
            required: false,
            default: 'text'
        },
        type: {
            type: String,
            required: false,
            default: 'text'
        },
        customClass: {
            type: String,
            required: false,
            default: 'w-full bg-gray-200 py-3 focus:outline-none taxt-xs text-gray-500 p-3 mb-5'
        },
        value: {
            type: null,
            required: false,
            default: ''
        },
        name: {
            type: String,
            required: false,
            default: ''
        },
        error: {
            type: String,
            required: false
        }
    }
}
</script>