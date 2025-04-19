import { reactive } from 'vue';

import { Product } from '~~/layers/experiments/server/utils/products/product';

type ProductsStorage = {
  products: Product[]
  loadProducts: () => Promise<void>
};

export function useProductsStorage(): ProductsStorage {
  const products = reactive<Product[]>([]);

  const loadProducts = async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    products.push(
      new Product('Milk'),
      new Product('Banana'),
      new Product('Cookies'),
    );
  };

  return {
    products,
    loadProducts,
  };
}
