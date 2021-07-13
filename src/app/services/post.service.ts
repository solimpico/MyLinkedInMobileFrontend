import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Comment} from '../models/Comment';
import {PostType} from '../models/post-type';
import {Skil} from '../models/skil';
import {Observable} from 'rxjs';
import {Position} from '../models/position';
import {Post} from '../models/post';
import {PdfDTO} from '../models/PdfDTO';
import {URLFile} from '../models/urlfile';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  headers = new HttpHeaders();

  constructor(private http: HttpClient,
              private transfer: FileTransfer,
              private file: File) { }

  getVisiblePost(): Observable<Post[]>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.get<Post[]>('http://localhost:8080/public/showVisible');
  }
  addComment(newComment: Comment): Observable<Post>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.post<Post>('http://localhost:8080/post/addComment', newComment, {headers: this.headers});
  }

  deleteComment(idComment: number): Observable<Post>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.delete<Post>('http://localhost:8080/post/removeComment/'+idComment, {headers: this.headers});
  }

  getPostType(): Observable<PostType[]> {
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.get<PostType[]>('http://localhost:8080/showExistingType', {headers: this.headers});
  }

  getAllSkils(): Observable<Skil[]>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.get<Skil[]>('http://localhost:8080/showAllSkils', {headers: this.headers});
  }

  addPost(post: Post): Observable<Post>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.post<Post>('http://localhost:8080/post/addPost', post, {headers: this.headers});
  }

  deletePost(idPost: number): Observable<Response>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.delete<Response>('http://localhost:8080/post/delete/'+idPost, {headers: this.headers});
  }

  findPostByPosition(position: Position): Observable<Post[]>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.post<Post[]>('http://localhost:8080/post/showByPosition', position, {headers: this.headers});
  }

  findPostByOfferor(): Observable<Post[]>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.get<Post[]>('http://localhost:8080/applicant/showVisibleByOfferor', {headers: this.headers});
  }

  findPostBySkils(): Observable<Post[]>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.get<Post[]>('http://localhost:8080/applicant/showVisibleBySkil', {headers: this.headers});
  }

  findPostByDate(): Observable<Post[]>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.get<Post[]>('http://localhost:8080/post/showVisibleByDate', {headers: this.headers});
  }

  savePostOnPdf(postToSave: PdfDTO): Observable<URLFile>{
    this.headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    });
    return this.http.post<URLFile>('http://localhost:8080/applicant/saveOnPdf', postToSave, {headers: this.headers});
  }

  downloadFile(url: string, filename: string): void{
    const fileTransfer: FileTransferObject = this.transfer.create();
    console.log(url);
    fileTransfer.download(url, this.file.dataDirectory + filename + '.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      console.log('Errore nel download');
    });
  }


}
