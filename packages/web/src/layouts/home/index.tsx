import { defineComponent } from 'vue'
import { RouterView, useRoute } from 'vue-router'

const HomeLayout = defineComponent({
  name: 'HomeLayout',
  setup() {
    const route = useRoute()

    return () => <RouterView key={route.fullPath} class="homePage" />
  }
})

export default HomeLayout
