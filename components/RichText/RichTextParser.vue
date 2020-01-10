<template>
  <div>

    <template v-if="content.type === 'paragraph'">
      <p v-html="buildElement(content)"></p>
    </template>

    <template v-if="content.type === 'heading'">
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
    </template>


     <!-- If has marks: -->
      

    <!-- Else: -->


    <!-- Maybe we can add a slot in here for our marks component? -->

  </div>

   
</template>

<style>
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