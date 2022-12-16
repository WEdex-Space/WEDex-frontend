import { defineComponent, ref, watch, provide } from 'vue'
import DataDetail from '@/components/DataDetail'
import DataView from '@/components/DataView'
import ExtentionBar from '@/components/ExtentionBar'

const LandingPage = defineComponent({
  name: 'LandingPage',
  setup(props, ctx) {
    const leftClass = ref(`flex-1`)
    const centerClass = ref('w-0')
    const rightClass = ref(`rightPanelStaticClose`)

    const currentExpand = ref<'left' | 'center' | 'right'>('left')
    const rightPanelState = ref<'static' | 'close'>('close')
    const prevExpand = ref<'left' | 'center' | 'right' | null>(null)

    watch(
      () => currentExpand.value,
      current => {
        switch (current) {
          case 'left':
            leftClass.value = 'flex-1'
            centerClass.value = 'w-0'
            if (prevExpand.value === 'right') {
              rightClass.value = 'rightPanelStatic'
            }

            break
          case 'center':
            leftClass.value = 'leftPanelStatic'
            centerClass.value = 'flex-1'
            if (prevExpand.value === 'right') {
              rightClass.value = 'rightPanelStatic'
            }
            break
          case 'right':
            leftClass.value = 'leftPanelStatic'
            centerClass.value = 'w-0'
            rightClass.value = 'flex-1'
            break
          default:
            console.warn('currentExpand error', current)
        }
      }
    )

    watch(
      () => rightPanelState.value,
      rightPanelState => {
        switch (rightPanelState) {
          case 'close':
            if (currentExpand.value === 'right') {
              currentExpand.value = prevExpand.value || 'left'
              prevExpand.value = null
            }
            rightClass.value = `rightPanelStaticClose`
            break
          case 'static':
            if (currentExpand.value === 'right') {
              currentExpand.value = prevExpand.value || 'left'
              prevExpand.value = null
            }
            rightClass.value = `rightPanelStatic`
            break
          default:
            console.warn('rightPanelState error', rightPanelState)
        }
      }
    )

    provide('currentExpand', currentExpand)
    provide('rightPanelState', rightPanelState)

    return {
      leftClass,
      centerClass,
      rightClass,
      currentExpand,
      rightPanelState,
      prevExpand
    }
  },
  render() {
    const pannelClass = 'transition-all overflow-hidden relative'

    return (
      <div class="flex">
        <DataView class={`${pannelClass} ${this.leftClass}`} />

        <DataDetail class={`${pannelClass} ${this.centerClass}`} />

        <ExtentionBar class={`${pannelClass} ${this.rightClass}`} />
      </div>
    )
  }
})

export default LandingPage
