import { afterAll, describe, expect, test, vi } from 'vitest';

import { useProductsStorage } from '~~/layers/experiments/server/utils/products/productStorage';

describe('Products Storage', () => {
  vi.useFakeTimers();

  afterAll(() => {
    vi.useRealTimers();
  });

  test('starts empty', () => {
    const store = useProductsStorage();

    expect(store.products.length).toBe(0);
  });

  test('calling loadProducts fills the array', async () => {
    const store = useProductsStorage();

    expect(store.products.length).toBe(0);

    await Promise.all([
      store.loadProducts(),
      vi.runOnlyPendingTimers(),
    ]);

    expect(store.products.length).toBe(3);
  });
});
