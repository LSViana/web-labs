import { defineEventHandler } from 'h3'

import { useProductsStorage } from '~/composables/server/storage/products'

export default defineEventHandler(async () => {
  const productsStorage = useProductsStorage()

  await productsStorage.loadProducts()

  return {
    products: productsStorage.products
  }
})
