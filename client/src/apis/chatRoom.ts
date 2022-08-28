import myAxios from '@apis/myAxios';

export async function getAllChatRoom() {
  const { data: chatRooms } = await myAxios.get('/chatRooms');
  return chatRooms;
}

export async function getMyProductChatRoom(productId: number) {
  const { data: chatRooms } = await myAxios.get(`/chatRooms/product/${productId}`);
  return chatRooms;
}

export async function createNewChatRoom(productId: number) {
  try {
    const { data } = await myAxios.post(`/chatRooms`);
    return data.chatRoomId;
  } catch (e) {
    throw new Error('채팅방 입장에 실패했습니다.');
  }
}
