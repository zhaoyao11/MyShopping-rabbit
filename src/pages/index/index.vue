<script setup lang="ts">
import CustomNavBar from './components/CustomNavBar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import {
  getHomeBannerAPI,
  getHomeCategoryAPI,
  getHomeGoodsGuessLikeAPI,
  getHomeHotMutliAPI,
} from '@/services/homeapi'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import PageSkeleton from './components/ PageSkeleton.vue'
import { useGuessList } from '@/composables'
//获取轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
//获取首页分类部分数据
const categoryList = ref<CategoryItem[]>([])
const getCategoryPanelData = async () => {
  const res = await getHomeCategoryAPI()
  // console.log(res, '首页分类数据')
  categoryList.value = res.result
}
//获取首页热门推荐数据
const hotList = ref<HotItem[]>([])
const getHotListData = async () => {
  const res = await getHomeHotMutliAPI()
  // console.log(res)
  hotList.value = res.result
}
//是否生成骨架屏的标识
const isLoading = ref(true)
//生命周期函数
onLoad(async () => {
  await Promise.all([getHomeBannerData(), getCategoryPanelData(), getHotListData()])
  isLoading.value = false
})
//获取猜你喜欢组合式函数调用
const { guessRef, onScrollToLower } = useGuessList()
//控制下拉刷新状态
const isTriggered = ref(false)
//自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  //开始动画
  isTriggered.value = true
  // console.log('下拉刷新被触发')
  // await getHomeBannerData()
  // await getCategoryPanelData()
  // await getHotListData()
  //猜你喜欢数据的重置
  guessRef.value?.resetGuessLikeData()
  await Promise.all([
    getHomeBannerData(),
    getCategoryPanelData(),
    getHotListData(),
    guessRef.value?.getMore(),
  ])
  //关闭动画
  isTriggered.value = false
}
</script>

<template>
  <CustomNavBar />
  <scroll-view
    :refresher-triggered="isTriggered"
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    @scrolltolower="onScrollToLower"
    class="scroll-view"
    scroll-y
  >
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <XtxSwiper :list="bannerList" />
      <CategoryPanel :list="categoryList" />
      <HotPanel :list="hotList" />
      <XtxGuess ref="guessRef" />
    </template>
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  display: flex;
  height: 100%;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
</style>
