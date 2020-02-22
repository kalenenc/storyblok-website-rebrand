<template>

    <component :is="getListType(listObj.type)">

     <li v-for="(listItem, index) in listObj.content" :key="index">
      <template v-for="(content, index1) in listItem.content" >
        <rich-text-parser :contentObj="content" :key="index1"></rich-text-parser>
      </template>
    </li>
  </component>

   
    



</template>

<script>

import RichTextParser from './RichTextParser.vue'
import RichListParser from './RichListParser.vue'

export default {
  props: ['listObj'],
  components: {
    RichTextParser,
    RichListParser
  },

  computed: {

  },

  methods: {
    getListType(type) {
      return type === 'ordered_list' ? 'ol' : 'ul' 
    }
  }


}
</script>
