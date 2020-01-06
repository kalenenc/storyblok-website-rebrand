<template>
  <div>

    <ul>

      <template v-for="(obj, index) in blurb.content">
        


        <template v-if="obj.type === 'paragraph'">
          <rich-text-paragraph-parser :content="obj.content" :key="index"></rich-text-paragraph-parser>
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
  }


}
</script>