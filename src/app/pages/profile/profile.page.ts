import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {ProfileImage} from '../../models/profile-image';
import {UserService} from '../../services/user.service';
import {UtilityService} from '../../services/utility.service';
import {Company} from '../../models/company';
import {Skil} from '../../models/skil';
import {SkilService} from '../../services/skil.service';
import {PostService} from '../../services/post.service';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  backpage = '../first';
  myIdUser: number = parseInt(sessionStorage.getItem('idUser') || '0', 10);
  myUser: User = {} as User;
  newProfileImage: ProfileImage = {} as ProfileImage;
  newDescription = '';
  selectedFile: any;
  newAge = 0;
  defaultImage = 'http://localhost:8080/public/download/generico.jpg';
  newCompany: Company = {} as Company;
  skilList: Skil[] = [];
  allSkils: Skil[] = [];
  uploadSuccess = true;

  // @ts-ignore
  constructor(private userService: UserService, private utilityService: UtilityService,
              private skilService: SkilService, private postService: PostService,
              private camera: Camera) { }

  ngOnInit() {
    this.newProfileImage.id = 0;
    if (this.myIdUser !== 0) {
      this.userService.findById(this.myIdUser).subscribe(user => {
        this.myUser = user;
        if(this.myUser.profileImagePath !== null) {
          this.userService.findProfileImage().subscribe(image => {
            this.newProfileImage = image;
          });
        }
        if(this.myUser.role === 'Applicant'){
          this.myUser.skilIdArray.forEach(idSkil => {
            this.skilService.getSkilById(idSkil).subscribe(skil => {
              this.skilList.unshift(skil);
            });
          });
          this.postService.getAllSkils().subscribe(s => {
            this.allSkils = s;
            this.skilList.forEach(skil => {
              s.forEach(sk => {
                if(skil.skilName === sk.skilName){
                  this.allSkils.splice(this.allSkils.indexOf(sk), 1);
                }
              });
            });
          });
        }
      });
    }
  }
/*
  uploadButton(): void {
    this.utilityService.uploadFile(this.selectedFile).subscribe(data => {
      if (data.url !== '') {
        this.newProfileImage.path = data.url;
        this.userService.addProfileImage(this.newProfileImage).subscribe(image => {
          this.myUser.profileImagePath = image.path;
          this.newProfileImage = image;
        });
      }
    });
  }*/

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
          this.newProfileImage.path = data.url;
          this.userService.addProfileImage(this.newProfileImage).subscribe(image => {
            this.myUser.profileImagePath = image.path;
            this.newProfileImage = image;
          });
        }
      });
    }, (err) => {
      this.uploadSuccess = false;
    });
  }

  updateDescription(): void {
    this.newProfileImage.description = this.newDescription;
    this.userService.addProfileImage(this.newProfileImage).subscribe(image => {
      this.myUser.profileImagePath = image.path;
      this.newProfileImage = image;
      this.newDescription = '';
    });
  }

/*
  onFileSelected(event: any): void {
    // validation
    this.selectedFile = event.target.files[0];
    console.log(event);
  }
*/
  updateAge(): void{
    this.userService.updateAge(this.newAge).subscribe(user => {
      this.myUser = user;
      this.newAge = 0;
    });
  }

  addCompany(){
    this.newCompany.idOfferor = [this.myUser.id];
    this.userService.addCompany(this.newCompany).subscribe((company) => {
      this.newCompany = company;
      location.reload(true);
    });
  }

  addSkilToApplicant(skil: Skil): void{
    this.myUser.skilIdArray.unshift(skil.id);
    this.skilService.addSkilToApplicant(this.myUser).subscribe(user => {
      this.myUser = user;
      location.reload(true);
    });
  }

}
