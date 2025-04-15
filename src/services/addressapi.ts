import type { AddressParams } from '@/types/address'
import type { AddressItem } from '@/types/goods'
import { http } from '@/utils/http'

export const postMemberAddressAPI = (data: AddressParams) => {
  return http({
    method: 'POST',
    url: '/member/address',
    data,
  })
}

//获取收货地址列表
export const getMemberAddressListAPI = () => {
  return http<AddressItem[]>({
    method: 'GET',
    url: '/member/address',
  })
}

//获取收货地址详情
export const getMemberAddressByIdAPI = (id: string) => {
  return http<AddressItem>({
    method: 'GET',
    url: `/member/address/${id}`,
  })
}

//修改地址
export const modifyMemberAddress = (id: string, data: AddressParams) => {
  return http({
    method: 'PUT',
    url: `/member/address/${id}`,
    data,
  })
}

//删除地址
export const deleteMemberAddressAPI = (id: string) => {
  return http({
    method: 'DELETE',
    url: `/member/address/${id}`,
  })
}
