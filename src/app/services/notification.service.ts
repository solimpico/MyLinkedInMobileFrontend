import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../models/Notification';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  headers = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getAllNotification(): Observable<Notification[]>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')});
    return this.http.get<Notification[]>('http://localhost:8080/getAllNotification', {headers: this.headers});
  }

  deleteNotificationById(id: number): Observable<any>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')});
    return this.http.delete<any>('http://localhost:8080/deleteNotification/'+id, {headers: this.headers});
  }

  deleteAllNotification(): Observable<any>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')});
    return this.http.delete<any>('http://localhost:8080/deleteAllnotificationOfUser', {headers: this.headers});
  }

  saveNotification(not: Notification): Observable<Notification>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')});
    return this.http.post<Notification>('http://localhost:8080/addNotification', not, {headers: this.headers});
  }
}
