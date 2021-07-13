import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {URLFile} from '../models/urlfile';
import {FirebaseToken} from '../models/FirebaseToken';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  headers = new HttpHeaders();
  firebaseToken: FirebaseToken = {} as FirebaseToken;

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<URLFile> {
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Accept: 'application/json',
      responseType: 'text'
    });
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<URLFile>('http://localhost:8080/upload/', formData, {headers: this.headers});
  }



   saveFirebaseToken(): Observable<any>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')});
    this.firebaseToken.userId = parseInt(sessionStorage.getItem('idUser'), 10);
    return this.http.post<any>('http://localhost:8080/saveFirebaseToken', this.firebaseToken, {headers: this.headers});
   }
}
