<template>
  <nuxt-link v-if="to !== false" :to="to" :class="['inline-flex relative', outerGroup[group]]">
    <span
      :class="[sizes[size], stateTheme(theme), innerGroup[group], cursor, innerClass]"
      class="inline-flex overflow-hidden relative justify-center items-center w-full font-medium leading-4 transition duration-150 ease-in-out"
    >
      <template v-if="iconDirection === 'leading'">
        <component :is="icon" :class="[iconDirectionObj]" />
      </template>
      <slot />
      <template v-if="icon && !iconDirection">
        <component :is="icon" :class="[iconObj]" />
      </template>
      <template v-if="iconDirection === 'trailing'">
        <component :is="icon" :class="[iconDirectionObj]" />
      </template>
    </span>
    <span v-if="ping" class="absolute top-0 right-0 z-10 -mt-1 -mr-1">
      <span class="flex relative w-3 h-3">
        <span
          class="inline-flex absolute w-full h-full rounded-full opacity-75 animate-ping bg-red-500"
        ></span>
        <span class="inline-flex relative w-3 h-3 rounded-full"></span>
      </span>
    </span>
  </nuxt-link>

  <div
    v-else-if="href !== false"
    :alt="`Visit ${href}`"
    :href="href"
    :class="['inline-flex', outerGroup[group]]"
  >
    <div
      :class="[sizes[size], stateTheme(theme), innerGroup[group], cursor, innerClass]"
      class="inline-flex relative justify-center items-center w-full font-medium leading-4 transition duration-150 ease-in-out"
    >
      <template v-if="iconDirection === 'leading'">
        <component :is="icon" :class="[iconDirectionObj]" />
      </template>
      <slot />
      <template v-if="icon && !iconDirection">
        <component :is="icon" :class="[iconObj]" />
      </template>
      <template v-if="iconDirection === 'trailing'">
        <component :is="icon" :class="[iconDirectionObj]" />
      </template>
    </div>
  </div>

  <div v-else-if="to === false" :class="['inline-flex relative', outerGroup[group]]">
    <button
      :disabled="!isActive"
      :type="$attrs['type']"
      :class="[sizes[size], stateTheme(theme), innerGroup[group], cursor, innerClass]"
      class="inline-flex relative justify-center items-center w-full font-medium leading-4 transition duration-150 ease-in-out"
      @click="click"
    >
      <template v-if="iconDirection === 'leading' && progress === false">
        <component :is="icon" :class="[iconDirectionObj]" />
      </template>
      <slot />
      <template v-if="icon && !iconDirection && progress === false">
        <component :is="icon" :class="[iconObj]" />
      </template>
      <template v-if="iconDirection === 'trailing' && progress === false">
        <component :is="icon" :class="[iconDirectionObj]" />
      </template>
      <span v-show="state === 'loading'" class="ml-4">
        <svg
          class="w-5 h-5 animate-spin"
          :class="loading[theme]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </span>
      <span v-if="state === 'loading-quiet'" class="absolute inset-0 cursor-wait" />
      <span
        v-if="progress !== false"
        :style="`width: ${progress}%`"
        :class="loading[theme]"
        class="absolute inset-0 w-full h-full cursor-wait"
      />
      <span v-if="progress !== false" class="flex absolute inset-0 justify-center items-center">
        <slot />
      </span>

      <span v-if="ping" class="absolute top-0 right-0 z-10 -mt-1 -mr-1">
        <span class="flex relative w-3 h-3">
          <span
            class="inline-flex absolute w-full h-full bg-rose-400 rounded-full opacity-75 animate-ping"
          ></span>
          <span class="inline-flex relative w-3 h-3 bg-rose-500 rounded-full"></span>
        </span>
      </span>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from '@nuxtjs/composition-api'
import {
  AnimationStyle,
  ColorStyle,
  SizeStyle,
  Direction,
  ButtonState,
  ButtonGroup,
} from '~/types/components/button'
import { tailwindIcon } from '~/types/components/icon'


export default defineComponent({
  inheritAttrs: false,
  props: {
    to: {
      type: [Boolean, String],
      required: false,
      default: false,
    },
    href: {
      type: [Boolean, String],
      required: false,
      default: false,
    },
    size: {
      type: String as PropType<SizeStyle>,
      default: 's',
      validator: (size: SizeStyle) => ['xs', 's', 'm', 'l', 'xl'].includes(size),
    },
    theme: {
      type: String as PropType<ColorStyle>,
      default: 'white',
      required: false,
      validator: (theme: ColorStyle) =>
        ['white', 'primary', 'secondary', 'black', 'red', 'text'].includes(theme),
    },
    state: {
      type: String as PropType<ButtonState>,
      default: 'active',
      validator: (state: ButtonState) =>
        ['active', 'loading', 'loading-quiet', 'disabled'].includes(state),
    },
    progress: {
      type: [Boolean, Number],
      default: false,
    },
    group: {
      type: String as PropType<ButtonGroup>,
      required: false,
      default: 'single',
      validator: (group: ButtonGroup) => ['single', 'left', 'right', 'middle'].includes(group),
    },
    innerClass: {
      type: String,
      required: false,
      default: '',
    },
    ping: {
      type: Boolean,
      required: false,
      default: false,
    },
    iconDirection: {
      type: String as PropType<Direction>,
      required: false,
      default: 'trailing',
      validator: (value: string) => {
        const validIconDirection = ['trailing', 'leading']
        return validIconDirection.includes(value)
      },
    },
    icon: {
      type: String as PropType<tailwindIcon>,
      required: false,
      default: '',
    },
    center: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup(props, { emit }) {
    const themes = {
      text: 'text-warnGray-700 bg-transparent',
      white: 'border-2 border-warnGray-300 text-warnGray-700 bg-warnGray-50',
      primary: 'border-2 text-green-50 bg-green-600 border-transparent',
      secondary: 'text-green-700 bg-green-100',
      red: 'border-2 text-rose-50 bg-rose-600 border-transparent',
      black: 'border-2 text-warnGray-50 bg-warnGray-700 border-transparent',
    }
    const active = {
      text: 'hover:text-warnGray-500 hover:bg-warnGray-100 focus:outline-none active:text-warnGray-800 active:bg-warnGray-50',
      white:
        'focus:outline-none focus:shadow-inner hover:bg-warnGray-100 focus:border-warnGray-200 focus:shadow-outline-warnGray active:bg-warnGray-200',
      primary:
        'hover:bg-green-700 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700',
      secondary:
        'hover:bg-green-50 focus:outline-none focus:border-green-300 focus:shadow-outline-green active:bg-green-200',
      red: 'hover:bg-rose-700 focus:outline-none focus:border-rose-400 focus:shadow-outline-rose active:bg-rose-700',
      black:
        'hover:bg-warnGray-600 focus:outline-none focus:border-warnGray-500 focus:shadow-outline-warnGray active:bg-warnGray-500',
    }
    const sizes = {
      xs: 'px-2.5 py-1.5 text-xs leading-4',
      s: 'px-4 py-1.5 text-sm font-normal leading-4',
      m: 'px-4 py-2 text-sm font-normal leading-5',
      l: 'px-4 py-3 text-base font-normal leading-6',
      xl: 'px-6 py-4 text-base font-normal leading-6',
    }
    const outerGroup = {
      single: 'rounded-md',
      left: 'rounded-l-md',
      middle: '-ml-px',
      right: 'rounded-r-md',
    }
    const innerGroup = {
      single: 'rounded-md',
      left: 'rounded-l-md border-r-0 focus:z-10',
      middle: 'focus:z-10',
      right: 'rounded-r-md border-l-0 focus:z-10',
    }
    const loading = {
      text: 'text-warnGray-900',
      white: 'text-warnGray-900',
      primary: 'text-white text-green-50',
      secondary: 'text-green-50',
      red: 'text-white',
      black: 'text-warnGray-50',
    }
    const centerObj = computed(() => {
      if (props.center) {
        return 'flex justify-center'
      }
    })

    const iconDirectionObj = computed(() => {
      const sizes = {
        xs: 'ml-0.5 mr-2 h-4 w-4',
        s: 'ml-0.5 mr-2 h-4 w-4',
        m: '-ml-1 mr-2 h-5 w-5',
        l: '-ml-1 mr-3 h-5 w-5',
        xl: '-ml-1 mr-3 h-5 w-5',
      }
      const sizesTraling = {
        xs: 'ml-2 -mr-0.5 h-4 w-4',
        s: 'ml-2 -mr-0.5 h-4 w-4',
        m: 'ml-2 -mr-1 h-5 w-5',
        l: 'ml-3 -mr-1 h-5 w-5',
        xl: 'ml-3 -mr-1 h-5 w-5',
      }
      if (props.iconDirection === 'leading') {
        return sizes[props.size]
      } else {
        return sizesTraling[props.size]
      }
    })

    const iconObj = computed(() => {
      const sizes = {
        xs: '-mx-1 -my-0.5',
        s: '-mx-1 -my-0.5',
        m: '-mx-1 -my-0.5',
        l: '-mx-1',
        xl: '-mx-1',
      }
      return sizes[props.size]
    })

    const isActive = computed(() => {
      return props.state === 'active' && props.progress === false
    })

    const isDisabled = computed(() => {
      return props.state === 'disabled'
    })

    const cursor = computed(() => {
      return isActive.value
        ? 'cursor-pointer'
        : isDisabled.value
          ? 'cursor-not-allowed'
          : 'cursor-wait'
    })

    function stateTheme(theme: ColorStyle) {
      if (isActive) return [themes[theme], active[theme]]
      return themes[theme]
    }
    function click() {
      if (isActive) emit('click')
    }

    return {
      centerObj,
      isActive,
      cursor,
      iconDirectionObj,
      outerGroup,
      sizes,
      stateTheme,
      innerGroup,
      click,
      loading,
      iconObj,
    }
  },
})
</script>

<style lang="css">
.animation-loading {
  animation: push-button-loading 1s linear 0s infinite;
}
@keyframes push-button-loading {
  from {
    transform: translate(-100%, 0px);
  }
  to {
    transform: translate(200%, 0px);
  }
}
</style>
