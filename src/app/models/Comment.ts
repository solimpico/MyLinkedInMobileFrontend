export interface Comment {
  id: number;
  author: string;
  authorId: number;
  comment: string;
  datetime: Date;
  thread: number;
  postId: number;
  commentsOfThread: this[];
  reply: boolean;
  response: string;
}
