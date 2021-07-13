import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Message} from '../models/message';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  headers = new HttpHeaders();

  chats: Message[] = [];

  constructor(private http: HttpClient) { }

  getAllChats(): Observable<Message[]>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')});
    return this.http.get<Message[]>('http://localhost:8080/showConversation', {headers: this.headers});
  }

  sendMessage(mex: Message): Observable<Message>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')});
    return this.http.post<Message>('http://localhost:8080/sendMessage', mex, {headers: this.headers});
  }
}
