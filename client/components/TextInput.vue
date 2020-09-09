<template>
<div class="mb-3">
  <input 
  :type="type" 
  :name="name" 
  class="w-full bg-gray-200 py-3 focus:outline-none taxt-xs text-gray-500 p-3 mb-5" 
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
    props: {
        placeholder: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: false,
            default: 'text'
        },
        value: {
            type: String,
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