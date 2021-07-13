import {DataDTO} from './dataDTO';
import {Comment} from './Comment';

export interface Post {
  id: number;
  datetime: Date;
  visible: boolean;
  userId: number;
  nameAndSurnameUser: string;
  type: string;
  dataDTOList: DataDTO[];
  commentDTOList: Comment[];
  showComments: boolean;
  newComment: string;
  success: boolean;
}
