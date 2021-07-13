import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';

import { SearchUserPipe } from './pipes/search-user.pipe';
import {Camera} from '@ionic-native/camera/ngx';

import { Firebase } from '@ionic-native/firebase/ngx';

@NgModule({
  declarations: [AppComponent, SearchUserPipe],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [Firebase, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, Geolocation,
    Camera, FileTransfer, File, FileTransferObject],
  bootstrap: [AppComponent],
  exports: [
    SearchUserPipe
  ]
})
export class AppModule {}
