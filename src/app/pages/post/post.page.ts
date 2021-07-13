import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

import {Post} from '../../models/post';
import {DataDTO} from '../../models/dataDTO';
import {Comment} from '../../models/Comment';
import {Skil} from '../../models/skil';
import {PostType} from '../../models/post-type';
import {User} from '../../models/user';
import {UtilityService} from '../../services/utility.service';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {Router} from '@angular/router';
import {Notification} from '../../models/Notification';
import {NotificationService} from '../../services/notification.service';
import {Position} from '../../models/position';
import {PdfDTO} from '../../models/PdfDTO';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  visiblePosts: Post[] = [];
  user: User = {} as User;
  newComment: Comment = {} as Comment;
  idUser = parseInt(sessionStorage.getItem('idUser'), 10);
  newP = false;
  newP2 = false;
  newPost: Post = {} as Post;
  postTypeList: PostType[] = [];
  selectedType: PostType = {} as PostType;
  allSkils: Skil[] = [];
  dataDTOList: DataDTO[] = [];
  selectedFile: any;
  requiredFieldRespected = true;
  isClick = false;
  backpage = '../first';
  notification: Notification = {} as Notification;
  position: Position = {} as Position;
  gpsSuccess = true;
  file = false;
  saveOnPdf = false;
  postToSave: PdfDTO = {} as PdfDTO;
  order = 'pos';

  constructor(private postService: PostService, private userService: UserService,
              private utilityService: UtilityService, private route: Router,
              private notificationService: NotificationService,
              private camera: Camera) {}

  ngOnInit() {
    this.postToSave.idPostArray = [];
    this.position.latitudine = sessionStorage.getItem('lat');
    this.position.longitudine = sessionStorage.getItem('long');
    if(this.position.longitudine !== '' && this.position.latitudine !== '') {
        this.postService.findPostByPosition(this.position).subscribe(posts => {
          this.visiblePosts = posts;
        });
    }
    else {
      this.gpsSuccess = false;
    }
    this.userService.findById(parseInt(sessionStorage.getItem('idUser'), 10)).subscribe(u => {
      this.user = u;
    });
    this.postService.getPostType().subscribe(types => {
      this.postTypeList = types;
    });
    this.postService.getAllSkils().subscribe(s => {
      this.allSkils = s;
    });
    setInterval(() => {
      if(this.user.id !== parseInt(localStorage.getItem('idUser'), 10)) {
        if (parseInt(localStorage.getItem('idUser'), 10) !== undefined) {
          this.userService.findById(parseInt(sessionStorage.getItem('idUser'), 10)).subscribe(u => {
            this.user = u;
            this.ngOnInit();
          });
        }
      }
    }, 1000);
  }

  addChildComment(commentParent: Comment): void{
    this.newComment.comment = commentParent.response;
    this.newComment.postId = commentParent.postId;
    this.newComment.thread = commentParent.id;
    this.newComment.authorId = parseInt(sessionStorage.getItem('idUser'), 10);
    this.newComment.datetime = new Date();
    this.newComment.author = this.user.name +' '+ this.user.surname;
    this.postService.addComment(this.newComment).subscribe(post => {
      location.reload(true);
    });
  }

  deleteComment(comment: Comment): void{
    this.postService.deleteComment(comment.id).subscribe(post => {
      location.reload(true);
    });
  }

  addNewComment(post: Post): void{
    this.newComment.postId = post.id;
    this.newComment.authorId = this.user.id;
    this.newComment.author = this.user.name +' '+ this.user.surname;
    this.newComment.thread = 0;
    this.newComment.datetime = new Date();
    this.newComment.comment = post.newComment;
    this.postService.addComment(this.newComment).subscribe(p => {
      location.reload(true);
    });
  }

  addPost(postType: PostType): void{
    this.newP = false;
    this.newP2 = true;
    this.selectedType = postType;
    this.newPost = {} as Post;
    this.selectedType.requiredFields.forEach(reqField => {
      if(reqField !== 'Skil' && reqField !== 'Curriculum' && reqField !== 'Foto') {
        const data: DataDTO = {} as DataDTO;
        data.field = reqField;
        this.dataDTOList.unshift(data);
      }
    });
  }

  addDataToPost(field: string, value: string): void{
    const data: DataDTO = {} as DataDTO;
    data.field = field;
    data.data = value;
    data.dataFilePath = value;
    this.dataDTOList.unshift(data);
  }


  savePost(): void{
    // Controllo rispetto dei campi
    this.requiredFieldRespected = true;
    this.selectedType.requiredFields.forEach(reqField => {
      let control = false;
      this.dataDTOList.forEach(dataOfPost => {
        if(dataOfPost.field === reqField){
          if(dataOfPost.data !== undefined || dataOfPost.data !== undefined) {
            control = true;
          }
        }
      });
      if(control === false){
        this.requiredFieldRespected = false;
      }
    });
    // se i campi sono rispettati procedo:
    if (this.requiredFieldRespected){
      // assemblo il post
      this.newPost.dataDTOList = this.dataDTOList;
      this.newPost.datetime = new Date();
      this.newPost.userId = this.idUser;
      this.newPost.nameAndSurnameUser = this.user.name +' '+ this.user.surname;
      this.newPost.type = this.selectedType.type;
      this.newPost.visible = true;
      // salvo il post
      this.postService.addPost(this.newPost).subscribe(post => {
        if(this.file) {
          // quando il post è stato salvato nel db salvo il documento ad esso associato (se esiste)
          if (this.selectedFile !== undefined) {
            this.utilityService.uploadFile(this.selectedFile).subscribe(result => {
              // quando anche il file è stato caricato: aggiorno la pagina
              this.newPost = {} as Post;
              location.reload(true);
            });
          }
        } else {
          location.reload(true);
        }
      });
    }
  }

  onFileSelected(event: any): void {
    // validation
    this.selectedFile = event.target.files[0];
    console.log(event);
  }

  deletePost(post: Post): void{
    this.postService.deletePost(post.id).subscribe(() => {
      location.reload(true);
    });
  }

  downloadFile(urloToDownload: string, fileName: string): void {
    this.postService.downloadFile(urloToDownload, fileName);
  }

  moreDetails(id: number): void{
    const idUser = parseInt(sessionStorage.getItem('idUser') || '0', 10);
    if (id === idUser && idUser !== 0){
      this.route.navigateByUrl('profile');
    } else {
      this.route.navigateByUrl('userdetails/' + id);
    }
  }

  selectPost(post: Post, message: string): void{
    this.notification.message = message;
    this.userService.findById(post.userId).subscribe(user => {
      this.notification.userDTO = user;
      this.notification.postDTO = post;
      this.notificationService.saveNotification(this.notification).subscribe(() => {
        post.success = true;
      });
    });
  }

  findPostByDate(): void{
    this.postService.findPostByDate().subscribe((posts) => {
      this.visiblePosts = posts;
      this.order = 'date';
    });
  }

  findPostBySkils(): void {
    this.postService.findPostBySkils().subscribe((posts) => {
      this.visiblePosts = posts;
      this.order = 'skil';
    });
  }

  findPostByOfferor(): void{
      this.postService.findPostByOfferor().subscribe((posts) => {
        this.visiblePosts = posts;
        this.order = 'offeror';
      });
  }

  findPostByPosition(): void{
    this.postService.findPostByPosition(this.position).subscribe((posts) => {
      this.visiblePosts = posts;
      this.order = 'pos';
    });
  }

  savePdf(): void{
    this.postService.savePostOnPdf(this.postToSave).subscribe((url) => {
      console.log(url.url);
      this.downloadFile('http://localhost:8080'+url.url, new Date().toDateString());
    });
  }

  getPicture(): void {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.selectedFile = 'data:image/jpeg;base64,' + imageData;
      this.utilityService.uploadFile(this.selectedFile).subscribe(data => {
        if (data.url !== '') {
          console.log('\nUpload success');
          this.addDataToPost('Foto', data.url);
        }
        else {
          console.log('\nError to upload foto');
        }
      });
    });
  }



}
