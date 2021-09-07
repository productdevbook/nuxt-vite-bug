import { ValidationObserver } from 'vee-validate'
import { ref, computed } from '@nuxtjs/composition-api'

export default function useValidation() {
  const validationObserver = ref<any>(null)
  const observerEl = computed(
    () => validationObserver.value as InstanceType<typeof ValidationObserver>,
  )
  const failedInputs = ref<Element[]>([])

  const validate = async () => {
    const result = await observerEl.value.validateWithInfo()
    failedInputs.value = Object.entries(result.errors).reduce(function (
      filtered: HTMLElement[],
      [key, value],
    ) {
      if (value.length > 0) {
        filtered.push(observerEl.value.refs[key].$el as HTMLElement)
      }
      return filtered
    },
    [])
  }

  const reset = () => observerEl.value.reset()

  const isValid = computed(() => failedInputs.value.length === 0)

  return {
    validationObserver,
    validate,
    reset,
    isValid,
  }
}
