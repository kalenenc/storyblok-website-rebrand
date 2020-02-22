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


export default {
  props: ['marksArray'], // an object
  components: {},

  data() {
    return {
      elementType: '',
      classStr: '',
      linkHref: '',
      isStrikeAndLink: false
    }
  },

  render(createElement) {

    this.setMarkedText();

    if (this.isStrikeAndLink) {
      return createElement(
      this.elementType, //strike
        [
          createElement('a', {
            attrs: {
            href: this.linkHref || null
          },
          class: {
            [this.classStr]: this.classStr
          }
          }, this.$slots.default)
        ]
      )
    } else {
      return createElement(
      this.elementType, //strike
      {
        attrs: {
          href: this.linkHref || null
        },
        class: {
          [this.classStr]: this.classStr
        }
      },
      this.$slots.default // array of children
    )
    }
    

   
  },

  methods: {
    parseMarks() {
      let classArr = [];
      let linkHref, isCode, isStrike;

      this.$props.marksArray.forEach((mark) => {
        switch(mark.type) {
          case 'link':
            this.linkHref = mark.attrs.href; // Might need to change later to just sending back entire object
            break;
          case 'code':
            isCode = true
            break; 
          case 'strike':
            isStrike = true
            break; 
          default:
            classArr.push(mark.type);
            break;
        }
      })

      const classStr = classArr.join(' ');
      return {
        classStr,
        isCode,
        isStrike
      }
    },

    parseMarkObj(markObj) {
      if(markObj.isCode) {
        this.elementType = 'code';
        // If it's a link and a strike
      } else if(markObj.isStrike && this.linkHref) {
        this.isStrikeAndLink = true;
        this.elementType = 'strike'
        this.classStr = `${markObj.classStr}`;
      } else if(markObj.isStrike) {
        this.elementType = 'strike';
      } else if(this.linkHref) {
        this.elementType = 'a';
        this.classStr = `${markObj.classStr}`;
      } else {
        this.elementType = 'span';
        this.classStr = `${markObj.classStr}`;
      }
    },

    setMarkedText() {
      const markObj = this.parseMarks();
      this.parseMarkObj(markObj)
    },

  }
}
</script>