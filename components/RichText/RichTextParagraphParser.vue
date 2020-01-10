<template>
  <div>
     <!-- If has marks: -->
    <rich-text-marks-parser>

    </rich-text-marks-parser>

    <!-- Else: -->


    <p v-html="buildElement(content)"></p>
    <!-- Maybe we can add a slot in here for our marks component? -->
    <rich-text-marks-parser>

    </rich-text-marks-parser>

  </div>

   
</template>

<style>

.bold {
  font-weight: bold;
}

.underline {
  text-decoration: underline;
}

.italic {
  font-style: italic;
}


</style>

<script>

import DynamicLink from '../DynamicLink.vue'

export default {
  props: ['content'], // an array
  components: {
    DynamicLink
  },


  methods: {

    handleImage() {

    },

    handleSingleMark(contentItem) {
      switch(contentItem.marks[0].type) {
        case 'bold':
          return `<span class='bold'>${contentItem.text}</span>`;
        case 'italic':
          return `<span class='italic'>${contentItem.text}</span>`;
        case 'strike':
          return `<strike>${contentItem.text}</strike>`;
        case 'underline':
          return `<span class='underline'>${contentItem.text}</span>`;
        case 'code':
          return `<code>${contentItem.text}</code>`;
        case 'link':
          return `<a href='${contentItem.marks[0].attrs.href}'>${contentItem.text}</a>`;
        default:
          return '';
      }
    },


    // combine methods
    handleMultipleMarks(contentItem) {

      const isSpanClass = ((markType) => markType === 'bold' || markType === 'underline' || markType === 'italic' )
      const isSemanticElement = ((markType) => markType === 'strike' || markType === 'code' || markType === 'link')
      const classMarks = contentItem.marks.filter((mark) => isSpanClass(mark.type))



      const linkObj = contentItem.marks.find((mark) => mark.type === 'link')
      const containsCode = contentItem.marks.some((mark) => mark.type === 'code')
      const classArr = contentItem.marks.map((mark) => (mark.type !== 'link' && mark.type !== 'code') ? mark.type : '')
      const classStr = classArr.join(' ');

      if(containsCode) {
        return `<code>${contentItem.text}</code>`;
      } else if (linkObj) {
        return `<a href='${linkObj.href}'>${contentItem.text}</a>`;
      } else {
        return `<span class="${classStr}"></span>`
      }
    },

    handleText(contentItem) {

      // could just do a conditional here to check if contentItem.marks exists,
        // if so, run handleMultipleMarks()

      return contentItem.marks ? this.handleMarks(contentItem) : contentItem.text
    },


    handleMarks(contentItem) {
      return contentItem.marks.length < 2 
        ? this.handleSingleMark(contentItem)
        : this.handleMultipleMarks(contentItem)
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