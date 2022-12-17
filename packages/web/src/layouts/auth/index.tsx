import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'

const AuthLayout = defineComponent({
  name: 'AuthLayout',
  setup() {
    return () => <RouterView />
  }
})

export default AuthLayout
