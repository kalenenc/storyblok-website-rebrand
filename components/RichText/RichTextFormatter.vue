<template>
  <div>

    <ul>
      <template v-for="(obj, index) in blurb.content">

        <template v-if="obj.type === 'paragraph'">
          <rich-text-paragraph-parser 
            :content="obj.content" 
            :key="index">
          </rich-text-paragraph-parser>
        </template>

        <template v-else-if="obj.type === 'heading'">
          <!-- { "type": "heading", "attrs": { "level": 1 }, "content": [ { "text": "this is a heading", "type": "text" } ] } -->
          <template v-html="determineHeading(obj)"></template>
          {{obj}}
          <!-- <rich-text-paragraph :content="obj.content" :key="index"></rich-text-paragraph> -->
        </template>

        <!-- <template v-if="obj.type === 'code_block'">
          <rich-text-paragraph :content="obj.content" :key="index"></rich-text-paragraph>
        </template>

        <template v-else-if="obj.type === 'heading'">
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

import RichTextParagraphParser from './RichTextParagraphParser.vue'

export default {
  props: ['blurb'],
  components: {
    RichTextParagraphParser
  },

  computed: {

  },

  methods: {
    determineHeading(obj) {
      // @TODO: Going to need to handle scenario where heading has marks on it... might need to abstract that out from
      // the paragraph parser component
      // <!-- { "type": "heading", "attrs": { "level": 1 }, "content": [ { "text": "this is a heading", "type": "text" } ] } -->
      const level = obj.attrs.level
      return `<h${level}></h${level}>`
    }
  }


}
</script>