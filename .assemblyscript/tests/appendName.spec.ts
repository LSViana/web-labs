import { appendName } from 'assemblyscript/build/debug';
import { describe, expect, it } from 'vitest';

describe('appendName', () => {
  it('should append ", Lucas" to the provided string', () => {
    expect(appendName('Hello')).toBe('Hello, Lucas');
  });
});
