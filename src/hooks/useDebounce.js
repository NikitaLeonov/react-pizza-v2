const useDebounce = (fn, ms) => {
  let timeout
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments)
    }

    clearTimeout(timeout)

    timeout = setTimeout(fnCall, ms)
  }
}

export default useDebounce
