<template>
<div class="mb-3">
  <textarea 
  :class="customClass" 
  :value="value"
  :name="name"
  @focus="$emit('focus')"
  @blur="$emit('blur')"
  :placeholder="placeholder"
  @input="$emit('input', $event.target.value)"
  >  </textarea>
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
        customClass: {
            type: String,
            required: false,
            default: 'w-full bg-gray-200 py-3 focus:outline-none taxt-xs text-gray-500 p-3 mb-5'
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