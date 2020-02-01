<template>
  <component :is="determineListType(listObj)">
    <template v-for="(listItem, index) in listObj.content">
      <li :key="index">
        <template v-for="(contentItem) in listItem.content">
          <template v-for="(paragraphItem, index2) in contentItem.content">
            <rich-text-marks-parser 
              v-if="paragraphItem.marks"
              :key="index2" 
              :marksArray="paragraphItem.marks">
            </rich-text-marks-parser>
            <template v-else>{{paragraphItem.text}}</template>
          </template> 
        </template>
      </li>
    </template>
  </component>
  
</template>

<script>

import RichTextMarksParser from './RichTextMarksParser.vue'

export default {
  props: ['listObj'],
  components: {
    RichTextMarksParser
  },

  computed: {

  },

  methods: {


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
