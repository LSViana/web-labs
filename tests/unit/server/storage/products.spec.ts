import { describe, expect, test, vi } from 'vitest';

import { useProductsStorage } from '~~/server/utils/products/productStorage';

describe('Products Storage', () => {
  vi.useFakeTimers();

  test('starts empty', () => {
    const store = useProductsStorage();

    expect(store.products.length).toBe(0);
  });

  test('calling loadProducts fills the array', async () => {
    const store = useProductsStorage();

    expect(store.products.length).toBe(0);

    await Promise.all([
      vi.runAllTimersAsync(),
      store.loadProducts(),
    ]);

    expect(store.products.length).toBe(3);
  });
});
