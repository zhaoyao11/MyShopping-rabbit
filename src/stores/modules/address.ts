import type { AddressItem } from '@/types/goods'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAddressStore = defineStore('address', () => {
  const selectedAddress = ref<AddressItem>()
  const changeSelectedAddress = (val: AddressItem) => {
    selectedAddress.value = val
  }

  return {
    selectedAddress,
    changeSelectedAddress,
  }
})
