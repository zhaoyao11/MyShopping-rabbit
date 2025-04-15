import type { PageParams, PageResult } from '@/types/global'
import type { BannerItem, CategoryItem, GuessItem, HotItem } from '@/types/home'
import { http } from '@/utils/http'

//获取轮播图数据
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}

//获取首页分类数据
export const getHomeCategoryAPI = () => {
  return http<CategoryItem[]>({
    method: 'GET',
    url: '/home/category/mutli',
  })
}

//获取首页热门推荐数据
export const getHomeHotMutliAPI = () => {
  return http<HotItem[]>({
    method: 'GET',
    url: '/home/hot/mutli',
  })
}

//猜你喜欢
export const getHomeGoodsGuessLikeAPI = (data?: PageParams) => {
  return http<PageResult<GuessItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data,
  })
}
