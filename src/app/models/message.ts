export interface Message {
  id: number;
  visible?: boolean;
  message: string;
  datetime: Date;
  idSender: number;
  nameSender: string;
  idReceiver: number;
  nameReceiver: string;
  conversationId?: number;
  messageDTOList: this[];
}
