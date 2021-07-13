import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstPage } from './first.page';
import {ChatPage} from '../chat/chat.page';

const routes: Routes = [
  {
    path: '',
    component: FirstPage
  },{
  path: 'chat',
    component: ChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstPageRoutingModule {}
