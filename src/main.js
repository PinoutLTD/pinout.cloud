// styles
import '~/assets/css/base.css'
import '~/assets/css/reset.css'
import '~/assets/css/variables.css'
import '~/assets/css/typography.css'
import '~/assets/css/utils.css'

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
