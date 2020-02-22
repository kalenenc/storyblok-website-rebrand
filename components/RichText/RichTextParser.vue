<template>
  <!-- @TODO: Remove this div -->
  <component :is="determineTextType(contentItem)">

    <template v-for="(textItem, index) in contentItem.content">
      <rich-text-marks-parser 
        v-if="textItem.marks"
        :key="index" 
        :marksArray="textItem.marks">{{textItem.text}}</rich-text-marks-parser>
      <template v-else>{{textItem.text}}</template>
    </template>
  </component>

</template>

<style>
</style>

<script>

import RichTextMarksParser from './RichTextMarksParser.vue'


export default {
  props: ['contentItem'],
  components: {
    RichTextMarksParser
  },


  methods: {

    handleImage() {

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

  // Steps:
  // 1. Loop through all the different content types
  // 2. Check if it's text or image
  // 3. If it's text, check to see if there are any marks
  // 4. If there are any marks, see what they are
  // 5. Make a case statment for the following marks:
        // - bold <span class="bold"></span>
        // - italics <span class="italic"></span>
        // - underline <span class="underline"></span>
        // - inline code <code></code>
        // - link <a href=""></a>
        // - all of the above, or a mixture of any of them
  // 6. Append them all and spit out the final result

}
</script>
