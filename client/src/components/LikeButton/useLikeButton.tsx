import { toggleLike } from '@apis/product';
import { IProduct } from '@customTypes/product';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

interface IProductIdx {
  pageIdx: number;
  productIdx: number;
}

export default function useLikeButton(
  productId: number,
  idx: IProductIdx,
  userId?: number,
): UseMutateFunction<void, unknown, void, unknown> {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(() => toggleLike(productId), {
    onMutate: () => {
      // eslint-disable-next-line no-debugger
      debugger;
      const queryKey = ['products', productId];
      const snapshot = queryClient.getQueryData<IProduct[][]>(queryKey);
      if (!userId) return snapshot;
      console.log(snapshot);
      queryClient.setQueryData<IProduct[][]>(queryKey, (productPages) => {
        if (!productPages) return [];
        productPages[idx.pageIdx][idx.productIdx].likedUsers.push({
          productId,
          userId,
        });
        console.log(productPages);
        return { ...productPages };
      });
      return snapshot;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['products', String(productId)]);
    },
  });

  return mutate;
}
