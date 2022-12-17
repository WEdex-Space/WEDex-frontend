import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{vue,tsx,css}'],
    exclude: ['node_modules', '.git', 'lib']
  },
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        primary: ['Arial', 'sans-serif']
      },
      colors: {
        // ui 2.0
        primary: 'var(--u-primary-color)',
        base: 'var(--u-base-color)',
        bg1: 'var(--u-bg-1)',
        bg2: 'var(--u-bg-2)',
        color1: 'var(--u-color-1)',
        color2: 'var(--u-color-2)',
        color3: 'var(--u-color-3)',
        'color-line': 'var(--u-color-line)',
        'color-border': 'var(--u-color-border)',
        'color-hover': 'var(--u-color-hover)',
        'color-up': 'var(--u-color-up)',
        'color-down': 'var(--u-color-down)',
        // old
        error: 'var(--u-error-color)',
        success: 'var(--u-success-color)',
        warning: 'var(--u-warning-color)',
        info: 'var(--u-info-color)'
      }
    }
  },
  shortcuts: {
    // ui 2.0
    'u-h1': 'font-primary font-semibold tracking-normal text-[40px] leading-12',
    'u-h2': 'font-primary font-semibold tracking-normal text-[24px] leading-8',
    'u-h3': 'font-primary font-semibold tracking-normal text-[20px] leading-6',
    'u-h4': 'font-primary font-semibold tracking-normal text-[16px] leading-5',
    'u-h5': 'font-primary font-medium tracking-normal text-[14px] leading-5',
    'u-h6': 'font-primary font-400 tracking-normal text-[14px] leading-5',
    'u-h7': 'font-primary font-400 tracking-normal text-[12px] leading-4',
    'u-num1': 'font-primary font-semibold tracking-normal text-[14px] leading-5',
    'u-num2': 'font-primary font-semibold tracking-normal text-[12px] leading-4'
  },
  extend: {
    lineClamp: {
      sm: '3',
      lg: '10'
    }
  },
  plugins: [require('windicss/plugin/line-clamp'), require('windicss/plugin/aspect-ratio')]
})
