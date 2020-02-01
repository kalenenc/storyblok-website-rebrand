<style>
.bold {
  font-weight: bold;
}

.underline {
  text-decoration: underline;
}

.underline.strike {
  text-decoration: underline line-through;
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
  props: ['marksArray'],
  components: {},

  data() {
    return {
      elementType: 'span',
      classStr: '',
      linkHref: ''
    }
  },

  render(createElement) {

    this.parseMarks();

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
            this.elementType = 'a';
            this.linkHref = mark.attrs.href; // Might need to change later to just sending back entire object
            break;
          case 'code':
            this.elementType = 'code';
            break; 
          default:
            classArr.push(mark.type);
            break;
        }
      })
      this.classStr = classArr.join(' ');
    },

  }
}
</script>
