import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostPage } from './post.page';
import {UserdetailsPage} from '../userdetails/userdetails.page';

const routes: Routes = [
  {
    path: '',
    component: PostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostPageRoutingModule {}
