import Vue from 'vue'
import DefaultPage from '~/components/DefaultPage.vue'
import AppNavigation from '~/components/AppNavigation.vue'
import AppFooter from '~/components/AppFooter.vue'
import IntroSection from '~/components/IntroSection.vue'
import ContactForm from '~/components/ContactForm.vue'
import RichTextFormatter from '~/components/RichText/RichTextFormatter.vue'
import RichTextMarksParser from '~/components/RichText/RichTextMarksParser.vue'
import RichTextParser from '~/components/RichText/RichTextParser.vue'
import RichListParser from '~/components/RichText/RichListParser.vue'
import RichContentParser from '~/components/RichText/RichContentParser.vue'
import DynamicLink from '~/components/DynamicLink.vue'

// Internal Components
Vue.component('app-navigation', AppNavigation)
Vue.component('app-footer', AppFooter)
Vue.component('rich-text-formatter', RichTextFormatter)
Vue.component('rich-text-marks-parser', RichTextMarksParser)
Vue.component('rich-text-parser', RichTextParser)
Vue.component('dynamic-link', DynamicLink)
Vue.component('rich-list-parser', RichListParser);
Vue.component('rich-content-parser', RichContentParser)

// Storyblok components
Vue.component('blok-default--page', DefaultPage)
Vue.component('blok-intro--section', IntroSection)
Vue.component('blok-contact--form', ContactForm)