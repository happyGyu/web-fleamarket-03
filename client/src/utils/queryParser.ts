export function makeQueryString(queryConfig: Record<string, string>) {
  const urlSearchParams = new URLSearchParams(queryConfig);
  return `?${urlSearchParams.toString()}`;
}
