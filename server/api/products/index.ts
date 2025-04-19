import { defineEventHandler } from 'h3';

import { useProductsStorage } from '~~/server/utils/products/productStorage';

export default defineEventHandler(async () => {
  const productsStorage = useProductsStorage();

  await productsStorage.loadProducts();

  return {
    products: productsStorage.products,
  };
});
