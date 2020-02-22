
<template>
  <div>
    <ul>
      <template v-for="(obj, index) in blurb.content">


        <!-- Maybe we can lump:
            - paragraph
            - heading
            - bullet list
            - ordered list
            - blockquote 

          ... together -->

        <template v-if="containsText(obj.type)">
          <rich-text-parser 
            :contentObj="obj" 
            :key="index">
          </rich-text-parser>          
        </template>

        <template v-else-if="obj.type === 'heading'">
          <template v-html="determineHeading(obj)"></template>
        </template>

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

        <template v-else-if="obj.type === 'horizontal_rule'">
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
      return textType === 'paragraph' || textType === 'heading' || textType === 'code_block' || textType === 'bullet_list' || textType === 'ordered_list' || textType === 'blockquote'
    },

    determineHeading(obj) {
      // @TODO: Going to need to handle scenario where heading has marks on it... might need to abstract that out from
      // the paragraph parser component
      // <!-- { "type": "heading", "attrs": { "level": 1 }, "content": [ { "text": "this is a heading", "type": "text" } ] } -->
      const level = obj.attrs.level
      const heading = `<h${level}></h${level}>`
      return heading
    }
  }


}
</script>