import { getRegionProducts, toggleLike } from '@apis/product';
import { QueryKeyType } from '@customTypes/common';
import { GetRegionProductDto, IProduct, IProductItem } from '@customTypes/product';
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
      const snapshot = queryClient.getQueryData<InfiniteData<GetRegionProductDto>>(queryKey);
      queryClient.setQueryData<InfiniteData<GetRegionProductDto>>(queryKey, (infinitePages) => {
        if (!infinitePages) return infinitePages;
        const a = infinitePages.pages.map((productPage) => ({
          ...productPage,
          products: productPage.products.map((product) => {
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
        return { ...infinitePages, pages: a };
      });
      return snapshot;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['products', String(productId)]);
    },
  });

  return mutate;
}
