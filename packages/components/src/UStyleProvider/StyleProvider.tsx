import { hex2rgb } from '@wedex/utils'
import type { GlobalThemeOverrides } from 'naive-ui'
import { NConfigProvider, darkTheme } from 'naive-ui'
import { computed, defineComponent, watchEffect } from 'vue'
import type { ExtractPropTypes } from 'vue'
import '../UTypography/font.css'

export const UStyleProviderProps = {
  theme: {
    type: String,
    default: 'dark'
  }
} as const

export type UStyleProviderPropsType = ExtractPropTypes<typeof UStyleProviderProps>

const UStyleProvider = defineComponent({
  name: 'UStyleProvider',
  props: UStyleProviderProps,
  setup(props, ctx) {
    const style = document.createElement('style')

    document.head.appendChild(style)

    const ColorOverrides = computed(() => {
      return props.theme === 'dark'
        ? {
            primaryColor: '#FF9D00',
            primaryBg: 'rgba(255, 157, 0, 0.2)',
            bodyColor: '#181a1f',
            bg1: '#0C0E11',
            bg2: '#202428',
            bg3: '#282D32',
            color1: '#fff',
            color2: '#EAECEF',
            color3: '#858E9B',
            colorBorder: '#2C3138',
            colorHover: '#F0F0F0',
            colorUp: '#24F082',
            colorDown: '#F82329',
            errorColor: '#DF4F51',
            successColor: '#21B689',
            warningColor: '#F29F39',
            infoColor: '#6AE0CF'
          }
        : {
            primaryColor: '#FF9D00',
            primaryBg: 'rgba(255, 157, 0, 0.2)',
            bodyColor: '#fff',
            bg1: '#F5F5F5',
            bg2: '#FAFAFA',
            bg3: '#FCFCFC',
            color1: '#000',
            color2: '#1e2329',
            color3: '#858E9B',
            colorBorder: '#F5F5F5',
            colorHover: '#F0F0F0',
            colorUp: '#24F082',
            colorDown: '#F82329',
            errorColor: '#DF4F51',
            successColor: '#21B689',
            warningColor: '#F29F39',
            infoColor: '#6AE0CF'
          }
    })

    const naiveThemeOverrides = computed<GlobalThemeOverrides>(() => ({
      common: {
        bodyColor: ColorOverrides.value.bodyColor,
        primaryColor: ColorOverrides.value.primaryColor,
        infoColor: ColorOverrides.value.infoColor,
        successColor: ColorOverrides.value.successColor,
        warningColor: ColorOverrides.value.warningColor,
        errorColor: ColorOverrides.value.errorColor,
        primaryColorHover: ColorOverrides.value.primaryColor,
        primaryColorPressed: ColorOverrides.value.primaryColor,
        successColorHover: ColorOverrides.value.successColor,
        successColorPressed: ColorOverrides.value.successColor,
        fontSizeSmall: '12px',
        heightSmall: '24px'
      },
      Form: {
        asteriskColor: ColorOverrides.value.errorColor,
        labelFontSizeLeftSmall: '12px',
        feedbackFontSizeSmall: '12px',
        feedbackHeightSmall: '18px'
      },
      Button: {
        borderRadiusSmall: '2px',
        borderRadiusTiny: '2px'
      },
      Input: {
        border: `1px solid ${ColorOverrides.value.colorBorder}`,
        borderFocus: `1px solid ${ColorOverrides.value.primaryColor}`,
        borderHover: `1px solid transparent`,
        borderWarning: `1px solid ${ColorOverrides.value.warningColor}`,
        borderError: `1px solid ${ColorOverrides.value.errorColor}`,
        borderDisabled: `1px solid ${ColorOverrides.value.color3}`,
        placeholderColor: ColorOverrides.value.color3,
        fontSizeSmall: '12px',
        suffixTextColor: ColorOverrides.value.color3
      },
      Scrollbar: {
        color: ColorOverrides.value.primaryColor,
        colorHover: ColorOverrides.value.primaryColor
      },
      InternalSelection: {
        borderHover: `1px solid transparent`,
        placeholderColor: ColorOverrides.value.color2
      },
      Tabs: {
        tabFontWeightActive: 700,
        tabPaddingMediumBar: '7px 0'
      },
      Dropdown: {
        optionColorActive: ColorOverrides.value.colorHover
      },
      DataTable: {
        thColor: ColorOverrides.value.bg1,
        thPaddingSmall: '4px 8px',
        tdPaddingSmall: '8px',
        fontSizeSmall: '12px'
      }
    }))

    watchEffect(() => {
      const { r, g, b } = hex2rgb(ColorOverrides.value.primaryColor)
      style.innerHTML = `:root {
        --u-body-color: ${ColorOverrides.value.bodyColor};
        --u-primary-value: ${r}, ${g}, ${b};
        --u-color-1: ${ColorOverrides.value.color1};
        --u-color-2: ${ColorOverrides.value.color2};
        --u-color-3: ${ColorOverrides.value.color3};
        --u-color-border: ${ColorOverrides.value.colorBorder};
        --u-color-hover: ${ColorOverrides.value.colorHover};
        --u-primary-color: ${ColorOverrides.value.primaryColor};
        --u-primary-bg: ${ColorOverrides.value.primaryBg};
        --u-bg-1: ${ColorOverrides.value.bg1};
        --u-bg-2: ${ColorOverrides.value.bg2};
        --u-bg-3: ${ColorOverrides.value.bg3};
        --u-color-up: ${ColorOverrides.value.colorUp};
        --u-color-down: ${ColorOverrides.value.colorDown};
        --u-error-color: ${ColorOverrides.value.errorColor};
        --u-success-color: ${ColorOverrides.value.successColor};
        --u-warning-color: ${ColorOverrides.value.warningColor};
        --u-info-color: ${ColorOverrides.value.infoColor};
      }`
    })

    return () => (
      <NConfigProvider
        themeOverrides={naiveThemeOverrides.value}
        theme={props.theme === 'dark' ? darkTheme : null}
      >
        {ctx.slots.default?.()}
      </NConfigProvider>
    )
  }
})

export default UStyleProvider
