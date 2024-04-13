const debounce = <T extends any[]>(callback: (...args: T) => void, wait: number) => {
  let timerId: number;
  return (...args: T) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};
export default debounce;
