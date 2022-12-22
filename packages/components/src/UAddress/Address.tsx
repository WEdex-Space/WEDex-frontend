import { CopyOutlined, ShareOutlined } from '@wedex/icons'
import { shortenAddress } from '@wedex/utils/src'
import copy from 'copy-to-clipboard'
import { defineComponent, toRefs, ref } from 'vue'
import type { PropType } from 'vue'
import { UTooltip } from '../UTooltip'
import { ExtractPropTypes } from '../utils'

import './address.css'

export const UAddressProps = {
  prefixLength: {
    type: Number,
    default: 8
  },
  suffixLength: {
    type: Number,
    default: 10
  },
  autoSlice: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    required: true
  },
  type: {
    type: String as PropType<'tx' | 'address'>,
    default: 'tx'
  },
  blockchainExplorerUrl: {
    type: String
  }
} as const

export type UAddressPropsType = ExtractPropTypes<typeof UAddressProps>

const UAddress = defineComponent({
  name: 'UAddress',
  props: UAddressProps,
  setup(props, { attrs }) {
    const showTooltipRef = ref<boolean>(false)

    const { address, autoSlice } = toRefs(props)

    return () => {
      let addressVal = address.value
      if (!addressVal) {
        return ''
      }

      if (autoSlice.value) {
        addressVal = shortenAddress(address.value)
        // addressVal = address.value.replace(/[A-Za-z0-9]/gi, (c: string, i) => {
        //   if (i > prefixLength.value && i < len - suffixLength.value) {
        //     return '*'
        //   }
        //   return c
        // })
      }

      return (
        <div class="u-address">
          <span class="u-address__text">{addressVal}</span>

          <span
            class="u-address__icon"
            onClick={e => {
              e.stopPropagation()
              showTooltipRef.value = copy(address.value)
            }}
            onMouseleave={e => {
              e.stopPropagation()
              showTooltipRef.value = false
            }}
          >
            <UTooltip show={showTooltipRef.value}>
              {{
                trigger: () => <CopyOutlined class="h-4 w-4" />,
                default: () => 'Copied!'
              }}
            </UTooltip>
          </span>

          {props.blockchainExplorerUrl && (
            <a
              class="u-address__icon"
              target="_blank"
              href={`${props.blockchainExplorerUrl.replace(/\/$/, '')}/${address.value}`}
            >
              <ShareOutlined class="h-4 w-4" />
            </a>
          )}
        </div>
      )
    }
  }
})

export default UAddress

export const copyToClipboard = copy
