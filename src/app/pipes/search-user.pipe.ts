import { Pipe, PipeTransform } from '@angular/core';
import {User} from '../models/user';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(users: User[], searchInput: string): any[] {
    if (!searchInput) {
      return  [];
    }
    searchInput = searchInput.toLowerCase();
    return users.filter(
      x => x.name.toLowerCase().includes(searchInput)
    );
  }

}
