<template>
  <div class="richTextFormatter">
    <template v-for="(obj, index) in blurb.content">

      <template v-if="obj.type === 'blockquote'">
        <blockquote>
          <rich-content-parser :content="obj"></rich-content-parser>
        </blockquote>

      </template>

      <template v-else-if="obj.type === 'horizontal_rule'">
        <hr /> 
      </template>

      <template v-else="">
        <rich-content-parser :content="obj"></rich-content-parser>
      </template>


    


    </template>
  </div>
</template>

<script>

import RichTextParser from './RichTextParser.vue'
import RichListParser from './RichListParser.vue'

export default {
  props: ['blurb'],
  components: {
    RichTextParser,
    RichListParser
  },

  methods: {

    containsText(textType) {
      // Maybe we can lump paragraph, heading, bullet list, ordered list, and blok quote together 
      return textType === 'paragraph' || textType === 'heading' || textType === 'code_block' || textType === 'bullet_list' || textType === 'ordered_list' || textType === 'blockquote'
    },

    handleImage() {

    },

    handleText(contentItem) {
      return contentItem.marks ? this.handleMarks(contentItem) : contentItem.text
    },


  }


}
</script>
