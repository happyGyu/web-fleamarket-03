import { toggleLike } from '@apis/product';
import { PagedResponseDto, QueryKeyType } from '@customTypes/common';
import { IProductItem } from '@customTypes/product';
import { useProduct } from '@queries/useProduct';
import { useUser } from '@queries/useUser';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

interface UseLikeButtonprops {
  productId: number;
  toggleLikeView: () => void;
}

export default function useLikeButton({
  productId,
  toggleLikeView,
}: UseLikeButtonprops): UseMutateFunction<void, unknown, void, unknown> {
  const queryClient = useQueryClient();
  const { refetch } = useProduct(productId);
  const { mutate } = useMutation(() => toggleLike(productId), {
    onMutate: () => {
      const snapshot = queryClient.getQueryData<IProductItem>(['prduct', productId]);
      toggleLikeView();
      return { snapshot };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(['product', productId], context?.snapshot);
    },

    onSuccess: () => {
      refetch();
    },
  });

  return mutate;
}
