import { defineComponent } from 'vue'
import style from './style.module.css'

export default defineComponent({
  props: {
    nodes: {
      type: Array
    }
  },
  setup() {
    return {}
  },
  render() {
    const plusNumber = (this.nodes?.length || 0) - 5

    return (
      <div class={style.wrap}>
        {Array.isArray(this.nodes) &&
          this.nodes.slice(0, 5).map(item => <span class={style.icon}>{item}</span>)}
        {plusNumber > 0 && <span class="h-4 ml-1 text-color3 leading-4">+{plusNumber}</span>}
      </div>
    )
  }
})
