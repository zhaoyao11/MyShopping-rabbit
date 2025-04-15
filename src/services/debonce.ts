// 防抖指令封装
export const useDebounce = (delay: number) => {
  return {
    beforeMount(el: HTMLElement, binding: any) {
      let timer: number
      el.addEventListener(binding.arg, () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          binding.value()
        }, delay)
      })
    },
  }
}
