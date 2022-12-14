import { defineComponent, ref, watch, provide } from 'vue'
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

    const expandLeft = () => {
      if (currentExpand.value !== 'left') {
        prevExpand.value = currentExpand.value
        currentExpand.value = 'left'
      }
    }

    const staticLeft = () => {
      if (prevExpand.value && prevExpand.value !== 'left') {
        currentExpand.value = prevExpand.value
      }
      prevExpand.value = null
      leftClass.value = 'leftPanelStatic'
    }

    const expandRight = () => {
      if (currentExpand.value !== 'right') {
        prevExpand.value = currentExpand.value
        currentExpand.value = 'right'
      }
    }

    const openCenter = () => {
      if (currentExpand.value !== 'center') {
        prevExpand.value = currentExpand.value
        currentExpand.value = 'center'
      }
    }

    const closeCenter = () => {
      if (currentExpand.value === 'center') {
        currentExpand.value = prevExpand.value || 'left'
        prevExpand.value = null
      }
    }

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
      expandLeft,
      staticLeft,
      expandRight,
      openCenter,
      closeCenter,
      currentExpand,
      rightPanelState,
      prevExpand
    }
  },
  render() {
    const pannelClass = 'transition-all overflow-hidden relative'

    return (
      <div class="flex">
        <div class={`${pannelClass} bg-yellow-500 ${this.leftClass}`}>
          <div
            class="cursor-pointer top-0 right-0 absolute"
            onClick={() => (this.currentExpand === 'left' ? this.staticLeft() : this.expandLeft())}
          >
            {this.currentExpand === 'left' ? 'static' : 'expand'}
          </div>
          <div class="p-4">left</div>
          <div class="cursor-pointer" onClick={() => this.openCenter()}>
            list item
          </div>
        </div>
        <div class={`${pannelClass} bg-green-200 ${this.centerClass}`}>
          <div class="cursor-pointer" onClick={() => this.closeCenter()}>
            close center
          </div>
        </div>
        <ExtentionBar class={`${pannelClass} bg-indigo-500 ${this.rightClass}`} />
      </div>
    )
  }
})

export default LandingPage
