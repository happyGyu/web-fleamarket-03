import { getRegionProducts, toggleLike } from '@apis/product';
import { PagedResponseDto, QueryKeyType } from '@customTypes/common';
import { IProduct, IProductItem } from '@customTypes/product';
import { useUser } from '@queries/useUser';
import {
  InfiniteData,
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

interface UseLikeButtonprops {
  productId: number;
  queryKey: QueryKeyType;
}

export default function useLikeButton({
  productId,
  queryKey,
}: UseLikeButtonprops): UseMutateFunction<void, unknown, void, unknown> {
  const queryClient = useQueryClient();
  const user = useUser();

  const { mutate } = useMutation(() => toggleLike(productId), {
    onMutate: () => {
      const snapshot =
        queryClient.getQueryData<InfiniteData<PagedResponseDto<IProductItem>>>(queryKey);
      queryClient.setQueryData<InfiniteData<PagedResponseDto<IProductItem>>>(
        queryKey,
        (infinitePages) => {
          if (!infinitePages) return infinitePages;

          // todo: 개선필요
          const newPages = infinitePages.pages.map((productPage) => ({
            ...productPage,
            products: productPage.data.map((product) => {
              if (product.id === productId) {
                // 만약 likedUser가 없으면 넣어주고 있으면 빼준다.
                const isLiked = product.likedUsers.find(({ userId }) => userId === user.id);
                const newProduct: IProductItem = {
                  ...product,
                  likedUsers: isLiked
                    ? product.likedUsers.filter((likedUser) => likedUser.userId !== user.id)
                    : [...product.likedUsers, { userId: user.id, productId }],
                };

                return newProduct;
              }
              return product;
            }),
          }));
          return { ...infinitePages, pages: newPages };
        },
      );

      return { snapshot };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(queryKey, context?.snapshot);
    },
  });

  return mutate;
}
