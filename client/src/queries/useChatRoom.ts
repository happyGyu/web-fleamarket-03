import { useUser } from '@queries/useUser';
import { createNewChatRoom, getAllChatRoom, getMyProductChatRoom } from '@apis/chatRoom';
import { useToast } from '@components/common/Toast/ToastContext';
import { IChatRoom, IChatRoomResponse } from '@customTypes/chat';
import { useQuery, useMutation } from '@tanstack/react-query';
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

export function useCreateChatRoom() {
  const { toastError } = useToast();
  const { mutate: createChatRoom } = useMutation(
    (productId: number) => createNewChatRoom(productId),
    {
      onError: () => {
        toastError(new Error('채팅방 생성에 실패했습니다.'));
      },
    },
  );

  return { createChatRoom };
}
