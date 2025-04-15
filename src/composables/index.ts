import type { XtxGuessInstance } from '@/components/components'
import { ref } from 'vue'

//猜你喜欢的组合式函数
export const useGuessList = () => {
  //获取猜你喜欢组件实例
  const guessRef = ref<XtxGuessInstance>()
  //触底回调函数
  const onScrollToLower = () => {
    guessRef.value?.getMore()
  }

  //返回封装的两个函数，否则外部访问不到
  return {
    guessRef,
    onScrollToLower,
  }
}
