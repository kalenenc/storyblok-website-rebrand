<template>
  <component 
    :is="elementType" 
    :class="classStr" 
    :href="linkHref"
    :to="toLocation"
    >
    <slot></slot>
  </component>
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

export default {
  props: ['marksArray'], 

  data() {
    return {
      elementType: 'span',
      classStr: '',
      linkHref: null,
      toLocation: null
    }
  },

  mounted() {
    this.parseMarks();
  },

  methods: {

    getLinkType(linkType) {
      return linkType === 'url' ? 'a' : 'nuxt-link'
    },

    getElementType(mark) {
      return mark.type === 'code'
        ? 'code'
        : mark.type === 'link'
          ? this.getLinkType(mark.attrs.linktype)
          : this.elementType
    },

    setAnchor(mark) {
      if(this.elementType === 'nuxt-link') {
        const isMarks = mark && mark.attrs && mark.attrs.href;
        this.toLocation = isMarks ? mark.attrs.href : this.toLocation
        this.linkHref = this.toLocation;
      } else if(this.elementType === 'a') {
        this.linkHref = mark.attrs.href;
      } 
    },

    parseMarks() {
      let classArr = [];

      this.$props.marksArray.forEach((mark) => {
        this.elementType = this.getElementType(mark);
        this.setAnchor(mark);
        const isStyledEl = mark.type !== 'link' && mark.type !== 'code'
        if (isStyledEl) classArr.push(mark.type);
      })
      this.classStr = classArr.join(' ');
    },

  }
}
</script>