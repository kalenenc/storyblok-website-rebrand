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


export default {
  props: ['marksArray'], // an object
  components: {},

  data() {
    return {
      elementType: '',
      classStr: '',
      linkHref: ''
    }
  },

  render(createElement) {

    this.setMarkedText();
    console.log('this.$slots.default', this.$slots.default)

    return createElement(
      this.elementType,
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
  },

  methods: {
    parseMarks() {
      let classArr = [];
      let linkHref, isCode;

      this.$props.marksArray.forEach((mark) => {
        switch(mark.type) {
          case 'link':
            this.linkHref = mark.attrs.href; // Might need to change later to just sending back entire object
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
        isCode,
      }
    },

    parseMarkObj(markObj) {
      if(markObj.isCode) {
        this.elementType = 'code';
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