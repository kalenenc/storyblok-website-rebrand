<template>
  <a :href="config.href">
    <slot></slot>
  </a>
  
</template>

<script>


export default {
  //"href":"https://google.com",
  // "uuid":null,
  // "linktype":"url",
  // "target":null
  props: ['config'],
  components: {
  }

}
</script>