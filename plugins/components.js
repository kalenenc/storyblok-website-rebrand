import Vue from 'vue'
import DefaultPage from '~/components/DefaultPage.vue'
import AppNavigation from '~/components/AppNavigation.vue'
import AppFooter from '~/components/AppFooter.vue'
import IntroSection from '~/components/IntroSection.vue'
import ContactForm from '~/components/ContactForm.vue'
import RichTextFormatter from '~/components/RichText/RichTextFormatter.vue'
import RichTextParagraphParser from '~/components/RichText/RichTextParagraphParser.vue'
import DynamicLink from '~/components/DynamicLink.vue'

// Internal Components
Vue.component('app-navigation', AppNavigation)
Vue.component('app-footer', AppFooter)
Vue.component('rich-text-formatter', RichTextFormatter)
Vue.component('rich-text-paragraph-parser', RichTextParagraphParser)
Vue.component('dynamic-link', DynamicLink)

// Storyblok components
Vue.component('blok-default--page', DefaultPage)
Vue.component('blok-intro--section', IntroSection)
Vue.component('blok-contact--form', ContactForm)