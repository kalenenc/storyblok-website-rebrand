<template>
  <div>

    <!-- 
      Steps:
        1. See what paragraph, heading, bullet_list, ordered_list, blockquote have in common
        2. Now think of all the marks, etc that will be included with it...
            - code
            - link
            - span - bold, underline, italics, strike
        3. Add your marks as needed
        4. Separate out into smaller components as needed
    --> 
    <template v-if="contentObj.type === 'paragraph'">
      
      <p>
        <template v-for="(contentItem, index) in contentObj.content">
          <!-- This took me forever to figure out, but apparently the way
          Vue is written, all of these class variables need to be 
          on the same line as the opening and closing tag. Otherwise,
          there is whitespace issues. -->
            <rich-text-marks-parser 
              v-if="contentItem.marks" 
              :marksArray="contentItem.marks" 
              :key="index">{{contentItem.text}}</rich-text-marks-parser>
          <template v-else>{{contentItem.text}}</template>
        </template>
      </p>
      
      <!-- 
        1. Loop through the content array - content: [{}, {}, {}] 
        2. Determine if the type is a text
        3. If it's text, send it to the rich text marks parser element
        4. If it's an image... well, you probably should do the same thing, just need to handle the image scenario from
        within the RichTextMarksParserComponent
      
      -->
      <!-- <p v-html="buildElement(content)"></p> -->
    </template>

    <!-- <template v-if="content.type === 'heading'">
      <p v-html="buildElement(content)"></p>
    </template>

    <template v-if="content.type === 'bullet_list'">
      <p v-html="buildElement(content)"></p>
    </template>

    <template v-if="content.type === 'ordered_list'">
      <p v-html="buildElement(content)"></p>
    </template>

    <template v-if="content.type === 'blockquote'">
      <p v-html="buildElement(content)"></p>
    </template>       -->


  </div>


</template>

<style>
</style>

<script>

import DynamicLink from '../DynamicLink.vue'

export default {
  props: ['contentObj'],
  components: {
    DynamicLink
  },


  methods: {

    handleImage() {

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