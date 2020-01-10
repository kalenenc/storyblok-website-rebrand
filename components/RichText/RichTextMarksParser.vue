<template>
  <div>
    <span>
        <template v-html="returnMarkElement(contentItem)"></template>
    </span>
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
  props: ['contentItem'], // an object
  components: {
    DynamicLink
  },

  methods: {

    parseMarks() {
      let classArr = [];
      let linkHref, isStrike, isCode;
      contentItem.marks.forEach((mark) => {
        switch(mark.type) {
        case 'link':
          linkHref = mark.attrs.href; // Might need to change later to just sending back entire object
          break;
        case 'code':
          isCode = true
          break; 
        case 'strike':
          isStrike = true;
          break;
        default:
          classArr.push(mark.type)
        }
      })

      const classStr = classArr.join(' ');

      return {
        classStr,
        linkHref,
        isStrike,
        isCode,
        contentItem
      }
    },

    parseMarkObj(markObj) {
      const isLinkWithStrike = linkHref && isStrike;
      // link with strike
      if(isLinkWithStrike) {
        return `<strike class="${classStr}">
                  <a href="${linkHref}">${contentItem.text}</a>
                </strike>`;
      // Just a strike
      } else if(isStrike) {
        return `<strike class="${classStr}">${contentItem.text}</strike>`;
      // Inline code
      } else if(isCode) {
        return `<code>${contentItem.text}</code>`
      // Just a regular link
      } else if(linkHref) {
        `<a class="${classStr}" href="${linkHref}">${contentItem.text}</a>`
      // Just a span
      } else { // Just a regular link
        return `<span class="${classStr}">${contentItem.text}</span>`
      }
    },

    // Will render the html
    returnMarkElement(contentItem) {
      const markObj = this.parseMarks(contentItem);
      const element = this.parseMarkObj(markObj)
      return element;
    },

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