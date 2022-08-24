import { getUser } from '@apis/user';
import LoadingIndicator from '@components/common/LoadingIndicator';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

interface IFetchFunction {
  nextStartParam: number | null;
}

interface UseInfiniteScrollProps<T> {
  queryKey: (string | number | undefined)[];
  fetchFunction: (pageParam?: number) => Promise<T>;
}

export default function useInfiniteScroll<T extends IFetchFunction>({
  queryKey,
  fetchFunction,
}: UseInfiniteScrollProps<T>) {
  const { data: user } = useQuery(['user'], getUser);
  const { data, fetchNextPage, isLoading } = useInfiniteQuery(
    queryKey,
    ({ pageParam = undefined }) => fetchFunction(pageParam),
    {
      enabled: !!user,
      getNextPageParam: (lastPage) => lastPage.nextStartParam || undefined,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const observerRef = useRef<IntersectionObserver>();
  const triggerRef = useRef<HTMLDivElement>(null);

  const intersectionObserver = (entries: IntersectionObserverEntry[], io: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        io.unobserve(entry.target);
        fetchNextPage();
      }
    });
  };

  function Trigger() {
    return (
      <div ref={triggerRef}>
        <LoadingIndicator />
      </div>
    );
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver(intersectionObserver);
    if (triggerRef.current) {
      observerRef.current.observe(triggerRef.current);
    }
  }, [data]);

  return { data, triggerRef, isLoading, Trigger };
}
