import {User} from './user';
import {Post} from './post';

export interface Notification{
  id: number;
  message: string;
  userDTO: User;
  postDTO?: Post;
}
