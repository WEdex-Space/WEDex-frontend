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
            baseColor: '#181a1f',
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
            primaryColor: '#5331F4',
            baseColor: '#fff',
            color1: '#000',
            color2: 'rgba(0,0,0,.5)',
            color3: 'rgba(0,0,0,.3)',
            colorBorder: '#DADCE0',
            colorHover: '#F0F0F0',
            colorUp: '#3F2D99',
            colorDown: '#211B42',
            errorColor: '#DF4F51',
            successColor: '#21B689',
            warningColor: '#F29F39',
            infoColor: '#6AE0CF'
          }
    })

    const naiveThemeOverrides = computed<GlobalThemeOverrides>(() => ({
      common: {
        heightLarge: '48px',
        heightMedium: '40px',
        heightSmall: '36px',
        borderRadius: '2px',
        borderRadiusLarge: '8px',
        borderRadiusMedium: '4px',
        borderRadiusSmall: '2px',
        baseColor: ColorOverrides.value.baseColor,
        primaryColor: ColorOverrides.value.primaryColor,
        infoColor: ColorOverrides.value.infoColor,
        successColor: ColorOverrides.value.successColor,
        warningColor: ColorOverrides.value.warningColor,
        errorColor: ColorOverrides.value.errorColor,
        primaryColorHover: ColorOverrides.value.primaryColor,
        primaryColorPressed: ColorOverrides.value.primaryColor,
        successColorHover: ColorOverrides.value.successColor,
        successColorPressed: ColorOverrides.value.successColor
      },
      Form: {
        asteriskColor: ColorOverrides.value.errorColor
      },
      Button: {
        colorHoverPrimary: ColorOverrides.value.colorUp,
        borderHoverPrimary: ColorOverrides.value.colorUp,
        textColorGhostHoverPrimary: ColorOverrides.value.colorUp,
        fontWeight: 600
      },
      Pagination: {
        itemBorderHover: ColorOverrides.value.colorUp,
        itemTextColorHover: ColorOverrides.value.primaryColor
      },
      Input: {
        border: `1px solid ${ColorOverrides.value.colorBorder}`,
        borderFocus: `1px solid ${ColorOverrides.value.primaryColor}`,
        borderHover: `1px solid transparent`,
        borderWarning: `1px solid ${ColorOverrides.value.warningColor}`,
        borderError: `1px solid ${ColorOverrides.value.errorColor}`,
        borderDisabled: `1px solid ${ColorOverrides.value.color3}`,
        placeholderColor: ColorOverrides.value.color3,
        fontSizeMedium: '14px',
        fontSizeLarge: '16px',
        paddingLarge: '16px',
        heightMedium: '36px',
        suffixTextColor: ColorOverrides.value.color3
      },
      Scrollbar: {
        color: ColorOverrides.value.primaryColor,
        colorHover: ColorOverrides.value.primaryColor
      },
      Checkbox: {
        borderRadius: '2px'
      },
      Card: {
        borderRadius: '2px',
        borderColor: ColorOverrides.value.colorBorder,
        paddingMedium: '24px',
        titleTextColor: ColorOverrides.value.color2,
        titleFontSizeHuge: '16px',
        titleFontSizeMedium: '14px'
      },
      InternalSelection: {
        borderHover: `1px solid transparent`,
        placeholderColor: ColorOverrides.value.color2,
        heightMedium: '36px'
      },
      Tabs: {
        tabTextColorActiveBar: ColorOverrides.value.primaryColor,
        tabTextColorBar: ColorOverrides.value.colorUp
      },
      Tag: {
        heightLarge: '34px',
        heightMedium: '22px',
        heightSmall: '22px',
        heightTiny: '20px',
        closeIconSizeMedium: '12px'
      },
      Dropdown: {
        optionColorActive: ColorOverrides.value.colorHover
      },
      Tooltip: {
        color: 'rgba(0,0,0,.8)'
      }
    }))

    watchEffect(() => {
      const { r, g, b } = hex2rgb(ColorOverrides.value.primaryColor)
      style.innerHTML = `:root {
        --u-base-color: ${ColorOverrides.value.baseColor};
        --u-primary-value: ${r}, ${g}, ${b};
        --u-color-1: ${ColorOverrides.value.color1};
        --u-color-2: ${ColorOverrides.value.color2};
        --u-color-3: ${ColorOverrides.value.color3};
        --u-color-border: ${ColorOverrides.value.colorBorder};
        --u-color-hover: ${ColorOverrides.value.colorHover};
        --u-primary-color: ${ColorOverrides.value.primaryColor};
        --u-up-color: ${ColorOverrides.value.colorUp};
        --u-down-color: ${ColorOverrides.value.colorDown};
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
