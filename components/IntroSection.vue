<template>
  <div v-editable="blok">
    <h1>{{blok.heading}}</h1>

    <rich-text-formatter :blurb="blok.blurb"></rich-text-formatter>

    hello from intro section
  </div>
</template>

<script>

import RichTextFormatter from './RichText/RichTextFormatter.vue'

export default {

  props: ['blok'],
  components: {
    RichTextFormatter
  }
}
</script>