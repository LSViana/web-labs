console.log(1)

// Even though `3` will be logged, this file's execution won't be finished
// until the callback of `setTimeout` is executed and the event loop is empty.
setTimeout(() => console.log(2), 1000)

console.log(3)
