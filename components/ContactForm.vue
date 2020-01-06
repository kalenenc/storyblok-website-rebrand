<template>
  <div v-editable="blok">
    hello from contact form
    {{blok.description}}
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>