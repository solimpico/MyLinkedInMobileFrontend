import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {InputLogin} from '../models/inputLogin';
import {Observable} from 'rxjs';
import {Logintoken} from '../models/logintoken';
import {User} from '../models/user';
import {ProfileImage} from "../models/profile-image";
import {Company} from "../models/company";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders();

  publicHeaders = new HttpHeaders({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  sendCredential(input: InputLogin): Observable<Logintoken> {
    return this.http.post<Logintoken>('http://localhost:8080/public/login', input , {headers: this.publicHeaders});
  }

  findById(idUser: number): Observable<User>{
    return this.http.get<User>('http://localhost:8080/public/getUserById/' + idUser, {headers: this.publicHeaders});
  }

  sendRegistrationRequest(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/public/registrationRequest', user, { headers: this.publicHeaders });
  }

  getAllUsers(): Observable<User[]>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')});
    return this.http.get<User[]>('http://localhost:8080/getAllUsers', { headers: this.headers });
  }

  findProfileImage(): Observable<ProfileImage> {
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')});
    return this.http.get<ProfileImage>('http://localhost:8080/getProfileImage', {headers: this.headers});
  }

  updateAge(age: number): Observable<User>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')});
    return this.http.put<User>('http://localhost:8080/updateAge/' + age, {}, {headers: this.headers});
  }

  addProfileImage(profileImage: ProfileImage): Observable<ProfileImage>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')});
    return this.http.post<ProfileImage>('http://localhost:8080/addProfileImage', profileImage, {headers: this.headers});
  }

  addCompany(company: Company): Observable<Company>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')});
    return this.http.post<Company>('http://localhost:8080/offeror/addCompany', company, {headers: this.headers});
  }

}
