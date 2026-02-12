export interface Message {
    _id?: string;
    sender: string;
    content: string;
    room: string;
    createdAt?: string;
    isOwn: boolean;
    timestamp?: string
  }
  