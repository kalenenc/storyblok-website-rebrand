<template>
  <div class="richTextFormatter">
    <template v-for="(obj, index) in blurb.content">

      <!-- Heading or paragraph -->
      <template v-if="isHeadingOrParagraph(obj)">
        <rich-text-parser 
          v-if="isHeadingOrParagraph(obj)"
          :contentItem="obj" 
          :key="index"></rich-text-parser>
      </template>

      <!-- List item -->
      <template v-else-if="isList(obj)">
        <rich-list-parser 
          :listObj="obj" 
          :key="index"></rich-list-parser>
      </template>
      

      <!-- Block quote -->
      <template v-else-if="obj.type === 'blockquote'">
        <!-- Do a check for paragraph or heading (later image) -->


        <!-- Code block -->

        <!-- HR -->

        <!-- Block eventually -->
  
      </template>     

      <!-- <template v-else-if="obj.type === 'blok'">
        <rich-text-paragraph :content="obj.content" :key="index"></rich-text-paragraph>
      </template>
      -->

    </template>
    

  
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

    handleImage() {

    },

    // @TODO: Eventually figure out how to get images passed in here too
    isHeadingOrParagraph(contentObj) {
      return contentObj.type === 'paragraph' || contentObj.type === 'heading';
    },

    determineListType(contentObj){
      return contentObj.type === 'bullet_list' ? 'ul' : 'ol';
    },

    isList(contentObj) {
      return contentObj.type === 'ordered_list' || contentObj.type === 'bullet_list';
    },

    determineTextType(contentObj) {
      // Determine if paragraph or heading
      return contentObj.type === 'paragraph' ? 'p' : this.getHeading(contentObj.attrs.level);
    },

    getHeading(num) {
      return `h${num}`;
    },

    handleText(contentItem) {
      return contentItem.marks ? this.handleMarks(contentItem) : contentItem.text
    },

    buildElement(contentArray) {
      let el = '';
      contentArray.forEach((contentItem)=> {
        if (contentItem.type === 'text') {
          const content = this.handleText(contentItem);
          el += content;
        } 
        else if(contentItem.type === 'image') {
          el += `<img src="${contentItem.attrs.src}" alt="${contentItem.attrs.alt}"></img>`
        } else {
          return '';
        }
      })
      return el
    }

  }


}
</script>
