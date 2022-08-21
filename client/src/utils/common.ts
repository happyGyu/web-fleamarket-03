export function debounce<T>(callback: (...args: T[]) => void, time: number) {
  let debounceID: NodeJS.Timer;
  return (...args: T[]) => {
    if (debounceID) {
      clearTimeout(debounceID);
    }
    debounceID = setTimeout(() => callback(...args), time);
  };
}

export function calTimePassed(targetDate: Date) {
  const millisecond = new Date().getTime() - targetDate.getTime();
  if (millisecond < 1000) return '방금';
  const seconds = Math.ceil(millisecond / 1000);
  if (seconds < 60) return `${seconds}초`;
  const minutes = Math.ceil(seconds / 60);
  if (minutes < 60) return `${minutes}분`;
  const hours = Math.ceil(minutes / 60);
  if (hours < 24) return `${hours}시간`;
  const date = Math.ceil(hours / 24);
  return `${date}일`;
}