import { defineComponent, ref, watch, provide } from 'vue'
import DataDetail from '@/blocks/DataDetail'
import DataView from '@/blocks/DataView'
import ExtentionBar from '@/blocks/ExtentionBar'

const LandingPage = defineComponent({
  name: 'LandingPage',
  setup(props, ctx) {
    const leftClass = ref(`panelExpand`)
    const centerClass = ref('w-0')
    const rightClass = ref(`rightPanelStatic`)

    const currentExpand = ref<'left' | 'center' | 'right'>('left')

    watch(
      () => currentExpand.value,
      current => {
        switch (current) {
          case 'left':
            leftClass.value = 'panelExpand'
            setTimeout(() => {
              centerClass.value = 'w-0'
            }, 300)
            rightClass.value = 'rightPanelStatic'
            break
          case 'center':
            leftClass.value = 'leftPanelStatic'
            centerClass.value = 'flex-1'
            rightClass.value = 'rightPanelStatic'
            break
          case 'right':
            leftClass.value = 'leftPanelStatic'
            centerClass.value = 'w-0'
            rightClass.value = 'panelExpand'
            break
          default:
            console.warn('currentExpand error', current)
        }
      },
      {
        immediate: true
      }
    )

    provide('currentExpand', currentExpand)

    return {
      leftClass,
      centerClass,
      rightClass,
      currentExpand
    }
  },
  render() {
    const pannelClass = 'transition-all overflow-hidden relative'

    return (
      <div class="relative" style={{ paddingRight: '324px' }}>
        <div class="flex h-full">
          <DataView class={`${pannelClass} ${this.leftClass}`} />
          <DataDetail class={`${pannelClass} ${this.centerClass}`} />
        </div>
        <ExtentionBar
          class={`!absolute right-0 top-0 bottom-0 ${pannelClass} ${this.rightClass}`}
        />
      </div>
    )
  }
})

export default LandingPage
