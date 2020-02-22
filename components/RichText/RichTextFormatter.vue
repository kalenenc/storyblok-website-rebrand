
<template>
<!-- @ TODO: Remove this div  -->
  <div>
    <ul>
      <template v-for="(obj, index) in blurb.content">

        <!-- Headings and paragraphs -->
        <template v-if="containsText(obj.type)">
          <rich-text-parser 
            :contentObj="obj" 
            :key="index">
          </rich-text-parser>          
        </template>

        <!-- List item -->
      <template v-else-if="isList(obj.type)">
          <rich-list-parser :listObj="obj" :key="index"></rich-list-parser>
      </template>

      <hr v-else-if="obj.type === 'horizontal_rule'" :key="index"/>

      <!-- @TODO: Code blocks and Block quotes    -->

        <!-- <template v-if="obj.type === 'code_block'">
          <rich-text-paragraph :content="obj.content" :key="index"></rich-text-paragraph>
        </template>

        <template v-else-if="obj.type === 'bullet_list'">
          <rich-text-paragraph :content="obj.content" :key="index"></rich-text-paragraph>
        </template>

        <template v-else-if="obj.type === 'ordered_list'">
          <rich-text-paragraph :content="obj.content" :key="index"></rich-text-paragraph>
        </template>

        <template v-else-if="obj.type === 'blockquote'">
          <rich-text-paragraph :content="obj.content" :key="index"></rich-text-paragraph>
        </template>

        

    

        <template v-else-if="obj.type === 'blok'">
          <rich-text-paragraph :content="obj.content" :key="index"></rich-text-paragraph>
        </template>

        
 -->

      </template>
    </ul>
    

  
  </div>
</template>

<script>

import RichTextParser from './RichTextParser.vue'

export default {
  props: ['blurb'],
  components: {
    RichTextParser
  },

  computed: {

  },

  methods: {

    containsText(textType) {
      // Maybe we can lump paragraph, heading, bullet list, ordered list, and blok quote together 
      return textType === 'paragraph' || textType === 'heading' || textType === 'code_block' || textType === 'blockquote'
    },

    isList(type) {
      return type === 'ordered_list' || type === 'bullet_list';
    },

  

  
  }


}
</script>