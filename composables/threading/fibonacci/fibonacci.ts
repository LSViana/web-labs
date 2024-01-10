function fibonacci(value: number): number {
  if (value <= 1) {
    return value
  } else {
    return fibonacci(value - 1) + fibonacci(value - 2)
  }
}

export default fibonacci
