import { useUser } from '@queries/useUser';
import { getAllChatRoom, getMyProductChatRoom } from '@apis/chatRoom';
import myAxios from '@apis/myAxios';
import { useToast } from '@components/common/Toast/ToastContext';
import { IChatRoom, IChatRoomResponse } from '@customTypes/chat';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export function useChatRooms() {
  const { user } = useUser();
  const { data: chatRooms, refetch: refetchChatRooms } = useQuery<
    IChatRoomResponse[],
    AxiosError,
    IChatRoom[]
  >(['chatRooms'], getAllChatRoom, {
    select: (originalChatRooms) => selectPeer(user.id, originalChatRooms),
  });
  return { chatRooms, refetchChatRooms };
}

export function useMyProductChatRooms(productId: number) {
  const { user } = useUser();

  const { data: myProductChatRooms } = useQuery<IChatRoomResponse[], AxiosError, IChatRoom[]>(
    ['chatRooms', 'myProduct', productId],
    () => getMyProductChatRoom(productId),
    {
      select: (originalChatRooms) => selectPeer(user.id, originalChatRooms),
    },
  );
  return { myProductChatRooms };
}

function selectPeer(userId: number, originalChatRooms: IChatRoomResponse[]) {
  return originalChatRooms.map((originalChatRoom) => {
    const { buyer, seller, ...restData } = originalChatRoom;
    const peer = buyer.id === userId ? seller : buyer;
    return { ...restData, peer };
  });
}

// export function useCreateChatRoom(productId: number) {
//   const { mutate } = useMutation(createNewChatRoom, {
//     onSuccess: () => {

//     },
//   });
// }

export async function createNewChattingRoom(productId: number) {
  try {
    const { data } = await myAxios.post(`/chatRooms`);
    return data.chatRoomId;
  } catch (e) {
    throw new Error('채팅방 입장에 실패했습니다.');
  }
}

// export const useLogOut = () => {
//   const queryClinet = useQueryClient();
//   const { toastSuccess, toastError } = useToast();
//   const { mutate } = useMutation(requestLogout, {
//     onSuccess: () => {
//       queryClinet.setQueryData(['user'], initialUser);
//       toastSuccess('로그아웃 되었습니다.');
//     },
//     onError: () => {
//       toastError(new Error('로그아웃에 실패했습니다.'));
//     },
//   });

//   return mutate;
// };
