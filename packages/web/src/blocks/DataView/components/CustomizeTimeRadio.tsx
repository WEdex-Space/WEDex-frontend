import { defineComponent, ref, PropType } from 'vue'

export default defineComponent({
  name: 'CustomizeTimeRadio',
  props: {
    value: {
      type: String as PropType<string | null>
    }
  },
  emits: ['change'],
  setup(props, ctx) {
    const tagData = ref([
      {
        name: '5m',
        value: '5m'
      },
      {
        name: '1H',
        value: '1H'
      },
      {
        name: '4H',
        value: '4H'
      },
      {
        name: '6H',
        value: '6H'
      },
      {
        name: '24H',
        value: '24H'
      }
    ])

    const handleChange = (value: any) => {
      if (value === props.value) {
        ctx.emit('change', null)
      } else {
        ctx.emit('change', value)
      }
    }

    return {
      tagData,
      handleChange
    }
  },
  render() {
    return (
      <ul class="flex items-center">
        {this.tagData.map(item => (
          <li
            class={`h-6 leading-6 px-2 bg-bg3 rounded-sm mr-1 cursor-pointer hover:bg-primary-bg ${
              this.value === item.value ? 'text-primary' : ''
            }`}
            onClick={() => this.handleChange(item.value)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    )
  }
})
