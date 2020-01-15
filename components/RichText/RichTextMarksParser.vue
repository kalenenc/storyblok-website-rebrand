<template>

    <span v-html="returnMarkedText(contentItem)"></span>

    <!-- <component :is="newTemplate"></component> -->

    
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

.strike {
  text-decoration: line-through;
}


</style>

<script>

import DynamicLink from '../DynamicLink.vue'

export default {
  props: ['contentItem'], // an object
  components: {
    DynamicLink
  },

  data() {
    return {
      newTemplate: ''
    }
  },

  mounted() {
    this.returnMarkedText(this.$props.contentItem)
  },

  computed: {
    dynamicComponent() {
      return {
        template: this.newTemplate,
        // methods: {
        //   someAction() {
        //     console.log("Action!");
        //   }
        // }
      }
    }
  },

  methods: {

    parseMarks() {
      let classArr = [];
      let linkHref, isCode;

      // check if there's marks

      if(this.$props.contentItem.marks) {
        this.$props.contentItem.marks.forEach((mark) => {
          switch(mark.type) {
            case 'link':
              linkHref = mark.attrs.href; // Might need to change later to just sending back entire object
              break;
            case 'code':
              isCode = true
              break; 
            default:
              classArr.push(mark.type);
              break;
          }
        })

        const classStr = classArr.join(' ');
        return {
          classStr,
          linkHref,
          isCode,
          contentItem: this.$props.contentItem
        }
      } 
    },

    parseMarkObj(markObj) {
      
        if(markObj.isCode) {
          // this.newTemplate = `<code>${markObj.contentItem.text}</code>`
          return `<code>${markObj.contentItem.text}</code>`
        } else if(markObj.linkHref) {
          //this.newTemplate = `<a class="${markObj.classStr}" href="${markObj.linkHref}">${markObj.contentItem.text}</a>`
          return `<a class="${markObj.classStr}" href="${markObj.linkHref}">${markObj.contentItem.text}</a>`
        } else {
          //this.newTemplate = `<span class="${markObj.classStr}">${markObj.contentItem.text}</span>`
          return `<span class="${markObj.classStr}">${markObj.contentItem.text}</span>`
        }

    },

    // Will render the html
    returnMarkedText(contentItem) {
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