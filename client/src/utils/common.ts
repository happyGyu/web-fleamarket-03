export function debounce<T>(callback: (...args: T[]) => void, time: number) {
  let debounceID: NodeJS.Timer;
  return (...args: T[]) => {
    if (debounceID) {
      clearTimeout(debounceID);
    }
    debounceID = setTimeout(() => callback(...args), time);
  };
}
