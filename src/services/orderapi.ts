import type { OrderListParams, OrderListResult } from '@/types/global'
import type {
  LogisticItem,
  OrderCreateParams,
  OrderLogisticResult,
  OrderPreResult,
  OrderResult,
} from '@/types/order'
import { http } from '@/utils/http'
/**
 * 填写订单-获取预付订单
 */
export const getMemberOrderPreAPI = () => {
  return http<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre',
  })
}

//获取立即购买订单
export const getMemberOrderPreNowAPI = (data: {
  skuId: string
  count: string
  addressId?: string
}) => {
  return http<OrderPreResult>({
    method: 'GET',
    url: '/member/order/pre/now',
    data,
  })
}

//提交订单
export const postMemberOrderAPI = (data: OrderCreateParams) => {
  return http<{ id: string }>({
    method: 'POST',
    url: '/member/order',
    data,
  })
}

//获取订单详情
export const getMemberOrderByIdAPI = (id: string) => {
  return http<OrderResult>({
    method: 'GET',
    url: `/member/order/${id}`,
  })
}

//再次购买订单
export const getMemberOrderRepurchaseByIdAPI = (id: string) => {
  return http<OrderPreResult>({
    method: 'GET',
    url: `/member/order/repurchase/${id}`,
  })
}

//获取微信支付参数
export const getPayWxPayMiniPayAPI = (data: { orderId: string }) => {
  return http<WechatMiniprogram.RequestPaymentOption>({
    method: 'GET',
    url: '/pay/wxPay/miniPay',
    data,
  })
}

//模拟支付
export const getPayMockAPI = (data: { orderId: string }) => {
  return http({
    method: 'GET',
    url: '/pay/mock',
    data,
  })
}

//模拟发货
export const getMemberOrderConsignmentByIdAPI = (id: string) => {
  return http({
    method: 'GET',
    url: `/member/order/consignment/${id}`,
  })
}

//确认收货
export const putMemberOrderByidReceipt = (id: string) => {
  return http({
    method: 'PUT',
    url: `/member/order/${id}/receipt`,
  })
}

//获取物流信息
export const getMemberOrderByIdLogisticsAPI = (id: string) => {
  return http<OrderLogisticResult>({
    method: 'GET',
    url: `/member/order/${id}/logistics`,
  })
}

//删除订单
export const deleteMemberOrder = (data: { ids: string[] }) => {
  return http({
    method: 'DELETE',
    url: '/member/order',
    data,
  })
}

//获取订单列表
export const getMemberOrder = (data: OrderListParams) => {
  return http<OrderListResult>({
    method: 'GET',
    url: '/member/order',
    data,
  })
}
