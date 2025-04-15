import type { CartItem } from '@/types/cart'
import { http } from '@/utils/http'

//加入购物车
export const postMemberCart = (data: { skuId: string; count: number }) => {
  return http({
    method: 'POST',
    url: '/member/cart',
    data,
  })
}

//获取购物车数据
export const getMemberCartAPI = () => {
  return http<CartItem[]>({
    method: 'GET',
    url: '/member/cart',
  })
}

//删除购物车单品
export const deleteMemberCart = (ids: string[]) => {
  return http({
    method: 'DELETE',
    url: '/member/cart',
    data: {
      ids,
    },
  })
}

//修改购物车单品
export const putMemberCartBySkuId = (
  skuId: string,
  data: { selected?: boolean; count?: number },
) => {
  return http({
    method: 'PUT',
    url: `/member/cart/${skuId}`,
    data,
  })
}

//购物车全选  取消全选
export const putMemberCartSelected = (data: { selected: boolean }) => {
  return http({
    method: 'PUT',
    url: '/member/cart/selected',
    data,
  })
}
