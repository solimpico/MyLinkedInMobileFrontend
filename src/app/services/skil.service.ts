import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Skil} from '../models/skil';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class SkilService {

  headers = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getAllSkils(): Observable<Skil[]> {
    return this.http.get<Skil[]>('http://localhost:8080/showAllSkils', { headers: this.headers});
  }

  deleteSkil(skil: Skil): Observable<Skil>{
    return this.http.delete<Skil>('http://localhost:8080/admin/deleteSkil/' + skil.id, {headers: this.headers});
  }

  addSkil(skil: Skil): Observable<Skil>{
    return this.http.post<Skil>('http://localhost:8080/admin/addSkil', skil, {headers: this.headers});
  }

  getSkilById(idSkil: number): Observable<Skil>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')});
    return this.http.get<Skil>('http://localhost:8080/getSkilById/' + idSkil, {headers: this.headers});
  }

  addSkilToApplicant(applicant: User): Observable<User>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')});
    return this.http.post<User>('http://localhost:8080/applicant/addSkilToApplicant',applicant, {headers: this.headers});
  }
}
